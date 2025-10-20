// Production-ready configuration
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mqnksqstdapmresitgbt.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbmtzcXN0ZGFwbXJlc2l0Z2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODkzOTAsImV4cCI6MjA3NjQ2NTM5MH0.6TyIpKPEuPekCtxqGC-XXSCEXWJgdb37kLRk-Ud0G5Q',
  },
  auth: {
    // Session timeout in seconds (24 hours)
    sessionTimeout: 24 * 60 * 60,
    // Auto-refresh session before expiry (5 minutes)
    refreshThreshold: 5 * 60,
  },
  app: {
    name: 'Bilmo Shopping Agent',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  }
}

// Search API Configuration
export const SEARCHAPI_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_SEARCHAPI_KEY || 'af2nEwUds11PVv7Skq7Q8oaE',
  BASE_URL: 'https://www.searchapi.io/api/v1/search',
  timeout: 10000,
  maxResults: 15,
}

// Check if Search API is configured
export const isSearchAPIConfigured = () => {
  return !!(SEARCHAPI_CONFIG.API_KEY && SEARCHAPI_CONFIG.API_KEY !== '')
}

// Get Search API headers
export const getSearchAPIHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'User-Agent': 'Bilmo-Shopping-Agent/1.0.0',
    'Authorization': `Bearer ${SEARCHAPI_CONFIG.API_KEY}`,
  }
}

// Validate configuration
export const validateConfig = () => {
  const required = ['supabase.url', 'supabase.anonKey']
  const missing = required.filter(key => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], config)
    return !value
  })
  
  if (missing.length > 0) {
    console.error('Missing required configuration:', missing)
    return false
  }
  
  return true
}