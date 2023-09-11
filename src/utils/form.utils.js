export const validateEmail = (email) => {
   const emailValidater =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

   return email.match(emailValidater)
}
