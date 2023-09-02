export const filterJobs = (jobs = [], search = '') => {
   const searchLowerCase = search.toLowerCase()

   return jobs?.filter(
      (job) =>
         job.jobTitle?.toLowerCase().includes(searchLowerCase) ||
         job.companyName?.toLowerCase().includes(searchLowerCase) ||
         job.remote?.toLowerCase().includes(searchLowerCase) ||
         job.dateApplied?.includes(searchLowerCase)
   )
}
