'use client';

import { useMemo, useState } from 'react';

interface GoogleDeal {
  title: string;
  link: string;
  snippet: string;
  source?: string;
  price?: string;
  rating?: string;
  image?: string;
  favicon?: string;
  thumbnail?: string;
  displayed_link?: string;
  snippet_highlighted_words?: string[];
  position?: number;
}

interface TopDealsProps {
  query: string;
  googleDeals: GoogleDeal[];
  isLoading: boolean;
}

export default function TopDeals({ query, googleDeals, isLoading }: TopDealsProps) {
  const [selectedDeal, setSelectedDeal] = useState<GoogleDeal | null>(null);

  // Small helper that cycles through multiple image fallbacks
  function DealImage({ deal }: { deal: GoogleDeal }) {
    const [idx, setIdx] = useState(0);

    const screenshot1 = deal.link ? `https://image.thum.io/get/width/1200/crop/600/noanimate/${encodeURIComponent(deal.link)}` : undefined;
    const screenshot2 = deal.link ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(deal.link)}?w=600` : undefined;

    const candidates = useMemo(
      () => [
        deal.thumbnail,
        deal.image,
        screenshot1,
        screenshot2,
        'https://via.placeholder.com/1200x600?text=Preview+Unavailable'
      ].filter(Boolean) as string[],
      [deal.thumbnail, deal.image, screenshot1, screenshot2]
    );

    const src = candidates[Math.min(idx, candidates.length - 1)];

    return (
      <img
        src={src}
        alt={deal.title}
        className="w-full h-32 object-contain bg-white rounded-lg p-2 shadow-sm"
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
      />
    );
  }

  return (
    <div className="h-full bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Top Deals</h2>
            <p className="text-slate-400 text-sm">for &quot;{query}&quot;</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">Live Deals</span>
        </div>
      </div>


      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="inline-flex items-center space-x-2 text-green-400">
                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Searching Google for deals...</span>
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-700/30 rounded-xl p-4 animate-pulse">
                <div className="w-full h-32 bg-slate-600/50 rounded-lg mb-3"></div>
                <div className="h-4 bg-slate-600/50 rounded mb-2"></div>
                <div className="h-3 bg-slate-600/50 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : googleDeals.length > 0 ? (
          <div className="space-y-4">
            {googleDeals.slice(0, 6).map((deal, index) => (
              <div
                key={index}
                className={`bg-slate-700/30 hover:bg-slate-700/50 rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
                  selectedDeal?.link === deal.link 
                    ? 'border-green-500/50 shadow-lg shadow-green-500/10' 
                    : 'border-slate-600/30 hover:border-slate-500/50'
                }`}
                onClick={() => setSelectedDeal(deal)}
              >
                {/* Deal Image */}
                <div className="relative mb-3">
                  <DealImage deal={deal} />
                  {/* Deal Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      #{deal.position || index + 1}
                    </div>
                  </div>
                  {/* Source Favicon */}
                  {deal.favicon && (
                    <div className="absolute top-2 right-2">
                      <img
                        src={deal.favicon}
                        alt={deal.source || 'Source'}
                        className="w-6 h-6 rounded-full bg-white/90 p-1"
                        onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                      />
                    </div>
                  )}
                </div>

                {/* Deal Info */}
                <div className="space-y-2">
                  <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
                    {deal.title}
                  </h3>
                  
                  {deal.snippet && (
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {deal.snippet_highlighted_words && deal.snippet_highlighted_words.length > 0 ? (
                        deal.snippet.split(' ').map((word, wordIndex) => {
                          const isHighlighted = deal.snippet_highlighted_words?.some(highlighted => 
                            word.toLowerCase().includes(highlighted.toLowerCase())
                          );
                          return (
                            <span
                              key={wordIndex}
                              className={isHighlighted ? 'text-green-400 font-semibold' : ''}
                            >
                              {word}{' '}
                            </span>
                          );
                        })
                      ) : (
                        deal.snippet
                      )}
                    </p>
                  )}

                  {/* Rating */}
                  {deal.rating && (
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(parseFloat(deal.rating || '0'))
                                ? 'text-yellow-400'
                                : 'text-slate-500'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-slate-400 text-xs">{deal.rating}</span>
                    </div>
                  )}

                  {/* Source */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {deal.favicon && (
                        <img
                          src={deal.favicon}
                          alt=""
                          className="w-3 h-3 rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="text-slate-400 text-xs">
                        {deal.displayed_link || deal.source || 'Google Search'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(deal.link, '_blank');
                      }}
                      className="text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                    >
                      View Deal →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm mb-2">No deals available</p>
            <p className="text-slate-500 text-xs">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {googleDeals.length > 0 && (
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Top Deals</span>
            <span>{googleDeals.length} {googleDeals.length === 1 ? 'deal' : 'deals'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
