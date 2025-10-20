'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Star, ShoppingCart, Heart } from 'lucide-react';

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
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto relative">
      {/* Futuristic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl animate-pulse rounded-2xl"></div>
      
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
}

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  error?: string;
}

export default function SearchResults({ results, isLoading, error }: SearchResultsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (link: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(link)) {
        newSet.delete(link);
      } else {
        newSet.add(link);
      }
      return newSet;
    });
  };

  const formatPrice = (price: string | null | undefined) => {
    if (!price || typeof price !== 'string' || price === 'Price N/A' || price === 'N/A') return null;
    return price.replace('₹', '₹ ');
  };

  const formatRating = (rating: string | null | undefined) => {
    if (!rating || rating === 'N/A') return null;
    const value = parseFloat(String(rating));
    if (Number.isNaN(value) || value <= 0) return null;
    return value.toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <AgenticLoadingSteps />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-white text-xl font-semibold mb-2">Search Error</h3>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-slate-800/50 border border-slate-600/30 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-slate-400 text-4xl mb-4">🔍</div>
          <h3 className="text-white text-xl font-semibold mb-2">No Results Found</h3>
          <p className="text-slate-300">Try searching for something else</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <select className="bg-slate-800/50 border border-slate-600/30 rounded-xl px-4 py-2 text-white">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product, index) => (
          <div
            key={`${product.link}-${index}`}
            className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 hover:border-slate-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Product Image */}
            <div className="relative mb-4 bg-white rounded-xl p-3 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mx-auto"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEyIiBoZWlnaHQ9IjMxMiIgdmlld0JveD0iMCAwIDMxMiAzMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMTIiIGhlaWdodD0iMzEyIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xNTYgMTI4QzE2OC4yODQgMTI4IDE3OCAxMzcuNzE2IDE3OCAxNTBDMTc4IDE2Mi4yODQgMTY4LjI4NCAxNzIgMTU2IDE3MkMxNDMuNzE2IDE3MiAxMzQgMTYyLjI4NCAxMzQgMTUwQzEzNCAxMzcuNzE2IDE0My43MTYgMTI4IDE1NiAxMjhaIiBmaWxsPSIjNjQ3NDhCIi8+CjxwYXRoIGQ9Ik0xMzQgMjA0SDc4VjE4MEgxMzRWMjA0WiIgZmlsbD0iIzY0NzQ4QiIvPgo8L3N2Zz4K';
                }}
              />
              
              {/* Platform Badge */}
              <div className="absolute top-3 left-3">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.isGoogleOrganic
                    ? 'bg-green-500 text-white'
                    : product.source === 'Flipkart'
                    ? 'bg-blue-500 text-white'
                    : product.source === 'Amazon'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-600 text-white'
                }`}>
                  {product.isGoogleOrganic ? 'Google' : (product.source || 'Unknown')}
                </div>
              </div>
              
              <button
                onClick={() => toggleFavorite(product.link)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                  favorites.has(product.link)
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.has(product.link) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>

              {/* Rating */}
              {formatRating(product.rating) && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium text-sm">
                      {formatRating(product.rating)}
                    </span>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center justify-between">
                {formatPrice(product.price) ? (
                  <span className="text-green-400 font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                ) : (
                  <span className="text-slate-400 text-sm">Price on site</span>
                )}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy</span>
                </button>
              </div>

              {/* View Details */}
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <span>View on {product.source || 'Platform'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
