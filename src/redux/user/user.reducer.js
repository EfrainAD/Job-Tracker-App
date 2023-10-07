import {
   createSetUserObj,
   getLocalStrage,
   removeLocalStrage,
   setLocalStorage,
} from '../utils/reducer.utils'
import { USER_ACTION_TYPES } from './user.types'

const initialState = getLocalStrage() || {
   name: '',
   isLoggedIn: '',
   roles: [],
}

export const userReducer = (state = initialState, action) => {
   const { type, payload } = action

   switch (type) {
      case USER_ACTION_TYPES.SET_LOGIN:
         const setUserObj = createSetUserObj(payload)

         setLocalStorage(setUserObj)

         return {
            ...state,
            ...setUserObj,
         }

      case USER_ACTION_TYPES.SET_LOGOUT:
         removeLocalStrage()
         return {
            ...state,
            isLoggedIn: false,
            name: '',
            roles: [],
         }

      case USER_ACTION_TYPES.SET_USER:
         const setUpdatedUserObj = createSetUserObj(payload)

         setLocalStorage(setUpdatedUserObj)

         return {
            ...state,
            ...setUpdatedUserObj,
         }

      // Set to be Removed
      case USER_ACTION_TYPES.SET_LOGIN_STATUS:
         return { ...state, isLoggedIn: payload }

      // Set to be Removed
      case USER_ACTION_TYPES.SET_NAME:
         return { ...state, name: payload }

      default:
         return state
   }
}
