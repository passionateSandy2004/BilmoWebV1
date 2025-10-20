import { NextRequest, NextResponse } from 'next/server';
import { getProductPlan } from '@/app/lib/ai/gemini';
import { ProductPlan } from '@/app/lib/ai/types';
import { searchProducts } from '@/app/lib/searchApi';

export async function POST(req: NextRequest) {
  try {
    const { message, apiKey } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ type: 'error', message: 'Invalid message' }, { status: 400 });
    }

    // 1) Plan with Gemini
    const plan: ProductPlan = await getProductPlan({ query: message, apiKey });

    // 2) Immediate search for the primary product if available
    let primaryResults: unknown = null;
    const primary = plan.primaryProduct;
    if (primary && primary.keywords.length > 0) {
      const keywordQuery = primary.keywords.join(' ');
      primaryResults = await searchProducts(keywordQuery);
    } else {
      // Fallback: run combined search on the original user message
      primaryResults = await searchProducts(message);
    }

    return NextResponse.json({
      type: 'results',
      plan,
      data: primaryResults,
    });
  } catch (e: any) {
    return NextResponse.json({ type: 'error', message: e?.message || 'Unknown error' }, { status: 500 });
  }
}


