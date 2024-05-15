import RecruiterEmbeddedFormInterface from '../../recruiter/recruiterForm/RecruiterEmbeddedFormInterface.js'

const InputForm = ({
   type,
   placeholder,
   name,
   value,
   onChange,
   selectOptions,
   companyName,
   ...arg
}) => {
   switch (type) {
      case 'text':
      case 'email':
      case 'date':
      case 'url':
      case 'number':
      case 'file':
         return (
            <input
               type={type}
               placeholder={placeholder}
               name={name}
               value={value}
               onChange={onChange}
               {...arg}
            />
         )
      case 'checkbox':
         return (
            <input
               type={type}
               name={name}
               checked={value}
               onChange={onChange}
               {...arg}
            />
         )
      case 'select':
         return (
            <select
               name={name}
               defaultValue={'null'}
               value={value}
               onChange={onChange}
               {...arg}
            >
               <option value={'null'}>SELECT</option>
               {selectOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>
                     {option.text}
                  </option>
               ))}
            </select>
         )
      case 'selectMulti':
         return (
            <select
               name={name}
               value={value}
               multiple
               onChange={onChange}
               {...arg}
            >
               {selectOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>
                     {option.text}
                  </option>
               ))}
            </select>
         )
      case 'datalist':
         return (
            <>
               <input
                  list={placeholder}
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  value={value}
                  onChange={onChange}
                  {...arg}
               />
               <datalist id={placeholder}>
                  {selectOptions.map((option, idx) => (
                     <option key={idx} value={option.value}>
                        {placeholder} that you already have.
                     </option>
                  ))}
               </datalist>
            </>
         )
      case 'recruiter':
         return (
            <RecruiterEmbeddedFormInterface
               name={name}
               recruiters={value}
               currentRecruiters={selectOptions}
               companyName={companyName}
               onChange={onChange}
            />
         )
      case 'textarea':
         return (
            <textarea
               placeholder={placeholder}
               name={name}
               value={value}
               rows="4"
               cols="50"
               onChange={onChange}
               {...arg}
            ></textarea>
         )
      default:
         return <label>.......Not yet made</label>
   }
}

export default InputForm
