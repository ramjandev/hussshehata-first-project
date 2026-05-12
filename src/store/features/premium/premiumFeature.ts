import type { CreatePlanPayload } from "@/components/feature/planSchema";
import { baseAPI } from "@/store/baseApi/baseApi";
import type { SubscriptionPlansApiResponse } from "./types/premium";

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
    updatePlans: build.mutation<void, { id: string; data: CreatePlanPayload }>({
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
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlansMutation,
  useUpdatePlansMutation,
  useDeletePlansMutation,
} = PremiumAPI;
