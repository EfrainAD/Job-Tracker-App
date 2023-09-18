import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/card/card'
import './couch.scss'
import { useState } from 'react'

const couchs = [
   { couch: 'john yo', email: 'yo@yo.yo', _id: 1 },
   { couch: 'gohn qo', _id: 2 },
   { couch: 'iohn po', _id: 3 },
   { couch: 'eohn  ko', _id: 4 },
   { couch: 'lohn oo', _id: 5 },
]

const Couch = () => {
   const handleDeleteCouch = (id) => {
      console.log('Pressed Delete:', id)
   }
   const [formData, setFormData] = useState({ email: '' })
   const handleOnChange = (e) => {
      const { name, value } = e.target
      setFormData({ [name]: value })
   }
   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('YO Submited')
   }
   return (
      <div className="couch-list">
         <h1>Couch</h1>
         <p>
            Couch are people that can view your jobs and recruiters, for the
            perpose of helping you out.
         </p>
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
         <div className={'addCouchForm'}>
            <Card>
               <form onSubmit={handleSubmit}>
                  <h2>Add a Couch</h2>
                  <input
                     type="email"
                     autoComplete="email"
                     data-lpignore="true"
                     required
                     placeholder="email"
                     name="email"
                     value={formData.email}
                     onChange={handleOnChange}
                  />
                  <div className="--flex-end">
                     <button type="submit" className="--btn --btn-primary">
                        Add Couch
                     </button>
                  </div>
               </form>
            </Card>
         </div>
      </div>
   )
}

export default Couch
