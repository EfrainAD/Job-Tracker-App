import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { formatDate } from '../utils/general.utils'

const baseUrl = process.env.API_URL || 'http://localhost:8000/api'

export const apiSlice = createApi({
   reducerPath: 'apiSlice',
   baseQuery: fetchBaseQuery({
      baseUrl,
      credentials: 'include',
   }),

   endpoints: (builder) => ({
      /* User Uath Endpoints */
      loginUser: builder.mutation({
         query: ({ email, password }) => ({
            url: '/users/signin',
            method: 'POST',
            body: { email, password },
         }),
         invalidatesTags: [''],
      }),
      logoutUser: builder.mutation({
         query: () => ({
            url: '/users/signout',
            method: 'DELETE',
         }),
         invalidatesTags: [''],
      }),
      isLoggedin: builder.query({
         query: () => ({
            url: '/users/isLoggedIn',
         }),
         // invalidatesTags: [''],
      }),
      getJobs: builder.query({
         query: () => ({
            url: '/jobs',
         }),
         validatesTags: ['Jobs'],
         transformResponse: (response, meta, arg) => {
            return response.map((item) => ({
               ...item,
               dateApplied: item.dateApplied
                  ? formatDate(item.dateApplied)
                  : null,
               rejectionDate: item.rejectionDate
                  ? formatDate(item.rejectionDate)
                  : null,
               hadInterview: !!(
                  item.firstInterviewDate ||
                  item.secondInterviewDate ||
                  item.technicalChallengeInterviewDate
               ),
            }))
         },
      }),
   }),
})

export const {
   useLoginUserMutation,
   useLogoutUserMutation,
   useIsLoggedinQuery,
   useGetJobsQuery,
} = apiSlice
