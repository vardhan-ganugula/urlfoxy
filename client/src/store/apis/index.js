import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'
  }),
  endpoints: function (builder) {
    return {
      getUserProfile: builder.query({
        query: function () {
          return { url: "/user/profile" };
        },
      }),
    };
  },
});

export const { useGetUserProfileQuery } = apiSlice;
export default apiSlice;
