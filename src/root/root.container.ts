import * as React from 'react'
import { Platform } from 'react-native'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { screenName } from '../navigation'
import { RootState } from '../reducer'
import { actions } from './actions'
import {
  IRootComponentDispatchProps,
  IRootComponentStateProps,
  Root,
} from './root.component'
import { Navigation } from 'react-native-navigation'

interface OwnProps {
  componentId: any
}

// NOTE: get required value for this screen from Redux's State, and map it to the interface Component wants.
const mapStateToProps: MapStateToProps<
  IRootComponentStateProps,
  OwnProps,
  RootState
> = (state: RootState, ownProps: OwnProps) => {
  return {}
}

// NOTE: dispatch Redux action from component's event. e.g. `onPress: dispatch(actions.submit({}))`
const mapDispatchToProps: MapDispatchToProps<
  IRootComponentDispatchProps,
  OwnProps
> = (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
  onDidMount: () => {},
  onTapOnNavigationButton: isDrawerOpened => {
    if (Platform.OS === 'ios') {
      if (isDrawerOpened) {
        Navigation.mergeOptions(ownProps.componentId, {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        })
      } else {
        Navigation.mergeOptions(ownProps.componentId, {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        })
      }
    } else {
      Navigation.mergeOptions(ownProps.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
        topBar: {
          leftButtons: [
            {
              id: 'buttonMenu',
              icon: require('../res/images/menuIcon.png'), // for icon button, provide the local image asset name
            }
          ]
        },
      })
    }
  }
})

export const RootContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Root)
