'use client'

import React from 'react'
import { X } from 'lucide-react'

export default function ModalDebug() {
  const closeAllModals = () => {
    // Close any open modals
    const modals = document.querySelectorAll('[data-modal]')
    modals.forEach(modal => {
      const closeBtn = modal.querySelector('[data-close]')
      if (closeBtn) {
        (closeBtn as HTMLButtonElement).click()
      }
    })
    
    // Reset body overflow
    document.body.style.overflow = 'unset'
    
    // Remove any backdrop
    const backdrops = document.querySelectorAll('[data-backdrop]')
    backdrops.forEach(backdrop => backdrop.remove())
  }

  return (
    <div className="fixed bottom-4 left-4 z-[10000]">
      <button
        onClick={closeAllModals}
        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center space-x-2"
        title="Close all modals"
      >
        <X className="w-4 h-4" />
        <span className="text-sm font-medium">Close Modals</span>
      </button>
    </div>
  )
}
