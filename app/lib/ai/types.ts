export type PlanConfidence = 'low' | 'medium' | 'high';

export interface PlannedProduct {
  name: string;
  category?: string;
  keywords: string[];
  filters?: Record<string, string | number>;
  retailers?: string[];
  rationale?: string;
  confidence: PlanConfidence;
}

export interface ProductPlan {
  answerIntro: string;
  primaryProduct: PlannedProduct | null;
  recommendedProducts: PlannedProduct[];
  searchStrategy?: string;
}

export interface ChatPlanResponse {
  type: 'plan';
  plan: ProductPlan;
}

export interface ChatSearchResponse {
  type: 'results' | 'text' | 'error';
  plan?: ProductPlan;
  data?: unknown;
  message?: string;
}


