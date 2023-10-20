import { useNavigate, useParams } from 'react-router-dom'
import './jobDetail.scss'
import { SpinningImg } from '../../../components/loader/loader'
import { useGetJobQuery } from '../../../api/apiSlice'
import Card from '../../../components/card/card'
import JobDetailField from '../../../components/JobDetailField/JobDetailField'
// import DOMPurify from 'dompurify'

const JobDetail = () => {
   const { id } = useParams()
   const { data: job, isLoading } = useGetJobQuery(id)
   const navigate = useNavigate()

   return (
      <div className="job-detail">
         <h3 className="--mt">Job Details</h3>
         <Card cardClass="card">
            {isLoading && <SpinningImg />}
            {job && (
               <div className="detail">
                  {/* Company Name */}
                  {job.company?.companyName && (
                     <JobDetailField
                        label={'Company Name'}
                        value={job.company.companyName}
                        className="job-detail-field"
                     />
                  )}
                  {/* Job Title */}
                  {job.jobTitle && (
                     <JobDetailField label={'Job Title'} value={job.jobTitle} />
                  )}
                  {/* Notes */}
                  {job.notes && (
                     <>
                        <b>
                           <span className="badge">&rarr;</span> Notes:
                        </b>
                        <div className="text-area">{job.notes}</div>
                     </>
                  )}
                  {/* Company Peers Outreach */}
                  {job.company?.companyName && (
                     <JobDetailField
                        label={'Peers Outreach'}
                        value={job.company.peersOutreach}
                        className="job-detail-field"
                     />
                  )}
                  {/* Job Source */}
                  {job.jobSource && (
                     <JobDetailField
                        label={'Job Source'}
                        value={job.jobSource}
                     />
                  )}
                  {/* Job Board URL */}
                  {job.jobBoardURL && (
                     <JobDetailField
                        label={'Job Board URL'}
                        value={job.jobBoardURL}
                     />
                  )}
                  {/* Company Job URL */}
                  {job.applicationURL && (
                     <JobDetailField
                        label={'Company Job URL'}
                        value={job.applicationURL}
                     />
                  )}
                  {/* Easy Apply */}
                  {job.easyApply === true && (
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
                  {/* Required Experience */}
                  {job.requiredExperience && (
                     <JobDetailField
                        label={'Required Experience'}
                        value={job.requiredExperience}
                     />
                  )}
                  {/* Jobalytics Rating */}
                  {job.jobalyticsRating && (
                     <JobDetailField
                        label={'Jobalytics Rating'}
                        value={job.jobalyticsRating}
                     />
                  )}
                  {/* Company Size */}
                  {job.company?.companySize && (
                     <JobDetailField
                        label={'Company Size'}
                        value={job.company.companySize}
                        className="job-detail-field-ele"
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
                  {/* plan to adapt it to DB Changes */}
                  {/* {job.recruiter.length > 0 && (
                     <p>
                        <b>&rarr; Recruiters : </b>
                        {job.recruiter.map((recruiter) => (
                           <span key={recruiter._id}>{recruiter.name}, </span>
                        ))}
                     </p>
                  )} */}
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
                  <div className="job-detail-footer">
                     <hr />
                     <code className="--color-dark">
                        Created on: {job.createdAt.toLocaleString('en-US')}
                     </code>
                     <br />
                     <code className="--color-dark">
                        Last Updated: {job.updatedAt.toLocaleString('en-US')}
                     </code>
                  </div>
                  <div className="btn-container --my">
                     <button
                        onClick={() =>
                           navigate(`/dashboard/edit-job/${job._id}`)
                        }
                        type="button"
                        className="--btn --btn-primary"
                     >
                        Edit Job
                     </button>
                  </div>
               </div>
            )}
         </Card>
      </div>
   )
}

export default JobDetail
