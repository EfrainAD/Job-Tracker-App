import { useEffect, useState } from 'react'
import InputField from '../../../form/inputField/InputField.js'
import {
   useCreateJobBoardMutation,
   useUpdateJobBoardMutation,
} from '../../../../api/apiSlice.js'
import { SpinningImg } from '../../../loader/loader.js'

const initialState = { name: '', notes: '', searchUrl: '' }

const fieldAttributes = [
   { label: 'Name', type: 'text', name: 'name' },
   { label: 'Notes', type: 'textarea', name: 'notes' },
   { label: 'URL', type: 'url', name: 'searchUrl' },
]

const title = {
   add: 'Add a New Job Baord',
   edit: 'Edit the Job Baord',
}

const submitLabel = {
   add: 'Submit Job Board',
   edit: 'Submit Edit',
}

const cancelBtn = {
   add: (setFunc) => {
      setFunc('AddButtonForm')
   },
   edit: (setFunc) => {
      setFunc('info')
   },
}

const JobBoardRowForm = ({ jobBaord, index, type, setType }) => {
   const _id = jobBaord?._id
   const [formData, setFormData] = useState({})
   const [isLoading, setIsLoading] = useState(false)

   const [
      updateJobBoard,
      { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
   ] = useUpdateJobBoardMutation()

   const [createJobBoard, { isLoading: isPosting, isSuccess: isPostSuccess }] =
      useCreateJobBoardMutation()

   useEffect(() => {
      if (isPostSuccess) setType('AddButtonForm')
   }, [isPostSuccess, setType])

   useEffect(() => {
      if (isPosting || isUpdateLoading) {
         setIsLoading(true)
      } else {
         setIsLoading(false)
      }
   }, [isPosting, isUpdateLoading, setIsLoading])

   useEffect(() => {
      if (type === 'add') {
         setFormData({ ...initialState })
      } else {
         setFormData({ ...jobBaord })
      }
   }, [type, jobBaord, setFormData])

   useEffect(() => {
      if (isUpdateSuccess) setType('info')
   }, [isUpdateSuccess, setType])

   const handleInputChange = (e) => {
      const { name, value } = e.target

      setFormData((data) => ({ ...data, [name]: value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      const { name, notes, searchUrl } = formData
      const body = { name, notes, searchUrl }

      if (type === 'add') {
         createJobBoard(body)
      } else {
         updateJobBoard({ id: _id, body })
      }
   }

   const allFields = fieldAttributes.map((field, idx) => (
      <div key={idx}>
         <InputField
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
         />
      </div>
   ))

   return (
      <tr>
         <td colSpan={'4'} key={index}>
            <h3 className="title">{title[type]}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
               {isLoading && <SpinningImg />}
               {}
               <div className="form">{allFields}</div>
               <div className="btn-container">
                  <button
                     type="button"
                     className="--btn --btn-danger"
                     onClick={() => cancelBtn[type](setType)}
                  >
                     Cancel
                  </button>
                  <button type="submit" className="--btn --btn-primary">
                     {submitLabel[type]}
                  </button>
               </div>
            </form>
         </td>
      </tr>
   )
}

export default JobBoardRowForm
