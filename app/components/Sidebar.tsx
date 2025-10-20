'use client';

import { Home, DollarSign, Star, Bell, BarChart3, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const { user, signOut } = useAuth();
  
  const navigationItems = [
    { id: 'home', label: 'Chat', icon: Home, badge: null },
    { id: 'deals', label: 'Top Deals', icon: DollarSign, badge: '12' },
    { id: 'featured', label: 'Featured', icon: Star, badge: null },
    { id: 'alerts', label: 'Price Alerts', icon: Bell, badge: '3' },
    { id: 'comparison', label: 'Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-slate-700/30 flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="p-8 border-b border-slate-700/30">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">Bilmo</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <a
              key={item.id}
              href="#"
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700/30 bg-slate-900/50">
        {user ? (
          <div className="relative group">
            {/* Subtle gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative flex items-center space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 group-hover:border-slate-600/50 transition-all duration-200">
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user.user_metadata?.full_name 
                    ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    : user.email?.charAt(0).toUpperCase() || 'U'
                  }
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-slate-400 text-xs truncate">{user.email}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1 flex-shrink-0">
                <button 
                  onClick={() => window.location.href = '/profile'}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button 
                  onClick={async () => {
                    await signOut();
                    window.location.reload();
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-600/30">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-300 text-sm font-medium mb-1">Not signed in</p>
            <p className="text-slate-500 text-xs">Sign in to unlock features</p>
          </div>
        )}
      </div>
    </div>
  );
}
