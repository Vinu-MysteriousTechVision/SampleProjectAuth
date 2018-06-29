import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { reducer as rootScreenReducer, State as RootState } from './root'
import { reducer as loginReducer, State as LoginState } from './login'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const authPersistConfig = {
  key: 'login',
  storage,
  whitelist: ['isLogin']
}

export interface RootState {
  root: RootState
  login: LoginState
}

const rootReducer = combineReducers<RootState>({
  root: rootScreenReducer,
  login: persistReducer<any, any>(authPersistConfig, loginReducer)
})

export const persistedReducer = persistReducer<any, any>(
  rootPersistConfig,
  rootReducer
)
