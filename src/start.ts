import { Navigation } from 'react-native-navigation'
import { connect, MapDispatchToProps, MapStateToProps, Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { register as registerScreen } from './navigation'
import { startNavigation } from './navigation'
import { RootState } from './reducer'
import { store } from './store'
import { actions } from './login'

registerScreen(store, Provider)

export default class Start {
  private isAppLogin: any

  constructor() {
    Navigation.events().registerAppLaunchedListener(() => {
      persistStore(store, undefined, () => {
        store.subscribe(this.launchStartScreen.bind(this))
        store.dispatch(actions.appInitialized())
      })
    })
  }

  private launchStartScreen() {
    const { isLogin } = store.getState().login
    // handle a root change
    if (this.isAppLogin !== isLogin) {
      this.isAppLogin = isLogin
      startNavigation(isLogin)
    }
  }
}
