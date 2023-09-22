import { useState } from 'react'
import JobBoardRowForm from './row/JobBoardRowForm'
import JobBoardInfoRow from './row/JobBoardInfoRow'
import JobBoardAddBtnRow from './row/JobBoardAddBtnRow'

const JobBoardTableRow = ({
   jobBoard = {},
   index,
   type: initialType = 'info',
}) => {
   const [type, setType] = useState(initialType)

   return (
      <>
         {type === 'add' || type === 'edit' ? (
            <JobBoardRowForm
               jobBaord={jobBoard}
               index={index}
               type={type}
               setType={setType}
            />
         ) : type === 'AddButtonForm' ? (
            <JobBoardAddBtnRow index={index} action={() => setType('add')} />
         ) : type === 'info' ? (
            <JobBoardInfoRow
               index={index}
               jobBoard={jobBoard}
               setType={setType}
            />
         ) : null}
      </>
   )
}

export default JobBoardTableRow
