import { useEffect, useState } from 'react'
import RecruiterForm from '../../../components/recruiter/recruiterForm/RecruiterForm'
import {
   useGetComanyNamesQuery,
   useSaveRecruiterMutation,
} from '../../../api/apiSlice'
import { SpinningImg } from '../../../components/loader/loader'
import { useNavigate } from 'react-router-dom'
import { getTodaysDate } from '../../../utils/general.utils'
import { toast } from 'react-toastify'

const AddRecruiter = () => {
   const [recruiter, setRecruiter] = useState({
      // name: 'John O',
      // company: { companyName: 'made up' },
      // url: '',
      // notes: '',
      // outreachMethod: 'both',
      // // enum: ['linkedin', 'email', 'both'],
      outreachDate: getTodaysDate(),
      // acceptedOutreach: null,
      // conversationDate: '',
      // dateApplied: getTodaysDate(),
   })

   const [postRecruiter, { isLoading, isSuccess, data }] =
      useSaveRecruiterMutation()
   const { data: companies } = useGetComanyNamesQuery()
   const navigate = useNavigate()

   useEffect(() => {
      if (isSuccess) {
         const { _id } = data

         navigate('/dashboard/recruiter-detail/' + _id)
      }
   }, [isSuccess, data, navigate])

   const saveRecruiter = async (e) => {
      e.preventDefault()

      const find = companies.find((company) => {
         return company.companyName === recruiter.company?.companyName?.trim()
      })

      if (find) postRecruiter({ ...recruiter, company: find._id })
      else
         toast.error(
            'The company is not valid, it has to be a company you have added before. Please select from the dropdown or create one for the dropdown'
         )
      console.error(
         'Error Message: The company is not valid, it has to be a company you have added before. Please select from the dropdown or create one for the dropdown'
      )
   }
   return (
      <>
         {isLoading && <SpinningImg />}
         <RecruiterForm
            title={'Add Recruiter Entry'}
            recruiter={recruiter}
            companies={companies}
            setRecruiter={setRecruiter}
            onSubmit={saveRecruiter}
            submitLabelBtn={'Add recruiter'}
         />
      </>
   )
}

export default AddRecruiter
