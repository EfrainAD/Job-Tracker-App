import { useSelector } from 'react-redux'
import { selectName } from '../../redux/user/user.selector'
import { useLogoutUserMutation } from '../../api/apiSlice'

const Header = () => {
   const name = useSelector(selectName)

   const [logoutUser] = useLogoutUserMutation()

   const handleSignOut = async () => {
      logoutUser()
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
