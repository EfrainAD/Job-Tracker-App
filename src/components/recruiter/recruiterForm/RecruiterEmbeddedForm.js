import './recruiterForm.scss'
import Card from '../../card/card'
import InputForm from '../../form/inputForm/InputForm'

const RecruiterEmbeddedForm = ({
   title = 'Recruiter',
   recruiter,
   onChange,
   removeRecruiterForm,
   index,
}) => {
   const handleOnChange = (e) => {
      const { name, value } = e.target
      const newObj = { ...recruiter }

      newObj[name] = value

      onChange({ recruiter: newObj, index: index })
   }

   const fieldAttributes = [
      {
         label: 'Name',
         type: 'text',
         name: 'name',
         getValue: (obj) => obj.name,
      },
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
         label: 'Notes',
         type: 'textarea',
         name: 'notes',
         getValue: (obj) => obj.notes,
      },
   ]

   const allFields = fieldAttributes.map((field, index) => {
      const fieldName = field.getValue(recruiter)
      const currentValue = fieldName ? fieldName : ''

      return (
         <div className="form-field" key={index}>
            <label>{field.label}:</label>
            <InputForm
               type={field.type}
               placeholder={field.label}
               name={field.name}
               disabled={field.disabled}
               value={currentValue}
               onChange={handleOnChange}
               {...(field.options ? { selectOptions: field.options } : null)}
            />
         </div>
      )
   })

   return (
      <div className="add-recruiter">
         <Card cardClass={'card'}>
            <h3 className="title" style={{ position: 'relative' }}>
               {title} #{index + 1}{' '}
               <button
                  type="button"
                  className="--btn --btn-danger"
                  style={{
                     position: 'absolute',
                     top: 0,
                     right: 0,
                     paddingTop: '6px',
                     paddingBottom: '6px',
                     margin: 0,
                  }}
                  onClick={() => removeRecruiterForm(index)}
               >
                  X
               </button>
            </h3>
            <form>{allFields}</form>
         </Card>
      </div>
   )
}

export default RecruiterEmbeddedForm
