'use client';

import { useState } from 'react';
import { Sparkles, Send, ShoppingCart, X } from 'lucide-react';
import { ProductPlan } from '@/app/lib/ai/types';

interface ChatBoxProps {
  onSendMessage?: (message: string) => void;
  plan?: ProductPlan | null;
  onSearchNext?: (keywords: string[]) => void;
}

export default function ChatBox({ onSendMessage, plan, onSearchNext }: ChatBoxProps) {
  const [message, setMessage] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Mock cart data - replace with actual cart state later
  const cartItems = [
    {
      id: 1,
      title: 'iPhone 16 Pro Max',
      price: '₹1,49,900',
      image: 'https://via.placeholder.com/80',
      quantity: 1
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
      <div className="relative">
        {/* Cart Card - Appears above chat */}
        {showCart && (
          <div className="absolute bottom-full mb-4 right-0 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 border-b border-slate-600/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-purple-400" />
                <h3 className="text-white font-semibold text-sm">Your Cart</h3>
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>
              </div>
              <button 
                onClick={() => setShowCart(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex space-x-3 bg-slate-700/30 rounded-xl p-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                        <p className="text-green-400 font-semibold text-sm mt-1">{item.price}</p>
                        <p className="text-slate-400 text-xs mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-slate-600/30 bg-slate-800/50">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-xl transition-all">
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main Input Container */}
        <div className="bg-gradient-to-r from-slate-800/95 via-slate-800/95 to-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
          
          {/* AI Recommendations Section */}
          {plan && plan.recommendedProducts && plan.recommendedProducts.length > 0 && (
            <div className="relative border-b border-slate-600/30 px-4 py-2.5 bg-slate-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-300 text-xs font-medium">You may also need</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {plan.recommendedProducts.slice(0, 5).map((prod, idx) => (
                  <button
                    key={`${prod.name}-${idx}`}
                    onClick={() => onSearchNext?.(prod.keywords)}
                    className="group inline-flex items-center space-x-1 px-2 py-1 bg-slate-600/50 hover:bg-slate-500/60 border border-slate-500/30 hover:border-purple-500/50 rounded-lg text-slate-200 text-[11px] font-medium transition-all"
                  >
                    <span>{prod.name}</span>
                    <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="relative px-4 py-3">
            <div className="flex items-center space-x-3">
              {/* AI Icon */}
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl animate-pulse opacity-50 blur-sm"></div>
              </div>
              
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask AI assistant..."
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2.5 pr-11 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-slate-700/70 transition-all"
                />
                
                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 rounded-lg flex items-center justify-center transition-all disabled:cursor-not-allowed group"
                >
                  <Send className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl flex items-center justify-center transition-all"
              >
                <ShoppingCart className="w-4 h-4 text-slate-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
