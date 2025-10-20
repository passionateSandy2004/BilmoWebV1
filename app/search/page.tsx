'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header';
import { ErrorBoundary } from '../components/ErrorBoundary';
import ChatBox from '../components/ChatBox';
import ChatSearchInterface, { ChatSearchInterfaceHandle } from '../components/ChatSearchInterface';
import RecommendationBanner from '../components/RecommendationBanner';
import { ProductPlan } from '../lib/ai/types';
import { useAuth } from '../contexts/AuthContext';
import { searchProducts } from '../lib/searchApi';

interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
  rating: string;
  source?: string;
  snippet?: string;
}

interface GoogleDeal {
  title: string;
  link: string;
  snippet?: string;
  source?: string;
  price: string;
  rating: string;
  image: string;
  favicon?: string;
  thumbnail?: string;
  displayed_link?: string;
  snippet_highlighted_words?: string[];
  position?: number;
  isGoogleOrganic?: boolean;
  domain?: string;
  rich_snippet?: {
    extensions?: string[];
    top?: {
      extensions?: string[];
    };
    bottom?: {
      extensions?: string[];
    };
  };
  sitelinks?: {
    inline?: Array<{
      title: string;
      link: string;
    }>;
  };
  detected_extensions?: {
    rating?: number;
    reviews?: number;
  };
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const chatSearchRef = useRef<ChatSearchInterfaceHandle>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [googleDeals, setGoogleDeals] = useState<GoogleDeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ProductPlan | null>(null);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      // Use AI planner for the very first search as well
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      if (!resp.ok) {
        throw new Error('Chat planning failed');
      }
      const json = await resp.json();
      const aiPlan: ProductPlan | undefined = json.plan;
      setPlan(aiPlan || null);

      const results = (json.data || []) as Product[];
      
      // Filter results based on price availability
      // Products without prices go to Top Deals (Google organic results)
      const googleDealsResults = results.filter(result => {
        const hasPrice = result.price && 
          result.price !== 'Price N/A' && 
          result.price !== 'N/A' && 
          result.price !== 'Price not available' &&
          result.price !== 'Not available';
        const isGoogleOrganic = (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true;
        // Include Google organic results OR products without prices
        return isGoogleOrganic || !hasPrice;
      });
      
      // Products with prices go to Search Results
      const otherResults = results.filter(result => {
        const hasPrice = result.price && 
          result.price !== 'Price N/A' && 
          result.price !== 'N/A' && 
          result.price !== 'Price not available' &&
          result.price !== 'Not available';
        const isGoogleOrganic = (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true;
        // Include products with prices that are NOT Google organic
        return hasPrice && !isGoogleOrganic;
      });
      
      setGoogleDeals(googleDealsResults);
      setSearchResults(otherResults);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
      setGoogleDeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = (query: string) => {
    // Navigate to search page with new query
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const goHome = () => {
    router.push('/');
  };

  const handleChatMessage = async (message: string): Promise<{ googleDeals: Product[], searchResults: Product[] }> => {
    // Don't add empty searches
    if (!message.trim()) {
      return { googleDeals: [], searchResults: [] };
    }

    // Call new chat API to plan and search primary product
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!resp.ok) {
      throw new Error('Chat planning failed');
    }
    const json = await resp.json();
    const aiPlan: ProductPlan | undefined = json.plan;
    setPlan(aiPlan || null);

    const results = (json.data || []) as Product[];
    
    // Filter results based on price availability
    // Products without prices go to Top Deals (Google organic results)
    const googleDealsResults = results.filter(result => {
      const hasPrice = result.price && 
        result.price !== 'Price N/A' && 
        result.price !== 'N/A' && 
        result.price !== 'Price not available' &&
        result.price !== 'Not available';
      const isGoogleOrganic = (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true;
      // Include Google organic results OR products without prices
      return isGoogleOrganic || !hasPrice;
    });
    
    // Products with prices go to Search Results
    const otherResults = results.filter(result => {
      const hasPrice = result.price && 
        result.price !== 'Price N/A' && 
        result.price !== 'N/A' && 
        result.price !== 'Price not available' &&
        result.price !== 'Not available';
      const isGoogleOrganic = (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true;
      // Include products with prices that are NOT Google organic
      return hasPrice && !isGoogleOrganic;
    });
    
    return {
      googleDeals: googleDealsResults,
      searchResults: otherResults
    };
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        <Header title="Bilmo Shopping Agent" showAuthButtons={true} />
      </div>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Authentication Notice */}
            {!user && (
              <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-300 font-medium">Sign in for enhanced features</p>
                      <p className="text-blue-400 text-sm">Save searches, get personalized results, and access premium features</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const signInBtn = document.querySelector('[data-signin]') as HTMLButtonElement;
                      if (signInBtn) signInBtn.click();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
            
            <ErrorBoundary>
              <ChatSearchInterface
                ref={chatSearchRef}
                initialQuery={searchQuery}
                initialGoogleDeals={googleDeals}
                initialSearchResults={searchResults}
                onNewSearch={handleChatMessage}
                plan={plan}
              />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      {/* Chat Box - Sticky at bottom */}
      <ChatBox 
        onSendMessage={async (message) => {
          if (chatSearchRef.current) {
            await chatSearchRef.current.triggerNewSearch(message);
          }
        }}
        plan={plan}
        onSearchNext={async (keywords) => {
          const q = keywords.join(' ');
          if (chatSearchRef.current) {
            await chatSearchRef.current.triggerNewSearch(q);
          }
        }}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
