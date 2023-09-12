import './pageNotFound.scss'
import { Link } from 'react-router-dom'

const PageNotFound = () => (
   <div className="page-not-found">
      <div>
         <h1>Page Not Found</h1>
         <h2>As you know, it's a 404 error</h2>
         <Link to={'/dashboard'}>Go to Dashboard</Link>
      </div>
   </div>
)

export default PageNotFound
