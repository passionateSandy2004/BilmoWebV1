// Production Configuration
export const PRODUCTION_CONFIG = {
  // API Configuration
  API_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Search Configuration
  MAX_RESULTS: 20,
  DEALS_LIMIT: 6,
  
  // Error Handling
  SHOW_DEBUG_INFO: process.env.NODE_ENV === 'development',
  LOG_LEVEL: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  
  // Performance
  DEBOUNCE_DELAY: 300, // 300ms
  CACHE_DURATION: 300000, // 5 minutes
};

// Production-ready error messages
export const ERROR_MESSAGES = {
  SEARCH_FAILED: 'Search failed. Please try again.',
  API_ERROR: 'Service temporarily unavailable. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_QUERY: 'Please enter a valid search term.',
  NO_RESULTS: 'No results found. Try a different search term.',
};

// Production-ready success messages
export const SUCCESS_MESSAGES = {
  SEARCH_COMPLETE: 'Search completed successfully',
  DEALS_FOUND: 'Great deals found!',
};

// Rate limiting configuration
export const RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_REQUESTS_PER_HOUR: 1000,
};
