import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/user/user.selector'

const ProtectedPage = ({ children }) => {
   const isLoggedIn = useSelector(selectIsLoggedIn)

   if (!isLoggedIn) {
      return <Navigate to="/login" />
   } else {
      return children
   }
}

export default ProtectedPage
