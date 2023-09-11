import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './auth.module.scss'
import { TiUserAddOutline } from 'react-icons/ti'
import { toast } from 'react-toastify'
import Card from '../../components/card/card'
import Loader from '../../components/loader/loader'
import { validateEmail } from '../../utils/form.utils'
import { useCreateUserMutation } from '../../api/apiSlice'

const initialState = {
   name: '',
   email: '',
   password: '',
   comfirm_password: '',
}

const Register = () => {
   const [createUser, { isLoading, isSuccess, error }] = useCreateUserMutation()
   const navigate = useNavigate()
   const [formData, setFormData] = useState(initialState)
   const { name, email, password, comfirm_password } = formData

   useEffect(() => {
      if (isSuccess) {
         toast.error('New account made successfully')
         navigate('/login')
      }
   }, [isSuccess, navigate])
   useEffect(() => {
      if (error) {
         toast.error(
            `Sorry, there was an error while creating your account. It's possible that you already have an account.`
         )
         console.log(error.data.message)
         setFormData({ ...formData, password: '', comfirm_password: '' })
      }
   }, [error, setFormData, formData])

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleRegisterSubmission = async (e) => {
      e.preventDefault()

      // Validation
      if ((!name, !email, !password, !comfirm_password))
         return toast.error('All fields are required')
      if (password !== comfirm_password)
         return toast.error('Passwords do not match')
      if (password.length < 8)
         return toast.error('passowrd must be 8 characters long')
      if (!validateEmail(email)) return toast.error('Email not valid')

      const userData = {
         name,
         email,
         password,
      }

      createUser(userData)
   }
   return (
      <div className={`container ${styles.auth}`}>
         {isLoading && <Loader />}
         <Card>
            <div className={styles.form}>
               <div className="--flex-center">
                  <TiUserAddOutline size={35} color="#999" />
               </div>
               <h2>Register</h2>

               <form onSubmit={handleRegisterSubmission}>
                  <input
                     type="text"
                     placeholder="Name"
                     required
                     name="name"
                     value={name}
                     onChange={handleInputChange}
                  />
                  <input
                     type="email"
                     autoComplete="username"
                     placeholder="Email"
                     required
                     name="email"
                     value={email}
                     onChange={handleInputChange}
                  />
                  <input
                     type="password"
                     autoComplete="new-password"
                     placeholder="Password"
                     required
                     name="password"
                     value={password}
                     onChange={handleInputChange}
                  />
                  <input
                     type="password"
                     autoComplete="new-password"
                     placeholder="Confirm Password"
                     required
                     name="comfirm_password"
                     value={comfirm_password}
                     onChange={handleInputChange}
                  />
                  <button
                     type="submit"
                     className="--btn --btn-primary --btn-block"
                  >
                     Register
                  </button>
               </form>

               <span className={styles.register}>
                  <Link to="/">Home</Link>
                  <p> &nbsp; Already have an account? &nbsp;</p>
                  <Link to="/login">Login</Link>
               </span>
            </div>
         </Card>
      </div>
   )
}

export default Register
