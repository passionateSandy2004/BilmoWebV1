import { supabase } from './supabase'

export const resetAuthentication = async () => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut()
    
    // Clear all local storage
    if (typeof window !== 'undefined') {
      // Clear Supabase auth data
      localStorage.removeItem('sb-mqnksqstdapmresitgbt-auth-token')
      localStorage.removeItem('supabase.auth.token')
      
      // Clear all localStorage
      localStorage.clear()
      
      // Clear sessionStorage
      sessionStorage.clear()
      
      // Clear any other auth-related storage
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.includes('supabase') || key.includes('auth')) {
          localStorage.removeItem(key)
        }
      })
    }
    
    // Force reload to clear any cached state
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Error resetting authentication:', error)
  }
}

export const clearAllAuthData = async () => {
  try {
    // Multiple attempts to clear auth data
    await supabase.auth.signOut()
    await supabase.auth.signOut()
    
    if (typeof window !== 'undefined') {
      // Clear all possible auth storage keys
      const authKeys = [
        'sb-mqnksqstdapmresitgbt-auth-token',
        'supabase.auth.token',
        'supabase.auth.session',
        'sb-mqnksqstdapmresitgbt-auth-token.0',
        'sb-mqnksqstdapmresitgbt-auth-token.1',
        'sb-mqnksqstdapmresitgbt-auth-token.2',
        'sb-mqnksqstdapmresitgbt-auth-token.3',
        'sb-mqnksqstdapmresitgbt-auth-token.4',
        'sb-mqnksqstdapmresitgbt-auth-token.5',
        'sb-mqnksqstdapmresitgbt-auth-token.6',
        'sb-mqnksqstdapmresitgbt-auth-token.7',
        'sb-mqnksqstdapmresitgbt-auth-token.8',
        'sb-mqnksqstdapmresitgbt-auth-token.9'
      ]
      
      authKeys.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
      
      // Clear all localStorage
      localStorage.clear()
      sessionStorage.clear()
      
      // Force reload
      window.location.reload()
    }
  } catch (error) {
    console.error('Error clearing auth data:', error)
    // Force reload even if there's an error
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }
}
