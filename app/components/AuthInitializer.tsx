'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { supabase } from '@/app/lib/supabase'

interface AuthInitializerProps {
  children: React.ReactNode
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Force a fresh session check
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth initialization error:', error)
          // Clear any corrupted session data
          await supabase.auth.signOut()
        }

        // Additional validation for production
        if (session?.user) {
          // Check if user email is verified (for production)
          if (!session.user.email_confirmed_at && session.user.email_confirmed_at !== null) {
            console.log('User email not confirmed, signing out')
            await supabase.auth.signOut()
          }
        }

        setIsInitialized(true)
      } catch (error) {
        console.error('Auth initialization failed:', error)
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [])

  // Always render children, don't block the UI
  return <>{children}</>
}
