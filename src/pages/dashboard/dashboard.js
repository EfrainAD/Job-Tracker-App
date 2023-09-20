import JobList from '../../components/job/jobList/JobList'
import JobSummery from '../../components/job/jobSummery/jobSummery'

import { useGetJobsQuery } from '../../api/apiSlice'
import { Link } from 'react-router-dom'

const Dashboard = () => {
   const {
      data: jobs,
      error: isJobError,
      isLoading: isJobLoading,
   } = useGetJobsQuery()

   return (
      <>
         <JobSummery jobs={jobs} />
         <Link to={'/dashboard/jobboard'}>Go To Job Board</Link>
         <JobList
            jobs={jobs}
            isJobError={isJobError}
            isloading={isJobLoading}
         />
      </>
   )
}

export default Dashboard
