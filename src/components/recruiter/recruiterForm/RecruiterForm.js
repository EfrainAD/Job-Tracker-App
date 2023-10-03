import './recruiterForm.scss'
import Card from '../../card/card'
import InputForm from '../../form/inputForm/InputForm'
import { getCompanyDataList, isCompanyField } from '../../../utils/form.utils'

const RecruiterForm = ({
   title,
   recruiter,
   companies,
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
      } else if (isCompanyField(name)) {
         setRecruiter({
            ...recruiter,
            company: { ...recruiter.company, [name]: value },
         })
      } else {
         setRecruiter({ ...recruiter, [name]: value })
      }
   }

   const companyOptons = !companies ? [] : getCompanyDataList(companies)

   const fieldAttributes = [
      {
         label: 'Name',
         type: 'text',
         name: 'name',
         getValue: (obj) => obj.name,
      },
      {
         label: 'Company',
         type: 'datalist',
         name: 'companyName',
         options: companyOptons,
         getValue: (obj) => obj.company?.companyName,
      },
      // {
      //    label: 'Company',
      //    type: 'text',
      //    name: 'companySize',
      //    getValue: (obj) => obj.company?.companySize,
      // },
      {
         label: 'Outreach Method',
         type: 'select',
         name: 'outreachMethod',
         getValue: (obj) => obj.outreachMethod,
         options: [
            { value: 'linkedin', text: 'linkedIn' },
            { value: 'email', text: 'Email' },
            { value: 'both', text: 'Both' },
         ],
      },
      { label: 'URL', type: 'text', name: 'url', getValue: (obj) => obj.url },
      {
         label: 'Outreach Date',
         type: 'date',
         name: 'outreachDate',
         getValue: (obj) => obj.outreachDate,
      },
      {
         label: 'Notes',
         type: 'textarea',
         name: 'notes',
         getValue: (obj) => obj.notes,
      },
      {
         label: 'Accepted Outreach',
         type: 'checkbox',
         name: 'acceptedOutreach',
         getValue: (obj) => obj.acceptedOutreach,
      },
      {
         label: 'Conversation Date',
         type: 'date',
         name: 'conversationDate',
         getValue: (obj) => obj.conversationDate,
      },
   ]

   const allFields = fieldAttributes.map((field, index) => {
      const fieldValue = field.getValue(recruiter)
      const value = fieldValue ? fieldValue : ''

      return (
         <div className="form-field" key={index}>
            <label>{field.label}:</label>
            <InputForm
               type={field.type}
               placeholder={field.label}
               name={field.name}
               value={value}
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
