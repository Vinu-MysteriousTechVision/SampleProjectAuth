import { Navigation } from 'react-native-navigation'
import { screenName } from './screen-name'

export const startNavigation = (isAuthenticated: boolean) => {
  // Check the application is logined or not
  if (isAuthenticated) {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: screenName.DRAWER,
            },
          },
          center: {
            stack: {
              children: [
                {
                  component: {
                    name: screenName.ROOT,
                  },
                },
              ],
              options: {
                topBar: {
                  title: {
                    text: 'ROOT',
                  },
                },
              },
            },
          },
        },
      },
    })
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screenName.LOGIN,
              },
            },
          ],
        },
      },
    })
  }
}
