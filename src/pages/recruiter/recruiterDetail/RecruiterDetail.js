import { useNavigate, useParams } from 'react-router-dom'
import './recruiterDetail.scss'
import { SpinningImg } from '../../../components/loader/loader'
import { useGetRecruiterQuery } from '../../../api/apiSlice'
import Card from '../../../components/card/card'
import JobDetailField from '../../../components/JobDetailField/JobDetailField'
// import DOMPurify from 'dompurify'

const recruiterFields = [
   { label: 'name', getvalue: (recruiter) => recruiter.name },
   { label: 'Company', getvalue: (recruiter) => recruiter.company.companyName },
   {
      label: 'Company Size',
      getvalue: (recruiter) => recruiter.company.companySize,
   },
   {
      label: 'Accepted Outreach',
      getvalue: (recruiter) => recruiter.acceptedOutreach,
   },
   {
      label: 'Conversation Date',
      getvalue: (recruiter) => recruiter.conversationDate,
   },
   {
      label: 'Outreach Method',
      getvalue: (recruiter) => recruiter.outreachMethod,
   },
   { label: 'Notes', getvalue: (recruiter) => recruiter.notes },
   { label: 'Outreach Date', getvalue: (recruiter) => recruiter.outreachDate },
   { label: 'URL', getvalue: (recruiter) => recruiter.url },
]

const RecruiterDetail = () => {
   const { id } = useParams()
   const { data: recruiter, isLoading } = useGetRecruiterQuery(id)
   const navigate = useNavigate()
   console.log({ recruiter })

   return (
      <div className="recruiter-detail">
         <h3 className="--mt">Recruiter Details</h3>
         <Card cardClass="card">
            {isLoading && <SpinningImg />}
            {recruiter && (
               <div className="detail">
                  {recruiterFields?.map(
                     (field, idx) =>
                        field.getvalue(recruiter) && (
                           <JobDetailField
                              key={idx}
                              label={field.label}
                              value={field.getvalue(recruiter)}
                           />
                        )
                  )}
                  <div className="recruiter-detail-footer">
                     <hr />
                     <code className="--color-dark">
                        Created on:{' '}
                        {recruiter?.createdAt.toLocaleString('en-US')}
                     </code>
                     <br />
                     <code className="--color-dark">
                        Last Updated:{' '}
                        {recruiter?.updatedAt.toLocaleString('en-US')}
                     </code>
                  </div>
                  <div className="btn-container --my">
                     <button
                        onClick={() =>
                           navigate(
                              `/dashboard/edit-recruiter/${recruiter._id}`
                           )
                        }
                        type="button"
                        className="--btn --btn-primary"
                     >
                        Edit Recruiter
                     </button>
                  </div>
               </div>
            )}
         </Card>
      </div>
   )
}

export default RecruiterDetail
