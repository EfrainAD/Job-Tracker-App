import Card from '../../card/card'
import { FaTrashAlt } from 'react-icons/fa'
import './couchList.scss'

const couchs = [
   { couch: 'john yo', email: 'yo@yo.yo', _id: 1 },
   { couch: 'gohn qo', _id: 2 },
   { couch: 'iohn po', _id: 3 },
   { couch: 'eohn  ko', _id: 4 },
   { couch: 'lohn oo', _id: 5 },
]

const CouchList = () => {
   const handleDeleteCouch = (id) => {
      console.log('Pressed Delete:', id)
   }

   return (
      <div className="table">
         <Card>
            {couchs?.length === 0 ? (
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
                     {couchs?.map((couch, idx) => {
                        const { _id, couch: currentCouch, email } = couch

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
   )
}

export default CouchList
