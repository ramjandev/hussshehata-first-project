import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import type { RootState } from "../store";
import { logout, setAccessToken, setRefreshToken } from "./auth/auth.slice";

interface BaseQueryExtraOptions {
  silent?: boolean;
  [key: string]: any;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions: BaseQueryExtraOptions = {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = (async () => {
          try {
            const refreshResult: any = await baseQuery(
              {
                url: "/auth/refresh",
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions,
            );

            if (refreshResult?.data?.data?.accessToken) {
              api.dispatch(setAccessToken(refreshResult.data.data.accessToken));
              api.dispatch(
                setRefreshToken(refreshResult.data.data.refreshToken),
              );
              return true;
            } else {
              api.dispatch(logout());
              toast.error("Session expired. Please login again.");
              return false;
            }
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }

      const refreshed = await refreshPromise;

      if (refreshed) {
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      api.dispatch(logout());
      toast.error("Session expired. Please login again.");
    }
  }

  const refreshed = await refreshPromise;

  if (refreshed) {
    result = await baseQuery(args, api, extraOptions);
  }

  // Show toast messages for non-GET requests
  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions.silent) {
        if (method === "DELETE") toast.warning(message);
        else toast.success(message);
      }
    }

    if (result?.error && result.error.status !== 401) {
      const message =
        (result.error.data as { message?: string })?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "users",
    "programs",
    "BFR",
    "EXECUTION_NOTE",
    "RESEARCH",
    "SAFETY_DISCLAIMER",
    "Review",
    "partner",
    "supplement",
    "method",
    "health-marker",
    "program-lock",
    "program-card",
    "plans",
    "subscription",
    "dashboard",
    "exercises",
  ],
  endpoints: () => ({}),
});
