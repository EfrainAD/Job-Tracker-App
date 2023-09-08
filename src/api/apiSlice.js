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
         invalidatesTags: ['Jobs'],
      }),
      logoutUser: builder.mutation({
         query: () => ({
            url: '/users/signout',
            method: 'DELETE',
         }),
      }),
      isLoggedin: builder.query({
         query: () => ({
            url: '/users/isLoggedIn',
         }),
      }),

      /* Job Endpoints */
      getJobs: builder.query({
         query: () => ({
            url: '/jobs',
         }),
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
         providesTags: (result = [], error, arg) => [
            'Jobs',
            ...result.map(({ id }) => ({ type: 'Jobs', id })),
         ],
      }),
      getJob: builder.query({
         query: (id) => ({
            url: `/jobs/${id}`,
         }),
         transformResponse: (res, meta, arg) => {
            return {
               ...res,
               dateApplied: res.dateApplied
                  ? formatDate(res.dateApplied)
                  : null,
               rejectionDate: res.rejectionDate
                  ? formatDate(res.rejectionDate)
                  : null,
               firstInterviewDate: res.firstInterviewDate
                  ? formatDate(res.firstInterviewDate)
                  : null,
               technicalChallengeInterviewDate:
                  res.technicalChallengeInterviewDate
                     ? formatDate(res.technicalChallengeInterviewDate)
                     : null,
               secondInterviewDate: res.secondInterviewDate
                  ? formatDate(res.secondInterviewDate)
                  : null,
            }
         },
         providesTags: (result, error, arg) => [{ type: 'Jobs', id: arg }],
      }),
      updateJob: builder.mutation({
         query: ({ id, body }) => ({
            url: `/jobs/${id}`,
            method: 'PATCH',
            body,
         }),
         providesTags: (result, error, arg) => [{ type: 'Jobs', idTags: arg }],
         invalidatesTags: (result, error, arg) => [
            { type: 'Jobs', id: arg.id },
         ],
      }),
      saveJob: builder.mutation({
         query: ({ body }) => ({
            url: `/jobs`,
            method: 'Post',
            body,
         }),
         invalidatesTags: ['Jobs'],
      }),
   }),
})

export const {
   useLoginUserMutation,
   useLogoutUserMutation,
   useIsLoggedinQuery,
   useGetJobsQuery,
   useGetJobQuery,
   useUpdateJobMutation,
   useSaveJobMutation,
   useRemoveJobMutation,
} = apiSlice
