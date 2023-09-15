import { useState } from 'react'
import { toast } from 'react-toastify'
import Card from '../card/card'
import './changePassword.scss'
import { useUpdatePasswordMutation } from '../../api/apiSlice'
import { SpinningImg } from '../loader/loader'

const initialState = {
   old_password: '',
   new_password: '',
   comferm_password: '',
}

const ChangePassword = ({ username }) => {
   const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

   const [formData, setFormData] = useState(initialState)
   const { old_password, new_password, comferm_password } = formData

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      // Validation
      if (new_password !== comferm_password) {
         toast.error('Passwords and comform password do not match')
         setFormData(initialState)
         return
      }

      await updatePassword(formData)
      setFormData(initialState)
   }
   return (
      <div className="change-password">
         <Card cardClass={'password-card'}>
            {isLoading ? (
               <SpinningImg />
            ) : (
               <>
                  <h3>Change Password</h3>
                  <form onSubmit={handleSubmit} className="--form-control">
                     <input
                        type="hidden"
                        autoComplete="username"
                        readOnly
                        value={username}
                     />

                     <input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Old Password"
                        required
                        name="old_password"
                        value={old_password}
                        onChange={handleInputChange}
                     />
                     <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="New Password"
                        required
                        name="new_password"
                        value={new_password}
                        onChange={handleInputChange}
                     />
                     <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm New Password"
                        required
                        name="comferm_password"
                        value={comferm_password}
                        onChange={handleInputChange}
                     />
                     <button type="submit" className="--btn --btn-primary">
                        Change Password
                     </button>
                  </form>
               </>
            )}
         </Card>
      </div>
   )
}

export default ChangePassword
