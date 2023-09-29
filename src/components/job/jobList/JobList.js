import './jobList.scss'

import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { SpinningImg } from '../../loader/loader'
import { filterJobs } from '../utils/job.utils'
import MessageBox from '../../messageBox/MessageBox'
import { useRemoveJobMutation } from '../../../api/apiSlice'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { comfirmAndDelete } from '../../../utils/general.utils'
import Table from '../../table/Table'
import SearchbarBanner from '../../searchbarBanner/SearchbarBanner'
import ChangePeersOutreachBtn from '../../button/changePeersOutreachBtn/ChangePeersOutreachBtn'

const headers = [
   { label: '' },
   { label: 'Job Title' },
   { label: 'Company' },
   { label: 'Recruiter' },
   { label: 'Peers Outreach' },
   { label: 'Remote' },
   { label: 'Date Applied' },
   { label: 'Rejection' },
   { label: 'Had Interview' },
   { label: 'Action' },
]

const JobList = ({ jobs, isJobError, isLoadding }) => {
   const navigate = useNavigate()
   const [search, setSearch] = useState('')
   const [filteredJobs, setFilteredJobs] = useState(jobs)
   const [removeJob] = useRemoveJobMutation()
   //Pagination - variables
   const itemsPerPage = 15
   const [currentPage, setCurrentPage] = useState(-1)
   const [itemOffset, setItemOffset] = useState(0)
   const pageCount =
      filteredJobs?.length > 0
         ? Math.ceil(filteredJobs?.length / itemsPerPage)
         : 0

   // Pagination
   useEffect(() => {
      const newFilteredjobs = filterJobs(jobs, search)

      setFilteredJobs(newFilteredjobs)
      setCurrentPage(-1)
      setItemOffset(0)
   }, [search, jobs, setFilteredJobs, setCurrentPage])

   // Pagination - Changes Value when itemOffset value changes.
   const endOffset = itemOffset + itemsPerPage
   const currentItems = filteredJobs?.slice(itemOffset, endOffset)

   // Pagination - Invoke when user click to request another page.
   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredJobs?.length

      setItemOffset(newOffset)
      setCurrentPage(event.selected)
   }

   //    Action Buttons
   const handleDeleteJob = (id) =>
      comfirmAndDelete({ title: 'Delete Job', deleteFunc: removeJob, id })

   const handleViewJob = (id) => navigate(`/dashboard/job-detail/${id}`)
   const handleEditJob = (id) => navigate(`/dashboard/edit-job/${id}`)

   return (
      <div className="job-list">
         <hr />
         <SearchbarBanner
            title={'Jobs'}
            searchValue={search}
            handleOnChange={(e) => setSearch(e.target.value)}
         />

         {/* List of Jobs */}
         <div className="table">
            {isLoadding && <SpinningImg />}

            {jobs?.length === 0 ? (
               <p>No job found, please apply to some job...</p>
            ) : isJobError ? (
               <MessageBox
                  message={`There was an ${isJobError.status} error when fetching the jobs, with message that says "${isJobError.data.message}"`}
               />
            ) : (
               <Table headers={headers}>
                  {currentItems?.map((job, index) => {
                     const {
                        _id,
                        jobTitle,
                        company: { _id: companyId },
                        company: { companyName },
                        company: { peersOutreach },
                        recruiter,
                        remote,
                        dateApplied,
                        rejectionDate,
                        hadInterview,
                     } = job

                     return (
                        <tr key={_id}>
                           <td>{index + 1}</td>
                           <td>{jobTitle}</td>
                           <td>{companyName}</td>
                           <td>{recruiter?.length > 0 ? 'Yes' : 'No'}</td>
                           <td>
                              {
                                 <ChangePeersOutreachBtn
                                    bool={peersOutreach}
                                    companyId={companyId}
                                    jobId={_id}
                                 />
                              }
                           </td>
                           <td>{remote}</td>
                           <td>{dateApplied}</td>
                           <td>{rejectionDate ? rejectionDate : 'none'}</td>
                           <td>{hadInterview ? 'Yes' : 'No'}</td>
                           {/* Icons */}
                           <td className="icons">
                              <span>
                                 <AiOutlineEye
                                    size="25"
                                    color="purble"
                                    onClick={() => handleViewJob(job._id)}
                                 />
                              </span>
                              <span>
                                 <FaEdit
                                    size="20"
                                    color="green"
                                    onClick={() => handleEditJob(job._id)}
                                 />
                              </span>
                              <span>
                                 <FaTrashAlt
                                    size="20"
                                    color="red"
                                    onClick={() => handleDeleteJob(job._id)}
                                 />
                              </span>
                           </td>
                        </tr>
                     )
                  })}
               </Table>
            )}
         </div>
         <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            previousLabel="< previous"
            forcePage={currentPage}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
         />
      </div>
   )
}

export default JobList
