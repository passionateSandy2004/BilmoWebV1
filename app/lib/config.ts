// SearchAPI Configuration
export const SEARCHAPI_CONFIG = {
  // Get your API key from https://www.searchapi.io/
  API_KEY: 'af2nEwUds11PVv7Skq7Q8oaE', // Production API key
  BASE_URL: 'https://www.searchapi.io/api/v1/search',
  
  // Google Search Parameters for India
  GOOGLE_PARAMS: {
    engine: 'google',
    location: 'India',
    gl: 'in', // Country code for India
    hl: 'en', // Language
    device: 'desktop'
  },
  
  // Google Shopping Parameters
  SHOPPING_PARAMS: {
    engine: 'google_shopping',
    location: 'India',
    gl: 'in',
    hl: 'en'
  }
};

// Helper function to check if API key is configured
export function isSearchAPIConfigured(): boolean {
  return SEARCHAPI_CONFIG.API_KEY !== 'YOUR_SEARCHAPI_KEY' && SEARCHAPI_CONFIG.API_KEY.length > 0;
}

// Helper function to get headers for SearchAPI requests
export function getSearchAPIHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SEARCHAPI_CONFIG.API_KEY}`,
  };
}
