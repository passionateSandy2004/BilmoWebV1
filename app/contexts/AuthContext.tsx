'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { AuthUser, AuthState } from '@/app/lib/auth'
import { User, Session } from '@supabase/supabase-js'

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, fullName?: string) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  clearAuth: () => Promise<void>
  resetPassword: (email: string) => Promise<{ data: any; error: any }>
  updatePassword: (newPassword: string) => Promise<{ data: any; error: any }>
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ data: any; error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session with validation
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          // Clear invalid session
          await supabase.auth.signOut()
          if (mounted) {
            setSession(null)
            setUser(null)
            setLoading(false)
          }
          return
        }

        // Validate session exists and is not expired
        if (session?.user) {
          const now = Math.floor(Date.now() / 1000)
          const expiresAt = session.expires_at || 0
          
          if (expiresAt < now) {
            // Session expired, sign out
            await supabase.auth.signOut()
            if (mounted) {
              setSession(null)
              setUser(null)
              setLoading(false)
            }
            return
          }
        }

        if (mounted) {
          setSession(session)
          setUser(session?.user as AuthUser || null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
        if (mounted) {
          setSession(null)
          setUser(null)
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        // Handle different auth events
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          setSession(session)
          setUser(session?.user as AuthUser || null)
        } else if (event === 'SIGNED_IN') {
          setSession(session)
          setUser(session?.user as AuthUser || null)
        } else {
          setSession(session)
          setUser(session?.user as AuthUser || null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      // Clear local state
      setUser(null)
      setSession(null)
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error as any }
    }
  }

  const clearAuth = async () => {
    try {
      // Clear all auth data
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      // Clear any stored data
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
    } catch (error) {
      console.error('Clear auth error:', error)
    }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  }

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { data, error }
  }

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })
    return { data, error }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    clearAuth,
    resetPassword,
    updatePassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
