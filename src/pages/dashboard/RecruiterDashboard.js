import RecruiterList from '../../components/recruiter/recruiterList/RecruiterList'
import RecruiterSummery from '../../components/recruiter/recruiterSummery/recruiterSummery'

import { useGetRecruitersQuery } from '../../api/apiSlice'

const RecruiterDashboard = () => {
   const {
      data: recruiters,
      error: isRecruiterError,
      isLoading: isRecruiterLoading,
   } = useGetRecruitersQuery()

   return (
      <>
         <RecruiterSummery recruiters={recruiters} />
         <RecruiterList
            recruiters={recruiters}
            isRecruiterError={isRecruiterError}
            isloading={isRecruiterLoading}
         />
      </>
   )
}

export default RecruiterDashboard
