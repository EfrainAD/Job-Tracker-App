import './jobList.scss'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { SpinningImg } from '../../loader/loader'

const JobList = ({ jobs, isLoadding }) => {
   const navigate = useNavigate()
   const filteredJobs = jobs //ToDo: implement filter

   //Pagination - variables
   const itemsPerPage = 5
   const [itemOffset, setItemOffset] = useState(0)
   const pageCount = Math.ceil(filteredJobs?.length / itemsPerPage)

   // Pagination - Changes Value when itemOffset value changes.
   const endOffset = itemOffset + itemsPerPage
   const currentItems = filteredJobs?.slice(itemOffset, endOffset)

   // Pagination - Invoke when user click to request another page.
   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredJobs?.length
      setItemOffset(newOffset)
   }

   //    Action Buttons
   const handleDeleteJob = (id) => {
      console.log('delete job:', id)
   }
   const handleViewJob = (id) => navigate(`/dashboard/job-detail/${id}`)
   const handleEditJob = (id) => navigate(`/dashboard/edit-job/${id}`)

   // Edit displayed Info
   const shortenText = (text, n) => {
      return text?.length > n ? text.substring(0, n).concat('...') : text
   }

   return (
      <div className="job-list">
         <hr />
         <div className="table">
            <div className="--flex-beteween --flex-dir-column">
               <span>
                  <h3>Inventory Items</h3>
               </span>
            </div>

            {/* List of Jobs */}
            <div className="table">
               {isLoadding && <SpinningImg />}
               {jobs?.length === 0 ? (
                  <p>{jobs?.length}-- No job found, please add a job...</p>
               ) : (
                  <table>
                     <thead>
                        <tr>
                           <th></th>
                           <th>Job Title</th>
                           <th>Company</th>
                           <th>Recruiter</th>
                           <th>Remote</th>
                           <th>Date Applied</th>
                           <th>Rejection</th>
                           <th>Had Interview</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentItems?.map((job, index) => {
                           const {
                              _id,
                              jobTitle,
                              companyName,
                              recruiter,
                              remote,
                              dateApplied,
                              rejectionDate,
                              firstInterviewDate,
                              secondInterviewDate,
                              technicalChallengeInterview,
                           } = job

                           const hadInterview =
                              firstInterviewDate ||
                              secondInterviewDate ||
                              technicalChallengeInterview

                           return (
                              <tr key={_id}>
                                 <td>{index + 1}</td>
                                 <td>{shortenText(jobTitle, 18)}</td>
                                 <td>{companyName}</td>
                                 <td>{recruiter?.length > 0 ? 'Yes' : 'No'}</td>
                                 <td>{remote}</td>
                                 <td>{dateApplied}</td>
                                 <td>
                                    {rejectionDate ? rejectionDate : 'none'}
                                 </td>
                                 <td>{hadInterview ? 'Yes' : 'none'}</td>
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
                                          onClick={() =>
                                             handleDeleteJob(job._id)
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
            </div>
            <ReactPaginate
               breakLabel="..."
               nextLabel="next >"
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}
               pageCount={pageCount}
               previousLabel="< previous"
               renderOnZeroPageCount={null}
               containerClassName="pagination"
               pageLinkClassName="page-num"
               previousLinkClassName="page-num"
               nextLinkClassName="page-num"
               activeLinkClassName="activePage"
            />
         </div>
      </div>
   )
}

export default JobList
