'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { useAuth } from './contexts/AuthContext';
import { Plane, Hotel, ShoppingBag, TrendingUp, Star, Shield } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // If not signed in, open auth modal and block navigation
    if (!user) {
      const signInBtn = document.querySelector('[data-signin]') as HTMLButtonElement;
      if (signInBtn) signInBtn.click();
      return;
    }
    
    // Navigate to search page with the query
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };


  const quickActions = [
    { icon: Plane, label: 'Flight Search', description: 'Find the best flight deals', color: 'from-blue-500 to-cyan-500' },
    { icon: Hotel, label: 'Hotel Booking', description: 'Book premium accommodations', color: 'from-purple-500 to-pink-500' },
    { icon: ShoppingBag, label: 'Product Search', description: 'Discover amazing products', color: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, label: 'Price Analytics', description: 'Track price trends', color: 'from-orange-500 to-red-500' },
  ];

  const features = [
    { icon: Star, title: 'AI-Powered', description: 'Advanced machine learning algorithms' },
    { icon: Shield, title: 'Secure', description: 'Enterprise-grade security' },
    { icon: TrendingUp, title: 'Analytics', description: 'Real-time insights and trends' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="home" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Bilmo Shopping Agent" showAuthButtons={true} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center p-12 relative overflow-hidden min-h-full">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-6xl text-center relative z-10">
              {/* Main Heading */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Intelligently
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Smart Search
                  </span>
                </h1>
                
                <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                  Enterprise-grade search platform powered by AI. Find flights, hotels, products, and more with unprecedented accuracy and speed.
                </p>
              </div>

              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch}
                isLoading={isLoading}
                className="mb-12"
              />

              {/* Authentication CTA - Only show when not logged in */}
              {!user && (
                <div className="mb-12 text-center">
                  <p className="text-slate-300 text-lg mb-4">
                    Sign in to access advanced search features and save your preferences
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => {
                        // This will be handled by the Header component
                        const signInBtn = document.querySelector('[data-signin]') as HTMLButtonElement;
                        if (signInBtn) signInBtn.click();
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        // This will be handled by the Header component
                        const signUpBtn = document.querySelector('[data-signup]') as HTMLButtonElement;
                        if (signUpBtn) signUpBtn.click();
                      }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}


              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="group p-6 bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl hover:border-slate-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{action.label}</h3>
                      <p className="text-slate-400 text-sm">{action.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl px-6 py-4">
                      <Icon className="w-5 h-5 text-blue-400" />
                      <div className="text-left">
                        <h4 className="text-white font-semibold">{feature.title}</h4>
                        <p className="text-slate-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
