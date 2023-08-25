import './jobSummary.scss'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'

const categoryIcon = <BiCategory size="40" color="#fff" />

const JobSummery = ({ jobs }) => {
   console.log('hihi', jobs)
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
         </div>
      </div>
   )
}

export default JobSummery
