import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/card'
import Loader from '../../components/loader/loader'
import styles from './auth.module.scss'
import { useLoginUserMutation } from '../../api/apiSlice'
import { useDispatch } from 'react-redux'
import { setLogin, setLogout } from '../../redux/user/user.action'
import { toast } from 'react-toastify'

const initialState = {
   email: 'efrainadavila@gmail.com',
   password: 'password',
}

const Login = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [logIn, { isLoading: isLoginLoading, error: isLoginError }] =
      useLoginUserMutation()
   if (isLoginError) {
      toast.error(isLoginError.data.message)
   }

   const [formData, setFormData] = useState(initialState)
   const { email, password } = formData

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }
   const handdleSignInUser = async (e) => {
      e.preventDefault()

      const { data: user } = await logIn(formData)
      if (user) {
         dispatch(setLogin(user))
         navigate('/dashboard')
      } else {
         dispatch(setLogout())
      }
   }

   return (
      <div className={`container ${styles.auth}`}>
         {isLoginLoading && <Loader />}
         <Card>
            <div className={styles.form}>
               <div className="--flex-center">
                  <BiLogIn size="35" color="#999" />
               </div>

               <h2>Login</h2>
               <form onSubmit={handdleSignInUser}>
                  <input
                     type="email"
                     required
                     placeholder="Email"
                     name="email"
                     value={email}
                     onChange={handleInputChange}
                  />
                  <input
                     type="password"
                     required
                     placeholder="Password"
                     name="password"
                     value={password}
                     onChange={handleInputChange}
                     minLength={8}
                  />
                  <button
                     type="submit"
                     className="--btn --btn-primary --btn-block"
                  >
                     Login
                  </button>
               </form>
               <Link to="/forgot">Forgot Password</Link>

               <span className={styles.register}>
                  <p> &nbsp; Don't have an account? &nbsp;</p>
                  <Link to="/register">Register</Link>
               </span>
            </div>
         </Card>
      </div>
   )
}

export default Login
