import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { apiSlice } from '../api/apiSlice'

export const rootReducer = combineReducers({
   user: userReducer,
   [apiSlice.reducerPath]: apiSlice.reducer,
})
