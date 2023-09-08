import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './jobDetail.scss'
import { SpinningImg } from '../../../components/loader/loader'
import { useGetJobQuery } from '../../../api/apiSlice'
import Card from '../../../components/card/card'
import JobDetailField from '../../../components/JobDetailField/JobDetailField'
// import DOMPurify from 'dompurify'
// import { moneyFormat } from '../../../service/jobService'

const JobDetail = () => {
   const { id } = useParams()
   const { data: job, isLoading } = useGetJobQuery(id)

   return (
      <div className="job-detail">
         <h3 className="--mt">Job Details</h3>
         <Card cardClass="card">
            {isLoading && <SpinningImg />}
            {job && (
               <div className="detail">
                  {/* Company Name */}
                  {job.companyName && (
                     <JobDetailField
                        label={'Company Name'}
                        value={job.companyName}
                     />
                  )}
                  {/* Company Size */}
                  {job.companySize && (
                     <JobDetailField
                        label={'Company Size'}
                        value={job.companySize}
                     />
                  )}
                  {/* Job Title */}
                  {job.jobTitle && (
                     <JobDetailField label={'Job Title'} value={job.jobTitle} />
                  )}
                  {/* Job URL */}
                  {job.jobURL && (
                     <JobDetailField label={'Job URL'} value={job.jobURL} />
                  )}
                  {/* Job Source */}
                  {job.jobSource && (
                     <JobDetailField
                        label={'Job Source'}
                        value={job.jobSource}
                     />
                  )}
                  {/* Easy Apply */}
                  {job.easyApply === 'Yes' && (
                     <JobDetailField label={'Easy Apply'} value={'Yes'} />
                  )}
                  {/* Remote */}
                  {job.remote && (
                     <JobDetailField label={'Remote'} value={job.remote} />
                  )}
                  {/* Job Location */}
                  {job.jobLocation && (
                     <JobDetailField
                        label={'Job Location'}
                        value={job.jobLocation}
                     />
                  )}
                  {/* Jobalytics Rating */}
                  {job.jobalyticsRating !== undefined && (
                     <JobDetailField
                        label={'Jobalytics Rating'}
                        value={job.jobalyticsRating}
                     />
                  )}
                  {/* Required Experience */}
                  {job.requiredExperience && (
                     <JobDetailField
                        label={'Required Experience'}
                        value={job.requiredExperience}
                     />
                  )}
                  {/* Resume */}
                  {job.resume && (
                     <JobDetailField label={'Resume'} value={job.resume} />
                  )}
                  {/* Cover Letter */}
                  {job.coverLetter && (
                     <JobDetailField
                        label={'Cover Letter'}
                        value={job.coverLetter}
                     />
                  )}
                  {/* Recruiters */}
                  {job.recruiter.length > 0 && (
                     <p>
                        <b>&rarr; Recruiters : </b>
                        {job.recruiter.map((recruiter) => (
                           <span key={recruiter._id}>{recruiter.name}, </span>
                        ))}
                     </p>
                  )}
                  {/* Date Applied */}
                  {job.dateApplied && (
                     <JobDetailField
                        label={'Date Applied'}
                        value={job.dateApplied.toLocaleString('en-US')}
                     />
                  )}
                  {/* Rejection Date */}
                  {job.rejectionDate && (
                     <JobDetailField
                        label={'Rejection Date'}
                        value={job.rejectionDate.toLocaleString('en-US')}
                     />
                  )}
                  {/* Rejection Reason */}
                  {job.rejectionReason && (
                     <JobDetailField
                        label={'Rejection Reason'}
                        value={job.rejectionReason}
                     />
                  )}
                  {/* First Interview Date */}
                  {job.firstInterviewDate && (
                     <JobDetailField
                        label={'First Interview Date'}
                        value={job.firstInterviewDate.toLocaleString('en-US')}
                     />
                  )}
                  {/* Technical Challenge Interview Date */}
                  {job.technicalChallengeInterviewDate && (
                     <JobDetailField
                        label={'Technical Challenge Interview Date'}
                        value={job.technicalChallengeInterviewDate.toLocaleString(
                           'en-US'
                        )}
                     />
                  )}
                  {/* Second Interview Date */}
                  {job.secondInterviewDate && (
                     <JobDetailField
                        label={'Second Interview Date'}
                        value={job.secondInterviewDate.toLocaleString('en-US')}
                     />
                  )}
                  <hr />
                  <code className="--color-dark">
                     Created on: {job.createdAt.toLocaleString('en-US')}
                  </code>
                  <br />
                  <code className="--color-dark">
                     Last Updated: {job.updatedAt.toLocaleString('en-US')}
                  </code>
               </div>
            )}
         </Card>
      </div>
   )
}

export default JobDetail
