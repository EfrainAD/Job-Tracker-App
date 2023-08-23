import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/card'
import styles from './auth.module.scss'

const initialState = {
   email: 'me@me.me',
   password: 'password',
}

const Login = () => {
   const [formData, setFormData] = useState(initialState)
   const { email, password } = formData

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }
   const handdleSignInUser = async (e) => {
      e.preventDefault()

      console.log('submit form', { email }, { password })
   }

   return (
      <div className={`container ${styles.auth}`}>
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
