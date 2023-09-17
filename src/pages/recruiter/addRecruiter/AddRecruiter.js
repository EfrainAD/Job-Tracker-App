import { useEffect, useState } from 'react'
import RecruiterForm from '../../../components/recruiter/recruiterForm/RecruiterForm'
import { useSaveRecruiterMutation } from '../../../api/apiSlice'
import { SpinningImg } from '../../../components/loader/loader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getTodaysDate } from '../../../utils/general.utils'

const AddRecruiter = () => {
   const [recruiter, setRecruiter] = useState({
      name: 'John O',
      company: 'made up',
      url: '',
      notes: '',
      outreachMethod: 'both',
      // enum: ['linkedin', 'email', 'both'],
      outreachDate: getTodaysDate(),
      acceptedOutreach: null,
      conversationDate: '',
      dateApplied: getTodaysDate(),
   })

   const [postRecruiter, { isLoading, isError, error, isSuccess, data }] =
      useSaveRecruiterMutation()
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

         navigate('/dashboard/recruiter-detail/' + _id)
      }
   }, [isSuccess, data, navigate])

   const saveRecruiter = async (e) => {
      e.preventDefault()

      postRecruiter({ body: recruiter })
   }
   return (
      <>
         {isLoading && <SpinningImg />}
         <RecruiterForm
            title={'Add Recruiter Entry'}
            recruiter={recruiter}
            setRecruiter={setRecruiter}
            onSubmit={saveRecruiter}
            submitLabelBtn={'Add recruiter'}
         />
      </>
   )
}

export default AddRecruiter