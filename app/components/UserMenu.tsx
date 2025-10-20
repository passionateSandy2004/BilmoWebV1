'use client'

import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getUserInitials()}
        </div>
        
        {/* User Info */}
        <div className="text-left">
          <p className="text-white font-medium text-sm">{getUserDisplayName()}</p>
          <p className="text-slate-400 text-xs">{user?.email}</p>
        </div>
        
        {/* Chevron */}
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="p-4 border-b border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {getUserInitials()}
              </div>
              <div>
                <p className="text-white font-medium">{getUserDisplayName()}</p>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button 
              onClick={() => {
                router.push('/profile')
                setIsOpen(false)
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            
            <div className="border-t border-slate-600/30 my-2"></div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
