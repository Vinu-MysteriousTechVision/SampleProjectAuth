import * as React from 'react'
import { Navigator } from 'react-native-navigation'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { LoginFormFieldsEnum } from '../constants'
import { screenName } from '../navigation'
import { RootState } from '../reducer'
import { colors } from '../style'
import { Utils } from '../utils/utils'
import { validateEmail, validatePassword } from '../utils/validator'
import { actions } from './actions'
import {
  ILoginComponentDispatchProps,
  ILoginComponentStateProps,
  Login,
} from './login.component'

interface OwnProps {
  navigator: Navigator
}

// NOTE: get required value for this screen from Redux's State, and map it to the interface Component wants.
const mapStateToProps: MapStateToProps<
  ILoginComponentStateProps,
  OwnProps,
  RootState
> = (state: RootState, ownProps: OwnProps) => {
  const { errorText, isLoginRequested } = state.login
  return {
    isLoading: isLoginRequested,
    errorText,
  }
}

// NOTE: dispatch Redux action from component's event. e.g. `onPress: dispatch(actions.submit({}))`
const mapDispatchToProps: MapDispatchToProps<
  ILoginComponentDispatchProps,
  OwnProps
> = (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
  onDidMount: () => {},
  onLogin: (email: string, password: string) => {
    dispatch(actions.loginRequest(email, password))
  },
  onForgotPassword: () => {},
  onSignupAction: () => {},
})

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(
  Login,
)
