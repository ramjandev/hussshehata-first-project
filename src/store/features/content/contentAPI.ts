import { baseAPI } from "@/store/baseApi/baseApi";
import type {
  BfrListApiResponse,
  BfrParams,
  BfrSession,
  CreateBfrSessionPayload,
} from "./types/bfr";
import type {
  ExecutionNoteApiResponse,
  GetExecutionNoteResponseSingle,
  WorkoutDurationRule,
} from "./types/note";
import type {
  GetResearchEducationResponse,
  ResearchEducationApiResponse,
  ResearchEducationPayload,
} from "./types/research";
import type {
  EssentialContentBody,
  EssentialSingleContent,
  SafetyResponse,
} from "./types/saftey";

export const contentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBFR: build.query<BfrListApiResponse, BfrParams>({
      query: (params) => ({
        url: `/brf/list`,
        method: "get",
        params,
      }),
      providesTags: ["BFR"],
    }),
    getBFRDetails: build.query<BfrSession, string>({
      query: (brfId) => ({
        url: `/brf/${brfId}/find`,
        method: "get",
      }),
      providesTags: ["BFR"],
    }),
    postBFR: build.mutation<void, CreateBfrSessionPayload>({
      query: (data) => ({
        url: `/brf/publish`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BFR"],
    }),
    updateBFR: build.mutation<
      void,
      { bfrId: string; data: CreateBfrSessionPayload }
    >({
      query: ({ data, bfrId }) => ({
        url: `brf/${bfrId}/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BFR"],
    }),
    deleteBFR: build.mutation<void, string>({
      query: (bfrId) => ({
        url: `brf/${bfrId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["BFR"],
    }),
    // execution note
    getExecutionNote: build.query<ExecutionNoteApiResponse, void>({
      query: () => ({
        url: `/execution-note`,
        method: "GET",
      }),
      providesTags: ["EXECUTION_NOTE"],
    }),
    getSingleExecutionNote: build.query<GetExecutionNoteResponseSingle, string>(
      {
        query: (id) => ({
          url: `/execution-note/${id}`,
          method: "GET",
        }),
        providesTags: ["EXECUTION_NOTE"],
      },
    ),

    postExecutionNote: build.mutation<void, WorkoutDurationRule>({
      query: (data) => ({
        url: `/execution-note`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EXECUTION_NOTE"],
    }),
    deleteExecutionNote: build.mutation<void, string>({
      query: (id) => ({
        url: `/execution-note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EXECUTION_NOTE"],
    }),
    updateExecutionNote: build.mutation<
      void,
      { data: WorkoutDurationRule; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/execution-note/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EXECUTION_NOTE"],
    }),
    //research-education
    getResearch: build.query<ResearchEducationApiResponse, void>({
      query: () => ({
        url: `/research-education`,
        method: "GET",
      }),
      providesTags: ["RESEARCH"],
    }),
    getSingleResearch: build.query<GetResearchEducationResponse, string>({
      query: (id) => ({
        url: `/research-education/${id}`,
        method: "GET",
      }),
      providesTags: ["RESEARCH"],
    }),
    postResearch: build.mutation<void, ResearchEducationPayload>({
      query: (data) => ({
        url: `/research-education`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RESEARCH"],
    }),
    updateResearch: build.mutation<
      void,
      { id: string; data: ResearchEducationPayload }
    >({
      query: ({ data, id }) => ({
        url: `/research-education/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["RESEARCH"],
    }),
    deleteResearch: build.mutation<void, string>({
      query: (id) => ({
        url: `/research-education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RESEARCH"],
    }),
    //safety disclaimer
    getSafetyDisclaimer: build.query<SafetyResponse, { search?: string }>({
      query: (params) => ({
        url: `/essential-content`,
        method: "GET",
        params,
      }),
      providesTags: ["SAFETY_DISCLAIMER"],
    }),
    getSingleSafetyDisclaimer: build.query<EssentialSingleContent, string>({
      query: (id) => ({
        url: `/essential-content/${id}`,
        method: "GET",
      }),
      providesTags: ["SAFETY_DISCLAIMER"],
    }),
    postSafety: build.mutation<void, EssentialContentBody>({
      query: (data) => ({
        url: `/essential-content`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SAFETY_DISCLAIMER"],
    }),
    updateSafety: build.mutation<
      void,
      { data: EssentialContentBody; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/essential-content/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SAFETY_DISCLAIMER"],
    }),
    deleteSafety: build.mutation<void, string>({
      query: (id) => ({
        url: `/essential-content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SAFETY_DISCLAIMER"],
    }),
  }),
});

export const {
  useUpdateBFRMutation,
  useDeleteBFRMutation,
  useGetBFRDetailsQuery,
  useGetBFRQuery,
  usePostBFRMutation,

  // execution note
  useGetExecutionNoteQuery,
  useGetSingleExecutionNoteQuery,
  usePostExecutionNoteMutation,
  useDeleteExecutionNoteMutation,
  useUpdateExecutionNoteMutation,

  // research-education
  useGetResearchQuery,
  useGetSingleResearchQuery,
  usePostResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
  // safety disclaimer
  useGetSafetyDisclaimerQuery,
  useGetSingleSafetyDisclaimerQuery,
  usePostSafetyMutation,
  useUpdateSafetyMutation,
  useDeleteSafetyMutation,
} = contentAPI;
