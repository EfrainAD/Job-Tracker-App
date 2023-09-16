import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
   useGetJobQuery,
   useRemoveJobMutation,
   useUpdateJobMutation,
} from '../../../api/apiSlice'
import JobForm from '../../../components/job/jobForm/JobForm'
import { SpinningImg } from '../../../components/loader/loader'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

const EditJob = () => {
   const navigate = useNavigate()

   const { id } = useParams()
   const { data: jobFetched, isLoading } = useGetJobQuery(id)
   const [updateJob] = useUpdateJobMutation()
   const [deleteJob, { isSuccess: isDeleteSuccessful }] = useRemoveJobMutation()

   const [job, setJob] = useState({})

   useEffect(() => {
      if (jobFetched) {
         setJob({ ...jobFetched })
      }
   }, [jobFetched, setJob])

   useEffect(() => {
      if (isDeleteSuccessful) {
         navigate('/dashboard/')
      }
   }, [isDeleteSuccessful, navigate])

   const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target

      if (type === 'checkbox') {
         setJob({ ...job, [name]: checked })
      } else {
         setJob({ ...job, [name]: value })
      }
   }

   const handleUpdateJob = async (e) => {
      e.preventDefault()

      const { error } = await updateJob({ id, body: job })

      if (error) {
         const msg = `${error.status}: ${error.data.message}`

         toast.error(msg)
         console.log(msg)
      } else {
         toast.success('Update Successful')
      }
      navigate('/dashboard/job-detail/' + id)
   }

   const handleDeleteJob = async (e) => {
      e.preventDefault()
      console.log('yo')
      confirmAlert({
         title: 'Delete Job',
         message: 'Are you sure to do this?',
         buttons: [
            {
               label: 'Cancel',
            },
            {
               label: 'Delete',
               onClick: () => deleteJob(id),
            },
         ],
      })
   }

   return (
      <div>
         {isLoading ? (
            <SpinningImg />
         ) : (
            <JobForm
               title={'Edit Job Entry'}
               job={job}
               handleInputChange={handleInputChange}
               onSubmit={handleUpdateJob}
               submitLabelBtn={'Save Changes'}
               secondSubmit={handleDeleteJob}
               secondSubmitLabelBtn={'Detete'}
            />
         )}
      </div>
   )
}

export default EditJob
