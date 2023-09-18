import { useState } from 'react'
import { useAddCouchMutation } from '../../../api/apiSlice'
import Card from '../../card/card'
import { SpinningImg } from '../../loader/loader'
import './addCouchForm.scss'

const AddCouchForm = () => {
   const [addCouch, { isLoading }] = useAddCouchMutation()
   const [formData, setFormData] = useState({ email: '' })

   const handleOnChange = (e) => {
      const { name, value } = e.target
      setFormData({ [name]: value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      await addCouch(formData)

      setFormData({ email: '' })
   }

   return (
      <div className={'addCouchForm'}>
         <Card>
            {isLoading && <SpinningImg />}
            <form onSubmit={handleSubmit}>
               <h2>Add a Couch</h2>
               <input
                  type="email"
                  autoComplete="email"
                  data-lpignore="true"
                  required
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
               />
               <div className="--flex-end">
                  <button type="submit" className="--btn --btn-primary">
                     Add Couch
                  </button>
               </div>
            </form>
         </Card>
      </div>
   )
}

export default AddCouchForm
