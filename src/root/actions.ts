import { AsyncStorage } from 'react-native'
import { Action, combineReducers, Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

const rootAction = actionCreator<{}>('Root/Root_Action')

export const actions = {
  rootAction
}
