import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { apiSlice } from '../api/apiSlice'

export const rootReducer = combineReducers({
   user: userReducer,
   [apiSlice.reducerPath]: apiSlice.reducer,
})

// import { configureStore } from '@reduxjs/toolkit'

// export const createStore = (options) =>
//    configureStore({
//       // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
//       middleware: (getDefaultMiddleware) =>
//          getDefaultMiddleware().concat(apiSlice.middleware),
//       ...options,
//    })

// window.store = createStore()

// export const store = createStore()
//
