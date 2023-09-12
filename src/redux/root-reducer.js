import { combineReducers } from 'redux'
import { persistUserReduce } from './user/user.reducer'
import { apiSlice } from '../api/apiSlice'

export const rootReducer = combineReducers({
   user: persistUserReduce,
   [apiSlice.reducerPath]: apiSlice.reducer,
})
