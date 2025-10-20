'use client';

import { PlannedProduct, ProductPlan } from '@/app/lib/ai/types';
import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface RecommendationBannerProps {
  plan: ProductPlan;
  onSearchNext?: (keywords: string[]) => void;
}

export default function RecommendationBanner({ plan, onSearchNext }: RecommendationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!plan || dismissed) return null;
  
  const items: PlannedProduct[] = plan.recommendedProducts;

  if (items.length === 0) return null;

  return (
    <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/40 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
      
      <div className="relative p-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-slate-300 text-xs font-medium">AI Suggestions</span>
          </div>
          
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {items.slice(0, 5).map((prod, idx) => (
            <button
              key={`${prod.name}-${idx}`}
              onClick={() => onSearchNext?.(prod.keywords)}
              className="group inline-flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/30 hover:border-blue-500/40 rounded-lg text-slate-200 text-xs font-medium transition-all hover:scale-105"
            >
              <span>{prod.name}</span>
              <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


