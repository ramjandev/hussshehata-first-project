import type { DayPayload } from "@/components/programManagement/programDetails/DayUpdateModal";
import type { ExercisePayload } from "@/components/programManagement/programDetails/ExerciseModal";
import type { ProgramPayloadForBasic } from "@/components/programManagement/programDetails/ProgramUpdateModalForBasic";
import { baseAPI } from "@/store/baseApi/baseApi";
import type { ActivityTrackingResponse } from "./types/activity";
import type { ProgrammesResponse } from "./types/allProgram";
import type {
  ProgramHighlightsResponse,
  WeeklyEnrollmentsResponse,
} from "./types/analytic";
import type { DeletedProgrammeResponse } from "./types/deletePrgraom";
import type { SingleExerciseResponse, WeekBody } from "./types/exercise";
import type { MethodPayload, TrainingMethodsResponse } from "./types/method";
import type {
  ProgramPayload,
  ProgramStatusParams,
  SingleProgramResponse,
} from "./types/newProgram";
import type { GetUsersParams, userManagementResponse } from "./types/review";

export const programAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    toggleProgram: build.mutation<void, string>({
      query: (id) => ({
        url: `/updated-programme/admin/toggle-programme-is-premium/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["programs"],
    }),
    createProgram: build.mutation<void, ProgramPayload>({
      query: (data) => ({
        url: `/updated-programme/create-new-programme`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["programs"],
    }),
    getallProgram: build.query<ProgrammesResponse, ProgramStatusParams>({
      query: (params) => ({
        url: `/updated-programme/get-all-programmes`,
        method: "GET",
        params,
      }),
      providesTags: ["programs"],
    }),
    singleProgram: build.query<SingleProgramResponse, string>({
      query: (id) => ({
        url: `/updated-programme/get-single-programme/${id}`,
        method: "GET",
      }),
      providesTags: ["programs"],
    }),

    publishProgram: build.mutation<any, string>({
      query: (id) => ({
        url: `updated-programme/publish-programme/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["programs"],
    }),
    getallDeletedProgram: build.query<DeletedProgrammeResponse, void>({
      query: () => ({
        url: `/updated-programme/get-deleted-programmes`,
        method: "GET",
      }),
      providesTags: ["programs"],
    }),
    getBackDeletedProgram: build.mutation<ProgrammesResponse, string>({
      query: (id) => ({
        url: `/updated-programme/undo-delete-program/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["programs"],
    }),
    // methods
    postMethod: build.mutation<any, MethodPayload>({
      query: (data) => ({
        url: `/add-traning-method`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["method"],
    }),
    getMethod: build.query<TrainingMethodsResponse, void>({
      query: () => ({
        url: `/add-traning-method`,
        method: "GET",
      }),
      providesTags: ["method"],
    }),
    deleteMethod: build.mutation<any, string>({
      query: (id) => ({
        url: `/add-traning-method/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["method"],
    }),
    updateMethod: build.mutation<
      any,
      { id: string; data: Partial<MethodPayload> }
    >({
      query: ({ data, id }) => ({
        url: `/add-traning-method/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["method"],
    }),
    getUserManagement: build.query<userManagementResponse, GetUsersParams>({
      query: (params) => ({
        url: `/content-management/user`,
        method: "GET",
        params,
      }),
    }),
    getUserActivity: build.query<ActivityTrackingResponse, void>({
      query: () => ({
        url: `/content-management/user/activity-tracking`,
        method: "GET",
      }),
    }),
    //program analytics
    getProgramAnalytics: build.query<ProgramHighlightsResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/program-highlights`,
        method: "GET",
      }),
    }),
    getProgramBreakdown: build.query<WeeklyEnrollmentsResponse, void>({
      query: () => ({
        url: `/admin-dashboard-analytics/weekly-enrollments`,
        method: "GET",
      }),
    }),
    updateProgramBasic: build.mutation<
      void,
      { programmeId: string; data: ProgramPayloadForBasic }
    >({
      query: (data) => ({
        url: `/updated-programme/update-programme/${data.programmeId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs"],
    }),
    deleteProgram: build.mutation<void, string>({
      query: (programmeId) => ({
        url: `/updated-programme/delete-programme/${programmeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["programs"],
    }),
    //exercises
    getExercise: build.query<SingleExerciseResponse, string>({
      query: (id) => ({
        url: `/new-exercise/${id}`,
        method: "GET",
      }),
      providesTags: ["exercises"],
    }),
    addImage: build.mutation<void, { id: string; data: FormData }>({
      query: (data) => ({
        url: `/new-exercise/set-image/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs", "exercises"],
    }),
    AddAnimation: build.mutation<void, { id: string; data: FormData }>({
      query: (data) => ({
        url: `/new-exercise/set-animation/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs", "exercises"],
    }),
    updateExercise: build.mutation<
      void,
      { exerciseId: string; data: ExercisePayload }
    >({
      query: (data) => ({
        url: `/new-exercise/update-exercise/${data.exerciseId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs", "exercises"],
    }),
    updateDay: build.mutation<void, { dayId: string; data: DayPayload }>({
      query: (data) => ({
        url: `/new-program-day/${data.dayId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs"],
    }),
    premiumToggle: build.mutation<
      void,
      {
        weekId: string;
        data: WeekBody;
      }
    >({
      query: (data) => ({
        url: `/new-program-week/${data.weekId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs"],
    }),
    AllPremiumToggle: build.mutation<
      void,
      {
        programmeId: string;
        data: {
          status: boolean;
        };
      }
    >({
      query: (data) => ({
        url: `/updated-programme/toggle-all-week-is-premium-field-using-program-id/${data.programmeId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["programs"],
    }),
  }),
});

export const {
  //program
  useCreateProgramMutation,
  useGetallProgramQuery,
  useSingleProgramQuery,
  //method
  usePostMethodMutation,
  useGetMethodQuery,
  useDeleteMethodMutation,
  useUpdateMethodMutation,
  // user management
  useGetUserManagementQuery,
  useGetUserActivityQuery,
  //program analytics
  useGetProgramAnalyticsQuery,
  //exercises
  useGetExerciseQuery,
  useAddImageMutation,
  useAddAnimationMutation,
  useUpdateExerciseMutation,
  useUpdateDayMutation,
  //program
  useUpdateProgramBasicMutation,
  useDeleteProgramMutation,
  usePublishProgramMutation,
  usePremiumToggleMutation,
  useAllPremiumToggleMutation,
  useGetBackDeletedProgramMutation,
  useGetallDeletedProgramQuery,
  useGetProgramBreakdownQuery,
  useToggleProgramMutation,
} = programAPI;
