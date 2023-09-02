import JobList from '../../components/job/jobList/JobList'
import JobSummery from '../../components/job/jobSummery/jobSummery'

import { useGetJobsQuery } from '../../api/apiSlice'
import { useDispatch } from 'react-redux'
import { setUserStatus } from '../../redux/user/user.action'
import { toast } from 'react-toastify'

const Dashboard = () => {
   const dispatch = useDispatch()
   const {
      data: jobs,
      error: isJobError,
      isLoading: isJobLoading,
   } = useGetJobsQuery()

   if (isJobError?.status === 401) {
      dispatch(setUserStatus(false))
      toast.error("You're not logged in.")
   }

   return (
      <>
         <JobSummery jobs={jobs} />
         <JobList
            jobs={jobs}
            isJobError={isJobError}
            isloading={isJobLoading}
         />
      </>
   )
}

export default Dashboard
