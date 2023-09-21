import { useEffect, useState } from 'react'
import InputField from '../../form/inputField/InputField.js'
import { useUpdateJobBoardMutation } from '../../../api/apiSlice'
import { SpinningImg } from '../../loader/loader'

const initialForm = { name: '', notes: '', searchUrl: '' }

const fieldAttributes = [
   { label: 'Name', type: 'text', name: 'name' },
   { label: 'Notes', type: 'textarea', name: 'notes' },
   { label: 'URL', type: 'url', name: 'searchUrl' },
]

const JobBoardRowForm = ({ jobBaord, index, editMode, setEditMode }) => {
   const { _id } = jobBaord
   const [formData, setFormData] = useState({})
   const [
      updateJobBoard,
      { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
   ] = useUpdateJobBoardMutation()

   useEffect(() => {
      if (editMode) {
         setFormData({ ...jobBaord })
      } else {
         setFormData({ ...initialForm })
      }
   }, [editMode, jobBaord, setFormData])

   useEffect(() => {
      if (isUpdateSuccess) setEditMode(false)
   }, [isUpdateSuccess, setEditMode])

   const handleInputChange = (e) => {
      const { name, value } = e.target

      setFormData((data) => ({ ...data, [name]: value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const { name, notes, searchUrl } = formData
      const body = { name, notes, searchUrl }

      updateJobBoard({ id: _id, body })
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
            <h3 className="title">Edit the Job Baord</h3>
            <hr />
            <form onSubmit={handleSubmit}>
               {isUpdateLoading && <SpinningImg />}
               {}
               <div className="form">{allFields}</div>
               <div className="btn-container">
                  <button
                     type="button"
                     className="--btn --btn-danger"
                     onClick={() => setEditMode(false)}
                  >
                     Cancel
                  </button>
                  <button type="submit" className="--btn --btn-primary">
                     Submit Edit
                  </button>
               </div>
            </form>
         </td>
      </tr>
   )
}

export default JobBoardRowForm
