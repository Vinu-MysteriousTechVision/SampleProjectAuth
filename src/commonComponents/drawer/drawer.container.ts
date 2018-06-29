import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { DrawerMenuEnum } from '../../constants'
import { screenName } from '../../navigation'
import { RootState } from '../../reducer'
import { IDrawerComponentDispatchProps, IDrawerComponentStateProps, Drawer } from './drawer.component'
import { MENU_SECTIONS } from './menuItems'
import { actions } from '../../login/actions'
import { Navigation } from 'react-native-navigation'

interface OwnProps {
  componentId: any
}

// NOTE: get required value for this screen from Redux's State, and map it to the interface Component wants.
const mapStateToProps: MapStateToProps<IDrawerComponentStateProps, OwnProps, RootState> = (state: RootState, ownProps: OwnProps) => {
  return {
    userName: '',
    menuSections: MENU_SECTIONS,
  }
}

// NOTE: dispatch Redux action from component's event. e.g. `onPress: dispatch(actions.submit({}))`
const mapDispatchToProps: MapDispatchToProps<IDrawerComponentDispatchProps, OwnProps> = (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
  onDidMount: () => {},
  onPressMenu: (id: DrawerMenuEnum) => {
    if (id === DrawerMenuEnum.Home) {
      Navigation.mergeOptions(ownProps.componentId, {
        sideMenu: {
          left: {
            visible: false,
          },
        },
      })
    } else if (id === DrawerMenuEnum.Logout) {
      // NOTE: logout option added for the development purpose
      dispatch(actions.logoutRequest())
    } else {
      alert('Comming soon!')
    }
  },
})

export const DrawerContainer = connect(mapStateToProps, mapDispatchToProps)(Drawer)
