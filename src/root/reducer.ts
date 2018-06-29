import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions } from './actions'

export interface State {}

const initialState: State = {}

/*
 * rootActionHandler
 */
const rootActionHandler = (state: State, payload: {}): State => {
  return {
    ...state
  }
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.rootAction, rootActionHandler)
  .build()
