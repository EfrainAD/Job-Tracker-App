import JobList from '../../components/job/jobList/JobList'
import JobSummery from '../../components/job/jobSummery/jobSummery'

import { useGetJobsQuery } from '../../api/apiSlice'

const Dashboard = () => {
   const {
      data: jobs,
      error: isJobError,
      isLoading: isJobLoading,
   } = useGetJobsQuery()

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
