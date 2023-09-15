const InputForm = ({ type, placeholder, name, value, onChange, ...arg }) => {
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
      case 'enum':
         return (
            <select name={name} value={value} onChange={onChange} {...arg}>
               <option value="null">SELECT</option>
               <option value="remote">Remote</option>
               <option value="on-site">On-site</option>
               <option value="hybrid">Hybrid</option>
            </select>
         )
      case 'textArea':
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
