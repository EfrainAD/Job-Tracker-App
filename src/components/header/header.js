import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn, selectName } from '../../redux/user/user.selector'
import { setLogout } from '../../redux/user/user.action'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const Header = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const name = useSelector(selectName)
   const isLoggedIn = useSelector(selectIsLoggedIn)

   useEffect(() => {
      if (!isLoggedIn) {
         navigate('/login')
      }
   }, [isLoggedIn, navigate])

   const handleSignOut = async () => {
      Cookies.remove('token')
      dispatch(setLogout())
      navigate('/login')
   }

   return (
      <div className="--pad header">
         <div className="--flex-between">
            <h3>
               <span className="--fw-thin">Welcome, </span>
               <span className="--color-danger">{name}</span>
            </h3>
            <button className="--btn --btn-danger" onClick={handleSignOut}>
               Logout
            </button>
         </div>
         <hr />
      </div>
   )
}

export default Header