import { searchGoogleDeals, GoogleSearchResult } from './googleSearchApi';

interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
  rating: string;
  source?: string;
  isGoogleOrganic?: boolean;
  snippet?: string;
  favicon?: string;
  thumbnail?: string;
  displayed_link?: string;
  snippet_highlighted_words?: string[];
  position?: number;
}

interface SearchResponse {
  results: Product[];
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // Convert spaces to dashes and make lowercase
    const formattedQuery = query.toLowerCase().replace(/\s+/g, '-');
    
    console.log('🔍 Searching for:', formattedQuery);
    
    // Start with the most likely to work search term
    const searchTerm = formattedQuery;
    
    console.log('🌐 Making API calls...');
    
    // Search both Flipkart, Amazon, and Google deals
    const [flipkartResults, amazonResults, googleDeals] = await Promise.allSettled([
      fetch(`https://scraper-mauve.vercel.app/search/flipkart?product=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }),
      fetch(`https://scraper-mauve.vercel.app/search/amazon?product=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }),
      // Google deals search
      searchGoogleDeals(query)
    ]);

    const allResults: Product[] = [];

    // Process Flipkart results
    if (flipkartResults.status === 'fulfilled' && flipkartResults.value.ok) {
      try {
        const flipkartData: SearchResponse = await flipkartResults.value.json();
        console.log('✅ Flipkart results:', flipkartData.results?.length || 0);
        if (flipkartData.results && flipkartData.results.length > 0) {
          allResults.push(...flipkartData.results.map(product => ({
            ...product,
            source: 'Flipkart'
          })));
        }
      } catch (parseError) {
        console.log('❌ Flipkart parse error:', parseError);
      }
    } else {
      console.log('❌ Flipkart search failed:', flipkartResults.status === 'rejected' ? flipkartResults.reason : 'API error');
    }

    // Process Amazon results
    if (amazonResults.status === 'fulfilled' && amazonResults.value.ok) {
      try {
        const amazonData: SearchResponse = await amazonResults.value.json();
        console.log('✅ Amazon results:', amazonData.results?.length || 0);
        console.log('📦 Amazon data:', amazonData);
        if (amazonData.results && amazonData.results.length > 0) {
          allResults.push(...amazonData.results.map(product => ({
            ...product,
            source: 'Amazon'
          })));
        }
      } catch (parseError) {
        console.log('❌ Amazon parse error:', parseError);
      }
    } else {
      console.log('❌ Amazon search failed:', amazonResults.status === 'rejected' ? amazonResults.reason : 'API error');
      if (amazonResults.status === 'fulfilled') {
        console.log('🔍 Amazon response status:', amazonResults.value.status);
        console.log('🔍 Amazon response text:', await amazonResults.value.text());
      }
    }

    // Process Google deals results - Use organic results directly
    if (googleDeals.status === 'fulfilled' && Array.isArray(googleDeals.value)) {
      try {
        console.log('✅ Google organic results:', googleDeals.value.length);
        console.log('🔍 Google organic raw data:', googleDeals.value);
        
        if (googleDeals.value.length > 0) {
          // Use organic results directly - KEEP ORIGINAL SOURCE
             const organicResults = googleDeals.value.map((result: GoogleSearchResult) => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
            source: result.source,
            isGoogleOrganic: true,
            domain: result.domain,
            position: result.position,
            displayed_link: result.displayed_link,
            favicon: result.favicon,
            thumbnail: result.thumbnail,
            image: result.thumbnail || result.image || 'https://via.placeholder.com/200',
            // Extract price from rich_snippet extensions if not directly available
            price: result.price || 
                   (result.rich_snippet?.top?.extensions?.find((ext: string) => ext.includes('₹') || ext.includes('$')) || 
                    result.rich_snippet?.bottom?.extensions?.find((ext: string) => ext.includes('₹') || ext.includes('$'))) || 'Price N/A',
            // Extract rating from detected_extensions if available
            rating: result.rating || 
                    (result.detected_extensions?.rating ? 
                     result.detected_extensions.rating.toString() : 'N/A'),
            snippet_highlighted_words: result.snippet_highlighted_words,
            sitelinks: result.sitelinks,
            rich_snippet: result.rich_snippet,
            detected_extensions: result.detected_extensions
          }));
          
          console.log('🔍 Processed organic results:', organicResults);
          console.log('🔍 Organic result sources:', organicResults.map(r => r.source));
          allResults.push(...organicResults);
          console.log('📊 Total results after adding Google:', allResults.length);
        }
      } catch (parseError) {
        console.log('❌ Google organic results parse error:', parseError);
      }
    } else {
      console.log('❌ Google organic results search failed:', googleDeals.status === 'rejected' ? googleDeals.reason : 'API error');
    }

    console.log('📊 Total results found:', allResults.length);
    console.log('🔍 Results breakdown:');
    const flipkartCount = allResults.filter(r => r.source === 'Flipkart' || r.source === 'Flipkart (Fallback)').length;
    const amazonCount = allResults.filter(r => r.source === 'Amazon').length;
    const googleOrganicCount = allResults.filter(r => r.source !== 'Flipkart' && r.source !== 'Flipkart (Fallback)' && r.source !== 'Amazon').length;
    console.log('  - Flipkart:', flipkartCount);
    console.log('  - Amazon:', amazonCount);
    console.log('  - Google organic:', googleOrganicCount);
    
    // Debug: Show all sources
    console.log('🔍 All sources in results:', allResults.map(r => r.source));

    // If no results, try a fallback search with "laptop"
    if (allResults.length === 0) {
      console.log('🔄 Trying fallback search with "laptop"...');
      try {
        const fallbackResults = await fetch(`https://scraper-mauve.vercel.app/search/flipkart?product=laptop`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        if (fallbackResults.ok) {
          const fallbackData: SearchResponse = await fallbackResults.json();
          console.log('✅ Fallback results:', fallbackData.results?.length || 0);
          if (fallbackData.results && fallbackData.results.length > 0) {
            allResults.push(...fallbackData.results.slice(0, 10).map(product => ({
              ...product,
              source: 'Flipkart (Fallback)'
            })));
          }
        }
      } catch (fallbackError) {
        console.log('❌ Fallback search failed:', fallbackError);
      }
    }

    // Mix results from different platforms for better user experience
    const googleOrganic = allResults.filter(r => r.source !== 'Flipkart' && r.source !== 'Flipkart (Fallback)' && r.source !== 'Amazon');
    const platformResults = allResults.filter(r => r.source === 'Flipkart' || r.source === 'Flipkart (Fallback)' || r.source === 'Amazon');
    
    // Sort platform results by price (high to low) while mixing platforms
    const sortedPlatformResults = platformResults.sort((a, b) => {
      // Extract numeric price values for comparison
      const getPriceValue = (price: string | null | undefined) => {
        if (!price || typeof price !== 'string') return 0;
        const numericPrice = price.replace(/[^\d]/g, '');
        return parseInt(numericPrice) || 0;
      };
      
      const priceA = getPriceValue(a?.price);
      const priceB = getPriceValue(b?.price);
      
      // Sort high to low
      return priceB - priceA;
    });
    
    // Combine: Google organic first, then price-sorted platform results
    const combinedResults = [
      ...(googleOrganic || []), 
      ...(sortedPlatformResults || [])
    ];

    console.log('🎯 Final results (combined):', combinedResults.length);
    console.log('   - Google organic kept:', googleOrganic.length);
    console.log('   - Platform results included:', platformResults.length);
    return combinedResults;

  } catch (error) {
    console.error('💥 Search API error:', error);
    throw new Error('Failed to search products. Please try again.');
  }
}

export function formatSearchQuery(query: string): string {
  return query.toLowerCase().replace(/\s+/g, '-');
}
