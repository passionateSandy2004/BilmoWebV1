'use client';

import { Bell, Search, User, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showAuthButtons?: boolean;
}

export default function Header({ 
  title = "Dashboard", 
  showAuthButtons = true 
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-slate-700/30 px-6 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-white text-lg font-bold tracking-tight">{title}</h1>
            <p className="text-slate-400 text-xs font-medium">Welcome back, John</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105">
            <Search className="w-4 h-4" />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105">
              <Bell className="w-4 h-4" />
            </button>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </div>
          
          {showAuthButtons ? (
            <div className="flex items-center space-x-2">
              <button className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 font-medium text-sm">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm">
                Get Started
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                <Settings className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
