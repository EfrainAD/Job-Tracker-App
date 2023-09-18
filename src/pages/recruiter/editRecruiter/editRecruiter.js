import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
   useGetRecruiterQuery,
   useRemoveRecruiterMutation,
   useUpdateRecruiterMutation,
} from '../../../api/apiSlice'
import RecruiterForm from '../../../components/recruiter/recruiterForm/RecruiterForm'
import { SpinningImg } from '../../../components/loader/loader'
import { comfirmAndDelete } from '../../../utils/general.utils'

const EditRecruiter = () => {
   const navigate = useNavigate()

   const [recruiter, setRecruiter] = useState({})
   const [recruiterDeleted, setRecruiterDeleted] = useState(false)

   const { id } = useParams()
   const { data: recruiterFetched, isLoading } = useGetRecruiterQuery(id, {
      skip: recruiterDeleted,
   })
   const [updateRecruiter] = useUpdateRecruiterMutation()
   const [deleteRecruiter, { isSuccess: isDeleteSuccessful }] =
      useRemoveRecruiterMutation()

   useEffect(() => {
      if (recruiterFetched) {
         setRecruiter({ ...recruiterFetched })
      }
   }, [recruiterFetched, setRecruiter])

   useEffect(() => {
      if (isDeleteSuccessful) {
         navigate('/dashboard/recruiter')
      }
   }, [isDeleteSuccessful, navigate])

   const handleUpdateRecruiter = async (e) => {
      e.preventDefault()

      await updateRecruiter({ id, body: recruiter })

      navigate('/dashboard/recruiter-detail/' + id)
   }
   const handleDeleteRecruiter = async (e) => {
      e.preventDefault()

      comfirmAndDelete({
         title: 'Delete Recruiter',
         deleteFunc: async () => {
            setRecruiterDeleted(true)
            deleteRecruiter(id)
         },
         id,
      })
   }

   return (
      <div>
         {isLoading ? (
            <SpinningImg />
         ) : (
            <RecruiterForm
               title={'Edit Recruiter Entry'}
               recruiter={recruiter}
               setRecruiter={setRecruiter}
               onSubmit={handleUpdateRecruiter}
               submitLabelBtn={'Save Changes'}
               secondSubmit={handleDeleteRecruiter}
               secondSubmitLabelBtn={'Detete'}
            />
         )}
      </div>
   )
}

export default EditRecruiter
