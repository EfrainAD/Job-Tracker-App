import { USER_ACTION_TYPES } from './user.types'

const name = JSON.parse(localStorage.getItem('name')) || ''
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || ''
const user = JSON.parse(localStorage.getItem('user')) || {
   name: '',
   email: '',
   phone: '',
   bio: '',
   photo: '',
}

const initialState = {
   isLoggedIn,
   name,
   user,
}

export const userReducer = (state = initialState, action) => {
   const { type, payload } = action

   switch (type) {
      case USER_ACTION_TYPES.SET_LOGIN:
         localStorage.setItem('isLoggedIn', payload)
         return { ...state, isLoggedIn: payload }

      case USER_ACTION_TYPES.SET_NAME:
         localStorage.setItem('userName', payload)
         return { ...state, name: payload }

      case USER_ACTION_TYPES.SET_USER:
         const user = {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            bio: payload.bio,
            photo: payload.photo,
         }

         localStorage.setItem('user', JSON.stringify(user))

         return {
            ...state,
            user,
         }

      default:
         return state
   }
}
