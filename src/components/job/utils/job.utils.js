export const filterJobs = (jobs = [], search = '') => {
   const searchLowerCase = search.toLowerCase().trim()

   return jobs?.filter(
      (job) =>
         job.jobTitle?.toLowerCase().includes(searchLowerCase) ||
         job.company.companyName?.toLowerCase().includes(searchLowerCase) ||
         job.remote?.toLowerCase().includes(searchLowerCase) ||
         job.dateApplied?.includes(searchLowerCase)
   )
}

const getThisSunday = () => {
   // get the day of the week (it's returned in number 0 - 6)
   const today = new Date()
   const todaysDay = today.getDay()
   const todaysDate = today.getDate()

   // Subtrack the day of the week whit today's date to find out when Sunday is
   const lastSunday = new Date()
   lastSunday.setDate(todaysDate - todaysDay)
   lastSunday.setHours(0, 0, 0, 0)

   return lastSunday
}

export const countJobsAppliedThisWeek = (jobs) => {
   const createWeekChecker = () => {
      const sunday = getThisSunday()

      return (date) => date >= sunday
   }

   const isThisWeek = createWeekChecker()

   const jobsThisWeek = jobs.filter((job) =>
      isThisWeek(new Date(job.dateApplied))
   )

   return jobsThisWeek.length
}
