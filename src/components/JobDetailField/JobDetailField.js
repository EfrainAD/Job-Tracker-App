import './jobDetailField.scss'

const JobDetailField = ({ label, value }) => {
   if (typeof value !== 'string') {
      value = String(value)
   }

   return (
      <p>
         <b>&rarr; {label}: </b>{' '}
         {value.slice(0, 4) !== 'http' ? (
            value
         ) : (
            <a href={value} target="_blank" rel="noopener noreferrer">
               {value.slice(0, 60) + '...'}
            </a>
         )}
      </p>
   )
}

export default JobDetailField
