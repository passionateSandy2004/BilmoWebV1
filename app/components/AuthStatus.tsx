'use client'

import React from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { clearAllAuthData } from '@/app/lib/authReset'
import { User, LogOut, Trash2, AlertTriangle } from 'lucide-react'

export default function AuthStatus() {
  const { user, loading } = useAuth()

  const handleClearAll = async () => {
    if (confirm('This will clear all authentication data and reload the page. Continue?')) {
      await clearAllAuthData()
    }
  }

  const handleSignOut = async () => {
    if (confirm('Sign out and reload the page?')) {
      await clearAllAuthData()
    }
  }

  if (loading) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      {user ? (
        <div className="bg-red-900/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 max-w-sm">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">User Logged In</span>
          </div>
          
          <div className="text-red-300 text-sm mb-3 space-y-1">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.user_metadata?.full_name || 'Not set'}</p>
            <p><strong>ID:</strong> {user.id.slice(0, 8)}...</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
            
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-3 py-2 bg-red-700/20 hover:bg-red-700/30 text-red-300 rounded-lg transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-900/90 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">No User Logged In</span>
          </div>
          <p className="text-green-300 text-sm mt-1">Ready for login/signup</p>
        </div>
      )}
    </div>
  )
}
