import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
   useGetJobQuery,
   useRemoveJobMutation,
   useUpdateJobMutation,
} from '../../../api/apiSlice'
import JobForm from '../../../components/job/jobForm/JobForm'
import { SpinningImg } from '../../../components/loader/loader'
import { comfirmAndDelete } from '../../../utils/general.utils'

const EditJob = () => {
   const navigate = useNavigate()

   const [job, setJob] = useState({})
   const [jobDeleted, setJobDeleted] = useState(false)

   const { id } = useParams()
   const { data: jobFetched, isLoading } = useGetJobQuery(id, {
      skip: jobDeleted,
   })
   const [updateJob] = useUpdateJobMutation()
   const [deleteJob, { isSuccess: isDeleteSuccessful }] = useRemoveJobMutation()

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

   const handleUpdateJob = async (e) => {
      e.preventDefault()

      await updateJob({ id, body: job })

      navigate('/dashboard/job-detail/' + id)
   }
   const handleDeleteJob = async (e) => {
      e.preventDefault()

      comfirmAndDelete({
         title: 'Delete Job',
         deleteFunc: async () => {
            setJobDeleted(true)
            deleteJob(id)
         },
         id,
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
               setJob={setJob}
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
