'use client';

import { useState } from 'react';
import { Search, Mic, Paperclip, Filter, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search for products, laptops, phones, and more...",
  className = "",
  isLoading = false
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleVoiceSearch = () => {
    console.log('Voice search activated');
  };

  const handleAttachment = () => {
    console.log('Attachment clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const popularSearches = [
    'laptop', 'iphone 16', 'samsung galaxy', 'macbook air', 
    'gaming laptop', 'wireless headphones', 'smartwatch'
  ];

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="relative max-w-4xl mx-auto">
          {/* Main Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className={`h-6 w-6 transition-colors ${isFocused ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={isLoading}
              className={`w-full pl-16 pr-32 py-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-slate-400 focus:outline-none transition-all duration-300 text-xl font-medium shadow-2xl ${
                isFocused 
                  ? 'border-blue-500/50 shadow-blue-500/20 shadow-2xl' 
                  : 'border-slate-600/30 hover:border-slate-500/50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            
            {/* Action Buttons */}
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center space-x-3">
              <button
                type="button"
                onClick={handleFilter}
                disabled={isLoading}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Advanced filters"
              >
                <Filter className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleAttachment}
                disabled={isLoading}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleVoiceSearch}
                disabled={isLoading}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Voice search"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* AI Enhancement Badge */}
          <div className="absolute -top-2 -right-2">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              <Sparkles className="h-3 w-3" />
              <span>AI Enhanced</span>
            </div>
          </div>
        </div>
      </form>
      
      {/* Search Suggestions */}
      {isFocused && !isLoading && (
        <div className="mt-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-4 shadow-2xl">
            <p className="text-slate-400 text-sm font-medium mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    if (onSearch) {
                      onSearch(suggestion);
                    }
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
