import './recruiterForm.scss'
import Card from '../../card/card'
import InputForm from '../../form/inputForm/InputForm'

const RecruiterForm = ({
   title,
   recruiter,
   setRecruiter,
   onSubmit,
   submitLabelBtn,
   secondSubmit,
   secondSubmitLabelBtn,
}) => {
   const handleSubmit = (e) => onSubmit(e)
   const handleOnChange = (e) => {
      const { name, value, type, checked } = e.target

      if (type === 'checkbox') {
         setRecruiter({ ...recruiter, [name]: checked })
      } else {
         setRecruiter({ ...recruiter, [name]: value })
      }
      console.log(recruiter)
   }

   const fieldAttributes = [
      { label: 'Name', type: 'text', name: 'name' },
      { label: 'Company', type: 'text', name: 'company' },
      {
         label: 'Outreach Method',
         type: 'select',
         name: 'outreachMethod',
         options: [
            { value: 'linkedin', text: 'linkedIn' },
            { value: 'email', text: 'Email' },
            { value: 'both', text: 'Both' },
         ],
      },
      { label: 'URL', type: 'text', name: 'url' },
      { label: 'Outreach Date', type: 'date', name: 'outreachDate' },
      { label: 'Notes', type: 'textarea', name: 'notes' },
      {
         label: 'Accepted Outreach',
         type: 'checkbox',
         name: 'acceptedOutreach',
      },
      { label: 'Conversation Date', type: 'date', name: 'conversationDate' },
   ]

   const allFields = fieldAttributes.map((field, index) => {
      const recruiterOjbValue = recruiter[field.name]
         ? recruiter[field.name]
         : ''

      return (
         <div className="form-field" key={index}>
            <label>{field.label}:</label>
            <InputForm
               type={field.type}
               placeholder={field.label}
               name={field.name}
               value={recruiterOjbValue}
               onChange={handleOnChange}
               {...(field.options ? { selectOptions: field.options } : null)}
            />
         </div>
      )
   })

   return (
      <div className="add-recruiter">
         <Card cardClass={'card'}>
            <h3 className="title">{title}</h3>
            <form onSubmit={handleSubmit}>
               {/* All Text Input Fields */}
               {allFields}
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

export default RecruiterForm
