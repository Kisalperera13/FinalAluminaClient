import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Search",
  ],
  endpoints: (build) => ({
    getSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/search",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const {
  useGetSearchQuery,
} = api;
