import { baseAPI } from "@/store/baseApi/baseApi";
import type {
  ClinicPlayLoad,
  PartnerClinicResponse,
  SupplementApiResponse,
  SupplementParams,
} from "./types/essential";
import type {
  HealthMarkerPayload,
  HealthMarkersParams,
  HealthMarkersResponse,
} from "./types/healthCare";
import type { ProgramLockStatus } from "./types/programLock";

export const essentialManagement = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPartner: build.query<PartnerClinicResponse, void>({
      query: () => ({
        url: "/partner-clinics",
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    postPartner: build.mutation<any, ClinicPlayLoad>({
      query: (data) => ({
        url: "/partner-clinics",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["partner"],
    }),
    updatePartner: build.mutation<any, { id: string; data: ClinicPlayLoad }>({
      query: ({ data, id }) => ({
        url: `/partner-clinics/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["partner"],
    }),
    deletePartner: build.mutation<any, string>({
      query: (id) => ({
        url: `/partner-clinics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["partner"],
    }),
    // supplement
    getSupplement: build.query<SupplementApiResponse, SupplementParams>({
      query: (params) => ({
        url: `/suppliment-product`,
        method: "GET",
        params,
      }),
      providesTags: ["supplement"],
    }),
    postSupplement: build.mutation<any, FormData>({
      query: (data) => ({
        url: `/suppliment-product/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["supplement"],
    }),
    updateSupplement: build.mutation<any, { id: string; data: FormData }>({
      query: ({ data, id }) => ({
        url: `/suppliment-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["supplement"],
    }),
    deleteSupplement: build.mutation<any, string>({
      query: (id) => ({
        url: `/suppliment-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplement"],
    }),

    //HealthMarkers
    postHealthMarker: build.mutation<any, HealthMarkerPayload>({
      query: (data) => ({
        url: `/health-markers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["health-marker"],
    }),
    updateHealthMarker: build.mutation<
      any,
      { id: string; data: HealthMarkerPayload }
    >({
      query: ({ id, data }) => ({
        url: `/health-markers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["health-marker"],
    }),
    deleteHealthMarker: build.mutation<any, string>({
      query: (id) => ({
        url: `/health-markers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["health-marker"],
    }),
    getHealthMarkers: build.query<HealthMarkersResponse, HealthMarkersParams>({
      query: (params) => ({
        url: `/health-markers`,
        method: "GET",
        params,
      }),
      providesTags: ["health-marker"],
    }),

    // program lock
    getProgramLock: build.query<ProgramLockStatus, string>({
      query: (id) => ({
        url: `/admin/programs/${id}/lock-status`,
        method: "GET",
      }),
      providesTags: ["program-lock"],
    }),
    allProgramLockToggle: build.mutation<
      any,
      { data: { lock: boolean }; id: string }
    >({
      query: ({ id, data }) => ({
        url: `/admin/programs/${id}/lock`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["program-lock", "program-card"],
    }),
    singleProgramLockToggle: build.mutation<
      any,
      { data: { lock: boolean }; id: string; week: number }
    >({
      query: ({ id, data, week }) => ({
        url: `/admin/programs/${id}/weeks/${week}/lock`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["program-lock", "program-card"],
    }),
  }),
});

export const {
  useGetPartnerQuery,
  usePostPartnerMutation,
  useDeletePartnerMutation,
  useUpdatePartnerMutation,

  // supplement
  useGetSupplementQuery,
  usePostSupplementMutation,
  useDeleteSupplementMutation,
  useUpdateSupplementMutation,
  // Health Markers
  useGetHealthMarkersQuery,
  usePostHealthMarkerMutation,
  useUpdateHealthMarkerMutation,
  useDeleteHealthMarkerMutation,

  // program lock
  useGetProgramLockQuery,
  useAllProgramLockToggleMutation,
  useSingleProgramLockToggleMutation,
} = essentialManagement;
