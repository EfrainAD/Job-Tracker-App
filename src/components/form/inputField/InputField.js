import InputForm from '../inputForm/InputForm'

const InputField = ({ label, ...inputArg }) => {
   return (
      <div className=".form-field">
         <label>{label}:</label>
         <InputForm {...inputArg} />
      </div>
   )
}

export default InputField
