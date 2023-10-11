import './coach.scss'
import AddCoachForm from '../../components/coach/addCoachForm/AddCoachForm'
import CoachList from '../../components/coach/coachList/CoachList'

const Coach = () => {
   return (
      <div className="coach-list">
         <h1>Coach</h1>
         <p>
            Coach are people that can view your jobs and recruiters, for the
            perpose of helping you out.
         </p>
         <CoachList />
         <AddCoachForm />
      </div>
   )
}

export default Coach
