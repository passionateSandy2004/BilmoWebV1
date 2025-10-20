import { supabase } from './supabase'
import { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthUser extends User {
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface AuthState {
  user: AuthUser | null
  session: Session | null
  loading: boolean
}

export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, fullName?: string) {
    try {
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
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Get current user
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },

  // Update profile
  async updateProfile(updates: { full_name?: string; avatar_url?: string }) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  },
}
