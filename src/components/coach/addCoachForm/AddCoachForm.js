import { useState } from 'react'
import { useAddCoachMutation } from '../../../api/apiSlice'
import Card from '../../card/card'
import { SpinningImg } from '../../loader/loader'
import './addCoachForm.scss'

const AddCoachForm = () => {
   const [addCoach, { isLoading }] = useAddCoachMutation()
   const [formData, setFormData] = useState({ email: '' })

   const handleOnChange = (e) => {
      const { name, value } = e.target
      setFormData({ [name]: value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      await addCoach(formData)

      setFormData({ email: '' })
   }

   return (
      <div className={'addCoachForm'}>
         <Card>
            {isLoading && <SpinningImg />}
            <form onSubmit={handleSubmit}>
               <h2>Add a Coach</h2>
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
                     Add Coach
                  </button>
               </div>
            </form>
         </Card>
      </div>
   )
}

export default AddCoachForm
