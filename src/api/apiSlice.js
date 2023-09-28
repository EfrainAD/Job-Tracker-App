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
   tagTypes: ['userData', 'Jobs', 'Couches', 'JobBoards', 'Company'],

   endpoints: (builder) => ({
      /* User Endpoints */
      loginUser: builder.mutation({
         query: (body) => ({
            url: '/users/signin',
            method: 'POST',
            body,
         }),
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
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
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               dispatch(setLogout())
            } catch (err) {
               dispatch(setLogout())

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
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the user data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
            }
         },
         providesTags: (result, error, arg) => [{ type: 'userData', id: arg }],
      }),
      updateUser: builder.mutation({
         query: (body) => ({
            url: '/users/updateuser',
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Update Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error('Error while Updating your profile')
                  console.log(`Error Message: ${err.error.data.message}`)
               }
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
         async onQueryStarted(body, { queryFulfilled }) {
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
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Changed Password successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('Error:', err.error.data.err.message)
               }
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
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the user data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
            }
         },
         providesTags: (result = [], error, arg) => [
            'Jobs',
            ...result.map(({ _id }) => ({ type: 'Jobs', id: _id })),
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
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the the job's data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
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
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled

               toast.success('Update Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const msg = `${err.error.data.status}: ${err.error.data.message}`

                  toast.error(msg)
                  console.log(msg)
               }
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: 'Jobs', id: arg.id },
         ],
      }),
      createJob: builder.mutation({
         query: (body) => ({
            url: `/jobs`,
            method: 'Post',
            body,
         }),
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled

               toast.success('Job was added successfully')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(
                     `Sorry, there was an error while creating your Job.`
                  )
                  console.log(err.error.data.message)
               }
            }
         },
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

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['Jobs'],
      }),

      /* Job Boards Endpoints */
      getJobBoards: builder.query({
         query: () => ({
            url: '/jobboards',
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the job boards data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
            }
         },
         providesTags: (result = [], error, arg) => [
            'JobBoards',
            ...result.map(({ _id }) => ({ type: 'JobBoards', id: _id })),
         ],
      }),
      updateJobBoard: builder.mutation({
         query: ({ id, body }) => ({
            url: `/jobboards/${id}`,
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled

               toast.success('Update Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const msg = `${err.error.data.status}: ${err.error.data.message}`

                  toast.error(msg)
                  console.log(msg)
               }
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: 'JobBoards', id: arg.id },
         ],
      }),
      createJobBoard: builder.mutation({
         query: (body) => ({
            url: `/jobBoards`,
            method: 'Post',
            body,
         }),
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled

               toast.success('Job Board was added successfully')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(`Error, ${err.error.data.message}.`)
                  console.log(
                     `${err.error.data.status}: ${err.error.data.message}`
                  )
               }
            }
         },
         invalidatesTags: ['JobBoards'],
      }),
      removeJobBoard: builder.mutation({
         query: (id) => ({
            url: `/jobboards/${id}`,
            method: 'Delete',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Delete Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['JobBoards'],
      }),

      /* Recruiter Endpoints */
      getRecruiters: builder.query({
         query: () => ({
            url: '/recruiters',
         }),
         transformResponse: (response, meta, arg) => {
            return response.map((item) => ({
               ...item,
               outreachDate: item.outreachDate
                  ? formatDate(item.outreachDate)
                  : null,
               conversationDate: item.conversationDate
                  ? formatDate(item.conversationDate)
                  : null,
            }))
         },
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the user data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
            }
         },
         providesTags: (result = [], error, arg) => [
            'Recruiters',
            ...result.map(({ _id }) => ({ type: 'Recruiters', id: _id })),
         ],
      }),
      getRecruiter: builder.query({
         query: (id) => ({
            url: `/recruiters/${id}`,
         }),
         transformResponse: (res, meta, arg) => {
            return {
               ...res,
               outreachDate: res.outreachDate
                  ? formatDate(res.outreachDate)
                  : null,
               conversationDate: res.conversationDate
                  ? formatDate(res.conversationDate)
                  : null,
            }
         },
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const message = `Error when getting the the recruiter's data. Returned error message: ${err.error.data.message}`

                  toast.error(message)
                  console.log(message)
               }
            }
         },
         providesTags: (result, error, arg) => [
            { type: 'Recruiters', id: arg },
         ],
      }),
      updateRecruiter: builder.mutation({
         query: ({ id, body }) => ({
            url: `/recruiters/${id}`,
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled

               toast.success('Update Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const msg = `${err.error.data.status}: ${err.error.data.message}`

                  toast.error(msg)
                  console.log(msg)
               }
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: 'Recruiters', id: arg.id },
         ],
      }),
      saveRecruiter: builder.mutation({
         query: (body) => ({
            url: `/recruiters`,
            method: 'Post',
            body,
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Added Successfully')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['recruiters'],
      }),
      removeRecruiter: builder.mutation({
         query: (id) => ({
            url: `/recruiters/${id}`,
            method: 'Delete',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Delete Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['Recruiters'],
      }),

      /* Couch Endpoints */
      getCouches: builder.query({
         query: () => ({
            url: '/couch/getUserCouches',
         }),
         transformResponse: (res, meta, arg) => {
            return res.map((couch, idx) => ({
               _id: couch._id,
               name: couch.couch.name,
               email: couch.couch.email,
            }))
         },
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(
                     `Error when getting the list of couches. Returned error message: ${err.error.data.message}`
                  )
                  console.log(`${err.error.status}: ${err.error.data.message}`)
               }
            }
         },
         providesTags: (result = [], error, arg) => [
            'Couches',
            ...result.map(({ _id }) => ({ type: 'Couches', id: _id })),
         ],
      }),
      addCouch: builder.mutation({
         query: (body) => ({
            url: `/couch/addusercouch`,
            method: 'Post',
            body,
         }),
         async onQueryStarted(body, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Added Successfully')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message:', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['Couches'],
      }),
      removeCouch: builder.mutation({
         query: (id) => ({
            url: `/couch/${id}`,
            method: 'Delete',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
               toast.success('Delete Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(err.error.data.message)
                  console.log('error message', err.error.data.message)
               }
            }
         },
         invalidatesTags: ['Couches'],
      }),

      /* Company */
      getComanyNames: builder.query({
         query: () => ({
            url: '/companies/names',
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  toast.error(
                     `Error when getting the list of companies. Returned error message: ${err.error.data.message} you are not able to add company if it already exist`
                  )
                  console.log(`${err.error.status}: ${err.error.data.message}`)
               }
            }
         },
         providesTags: (result = [], error, arg) => [
            'Company',
            ...result.map(({ _id }) => ({ type: 'Company', id: _id })),
         ],
      }),
      updateCompany: builder.mutation({
         query: ({ id, body }) => ({
            url: `/companies/${id}`,
            method: 'PATCH',
            body,
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               console.log({ arg })
               await queryFulfilled

               toast.success('Update Successful')
            } catch (err) {
               if (err.error.status === 401) {
                  dispatch(setLogout())

                  toast.error("You're not logged in.")
               } else {
                  const msg = `${err.error.data.status}: ${err.error.data.message}`

                  toast.error(msg)
                  console.log(msg)
               }
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: 'Jobs', id: arg.jobId },
         ],
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
   useCreateJobMutation,
   useRemoveJobMutation,
   /* Job Board */
   useGetJobBoardsQuery,
   useUpdateJobBoardMutation,
   useCreateJobBoardMutation,
   useRemoveJobBoardMutation,
   /* Recruiters */
   useGetRecruitersQuery,
   useGetRecruiterQuery,
   useUpdateRecruiterMutation,
   useSaveRecruiterMutation,
   useRemoveRecruiterMutation,
   /* Couch */
   useAddCouchMutation,
   useGetCouchesQuery,
   useRemoveCouchMutation,
   /* Company */
   useGetComanyNamesQuery,
   useUpdateCompanyMutation,
} = apiSlice
