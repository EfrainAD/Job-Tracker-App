import './recruiterSummary.scss'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import MessageBox from '../../messageBox/MessageBox'

const categoryIcon = <BiCategory size="40" color="#fff" />

const RecruiterSummery = ({ recruiters }) => {
   if (!recruiters || recruiters.length < 1)
      return <MessageBox message="No Data to Display" />

   return (
      <div className="recruiter-summary">
         <h3 className="--mt">Recruiter Hunt Stats</h3>
         <div className="info-summary">
            <InfoBox
               icon={categoryIcon}
               title="Total Outreach"
               count={recruiters?.length}
               bgColor="card1"
               //  bgColor="card2"
               //  bgColor="card3"
               //  bgColor="card4"
            />
         </div>
      </div>
   )
}

export default RecruiterSummery
