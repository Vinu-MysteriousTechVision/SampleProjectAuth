import _ from 'underscore'

export enum ButtonIdEnum {
  Menu = 1,
  Back,
  Close,
}

/*
 * navigatorButtons method return the navigation buttons
 */
export const navigatorButtons = () => {
  return {
    leftButtons: [
      {
        id: 'sideMenu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        icon: require('../res/images/menuIcon.png'), // for icon button, provide the local image asset name
      },
    ], // see "Adding buttons to the navigator" below for format (optional)
    animated: true, // does the change have transition animation or does it happen immediately (optional)
  }
}

/*
 * navigatorCustomBackButtons method return the custom back button
 */
export const navigatorCustomBackButtons = () => {
  return {
    leftButtons: [
      {
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        icon: require('../res/images/arrow_left.png'), // for icon button, provide the local image asset name
      },
    ], // see "Adding buttons to the navigator" below for format (optional)
    animated: true, // does the change have transition animation or does it happen immediately (optional)
  }
}

const getNavLeftSideButton = (id: ButtonIdEnum) => {
  switch (id) {
    case ButtonIdEnum.Menu:
      return {
        id: 'buttonMenu',
        icon: require('../res/images/menuIcon.png'), // for icon button, provide the local image asset name
      }
    case ButtonIdEnum.Back:
      return {
        id: 'buttonBack',
        icon: require('../res/images/arrow_left.png'), // for icon button, provide the local image asset name
      }
    case ButtonIdEnum.Close:
      return {
        id: 'buttonClose',
        icon: require('../res/images/close.png'), // for icon button, provide the local image asset name
      }
    default:
      return {
        id: 'buttonMenu',
        icon: require('../res/images/menuIcon.png'), // for icon button, provide the local image asset name
      }
  }
}

export const setCustomTopBar = (id: ButtonIdEnum, title?: string) => {
  return {
    topBar: {
      title: {
        text: title,
      },
      leftButtons: [getNavLeftSideButton(id)],
    },
  }
}
