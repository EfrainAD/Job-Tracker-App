const InputForm = ({
   type,
   placeholder,
   name,
   value,
   onChange,
   selectOptions,
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
               placeholder={placeholder}
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
      case 'datalist':
         return (
            <>
               <input
                  list="companies"
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  value={value}
                  onChange={onChange}
                  {...arg}
               />
               <datalist id="companies">
                  {selectOptions.map((option, idx) => (
                     <option key={idx} value={option.value}>
                        Company data you already have.
                     </option>
                  ))}
               </datalist>
            </>
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
