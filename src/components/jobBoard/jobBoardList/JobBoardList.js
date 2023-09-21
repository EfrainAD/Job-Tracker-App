import './jobBoardList.scss'

import { useEffect, useState } from 'react'
import { SpinningImg } from '../../loader/loader'
import Search from '../../search/search'
import { filterJobBoards } from '../../../utils/jobBoard.utils'
import MessageBox from '../../messageBox/MessageBox'
import 'react-confirm-alert/src/react-confirm-alert.css'
import JobBoardTableRow from '../table/JobBoardRow'

const JobBoardList = ({ jobBoards, isJobBoardError, isLoading }) => {
   const [search, setSearch] = useState('')
   const [filteredJobBoards, setFilteredJobBoards] = useState(jobBoards)

   useEffect(() => {
      const newFilteredjobBoard = filterJobBoards(jobBoards, search)

      setFilteredJobBoards(newFilteredjobBoard)
   }, [search, jobBoards, setFilteredJobBoards])

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
                     {filteredJobBoards?.map((jobBoard, index) => {
                        return (
                           <JobBoardTableRow
                              index={index + 1}
                              jobBoard={jobBoard}
                           />
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
