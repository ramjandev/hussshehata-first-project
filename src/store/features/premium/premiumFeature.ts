import type {
  CreatePlanPayload,
  UpdatePlanPayload,
} from "@/components/feature/planSchema";
import { baseAPI } from "@/store/baseApi/baseApi";
import type {
  DashboardCardsResponse,
  ProgramPerformanceResponse,
  RecentTransactionsResponse,
  RevenueSubscriptionsTrendResponse,
  SubscriptionOverviewResponse,
  SubscriptionPlansApiResponse,
  SubscriptionQueryParams,
  UserDistributionResponse,
  UserGrowthResponse,
} from "./types/premium";

export const PremiumAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPlans: build.query<SubscriptionPlansApiResponse, void>({
      query: () => ({
        url: `/admin/subscription-plans`,
        method: "GET",
      }),
      providesTags: ["plans"],
    }),
    createPlans: build.mutation<void, CreatePlanPayload>({
      query: (data) => ({
        url: `/admin/subscription-plans`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),
    updatePlans: build.mutation<void, { id: string; data: UpdatePlanPayload }>({
      query: ({ id, data }) => ({
        url: `/admin/subscription-plans/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),
    deletePlans: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/subscription-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plans"],
    }),
    getSubscriptionStart: build.query<SubscriptionOverviewResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/subscription-overview`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    recentTransactions: build.query<
      RecentTransactionsResponse,
      SubscriptionQueryParams
    >({
      query: (params) => ({
        url: `/admin-dashboard-analytics/recent-transactions`,
        method: "GET",
        params,
      }),
      providesTags: ["subscription"],
    }),
    getDashboardStart: build.query<DashboardCardsResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/dashboard-cards`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    userDistribution: build.query<UserDistributionResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/user-distribution`,
        method: "GET",
      }),
    }),
    programPerformance: build.query<ProgramPerformanceResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/program-performance`,
        method: "GET",
      }),
    }),
    userGrowth: build.query<UserGrowthResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/user-growth`,
        method: "GET",
      }),
    }),
    revenueGrowth: build.query<RevenueSubscriptionsTrendResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/revenue-subscriptions-trend`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlansMutation,
  useUpdatePlansMutation,
  useDeletePlansMutation,
  //payment
  useGetSubscriptionStartQuery,
  useRecentTransactionsQuery,

  //dashboard
  useGetDashboardStartQuery,
  useUserDistributionQuery,
  useProgramPerformanceQuery,
  useUserGrowthQuery,
  useRevenueGrowthQuery,
} = PremiumAPI;
