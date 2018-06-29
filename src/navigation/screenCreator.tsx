/*
 * This class is connect the register component with the redux store
 */

import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { RootState } from '../reducer'

function registerContainer(containerName: any, generator: any) {
  Navigation.registerComponent(containerName, generator)
}

export function registerContainerWithRedux(
  containerName: any,
  component: any,
  store: Store<RootState>,
  provider: typeof Provider,
) {
  const generatorWrapper = () => {
    const InternalComponent = component
    return class Scene extends Component {
      private static options = {
        // LINKED HERE
        ...InternalComponent.options,
      }

      private child: any

      constructor(props: any) {
        super(props)
      }

      public render() {
        return (
          <Provider store={store}>
            <InternalComponent
              ref={(refObj: any) => {
                this.child = refObj
              }}
              {...this.props}
            />
          </Provider>
        )
      }

      // Called when a TopBar button is pressed.
      public onNavigationButtonPressed(id: any) {
        const instance = this.child.getWrappedInstance()
        if (instance.onNavigationButtonPressed !== undefined) {
          // Called InternalComponent TopBar handler method
          instance.onNavigationButtonPressed(id)
        }
      }
    }
  }

  registerContainer(containerName, generatorWrapper)
}
