import { StyleSheet } from 'react-native'
import { colors } from './colors'
import { FontStyles } from './fontStyles'

export const DrawerStyles = StyleSheet.create({
  // Drawer container
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mainBgColor,
  },

  // Drawer component
  container: {
    flex: 1,
    backgroundColor: colors.mainBgColor,
  },
  drawerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    height: 48,
    paddingLeft: 27,
  },
  drawerListItemIcon: {
    width: 20,
    height: 17,
  },
  drawerListItemText: StyleSheet.flatten([
    FontStyles.normal,
    {
      width: 215,
      color: colors.drawerMenuText,
      paddingLeft: 15,
      height: 18,
    },
  ]),

  // drawer header styles
  headerContainer: {
    height: 150,
    backgroundColor: '#E5F5FD',
  },
  headerIconContainer: {
    height: 64,
    width: 64,
    left: 27,
    top: 35,
    borderWidth: 0.5,
    borderColor: '#BECFD7',
    borderRadius: 32,
    backgroundColor: '#CEE5EE',
  },
  headerIcon: {
    height: 64,
    width: 64,
    borderWidth: 0.5,
    borderColor: '#BECFD7',
    borderRadius: 32,
  },
  headerText: StyleSheet.flatten([
    FontStyles.normal,
    {
      color: colors.fontColor,
      height: 18,
      width: 100,
      left: 27,
      top: 47,
    },
  ]),
})
