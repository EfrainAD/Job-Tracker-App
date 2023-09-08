import { useEffect, useState } from 'react'
import JobForm from '../../../components/job/jobForm/JobForm'
import { useSaveJobMutation } from '../../../api/apiSlice'
import { SpinningImg } from '../../../components/loader/loader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {
   const [job, setJob] = useState({
      jobTitle: 'hi',
      companyName: 'hi2',
      dateApplied: '2023-09-07',
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
