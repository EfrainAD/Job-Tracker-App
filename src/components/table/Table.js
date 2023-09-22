const Table = ({ headers, children }) => {
   return (
      <table>
         <thead>
            <tr>
               {headers &&
                  headers.map((head, idx) => (
                     <th
                        className={head.className ? head.className : ''}
                        key={idx}
                     >
                        {head.label}
                     </th>
                  ))}
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   )
}

export default Table
