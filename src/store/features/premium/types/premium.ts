// Enums
export type Plan = "FREE" | "MONTHLY" | "ANNUAL";
export type BillingPeriod = "MONTHLY" | "ANNUAL";

// Subscription Plan
export interface SubscriptionPlanType {
  id: string;
  name: string;
  plan: Plan;
  billingPeriod: BillingPeriod | null;
  priceUSD: number;
  isPopular: boolean;
  savingsPercent: number | null;
  features: string[];
  stripePriceId: string | null;
  isActive: boolean;
  updatedAt: string;
  updatedBy: string;
  activeSubscribers: number;
  priceLabel: string;
  periodLabel: string;
  hasStripePrice: boolean;
}

export interface SubscriptionPlansApiResponse {
  success: boolean;
  data: SubscriptionPlanType[];
  timestamp: string;
  path: string;
  method: string;
}
