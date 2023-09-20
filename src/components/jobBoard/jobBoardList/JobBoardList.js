import './jobBoardList.scss'

import { FaExternalLinkAlt, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SpinningImg } from '../../loader/loader'
import Search from '../../search/search'
import { filterJobBoards } from '../../../utils/jobBoard.utils'
import MessageBox from '../../messageBox/MessageBox'
// import { useRemoveJobBoardMutation } from '../../../api/apiSlice'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { comfirmAndDelete } from '../../../utils/general.utils'

const JobBoardList = ({ jobBoards, isJobBoardError, isLoading }) => {
   const [search, setSearch] = useState('')
   const [filteredJobBoards, setFilteredJobBoards] = useState(jobBoards)
   // const [removeJobBoard] = useRemoveJobBoardMutation()

   useEffect(() => {
      const newFilteredjobBoard = filterJobBoards(jobBoards, search)

      setFilteredJobBoards(newFilteredjobBoard)
   }, [search, jobBoards, setFilteredJobBoards])

   const handleGoToJobBoard = (url) => window.open(url, '_blank')
   const handleEditJobBoard = (id) => console.log('Not yet built')
   const handleDeleteJobBoard = (id) =>
      comfirmAndDelete({
         title: 'Delete JobBoard',
         deleteFunc: (id) => console.log(id),
         // deleteFunc: removeJobBoard,
         id,
      })

   return (
      <div className="job-board-list">
         <hr />
         <div className="search-banner">
            <h3>Job Boards</h3>
            <Search
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>

         {/* List of JobBoards */}
         <div className="table">
            {isLoading && <SpinningImg />}

            {jobBoards?.length === 0 ? (
               <p>No job boards found, please some...</p>
            ) : isJobBoardError ? (
               <MessageBox
                  message={`There was an ${isJobBoardError.status} error when fetching the jobboard, with message that says "${isJobBoardError.data.message}"`}
               />
            ) : (
               <table>
                  <thead>
                     <tr>
                        <th></th>
                        <th>Job Board</th>
                        <th>Notes</th>
                        <th className="--center-all">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredJobBoards?.map((jobboard, index) => {
                        const { _id, name, searchUrl, notes } = jobboard

                        return (
                           <tr key={_id}>
                              <td>{index + 1}</td>
                              <td>{name}</td>
                              <td>{notes}</td>
                              {/* Icons */}
                              <td className="icons">
                                 <span>
                                    <FaExternalLinkAlt
                                       size="18"
                                       color="purble"
                                       onClick={() =>
                                          handleGoToJobBoard(searchUrl)
                                       }
                                    />
                                 </span>
                                 <span>
                                    <FaEdit
                                       size="20"
                                       color="green"
                                       onClick={() => handleEditJobBoard(_id)}
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
                     })}
                  </tbody>
               </table>
            )}
         </div>
      </div>
   )
}

export default JobBoardList
