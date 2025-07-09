import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'
  }),
  tagTypes: ['ProfileTag', 'LoginTag', 'SignupTag'],
  endpoints: function (builder) {
    return {
      getUserProfile: builder.query({
        query: function () {
          return { url: "/user/profile" };
        },
        providesTags: ['ProfileTag']
      }),
      login : builder.mutation({
        query: (userData) => {
          return {
            url: '/auth/login',
            method: 'POST',
            body: userData
          }
        },
        providesTags: ['LoginTag'],
        invalidatesTags: ['ProfileTag']
      }),
      signUp : builder.mutation({
        query: (userData)=> ({
          url: '/auth/register',
          method:'POST',
          body: userData
        }),
        providesTags: ['SignupTag'],
      }),
      forgotPassword: builder.mutation({
        query: (data) => ({
          url:'/auth/forgot-password',
          method: 'POST',
          body: data
        })
      }),
      resetPassword: builder.mutation({
        query: (data)=>({
          url: '/auth/reset-password',
          method: 'POST',
          body: data
        })
      }),
      verifyUser: builder.mutation({
        query: (data) => ({
          url: '/auth/verify-user',
          method: 'PUT',
          body: data
        })
      })
    };
  },
});

export const { useGetUserProfileQuery, useLoginMutation, useSignUpMutation, useForgotPasswordMutation, useResetPasswordMutation, useVerifyUserMutation } = apiSlice;
export default apiSlice;
