import { apiSlice } from '../api/apiSlice'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reduceer'
import { persistStore } from 'redux-persist'

export const createStore = (options) =>
   configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(apiSlice.middleware),
      ...options,
   })

const store = createStore()
const persistor = persistStore(store)

export { store, persistor }
