import JobBoardList from '../../components/jobBoard/jobBoardList/JobBoardList'

import { useGetJobBoardsQuery } from '../../api/apiSlice'

const JobBoard = () => {
   const {
      data: jobBoards,
      error: isJobBoardError,
      isLoading: isJobBoardLoading,
   } = useGetJobBoardsQuery()

   return (
      <>
         <JobBoardList
            jobBoards={jobBoards}
            isJobBoardError={isJobBoardError}
            isloading={isJobBoardLoading}
         />
      </>
   )
}

export default JobBoard
