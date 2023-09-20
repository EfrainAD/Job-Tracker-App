export const filterJobBoards = (jobBoards = [], search = '') => {
   const searchLowerCase = search.toLowerCase().trim()

   return jobBoards?.filter(
      (jobboard) =>
         jobboard.name?.toLowerCase().includes(searchLowerCase) ||
         jobboard.searchUrl?.toLowerCase().includes(searchLowerCase) ||
         jobboard.notes?.toLowerCase().includes(searchLowerCase)
   )
}
