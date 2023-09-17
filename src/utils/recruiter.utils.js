export const filterRecruiters = (recruiters = [], search = '') => {
   const searchLowerCase = search.toLowerCase()
   const filterByFields = [
      'name',
      'company',
      'outreachMethod',
      'outreachDate',
      'conversationDate',
   ]

   return recruiters?.filter((recruiter) => {
      return filterByFields.some((fieldName) => {
         const field = recruiter[fieldName]
         if (field) {
            return field.toLowerCase().includes(searchLowerCase)
         }
         return false
      })
   })
}
