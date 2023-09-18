import { useNavigate, useParams } from 'react-router-dom'
import './recruiterDetail.scss'
import { SpinningImg } from '../../../components/loader/loader'
import { useGetRecruiterQuery } from '../../../api/apiSlice'
import Card from '../../../components/card/card'
import JobDetailField from '../../../components/JobDetailField/JobDetailField'
// import DOMPurify from 'dompurify'

const recruiterFields = [
   { label: 'name', name: 'name' },
   { label: 'Company', name: 'company' },
   { label: 'Accepted Outreach', name: 'acceptedOutreach' },
   { label: 'Conversation Date', name: 'conversationDate' },
   { label: 'Outreach Method', name: 'outreachMethod' },
   { label: 'Notes', name: 'notes' },
   { label: 'Outreach Date', name: 'outreachDate' },
   { label: 'URL', name: 'url' },
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
                        recruiter[field.name] && (
                           <JobDetailField
                              key={idx}
                              label={field.label}
                              value={recruiter[field.name]}
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
