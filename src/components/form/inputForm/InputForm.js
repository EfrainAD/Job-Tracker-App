const InputForm = ({ type, placeholder, name, value, onChange }) => {
   switch (type) {
      case 'text':
      case 'date':
      case 'url':
      case 'number':
         if (type === 'checkbox') console.log('hihihi', value)
         return (
            <input
               type={type}
               placeholder={placeholder}
               name={name}
               value={value}
               onChange={onChange}
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
            />
         )
      case 'enum':
         return (
            <select name={name} value={value} onChange={onChange}>
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
               rows="4"
               cols="50"
               onChange={onChange}
            ></textarea>
         )
      default:
         return <label>.......Not yet made</label>
   }
}

export default InputForm
