import './jobDetailField.scss'

const JobDetailField = ({ label, value }) => {
   if (typeof value !== 'string') {
      value = String(value)
   }

   return (
      <div className="job-detail-field">
         <b>
            <span className="badge">&rarr;</span> {label}:{' '}
         </b>{' '}
         {value.slice(0, 4) !== 'http' ? (
            value
         ) : (
            <a href={value} target="_blank" rel="noopener noreferrer">
               {value.slice(0, 90) + '...'}
            </a>
         )}
      </div>
   )
}

export default JobDetailField
