'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header';
import { ErrorBoundary } from '../components/ErrorBoundary';
import ChatBox from '../components/ChatBox';
import ChatSearchInterface, { ChatSearchInterfaceHandle } from '../components/ChatSearchInterface';
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
  const chatSearchRef = useRef<ChatSearchInterfaceHandle>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [googleDeals, setGoogleDeals] = useState<GoogleDeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const results = await searchProducts(query);
      
      // Filter Google organic results flagged at source
      const googleDealsResults = results.filter(result => (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true);
      
      // Filter other platform results (from our APIs)
      const otherResults = results.filter(result => (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic !== true);
      
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

    const results = await searchProducts(message);
    
    // Filter Google organic results flagged at source
    const googleDealsResults = results.filter(result => (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic === true);
    
    // Filter other platform results (from our APIs)
    const otherResults = results.filter(result => (result as Product & { isGoogleOrganic?: boolean }).isGoogleOrganic !== true);
    
    return {
      googleDeals: googleDealsResults,
      searchResults: otherResults
    };
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        <Header title="Bilmo Shopping Agent" showAuthButtons={false} />
      </div>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary>
              <ChatSearchInterface
                ref={chatSearchRef}
                initialQuery={searchQuery}
                initialGoogleDeals={googleDeals}
                initialSearchResults={searchResults}
                onNewSearch={handleChatMessage}
              />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      {/* Chat Box - Sticky at bottom */}
      <ChatBox onSendMessage={async (message) => {
        if (chatSearchRef.current) {
          await chatSearchRef.current.triggerNewSearch(message);
        }
      }} />
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
