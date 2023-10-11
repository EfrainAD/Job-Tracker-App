import Card from '../../card/card'
import { FaTrashAlt } from 'react-icons/fa'
import './coachList.scss'
import {
   useGetCoachesQuery,
   useRemoveCoachMutation,
} from '../../../api/apiSlice'
import { SpinningImg } from '../../loader/loader'
import { comfirmAndDelete } from '../../../utils/general.utils'
import Table from '../../table/Table'

const headers = [
   { label: '' },
   { label: 'Name' },
   { label: 'Email' },
   { label: 'Action' },
]

const CoachList = () => {
   const { data: coaches, isLoading } = useGetCoachesQuery()
   const [removeCoach] = useRemoveCoachMutation()

   const handleDeleteCoach = async (id) => {
      comfirmAndDelete({
         title: 'Remove this person as your coach?',
         deleteFunc: removeCoach,
         id,
      })
   }

   return (
      <div className="coach-list">
         <div className="table">
            <Card>
               {isLoading && <SpinningImg />}
               {coaches?.length === 0 ? (
                  <p>You have no coach</p>
               ) : (
                  <Table headers={headers}>
                     {coaches?.map((coach, idx) => {
                        const { _id, name: currentCoach, email } = coach

                        return (
                           <tr key={_id}>
                              <td>{idx + 1}</td>
                              <td>{currentCoach}</td>
                              <td>{email}</td>
                              {/* Icons */}
                              <td className="icons">
                                 <span>
                                    <FaTrashAlt
                                       size="20"
                                       color="red"
                                       onClick={() =>
                                          handleDeleteCoach(coach._id)
                                       }
                                    />
                                 </span>
                              </td>
                           </tr>
                        )
                     })}
                  </Table>
               )}
            </Card>
         </div>
      </div>
   )
}

export default CoachList
