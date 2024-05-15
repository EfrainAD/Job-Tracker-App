import './recruiterForm.scss'
import { getTodaysDate } from '../../../utils/general.utils'
import RecruiterEmbeddedForm from './RecruiterEmbeddedForm'

const RecruiterEmbeddedFormInterface = ({
   name,
   onChange,
   companyName,
   recruiters,
   currentRecruiters,
}) => {
   const numberOfForms = recruiters.length

   recruiters.map((recruiter) => (recruiter.company = companyName))

   const handleNumberOfForm = (e) => {
      onChange({
         recruiter: {
            company: { companyName: companyName },
            outreachDate: getTodaysDate(),
         },
         index: recruiters.length,
      })
   }

   const removeForm = (index) => onChange({ removeRecruiterIdx: index })

   return (
      <div>
         <textarea
            disabled
            name={name}
            value={currentRecruiters.reduce(
               (acc, option) => acc + option.value + '\n',
               ''
            )}
            rows="4"
            cols="50"
         ></textarea>
         {Array.from({ length: numberOfForms }, (_, idx) => (
            <RecruiterEmbeddedForm
               key={idx}
               index={idx}
               recruiter={recruiters[idx]}
               onChange={onChange}
               removeRecruiterForm={removeForm}
               companyName={companyName}
            />
         ))}
         <div className="--center-all">
            <button
               type="button"
               className="--btn --btn-primary"
               onClick={handleNumberOfForm}
            >
               Add New Recruiter
            </button>
         </div>
      </div>
   )
}

export default RecruiterEmbeddedFormInterface
