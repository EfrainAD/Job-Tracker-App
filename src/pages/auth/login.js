import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/card'
import Loader from '../../components/loader/loader'
import styles from './auth.module.scss'
import { useLoginUserMutation } from '../../api/apiSlice'

const initialState = {
   email: 'efrainadavila@gmail.com',
   password: 'password',
}

const Login = () => {
   const navigate = useNavigate()

   const [logIn, { isLoading }] = useLoginUserMutation()

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
         navigate('/dashboard')
      }
   }

   return (
      <div className={`container ${styles.auth}`}>
         {isLoading && <Loader />}
         <Card>
            <div className={styles.form}>
               <div className="--flex-center">
                  <BiLogIn size="35" color="#999" />
               </div>

               <h2>Login</h2>
               <form onSubmit={handdleSignInUser}>
                  <input
                     type="email"
                     autoComplete="current-password"
                     required
                     placeholder="Email"
                     name="email"
                     value={email}
                     onChange={handleInputChange}
                  />
                  <input
                     type="password"
                     autoComplete="current-password"
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
                  <Link to="/">Home</Link>
                  <p> &nbsp; Don't have an account? &nbsp;</p>
                  <Link to="/register">Register</Link>
               </span>
            </div>
         </Card>
      </div>
   )
}

export default Login
