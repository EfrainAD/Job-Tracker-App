import Card from '../../card/card'
import { FaTrashAlt } from 'react-icons/fa'
import './couchList.scss'
import {
   useGetCouchesQuery,
   useRemoveCouchMutation,
} from '../../../api/apiSlice'
import { SpinningImg } from '../../loader/loader'
import { comfirmAndDelete } from '../../../utils/general.utils'

const CouchList = () => {
   const { data: couches, isLoading } = useGetCouchesQuery()
   const [removeCouch] = useRemoveCouchMutation()

   const handleDeleteCouch = async (id) => {
      comfirmAndDelete({
         title: 'Remove this person as your couch?',
         deleteFunc: removeCouch,
         id,
      })
   }

   return (
      <div className="coach-list">
         <div className="table">
            <Card>
               {isLoading && <SpinningImg />}
               {couches?.length === 0 ? (
                  <p>You have no couch</p>
               ) : (
                  <table>
                     <thead>
                        <tr>
                           <th></th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {couches?.map((couch, idx) => {
                           const { _id, name: currentCouch, email } = couch

                           return (
                              <tr key={_id}>
                                 <td>{idx + 1}</td>
                                 <td>{currentCouch}</td>
                                 <td>{email}</td>
                                 {/* Icons */}
                                 <td className="icons">
                                    <span>
                                       <FaTrashAlt
                                          size="20"
                                          color="red"
                                          onClick={() =>
                                             handleDeleteCouch(couch._id)
                                          }
                                       />
                                    </span>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               )}
            </Card>
         </div>
      </div>
   )
}

export default CouchList
