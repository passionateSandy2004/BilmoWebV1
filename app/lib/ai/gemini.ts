import { GoogleGenAI, Type } from '@google/genai';
import { ProductPlan, PlannedProduct } from './types';

type GenerateContentArgs = {
  query: string;
  apiKey?: string;
};

// SDK client uses GEMINI_API_KEY from env automatically per quickstart
// https://ai.google.dev/gemini-api/docs/quickstart

// FINAL FALLBACK FOR LOCAL DEV/TESTING ONLY. REMOVE BEFORE DEPLOYMENT.
const DEFAULT_API_KEY = 'AIzaSyA01SsWCflyOFvuEtwdyPQ6UzNFC4t86EE';

// Function Declarations aligned with Gemini Function Calling
// https://ai.google.dev/gemini-api/docs/function-calling?example=meeting
const productPlanFunction = {
  name: 'product_plan',
  description:
    'Given a user query, propose a primary product to search and 3-5 related products. Return concise, executable keywords and optional filters/retailers. Include a brief intro for the user.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      answerIntro: { type: Type.STRING },
      primaryProduct: {
        type: Type.OBJECT,
        nullable: true as any,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          filters: { type: Type.OBJECT, additionalProperties: { type: Type.STRING } },
          retailers: { type: Type.ARRAY, items: { type: Type.STRING } },
          rationale: { type: Type.STRING },
          confidence: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
        },
        required: ['name', 'keywords', 'confidence'],
      } as any,
      recommendedProducts: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            filters: { type: Type.OBJECT, additionalProperties: { type: Type.STRING } },
            retailers: { type: Type.ARRAY, items: { type: Type.STRING } },
            rationale: { type: Type.STRING },
            confidence: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
          },
          required: ['name', 'keywords', 'confidence'],
        },
      },
      searchStrategy: { type: Type.STRING },
    },
    required: ['answerIntro', 'primaryProduct', 'recommendedProducts'],
  },
};

const systemInstruction =
  'You are a product search planner. Always call product_plan first and return: answerIntro (2-4 sentences), one primaryProduct, and up to 5 recommendedProducts. In answerIntro: clearly explain how the suggested items solve the user\'s purpose, what criteria you considered (budget, durability, key specs), and the immediate next action you\'ll take (which product you\'ll search first). Keep it crisp but informative, not marketing fluff. Keywords must be specific and executable. Include confidence. If the query is ambiguous, ask one clarifying question within answerIntro and set confidence=low.';

export async function getProductPlan({ query, apiKey }: GenerateContentArgs): Promise<ProductPlan> {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY || (process as any).env?.NEXT_PUBLIC_GEMINI_API_KEY || DEFAULT_API_KEY;
  const client = new GoogleGenAI(effectiveKey ? { apiKey: effectiveKey } : {});
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'user', parts: [{ text: query }] },
    ],
    config: {
      temperature: 0.2,
      tools: [{ functionDeclarations: [productPlanFunction] }],
    },
  });

  // Parse function call per docs. Prefer response.functionCalls
  const func = response.functionCalls && response.functionCalls[0];
  if (!func || func.name !== 'product_plan') {
    return {
      answerIntro: response.text || 'I will prepare a product plan based on your query.',
      primaryProduct: null,
      recommendedProducts: [],
      searchStrategy: undefined,
    };
  }

  const args = func.args as Record<string, unknown>;

  const toPlannedProduct = (x: any): PlannedProduct => ({
    name: String(x?.name || ''),
    category: x?.category ? String(x.category) : undefined,
    keywords: Array.isArray(x?.keywords) ? x.keywords.map((k: any) => String(k)) : [],
    filters: x?.filters || undefined,
    retailers: Array.isArray(x?.retailers) ? x.retailers.map((r: any) => String(r)) : undefined,
    rationale: x?.rationale ? String(x.rationale) : undefined,
    confidence: (x?.confidence as any) || 'medium',
  });

  return {
    answerIntro: String(args?.answerIntro || ''),
    primaryProduct: args?.primaryProduct ? toPlannedProduct(args.primaryProduct) : null,
    recommendedProducts: Array.isArray(args?.recommendedProducts)
      ? (args.recommendedProducts as any[]).map(toPlannedProduct)
      : [],
    searchStrategy: args?.searchStrategy ? String(args.searchStrategy) : undefined,
  };
}


