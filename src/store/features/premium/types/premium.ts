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

// payment start

export interface SubscriptionOverviewResponse {
  success: boolean;
  data: {
    totalRevenue: number;
    monthlyRevenue: number;
    activeSubscriptions: number;
    conversionRate: number;
  };
  timestamp: string;
  path: string;
  method: "GET";
}

// recent transactions

export interface RecentTransactionsResponse {
  success: boolean;
  data: {
    items: TransactionItem[];
    meta: TransactionsMeta;
  };
  timestamp: string;
  path: string;
  method: "GET";
}

export interface TransactionItem {
  transactionId: string;
  internalId: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  plan: "MONTHLY" | "ANNUAL";
  planName: string;
  status: "SUCCEEDED" | "FAILED" | "PENDING";
  description: string;
  date: string;
}

export interface TransactionsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string | null;
}

export interface SubscriptionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  plan?: Plan;
}
// dashboard start

export interface DashboardCardsData {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  activeEnrollments: number;
  acrossPrograms: number;
  totalCoachedClients: number;
}

export interface DashboardCardsResponse {
  success: boolean;
  data: DashboardCardsData;
  timestamp: string;
  path: string;
  method: string;
}

// user distribution

interface UserDistributionData {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  expiredUsers: number;
}

export interface UserDistributionResponse {
  success: boolean;
  data: UserDistributionData;
  timestamp: string;
  path: string;
  method: string;
}

// program performance
export interface ProgramPerformanceItem {
  programId: string;
  programName: string;
  enrolledUserCount: number;
  completionPercentage: number;
}

export interface ProgramPerformanceResponse {
  success: boolean;
  data: ProgramPerformanceItem[];
  timestamp: string;
  path: string;
  method: string;
}

// user growth

export interface UserGrowthItem {
  month: string;
  newUsers: number;
}

export interface UserGrowthData {
  months: number;
  items: UserGrowthItem[];
}

export interface UserGrowthResponse {
  success: boolean;
  data: UserGrowthData;
  timestamp: string;
  path: string;
  method: string;
}

// revenue growth

export interface RevenueSubscriptionItem {
  month: string;
  revenue: number;
  newSubscriptions: number;
}

export interface RevenueSubscriptionsTrendResponse {
  success: boolean;
  data: {
    months: number;
    items: RevenueSubscriptionItem[];
  };
  timestamp: string;
  path: string;
  method: string;
}
