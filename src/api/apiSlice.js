import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { formatDate } from '../utils/general.utils'
import { setLogin, setLogout } from '../redux/user/user.action'
import { toast } from 'react-toastify'

const baseUrl = process.env.API_URL || 'http://localhost:8000/api'

export const apiSlice = createApi({
   reducerPath: 'apiSlice',
   baseQuery: fetchBaseQuery({
      baseUrl,
      credentials: 'include',
   }),

   endpoints: (builder) => ({
      /* User Endpoints */
      loginUser: builder.mutation({
         query: ({ email, password }) => ({
            url: '/users/signin',
            method: 'POST',
            body: { email, password },
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               const { data: user } = await queryFulfilled

               dispatch(setLogin(user))
            } catch (err) {
               dispatch(setLogout())

               toast.error(err.error.data.message)
               console.log('error message', err.error.data.message)
            }
         },
         invalidatesTags: ['Jobs'],
      }),
      logoutUser: builder.mutation({
         query: () => ({
            url: '/users/signout',
            method: 'DELETE',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               dispatch(setLogout())
            } catch (err) {
               toast.error(err.error.data.message)
               console.log('error message', err.error.data.message)
            }
         },
      }),
      isLoggedin: builder.query({
         query: () => ({
            url: '/users/isLoggedIn',
         }),
      }),
      getUser: builder.query({
         query: () => ({
            url: '/users/getuser',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               const message = `Error when getting the user data. Returned error message: ${err.error.data.message}`

               toast.error(message)
               console.log(message)
            }
         },
         providesTags: (result, error, arg) => [{ type: 'userData', id: arg }],
         // staleTime: null,
      }),
      updateUser: builder.mutation({
         query: (body) => ({
            url: '/users/updateuser',
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(id, { queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Update Successful')
            } catch (err) {
               toast.error('Error while Updating your profile')
               console.log(`Error Message: ${err.error.data.message}`)
            }
         },
         invalidatesTags: ['userData'],
      }),
      createUser: builder.mutation({
         query: (body) => ({
            url: '/users/register',
            method: 'POST',
            body,
         }),
         async onQueryStarted(id, { queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('New account made successfully')
            } catch (err) {
               toast.error(
                  `Sorry, there was an error while creating your account. It's possible that you already have an account.`
               )
               console.log(err.error.data.message)
            }
         },
         invalidatesTags: ['userData'],
      }),
      updatePassword: builder.mutation({
         query: (body) => ({
            url: '/users/changepassword',
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(id, { queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Changed Password successful')
            } catch (err) {
               toast.error(err.error.data.message)
               console.log('Error:', err.error.data.err.message)
            }
         },
      }),

      /* Cloudinary Endpoints */
      getCloudinarySignature: builder.mutation({
         query: () => ({
            url: '/users/imagecredentials',
            method: 'GET',
         }),
      }),
      uploadToCloudinary: builder.mutation({
         query: (body) => ({
            url: 'https://api.cloudinary.com/v1_1/dnzmydq91/image/upload',
            method: 'POST',
            body,
            credentials: 'omit',
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
      removeJob: builder.mutation({
         query: (id) => ({
            url: `/jobs/${id}`,
            method: 'Delete',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Delete Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())
               }

               toast.error(err.error.data.message)
               console.log('error message', err.error.data.message)
            }
         },
         invalidatesTags: ['Jobs'],
      }),
   }),
})

export const {
   /* Users */
   useLoginUserMutation,
   useLogoutUserMutation,
   useIsLoggedinQuery,
   useGetUserQuery,
   useUpdateUserMutation,
   useCreateUserMutation,
   useUpdatePasswordMutation,
   /* Image Storage */
   useGetCloudinarySignatureMutation,
   useUploadToCloudinaryMutation,
   /* Job */
   useGetJobsQuery,
   useGetJobQuery,
   useUpdateJobMutation,
   useSaveJobMutation,
   useRemoveJobMutation,
} = apiSlice
