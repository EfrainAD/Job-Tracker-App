import { FaEdit, FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa'
import { comfirmAndDelete } from '../../../../utils/general.utils'
import { useRemoveJobBoardMutation } from '../../../../api/apiSlice'

const handleGoToJobBoard = (url) => window.open(url, '_blank')

const JobBoardInfoRow = ({ index, jobBoard, setType }) => {
   const { _id, name, searchUrl, notes } = jobBoard
   const [removeJobBoard] = useRemoveJobBoardMutation()

   const handleDeleteJobBoard = (id) =>
      comfirmAndDelete({
         title: 'Delete Job Board',
         deleteFunc: removeJobBoard,
         id,
      })
   const handleSetType = () => {
      setType('edit')
   }

   return (
      <tr key={index}>
         <td>{index}</td>
         <td>{name}</td>
         <td>{notes}</td>
         <td className="icons">
            <span>
               <FaExternalLinkAlt
                  size="18"
                  color="purple"
                  onClick={() => handleGoToJobBoard(searchUrl)}
               />
            </span>
            <span>
               <FaEdit
                  size="20"
                  color="green"
                  onClick={() => handleSetType(jobBoard)}
               />
            </span>
            <span>
               <FaTrashAlt
                  size="16"
                  color="red"
                  onClick={() => handleDeleteJobBoard(_id)}
               />
            </span>
         </td>
      </tr>
   )
}

export default JobBoardInfoRow
