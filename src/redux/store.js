import { apiSlice } from '../api/apiSlice'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reduceer'

export const createStore = (options) =>
   configureStore({
      reducer: rootReducer,

      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(apiSlice.middleware),
      ...options,
   })

window.store = createStore()

export const store = createStore()
