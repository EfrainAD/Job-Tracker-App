import { useEffect, useState } from 'react'
import JobForm from '../../../components/job/jobForm/JobForm'
import { useSaveJobMutation } from '../../../api/apiSlice'
import { SpinningImg } from '../../../components/loader/loader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getTodaysDate } from '../../../utils/general.utils'

// Usage
// const timestamp = Date.now()
// const date = new Date(timestamp)
// const formattedDate = formatDate(date)
// console.log(formattedDate)

const AddJob = () => {
   const [job, setJob] = useState({
      // companyName: 'hi2',
      // companySize: '234',
      // coverLetter: 'http://localhost:3000/dashboard/add-job',
      dateApplied: getTodaysDate(),
      // easyApply: true,
      // firstInterviewDate: '2023-09-21',
      // jobLocation: 'myadct',
      // jobSource: 'LinkedIn',
      // jobTitle: 'hi',
      // jobURL:
      //    'https://www.linkedin.com/jobs/view/3446422410/?alternateChannel=search&refId=h8%2BDzac6dF9Rwo0Vsk821A%3D%3D&trackingId=oGJGoelPr0IsXpU8qDU7zg%3D%3D&trk=d_flagship3_postapply_immediate_modal_add_skill',
      // jobalyticsRating: '22',
      // rejectionDate: '2023-09-14',
      // rejectionReason: 'I hope \nthis \nworks!',
      // remote: 'on-site',
      // requiredExperience: '3',
      // resume: 'http://localhost:3000/dashboard/add-job',
      // secondInterviewDate: '2023-10-06',
      // technicalChallengeInterviewDate: '2023-09-28',
   })

   const [postJob, { isLoading, isError, error, isSuccess, data }] =
      useSaveJobMutation()
   const navigate = useNavigate()

   useEffect(() => {
      if (isError) {
         const msg = `${error.status}: ${error.data.message}`

         console.log(msg)
         toast.error(msg)
      }
   }, [isError, error])

   useEffect(() => {
      if (isSuccess) {
         toast.success('Added Successful')

         const { _id } = data

         navigate('/dashboard/job-detail/' + _id)
      }
   }, [isSuccess, data, navigate])

   const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target

      if (type === 'checkbox') {
         setJob({ ...job, [name]: checked })
      } else {
         setJob({ ...job, [name]: value })
      }
   }

   const saveJob = async (e) => {
      e.preventDefault()
      console.log('Adding job:', job)
      postJob({ body: job })
   }
   return (
      <>
         {isLoading && <SpinningImg />}
         <JobForm
            title={'Add Job Entry'}
            job={job}
            handleInputChange={handleInputChange}
            onSubmit={saveJob}
            submitLabelBtn={'Add job'}
         />
      </>
   )
}

export default AddJob
