import { useState } from 'react'
import { FaExternalLinkAlt, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { comfirmAndDelete } from '../../../utils/general.utils'
import { useRemoveJobBoardMutation } from '../../../api/apiSlice'
import JobBoardRowForm from './JobBoardRowForm'

const JobBoardTableRow = ({
   jobBoard = {},
   index,
   type = 'info',
   setDisplay,
}) => {
   const { _id, name, searchUrl, notes } = jobBoard
   const [mode, setMode] = useState(type)

   const [removeJobBoard] = useRemoveJobBoardMutation()

   const handleGoToJobBoard = (url) => window.open(url, '_blank')

   const handleDeleteJobBoard = (id) =>
      comfirmAndDelete({
         title: 'Delete Job Board',
         deleteFunc: removeJobBoard,
         id,
      })
   const handleSetEditMode = () => {
      setMode('edit')
   }

   return (
      <>
         {mode === 'add' || mode === 'edit' ? (
            <JobBoardRowForm
               jobBaord={jobBoard}
               index={index}
               mode={mode}
               setMode={setMode}
               setDisplay={setDisplay}
            />
         ) : mode === 'openForm' ? (
            <tr>
               <td>{index}</td>
               <td colSpan={3}>
                  {
                     <button
                        className="--btn --btn-block "
                        onClick={() => {
                           setMode('add')
                        }}
                     >
                        Add New Job Board
                     </button>
                  }
               </td>
            </tr>
         ) : mode === 'info' ? (
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
         ) : null}
      </>
   )
}

export default JobBoardTableRow
