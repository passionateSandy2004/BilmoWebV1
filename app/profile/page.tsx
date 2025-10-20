'use client'

import React, { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import Header from '@/app/components/Header'
import { User, Mail, Calendar, Edit3, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!fullName.trim()) {
      setMessage('Full name is required')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const { error } = await updateProfile({ full_name: fullName })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Profile updated successfully!')
        setIsEditing(false)
      }
    } catch (err) {
      setMessage('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFullName(user?.user_metadata?.full_name || '')
    setIsEditing(false)
    setMessage('')
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header title="Profile" showAuthButtons={false} />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-8">
              {/* Profile Header */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user?.user_metadata?.full_name 
                    ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    : user?.email?.charAt(0).toUpperCase() || 'U'
                  }
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user?.user_metadata?.full_name || 'User Profile'}
                  </h1>
                  <p className="text-slate-400">{user?.email}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <h3 className="text-white font-semibold">Email</h3>
                    </div>
                    <p className="text-slate-300">{user?.email}</p>
                  </div>

                  {/* Member Since */}
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <h3 className="text-white font-semibold">Member Since</h3>
                    </div>
                    <p className="text-slate-300">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Full Name */}
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-purple-400" />
                      <h3 className="text-white font-semibold">Full Name</h3>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{loading ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-slate-300">
                      {user?.user_metadata?.full_name || 'Not set'}
                    </p>
                  )}
                </div>

                {/* Message */}
                {message && (
                  <div className={`p-4 rounded-xl ${
                    message.includes('successfully') 
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
