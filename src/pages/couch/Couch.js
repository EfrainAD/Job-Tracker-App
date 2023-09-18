import './couch.scss'
import AddCouchForm from '../../components/couch/addCouchForm/AddCouchForm'
import CouchList from '../../components/couch/couchList/CouchList'

const Couch = () => {
   return (
      <div className="couch-list">
         <h1>Couch</h1>
         <p>
            Couch are people that can view your jobs and recruiters, for the
            perpose of helping you out.
         </p>
         <CouchList />
         <AddCouchForm />
      </div>
   )
}

export default Couch
