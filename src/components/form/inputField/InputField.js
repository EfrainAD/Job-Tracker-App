import InputForm from '../inputForm/InputForm'

const InputField = ({ label, ...inputArg }) => {
   return (
      <p>
         <label>{label}:</label>
         <InputForm {...inputArg} />
      </p>
   )
}

export default InputField
