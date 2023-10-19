import './jobForm.scss'
import Card from '../../card/card'
import InputForm from '../../form/inputForm/InputForm'
import { getUrlHost } from '../../../utils/general.utils'
import { isCompanyField } from '../../../utils/form.utils'

const JobForm = ({
   title,
   job,
   companies,
   setJob,
   onSubmit,
   submitLabelBtn,
   secondSubmit,
   secondSubmitLabelBtn,
}) => {
   const handleSubmit = (e) => onSubmit(e)
   const handleOnChange = (e) => {
      const { name, type, checked } = e.target
      const value = type === 'checkbox' ? checked : e.target.value

      if (name === 'jobBoardURL') {
         const host = getUrlHost(value)
         setJob({ ...job, [name]: value, jobSource: host })
      } else if (isCompanyField(name)) {
         setJob({ ...job, company: { ...job.company, [name]: value } })
      } else {
         setJob({ ...job, [name]: value })
      }
   }

   const companyOptons = !companies
      ? []
      : companies.map((company) => ({
           value: company.companyName,
        }))
   const formLabels = [
      { label: 'Job Title', name: 'jobTitle', type: 'text' },
      {
         label: 'Company Name',
         name: 'companyName',
         type: 'datalist',
         options: companyOptons,
      },
      { label: 'Date Applied', name: 'dateApplied', type: 'date' },
      { label: 'Job Board URL', name: 'jobBoardURL', type: 'url' },
      { label: 'Comany Job URL', name: 'applicationURL', type: 'url' },
      { label: 'Job Source', name: 'jobSource', type: 'text' },
      { label: 'Easy Apply', name: 'easyApply', type: 'checkbox' },
      { label: 'Notes', name: 'notes', type: 'textarea' },
      { label: 'Pears Outreach', name: 'peersOutreach', type: 'checkbox' },
      {
         label: 'Remote',
         name: 'remote',
         type: 'select',
         options: [
            { value: 'remote', text: 'Remote' },
            { value: 'on-site', text: 'On-site' },
            { value: 'hybrid', text: 'Hybrid' },
         ],
      },
      { label: 'Job Location', name: 'jobLocation', type: 'text' },
      { label: 'Recruiter', name: 'recruiter', type: 'text' },
      {
         label: 'Required Experience',
         name: 'requiredExperience',
         type: 'number',
      },
      { label: 'Jobalytics Rating', name: 'jobalyticsRating', type: 'number' },
      { label: 'Company Size', name: 'companySize', type: 'text' },
      { label: 'Resume', name: 'resume', type: 'url' },
      { label: 'Cover Letter', name: 'coverLetter', type: 'textarea' },
      { label: 'Rejection Date', name: 'rejectionDate', type: 'date' },
      { label: 'Rejection Reason', name: 'rejectionReason', type: 'textarea' },
      {
         label: 'First Interview Date',
         name: 'firstInterviewDate',
         type: 'date',
      },
      {
         label: 'Technical Challenge Interview Date',
         name: 'technicalChallengeInterview',
         type: 'date',
      },
      {
         label: 'Second Interview Date',
         name: 'secondInterviewDate',
         type: 'date',
      },
   ]

   const allTextInputs = formLabels.map((formLabel, index) => {
      const { label, name, type } = formLabel

      let jobOjbValue
      if (isCompanyField(name)) {
         jobOjbValue = job.company && job.company[name] ? job.company[name] : ''
      } else jobOjbValue = job[name] ? job[name] : ''

      return (
         <div className="form-field" key={index}>
            <label>{label}:</label>
            <InputForm
               type={type}
               placeholder={label}
               name={name}
               value={jobOjbValue}
               onChange={handleOnChange}
               {...(formLabel.options
                  ? { selectOptions: formLabel.options }
                  : null)}
            />
         </div>
      )
   })

   return (
      <div className="add-job">
         <Card cardClass={'card'}>
            <h3 className="title">{title}</h3>
            <form onSubmit={handleSubmit}>
               {/* All Text Input Fields */}
               {allTextInputs}

               {/* Submit Button */}
               <div className="btn-container --my">
                  {secondSubmit && (
                     <button
                        type="button"
                        className="--btn --btn-danger"
                        onClick={secondSubmit}
                     >
                        {secondSubmitLabelBtn}
                     </button>
                  )}
                  <button type="submit" className="--btn --btn-primary">
                     {submitLabelBtn}
                  </button>
               </div>
            </form>
         </Card>
      </div>
   )
}

export default JobForm
