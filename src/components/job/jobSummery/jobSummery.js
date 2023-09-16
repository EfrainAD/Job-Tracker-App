import './jobSummary.scss'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import MessageBox from '../../messageBox/MessageBox'
import { countJobsAppliedThisWeek } from '../utils/job.utils'

const categoryIcon = <BiCategory size="40" color="#fff" />

const JobSummery = ({ jobs }) => {
   if (!jobs || jobs.length < 1)
      return <MessageBox message="No Data to Display" />

   const jobsThisWeek = countJobsAppliedThisWeek(jobs)

   return (
      <div className="job-summary">
         <h3 className="--mt">Job Hunt Stats</h3>
         <div className="info-summary">
            <InfoBox
               icon={categoryIcon}
               title="Total Jobs Applied"
               count={jobs?.length}
               bgColor="card1"
               //  bgColor="card2"
               //  bgColor="card3"
               //  bgColor="card4"
            />
            <InfoBox
               icon={categoryIcon}
               title="Applied This Week"
               count={jobsThisWeek}
               bgColor="card2"
            />
         </div>
      </div>
   )
}

export default JobSummery
