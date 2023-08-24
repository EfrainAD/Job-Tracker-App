import { createAction } from '../utils/reducer.utils'
import { USER_ACTION_TYPES } from './user.types'

export const setUserLogin = (loginStatus) =>
   createAction(USER_ACTION_TYPES.SET_LOGIN, loginStatus)
export const setUserName = (userName) =>
   createAction(USER_ACTION_TYPES.SET_NAME, userName)
export const setUser = (user) => createAction(USER_ACTION_TYPES.SET_USER, user)
