import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { comfirmAndDelete } from '../../../utils/general.utils'
import InputField from '../../form/inputField/InputField.js'
import { useRemoveJobBoardMutation } from '../../../api/apiSlice'
import JobBoardRowForm from './JobBoardRowForm'

const JobBoardTableRow = ({ jobBoard, index }) => {
   const { _id, name, searchUrl, notes } = jobBoard
   const [editMode, setEditMode] = useState(false)

   const [removeJobBoard] = useRemoveJobBoardMutation()

   const handleGoToJobBoard = (url) => window.open(url, '_blank')

   const handleDeleteJobBoard = (id) =>
      comfirmAndDelete({
         title: 'Delete Job Board',
         deleteFunc: removeJobBoard,
         id,
      })
   const handleSetEditMode = () => {
      setEditMode(true)
   }

   return (
      <>
         {editMode ? (
            <JobBoardRowForm
               jobBaord={jobBoard}
               index={index}
               editMode={editMode}
               setEditMode={setEditMode}
            />
         ) : (
            <tr key={index}>
               <td>{index}</td>
               <td>{name}</td>
               <td>{notes}</td>
               <td className="icons">
                  <span>
                     <FaExternalLinkAlt
                        size="18"
                        color="purble"
                        onClick={() => handleGoToJobBoard(searchUrl)}
                     />
                  </span>
                  <span>
                     <FaEdit
                        size="20"
                        color="green"
                        onClick={() => handleSetEditMode(jobBoard)}
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
         )}
      </>
   )
}

export default JobBoardTableRow
