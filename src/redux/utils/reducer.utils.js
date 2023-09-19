export const createAction = (type, payload) => ({ type, payload })

export const createSetUserObj = (user) => ({
   isLoggedIn: true,
   name: user.name,
   roles: user.roles,
})

export const setLocalStorage = (setUserObj) => {
   try {
      localStorage.setItem('jobtrackerstorage', JSON.stringify(setUserObj))
   } catch (error) {
      console.log('error:', error)
   }
}

export const getLocalStrage = () => {
   try {
      return JSON.parse(localStorage.getItem('jobtrackerstorage'))
   } catch (error) {
      console.log('error:', error)
   }
}

export const removeLocalStrage = () => {
   try {
      localStorage.removeItem('jobtrackerstorage')
   } catch (error) {
      console.log('error:', error)
   }
}
