'use client';

import { useState } from 'react';
import RecommendationBanner from '@/app/components/RecommendationBanner';
import { ProductPlan } from '@/app/lib/ai/types';

export default function ChatPlannerTestPage() {
  const [input, setInput] = useState('13 inch laptop under $900 from BestBuy');
  const [plan, setPlan] = useState<ProductPlan | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const run = async () => {
    setLoading(true);
    setError(null);
    setPlan(null);
    setResults([]);
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, apiKey: apiKey || undefined })
      });
      const json = await resp.json();
      if (!resp.ok) {
        throw new Error(json?.message || 'Request failed');
      }
      setPlan(json.plan || null);
      setResults(json.data || []);
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Chat Planner Test</h1>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
            placeholder="Type a query"
          />
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-[420px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
            placeholder="Optional: paste GEMINI_API_KEY for testing"
          />
          <button
            onClick={run}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Running…' : 'Run'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300">{error}</div>
        )}

        {plan && (
          <RecommendationBanner
            plan={plan}
            onSearchNext={(keywords) => setInput(keywords.join(' '))}
          />
        )}

        {plan && (
          <pre className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs overflow-auto">
{JSON.stringify(plan, null, 2)}
          </pre>
        )}

        {results && results.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Primary Search Results</h2>
            <pre className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs overflow-auto">
{JSON.stringify(results.slice(0, 10), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}


