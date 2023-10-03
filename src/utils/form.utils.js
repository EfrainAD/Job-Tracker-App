export const validateEmail = (email) => {
   const emailValidater =
      /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/

   return email.match(emailValidater)
}

export const isCompanyField = (name) =>
   name === 'companyName' || name === 'peersOutreach' || name === 'companySize'

export const getCompanyDataList = (companies) =>
   companies.map((company) => ({
      value: company.companyName,
   }))
