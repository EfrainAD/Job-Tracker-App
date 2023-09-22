const JobBoardAddBtnRow = ({ index, action }) => {
   return (
      <tr>
         <td>{index}</td>
         <td colSpan={3}>
            {
               <button className="--btn --btn-block " onClick={action}>
                  Add New Job Board
               </button>
            }
         </td>
      </tr>
   )
}

export default JobBoardAddBtnRow
