import './jobBoardList.scss'
import { useEffect, useState } from 'react'
import { SpinningImg } from '../../loader/loader'
import Search from '../../search/search'
import { filterJobBoards } from '../../../utils/jobBoard.utils'
import MessageBox from '../../messageBox/MessageBox'
import 'react-confirm-alert/src/react-confirm-alert.css'
import JobBoardTableRow from '../table/JobBoardRow'
import Table from '../../table/Table'
import SearchbarBanner from '../../searchbarBanner/SearchbarBanner'

const tableHeaders = [
   { label: '' },
   { label: 'Job Board' },
   { label: 'Notes' },
   { label: 'Action', classname: '--center-all' },
]

const JobBoardList = ({ jobBoards, isJobBoardError, isLoading }) => {
   const [search, setSearch] = useState('')
   const [filteredJobBoards, setFilteredJobBoards] = useState(jobBoards)

   useEffect(() => {
      const newFilteredjobBoard = filterJobBoards(jobBoards, search)

      setFilteredJobBoards(newFilteredjobBoard)
   }, [search, jobBoards, setFilteredJobBoards])

   return (
      <div className="job-board-list">
         <SearchbarBanner
            title={'Job Boards'}
            searchValue={search}
            handleOnChange={(e) => setSearch(e.target.value)}
         />

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
               <Table headers={tableHeaders}>
                  {filteredJobBoards?.map((jobBoard, index) => {
                     return (
                        <JobBoardTableRow
                           key={index}
                           index={index + 1}
                           type={'info'}
                           jobBoard={jobBoard}
                        />
                     )
                  })}
                  <JobBoardTableRow
                     index={jobBoards?.length + 1}
                     type={'AddButtonForm'}
                  />
               </Table>
            )}
         </div>
      </div>
   )
}

export default JobBoardList
