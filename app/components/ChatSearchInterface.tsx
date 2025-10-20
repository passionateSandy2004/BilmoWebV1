'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import SearchResults from './SearchResults';
import TopDeals from './TopDeals';

// Agentic AI Loading Component with Futuristic Animation
function AgenticLoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    { icon: '🔍', text: 'Analyzing your query...', subtext: 'Understanding intent', color: 'from-cyan-500 to-blue-500' },
    { icon: '🌐', text: 'Searching across multiple platforms...', subtext: 'Connecting to data sources', color: 'from-blue-500 to-purple-500' },
    { icon: '🤖', text: 'AI is comparing prices and deals...', subtext: 'Processing millions of combinations', color: 'from-purple-500 to-pink-500' },
    { icon: '⚡', text: 'Finding the best offers for you...', subtext: 'Ranking by value and relevance', color: 'from-pink-500 to-orange-500' },
    { icon: '✨', text: 'Finalizing top recommendations...', subtext: 'Curating personalized results', color: 'from-orange-500 to-green-500' }
  ];

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="py-8 px-4 relative">
      {/* Futuristic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl animate-pulse"></div>
      
      <div className="relative">
        {/* Main Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-400">PROCESSING</span>
            <span className="text-xs font-mono text-cyan-400">{progress}%</span>
          </div>
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Steps with Advanced Animation */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ease-out ${
                index <= currentStep ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className={`absolute left-[19px] top-12 w-0.5 h-8 transition-all duration-700 ${
                  index < currentStep 
                    ? 'bg-gradient-to-b from-green-400 to-green-500/50' 
                    : index === currentStep
                    ? 'bg-gradient-to-b from-blue-400 to-blue-500/20 animate-pulse'
                    : 'bg-slate-700/30'
                }`}></div>
              )}

              <div className="flex items-start space-x-4">
                {/* Futuristic Step Icon */}
                <div className="relative flex-shrink-0">
                  {/* Outer Glow Ring */}
                  {index === currentStep && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 blur-md"></div>
                    </>
                  )}
                  
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${
                    index < currentStep 
                      ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400 shadow-lg shadow-green-500/50' 
                      : index === currentStep 
                      ? `bg-gradient-to-br ${step.color} bg-opacity-20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50` 
                      : 'bg-slate-800/50 border-2 border-slate-700/50'
                  }`}>
                    {/* Success Checkmark with Animation */}
                    {index < currentStep ? (
                      <svg 
                        className="w-5 h-5 text-green-400 animate-in zoom-in duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : index === currentStep ? (
                      <>
                        {/* Rotating Outer Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin"></div>
                        <span className="text-lg relative z-10">{step.icon}</span>
                      </>
                    ) : (
                      <span className="text-lg opacity-40">{step.icon}</span>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  {/* Main Text */}
                  <p className={`text-sm font-semibold transition-all duration-700 ${
                    index < currentStep 
                      ? 'text-green-400' 
                      : index === currentStep 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' 
                      : 'text-slate-600'
                  }`}>
                    {step.text}
                  </p>
                  
                  {/* Subtext with Typing Effect */}
                  <p className={`text-xs mt-1 transition-all duration-700 ${
                    index < currentStep 
                      ? 'text-green-500/60' 
                      : index === currentStep 
                      ? 'text-cyan-400/80' 
                      : 'text-slate-700'
                  }`}>
                    {step.subtext}
                  </p>

                  {/* Active Step Progress Indicator */}
                  {index === currentStep && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 150}ms` }}
                          ></div>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400/60">PROCESSING</span>
                    </div>
                  )}
                </div>

                {/* Time Indicator */}
                <div className={`text-[10px] font-mono pt-1 transition-all duration-700 ${
                  index < currentStep 
                    ? 'text-green-500/60' 
                    : index === currentStep 
                    ? 'text-cyan-400/80' 
                    : 'text-slate-700'
                }`}>
                  {index < currentStep ? '✓' : index === currentStep ? '...' : '–'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-medium text-slate-400">
                <span className="text-cyan-400 font-mono">AI AGENT</span> is analyzing your request
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-cyan-400/30 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.abs(Math.sin((Date.now() / 200) + i)) * 12 + 4}px`,
                    animationDelay: `${i * 100}ms`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
  rating: string;
  source?: string;
  isGoogleOrganic?: boolean;
  snippet?: string;
  thumbnail?: string;
  favicon?: string;
  domain?: string;
  displayed_link?: string;
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

interface SearchSession {
  id: string;
  query: string;
  timestamp: Date;
  googleDeals: Product[];
  searchResults: Product[];
  isLoading: boolean;
}

interface ChatSearchInterfaceProps {
  initialQuery?: string;
  initialGoogleDeals?: Product[];
  initialSearchResults?: Product[];
  onNewSearch: (query: string) => Promise<{ googleDeals: Product[], searchResults: Product[] }>;
}

export interface ChatSearchInterfaceHandle {
  triggerNewSearch: (query: string) => Promise<void>;
}

const ChatSearchInterface = forwardRef<ChatSearchInterfaceHandle, ChatSearchInterfaceProps>(({ 
  initialQuery, 
  initialGoogleDeals = [], 
  initialSearchResults = [],
  onNewSearch 
}, ref) => {
  const [searchSessions, setSearchSessions] = useState<SearchSession[]>([]);
  const [initialSessionCreated, setInitialSessionCreated] = useState(false);

  // Create initial session when query is available
  useEffect(() => {
    if (initialQuery && !initialSessionCreated) {
      setSearchSessions([{
        id: 'initial-' + Date.now(),
        query: initialQuery,
        timestamp: new Date(),
        googleDeals: initialGoogleDeals,
        searchResults: initialSearchResults,
        isLoading: initialGoogleDeals.length === 0 && initialSearchResults.length === 0
      }]);
      setInitialSessionCreated(true);
    }
  }, [initialQuery, initialSessionCreated]);

  // Update initial session when results arrive
  useEffect(() => {
    if (initialSessionCreated && searchSessions.length > 0 && searchSessions[0].id.startsWith('initial-')) {
      const firstSession = searchSessions[0];
      if (firstSession.query === initialQuery && (initialGoogleDeals.length > 0 || initialSearchResults.length > 0)) {
        setSearchSessions(prev => [{
          ...prev[0],
          googleDeals: initialGoogleDeals,
          searchResults: initialSearchResults,
          isLoading: false
        }, ...prev.slice(1)]);
      }
    }
  }, [initialGoogleDeals, initialSearchResults, initialQuery, initialSessionCreated]);

  const handleNewSearch = async (query: string) => {
    // Add new search session with loading state
    const newSession: SearchSession = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
      googleDeals: [],
      searchResults: [],
      isLoading: true
    };

    setSearchSessions(prev => [...prev, newSession]);

    // Scroll to the new session after a short delay to let it render
    setTimeout(() => {
      const element = document.getElementById(`search-session-${newSession.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // Fetch results
    try {
      const results = await onNewSearch(query);
      
      // Update the session with results
      setSearchSessions(prev => 
        prev.map(session => 
          session.id === newSession.id 
            ? { ...session, ...results, isLoading: false }
            : session
        )
      );
    } catch (error) {
      console.error('Search error:', error);
      // Remove failed session or mark as error
      setSearchSessions(prev => prev.filter(s => s.id !== newSession.id));
    }
  };

  // Expose handleNewSearch to parent via ref
  useImperativeHandle(ref, () => ({
    triggerNewSearch: handleNewSearch
  }));

  return (
    <div className="space-y-12 pb-32">
      {searchSessions.map((session, index) => (
      <div
        key={session.id}
        id={`search-session-${session.id}`}
        className="animate-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: `${index * 100}ms` }}
      >
          {/* Search Query Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <div>
                <h2 className="text-white text-3xl font-bold">{session.query}</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {session.googleDeals.length + session.searchResults.length} results • {session.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Full Width Professional Layout */}
          <div className="flex gap-8">
            {/* Top Deals Sidebar - Professional */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden sticky top-6 shadow-xl">
                <div className="p-5 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-800/60">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Top Deals</h3>
                         <p className="text-slate-400 text-xs">for &quot;{session.query}&quot;</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-medium">Live Deals</span>
                  </div>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto p-4">
                       {session.isLoading ? (
                         <AgenticLoadingSteps />
                       ) : session.googleDeals.length > 0 ? (
                    <div className="space-y-4">
                      {session.googleDeals.slice(0, 6).map((deal, idx) => (
                        <a
                          key={idx}
                          href={deal.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-slate-700/30 hover:bg-slate-700/50 rounded-xl p-4 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50 group"
                        >
                          <div className="relative mb-3">
                            <div className="bg-white rounded-lg p-2 shadow-md">
                              <img
                                src={deal.image || deal.thumbnail || 'https://via.placeholder.com/200'}
                                alt={deal.title}
                                className="w-full h-32 object-contain"
                                loading="lazy"
                              />
                            </div>
                            {/* Deal Badge */}
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-lg">
                              #{idx + 1}
                            </div>
                            {/* Favicon/Source Badge */}
                            {deal.favicon && (
                              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                                <img src={deal.favicon} alt="" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
                              </div>
                            )}
                          </div>
                          
                          {/* Deal Info */}
                          <div className="space-y-2">
                            <h4 className="text-white text-sm font-semibold line-clamp-2 leading-tight group-hover:text-green-400 transition-colors">
                              {deal.title}
                            </h4>
                            
                            {/* Snippet Preview */}
                            {deal.snippet && (
                              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                {deal.snippet}
                              </p>
                            )}
                            
                            {/* Rich Snippet Extensions (offers, delivery, etc) */}
                            {deal.rich_snippet?.extensions && deal.rich_snippet.extensions.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {deal.rich_snippet.extensions.map((ext: string, i: number) => (
                                  <span key={i} className="inline-flex items-center text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                                    {ext.includes('delivery') || ext.includes('Free') ? (
                                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                      </svg>
                                    ) : ext.includes('₹') || ext.includes('$') ? (
                                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                    {ext}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Price & Rating Row */}
                            <div className="flex items-center justify-between pt-1">
                              <div>
                                {deal.price && deal.price !== 'Price N/A' && deal.price !== 'N/A' ? (
                                  <p className="text-green-400 font-bold text-lg">{deal.price}</p>
                                ) : null}
                                {deal.rating && deal.rating !== 'N/A' && deal.rating !== '4.0' ? (
                                  <div className="flex items-center space-x-1 mt-1">
                                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-slate-300 text-xs font-medium">{deal.rating}</span>
                                  </div>
                                ) : null}
                              </div>
                              
                              {/* View Deal Button */}
                              <div className="text-green-400 group-hover:text-green-300 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </div>
                            </div>
                            
                            {/* Source Info */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-600/30">
                              <span className="text-slate-400 text-xs truncate">
                                {deal.source || deal.displayed_link || 'Source'}
                              </span>
                              <span className="text-slate-500 text-xs">
                                {deal.domain && deal.domain.length < 20 ? deal.domain : ''}
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-slate-400 text-sm">No deals available</p>
                    </div>
                  )}
                </div>
                
                {session.googleDeals.length > 0 && (
                  <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
                    <div className="text-center text-slate-400 text-xs">
                      {session.googleDeals.length} {session.googleDeals.length === 1 ? 'deal' : 'deals'} available
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Search Results - Professional Grid */}
            <div className="flex-1 min-w-0">
              <SearchResults
                results={session.searchResults}
                isLoading={session.isLoading}
              />
            </div>
          </div>

          {/* Elegant Divider between sessions */}
          {index < searchSessions.length - 1 && (
            <div className="mt-12 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900 px-4 text-slate-500 text-sm">Previous Search</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Empty state */}
      {searchSessions.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">Start a search to see results</p>
          <p className="text-slate-500 text-sm mt-2">Use the AI assistant below to search for products</p>
        </div>
      )}
    </div>
  );
});

ChatSearchInterface.displayName = 'ChatSearchInterface';

export default ChatSearchInterface;

