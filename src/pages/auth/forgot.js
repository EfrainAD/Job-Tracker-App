import { useEffect, useState } from 'react'
import Card from '../../components/card/card'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/loader'
import { toast } from 'react-toastify'
import { AiOutlineMail } from 'react-icons/ai'
import { validateEmail } from '../../utils/form.utils'
import { useSendResetEmailMutation } from '../../api/apiSlice'

const initialState = {
   email: '',
}

const Forgot = () => {
   const navigate = useNavigate()
   const [formData, setFormData] = useState(initialState)
   const { email } = formData
   const [sendResetEmail, { isLoading, isSuccess, error }] =
      useSendResetEmailMutation()

   useEffect(() => {
      if (isSuccess) {
         navigate('/login')
      }
   }, [isSuccess, navigate])
   useEffect(() => {
      if (error) {
         setFormData(initialState)
      }
   }, [error, setFormData])

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ [name]: value })
   }

   const handdleSendResetEmail = async (e) => {
      e.preventDefault()

      // Validation
      if (!email) return toast.error('Email field is required')
      if (!validateEmail(email)) return toast.error('Email not valid')

      await sendResetEmail(formData)
   }

   return (
      <div className={`container ${styles.auth}`}>
         {isLoading && <Loader />}
         <Card>
            <div className={styles.form}>
               <div className="--flex-center">
                  <AiOutlineMail size="35" color="#999" />
               </div>
               <h2>Forgot Password</h2>

               <form onSubmit={handdleSendResetEmail}>
                  <input
                     type="email"
                     required
                     placeholder="Email"
                     name="email"
                     value={email}
                     onChange={handleInputChange}
                  />

                  <button
                     type="submit"
                     className="--btn --btn-primary --btn-block"
                  >
                     Get Reset Email
                  </button>
                  <div className={styles.links}>
                     <p>
                        <Link to="/">- Home</Link>
                     </p>
                     <p>
                        <Link to="/login">- Login</Link>
                     </p>
                  </div>
               </form>
            </div>
         </Card>
      </div>
   )
}

export default Forgot
