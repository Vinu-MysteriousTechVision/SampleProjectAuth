import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import _ from 'underscore'
import { actions, IChangeAppRoot } from './actions'

export interface State {
  isLogin: boolean
  isLoading: boolean
  errorText: string
  isLoginRequested: boolean
}

const initialState: State = {
  isLogin: false,
  isLoading: false,
  errorText: '',
  isLoginRequested: false,
}

/*
 * changeAppRootHandler is action handler for change root page
 */
const changeAppRootHandler = (state: State, payload: IChangeAppRoot): State => {
  return {
    ...state,
    isLogin: payload.isLogin,
  }
}

/*
 * onLoginRequestHandler is action handler for change the state values related to the login request
 */
const onLoginRequestHandler = (state: State, payload: {}): State => {
  return {
    ...state,
    isLoginRequested: true,
    errorText: '',
  }
}

/*
 * onLoginRequestSuccessHandler is action handler for success response
 */
const onLoginRequestSuccessHandler = (state: State, payload: {}): State => {
  return {
    ...state,
    isLoginRequested: false,
  }
}

/*
 * onLoginRequestFailHandler is action handler for failure response
 */
const onLoginRequestFailHandler = (state: State, payload: {}): State => {
  return {
    ...state,
    isLoginRequested: false,
    errorText: 'Server Error',
  }
}

/*
 * onLogoutRequestHandler is action handler for change the state values related to the logout request
 */
const onLogoutRequestHandler = (state: State, payload: {}): State => {
  return {
    ...state,
    isLoginRequested: false,
  }
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.changeAppRoot, changeAppRootHandler)
  .case(actions.onLoginRequest, onLoginRequestHandler)
  .case(actions.onLoginRequestSuccess, onLoginRequestSuccessHandler)
  .case(actions.onLoginRequestFail, onLoginRequestFailHandler)
  .case(actions.onLogoutRequest, onLogoutRequestHandler)
  .build()
