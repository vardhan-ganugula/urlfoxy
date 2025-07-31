import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

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
      }),
      getUserSessions: builder.query({
        query: () => ({
          url: '/user/sessions'
        }),
        providesTags: ['ProfileTag']
      }),
      terminateSession: builder.mutation({
        query: (sessionId) => ({
          url: `/user/sessions/${sessionId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['ProfileTag'],
        async onQueryStarted(sessionId, { queryFulfilled }) {
          const toastId = toast.loading('Terminating Session');
          try {
            await queryFulfilled;
            toast.success('Session terminated successfully');
          } catch (error) {
            console.log(error);
            toast.error('Failed to terminate session');
          }
          finally{
            toast.dismiss(toastId);
          }
        }
      })
    };
  },
});

export const { useGetUserProfileQuery, useLoginMutation, useSignUpMutation, useForgotPasswordMutation, useResetPasswordMutation, useVerifyUserMutation, useGetUserSessionsQuery, useTerminateSessionMutation } = apiSlice;
export default apiSlice;
