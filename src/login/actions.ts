import { AsyncStorage } from 'react-native'
import { Action, combineReducers, Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import _ from 'underscore'
import { RootState } from '../reducer'

export interface IChangeAppRoot {
  isLogin: boolean
}

const actionCreator = actionCreatorFactory()

const changeAppRoot = actionCreator<IChangeAppRoot>('Login/CHANGE_APP_ROOT')
const onLoginRequest = actionCreator<{}>('Login/LOGIN_REQUEST')
const onLogoutRequest = actionCreator<{}>('Login/LOGOUT_REQUEST')
const onLoginRequestSuccess = actionCreator<{}>('Login/LOGIN_SUCCESS')
const onLoginRequestFail = actionCreator<{}>('Login/LOGIN_FAIL')

/*
 * method appInitialized
 * This method is used to intialize the root screen
 **/
const appInitialized = (): any => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const isAuthenticated = getState().login.isLogin
    if (isAuthenticated) {
      // App in login state
      dispatch(changeAppRoot({ isLogin: true }))
    } else {
      // App in logout state
      dispatch(changeAppRoot({ isLogin: false }))
    }
  }
}

/*
 * method loginRequest
 * This method login request handler
 **/
const loginRequest = (email: string, password: string): any => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    // set State values related to the login request
    dispatch(onLoginRequest({}))

    setTimeout(() => {
      // NOTE: This for Development purpose, to show loading. This need to remove when integrating the API
      // TODO: login request API

      const response = {
        userDetails: {
          username: 'John Doe',
          user_id: 1001,
        },
      }

      if (!_.isUndefined(response) && !_.isNull(response) && !_.isEmpty(response)) {
        const userDetails = !_.isUndefined(response.userDetails) && !_.isNull(response.userDetails) && !_.isEmpty(response.userDetails) ? response.userDetails: {}
        dispatch(changeAppRoot({ isLogin: true }))
        dispatch(onLoginRequestSuccess({}))
      } else {
        dispatch(onLoginRequestFail({}))
      }
    }, 1000)
  }
}

/*
 * method logoutRequest
 * This method logout request handler
 **/
const logoutRequest = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(changeAppRoot({ isLogin: false }))
    } catch (error) {
      // TODO:
      dispatch(changeAppRoot({ isLogin: false }))
    }
  }
}

export const actions = {
  appInitialized,
  changeAppRoot,
  loginRequest,
  logoutRequest,
  onLoginRequest,
  onLoginRequestSuccess,
  onLoginRequestFail,
  onLogoutRequest,
}
