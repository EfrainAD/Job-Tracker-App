import './recruiterList.scss'

import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { SpinningImg } from '../../loader/loader'
import { filterRecruiters } from '../../../utils/recruiter.utils'
import MessageBox from '../../messageBox/MessageBox'
import { useRemoveRecruiterMutation } from '../../../api/apiSlice'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { comfirmAndDelete } from '../../../utils/general.utils'
import Table from '../../table/Table'
import SearchbarBanner from '../../searchbarBanner/SearchbarBanner'

const headers = [
   { label: '' },
   { label: 'Recruiter Name' },
   { label: 'Company' },
   { label: 'Accepted Outreach' },
   { label: 'Outreach Method' },
   { label: 'Conversation' },
   { label: 'Notes' },
   { label: 'Outreach Date' },
   { label: 'Action' },
]

const RecruiterList = ({ recruiters, isRecruiterError, isLoadding }) => {
   const navigate = useNavigate()
   const [search, setSearch] = useState('')
   const [filteredRecruiters, setFilteredRecruiters] = useState(recruiters)
   const [removeRecruiter] = useRemoveRecruiterMutation()

   //Pagination - variables
   const itemsPerPage = 15
   const [currentPage, setCurrentPage] = useState(-1)
   const [itemOffset, setItemOffset] = useState(0)
   const pageCount =
      filteredRecruiters?.length > 0
         ? Math.ceil(filteredRecruiters?.length / itemsPerPage)
         : 0

   // Pagination
   useEffect(() => {
      const newFilteredrecruiters = filterRecruiters(recruiters, search)

      setFilteredRecruiters(newFilteredrecruiters)
      setCurrentPage(-1)
      setItemOffset(0)
   }, [search, recruiters, setFilteredRecruiters, setCurrentPage])

   // Pagination - Changes Value when itemOffset value changes.
   const endOffset = itemOffset + itemsPerPage
   const currentItems = filteredRecruiters?.slice(itemOffset, endOffset)

   // Pagination - Invoke when user click to request another page.
   const handlePageClick = (event) => {
      const newOffset =
         (event.selected * itemsPerPage) % filteredRecruiters?.length

      setItemOffset(newOffset)
      setCurrentPage(event.selected)
   }

   //    Action Buttons
   const handleDeleteRecruiter = (id) =>
      comfirmAndDelete({
         title: 'Delete Recruiter',
         deleteFunc: removeRecruiter,
         id,
      })

   const handleViewRecruiter = (id) =>
      navigate(`/dashboard/recruiter-detail/${id}`)
   const handleEditRecruiter = (id) =>
      navigate(`/dashboard/edit-recruiter/${id}`)

   return (
      <div className="recruiter-list">
         <hr />
         <SearchbarBanner
            title={'Recruiters'}
            searchValue={search}
            handleOnChange={(e) => setSearch(e.target.value)}
         />

         {/* List of Recruiters */}
         <div className="table">
            {isLoadding && <SpinningImg />}

            {recruiters?.length === 0 ? (
               <p>No recruiter found, please apply to some recruiter...</p>
            ) : isRecruiterError ? (
               <MessageBox
                  message={`There was an ${isRecruiterError.status} error when fetching the recruiters, with message that says "${isRecruiterError.data.message}"`}
               />
            ) : (
               <Table headers={headers}>
                  {currentItems?.map((recruiter, index) => {
                     const {
                        _id,
                        name,
                        company: { companyName: company },
                        outreachMethod,
                        outreachDate,
                        acceptedOutreach,
                        conversationDate,
                        notes,
                     } = recruiter

                     return (
                        <tr key={_id}>
                           <td>{index + 1}</td>
                           <td>{name}</td>
                           <td>{company}</td>
                           <td>{acceptedOutreach ? 'Yes' : 'No'}</td>
                           <td>{outreachMethod}</td>
                           <td>
                              {conversationDate ? conversationDate : 'none'}
                           </td>
                           <td>{notes ? 'Yes' : 'No'}</td>
                           <td>{outreachDate}</td>
                           {/* Icons */}
                           <td className="icons">
                              <span>
                                 <AiOutlineEye
                                    size="25"
                                    color="purble"
                                    onClick={() =>
                                       handleViewRecruiter(recruiter._id)
                                    }
                                 />
                              </span>
                              <span>
                                 <FaEdit
                                    size="20"
                                    color="green"
                                    onClick={() =>
                                       handleEditRecruiter(recruiter._id)
                                    }
                                 />
                              </span>
                              <span>
                                 <FaTrashAlt
                                    size="20"
                                    color="red"
                                    onClick={() =>
                                       handleDeleteRecruiter(recruiter._id)
                                    }
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

export default RecruiterList
