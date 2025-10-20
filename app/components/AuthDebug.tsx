'use client'

import React from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { clearAllAuthData } from '@/app/lib/authReset'
import { Trash2, User, LogOut } from 'lucide-react'

export default function AuthDebug() {
  const { user, clearAuth, signOut } = useAuth()

  const handleClearAuth = async () => {
    await clearAllAuthData()
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.reload()
  }

  if (!user) return null

  return (
    <div className="fixed bottom-4 right-4 bg-red-900/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 z-50">
      <div className="flex items-center space-x-3 mb-3">
        <User className="w-5 h-5 text-red-400" />
        <span className="text-red-400 font-semibold">Debug: User Logged In</span>
      </div>
      
      <div className="text-red-300 text-sm mb-3">
        <p>Email: {user.email}</p>
        <p>Name: {user.user_metadata?.full_name || 'Not set'}</p>
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
          onClick={handleClearAuth}
          className="flex items-center space-x-2 px-3 py-2 bg-red-700/20 hover:bg-red-700/30 text-red-300 rounded-lg transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  )
}
