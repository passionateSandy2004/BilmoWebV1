import { SEARCHAPI_CONFIG, isSearchAPIConfigured, getSearchAPIHeaders } from './config';

export interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
  price?: string;
  rating?: string;
  image?: string;
  thumbnail?: string;
  favicon?: string;
  displayed_link?: string;
  domain?: string;
  snippet_highlighted_words?: string[];
  position?: number;
  sitelinks?: {
    inline?: Array<{
      title: string;
      link: string;
    }>;
  };
  rich_snippet?: {
    extensions?: string[];
    top?: {
      extensions?: string[];
    };
    bottom?: {
      extensions?: string[];
    };
  };
  detected_extensions?: {
    rating?: number;
    reviews?: number;
  };
}

interface GoogleSearchResponse {
  organic_results: GoogleSearchResult[];
  shopping_results?: GoogleSearchResult[];
  local_results?: GoogleSearchResult[];
}

export async function searchGoogleDeals(query: string): Promise<GoogleSearchResult[]> {
  try {
    console.log('🔍 Searching Google for deals:', query);
    
    // Format query for better deal search results
    const dealQuery = `${query} best deals price comparison india`;
    
    if (!isSearchAPIConfigured()) {
      throw new Error('SearchAPI key not configured. Please add NEXT_PUBLIC_SEARCHAPI_KEY to your environment variables.');
    }

    const params = new URLSearchParams({
      engine: 'google',
      q: dealQuery,
      location: 'India',
      gl: 'in',
      hl: 'en',
      device: 'desktop'
    });

    const fullUrl = `${SEARCHAPI_CONFIG.BASE_URL}?${params}`;
    console.log('🌐 Google Search URL:', fullUrl);
    console.log('🔑 Using API Key:', SEARCHAPI_CONFIG.API_KEY.substring(0, 10) + '...');
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: getSearchAPIHeaders(),
      mode: 'cors',
    });

    console.log('📡 Google Search Response Status:', response.status);
    console.log('📡 Google Search Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Search Error Response:', errorText);
      throw new Error(`Google search failed: ${response.status} - ${errorText}`);
    }

    const data: GoogleSearchResponse = await response.json();
    console.log('✅ Google Search Full Response:', JSON.stringify(data, null, 2));
    console.log('📊 Google Search Results Count:', {
      organic: data.organic_results?.length || 0,
      shopping: data.shopping_results?.length || 0,
      local: data.local_results?.length || 0
    });

    // Use organic_results directly as they contain the required data
    const organicResults = data.organic_results || [];
    
    console.log('📊 Total Google results found:', organicResults.length);
    
    // Print organic results to console
    console.log('🔍 GOOGLE ORGANIC RESULTS:');
    console.log('='.repeat(50));
    organicResults.forEach((result, index) => {
      console.log(`\n📄 Result ${index + 1}:`);
      console.log(`  Title: ${result.title}`);
      console.log(`  Link: ${result.link}`);
      console.log(`  Source: ${result.source}`);
      console.log(`  Domain: ${result.domain}`);
      console.log(`  Position: ${result.position}`);
      console.log(`  Snippet: ${result.snippet}`);
      if (result.price) console.log(`  Price: ${result.price}`);
      if (result.rating) console.log(`  Rating: ${result.rating}`);
      if (result.thumbnail) console.log(`  Thumbnail: Available`);
      if (result.favicon) console.log(`  Favicon: Available`);
      if (result.sitelinks) console.log(`  Sitelinks: ${result.sitelinks.inline?.length || 0} links`);
      if (result.rich_snippet) console.log(`  Rich Snippet: ${JSON.stringify(result.rich_snippet)}`);
      console.log('  ' + '-'.repeat(40));
    });
    console.log('='.repeat(50));
    
    return organicResults.slice(0, 15); // Limit to 15 results

  } catch (error) {
    console.error('💥 Google search error:', error);
    
    // Production-ready error handling
    if (error instanceof Error) {
      if (error.message.includes('SearchAPI key not configured')) {
        console.warn('SearchAPI key not configured, returning empty results');
        return [];
      }
      if (error.message.includes('Google search failed')) {
        console.warn('Google search API failed, returning empty results');
        return [];
      }
    }
    
    // Return empty array instead of throwing to prevent app crashes
    console.warn('Google search failed, returning empty results');
    return [];
  }
}

export async function searchGoogleShopping(query: string): Promise<GoogleSearchResult[]> {
  try {
    console.log('🛒 Searching Google Shopping for:', query);
    
    const response = await fetch(`https://www.searchapi.io/api/v1/search?engine=google_shopping&q=${encodeURIComponent(query)}&location=India&gl=in&hl=en`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_SEARCHAPI_KEY', // Replace with your actual API key
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Google Shopping search failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Google Shopping results:', data);

    return data.shopping_results?.slice(0, 10) || [];

  } catch (error) {
    console.error('💥 Google Shopping search error:', error);
    throw new Error('Failed to search Google Shopping. Please try again.');
  }
}

export async function searchGoogleDealsWithFilters(query: string): Promise<GoogleSearchResult[]> {
  try {
    console.log('💰 Searching for best deals:', query);
    
    // Multiple search strategies for better results
    const searchQueries = [
      `${query} best price india`,
      `${query} cheapest deals india`,
      `${query} discount offers india`,
      `${query} price comparison india`
    ];

    const allResults: GoogleSearchResult[] = [];

    for (const searchQuery of searchQueries) {
      try {
        const response = await fetch(`https://www.searchapi.io/api/v1/search?engine=google&q=${encodeURIComponent(searchQuery)}&location=India&gl=in&hl=en&device=desktop&tbm=shop`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_SEARCHAPI_KEY', // Replace with your actual API key
          },
          mode: 'cors',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.shopping_results) {
            allResults.push(...data.shopping_results.map((result: GoogleSearchResult) => ({
              ...result,
              source: 'Google Shopping'
            })));
          }
        }
      } catch (error) {
        console.log(`Search query failed: ${searchQuery}`, error);
      }
    }

    // Remove duplicates and sort by relevance
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => r.link === result.link)
    );

    console.log('📊 Total deal results found:', uniqueResults.length);
    return uniqueResults.slice(0, 12);

  } catch (error) {
    console.error('💥 Google deals search error:', error);
    throw new Error('Failed to search for deals. Please try again.');
  }
}
