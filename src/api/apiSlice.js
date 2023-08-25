import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
      getJobs: builder.query({
         query: () => ({
            url: '/jobs',
         }),
         validatesTags: ['Jobs'],
      }),
   }),
})

export const { useLoginUserMutation, useGetJobsQuery } = apiSlice
