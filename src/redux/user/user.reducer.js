import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { USER_ACTION_TYPES } from './user.types'

const initialState = {
   name: '',
   isLoggedIn: '',
   user: {
      name: '',
      email: '',
      phone: '',
      bio: '',
      photo: '',
   },
}

const userReducer = (state = initialState, action) => {
   const { type, payload } = action

   switch (type) {
      case USER_ACTION_TYPES.SET_LOGIN:
         return {
            ...state,
            isLoggedIn: true,
            name: payload.name,
            user: {
               name: payload.name,
               email: payload.email,
               phone: payload.phone,
               bio: payload.bio,
               photo: payload.photo,
            },
         }

      case USER_ACTION_TYPES.SET_LOGIN_STATUS:
         return { ...state, isLoggedIn: payload }

      case USER_ACTION_TYPES.SET_NAME:
         return { ...state, name: payload }

      case USER_ACTION_TYPES.SET_USER:
         return {
            ...state,
            user: {
               name: payload.name,
               email: payload.email,
               phone: payload.phone,
               bio: payload.bio,
               photo: payload.photo,
            },
         }

      default:
         return state
   }
}

const userPersistConfig = {
   key: 'user',
   storage,
}

export const persistUserReduce = persistReducer(userPersistConfig, userReducer)
