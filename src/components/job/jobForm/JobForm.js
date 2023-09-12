import './jobForm.scss'
import Card from '../../card/card'
import InputForm from '../../form/inputForm/InputForm'

const JobForm = ({
   title,
   job,
   handleInputChange,
   onSubmit,
   submitLabelBtn,
}) => {
   const handleSubmit = (e) => onSubmit(e)
   const handleOnChange = (e) => handleInputChange(e)

   const formLabels = [
      { value: 'Job Title', type: 'text' },
      { value: 'Company Name', type: 'text' },
      { value: 'Date Applied', type: 'date' },
      { value: 'Job URL', type: 'url' },
      { value: 'Job Source', type: 'text' },
      { value: 'Easy Apply', type: 'checkbox' },
      { value: 'Remote', type: 'enum' },
      { value: 'Job Location', type: 'text' },
      { value: 'Recruiter', type: 'text' },
      { value: 'Required Experience', type: 'number' },
      { value: 'Jobalytics Rating', type: 'number' },
      { value: 'Company Size', type: 'text' },
      { value: 'Resume', type: 'url' },
      { value: 'Cover Letter', type: 'textArea' },
      { value: 'Rejection Date', type: 'date' },
      { value: 'Rejection Reason', type: 'textArea' },
      { value: 'First Interview Date', type: 'date' },
      { value: 'Technical Challenge Interview Date', type: 'date' },
      { value: 'Second Interview Date', type: 'date' },
   ]

   const allTextInputs = formLabels.map((label, index) => {
      const name = label.value
         .replaceAll(' ', '')
         .replace(/^./, (firstLetter) => firstLetter.toLowerCase())
      const jobOjbValue = job[name] ? job[name] : ''

      return (
         <div className="form-field" key={index}>
            <label>{label.value}:</label>
            <InputForm
               type={label.type}
               placeholder={label.value}
               name={name}
               value={jobOjbValue}
               onChange={handleOnChange}
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
