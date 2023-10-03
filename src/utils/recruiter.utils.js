export const filterRecruiters = (recruiters = [], search = '') => {
   const searchLowerCase = search.toLowerCase()
   const filterByFields = [
      (recruiter) => recruiter.name,
      (recruiter) => recruiter.company.companyName,
      (recruiter) => recruiter.outreachMethod,
      (recruiter) => recruiter.outreachDate,
      (recruiter) => recruiter.conversationDate,
   ]

   return recruiters?.filter((recruiter) => {
      return filterByFields.some((getFieldValue) => {
         const value = getFieldValue(recruiter)
         if (value) {
            return value.toLowerCase().includes(searchLowerCase)
         }
         return false
      })
   })
}
