import { createAction } from '../utils/reducer.utils'
import { USER_ACTION_TYPES } from './user.types'

export const setUserStatus = (loginStatus) =>
   createAction(USER_ACTION_TYPES.SET_LOGIN_STATUS, loginStatus)
export const setUserName = (userName) =>
   createAction(USER_ACTION_TYPES.SET_NAME, userName)
export const setUser = (user) => createAction(USER_ACTION_TYPES.SET_USER, user)
export const setLogin = (user) =>
   createAction(USER_ACTION_TYPES.SET_LOGIN, user)
