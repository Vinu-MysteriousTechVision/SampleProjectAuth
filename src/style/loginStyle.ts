import { Dimensions, Platform, StyleSheet } from 'react-native'
import { Utils } from '../utils/utils'
import { colors } from './colors'
import { FontStyles } from './fontStyles'

const windowWidth = Dimensions.get('window').width // full width
const windowHeight = Dimensions.get('window').height // full height

export const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    height: 47,
    width: 146,
    marginTop: 59,
  },
  separator: {
    height: 0.5,
    width: 294,
    backgroundColor: '#C2CCC5',
    marginTop: 41,
  },
  activityIndicator: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: (windowHeight + Utils.getNavBarHeight()) / 2 - 100,
    left: windowWidth / 2 - 50,
  },
  titleText: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      height: 26,
      fontSize: 20,
      lineHeight: Platform.select({
        ios: 0,
        android: 26,
      }),
      textAlign: 'left',
      marginTop: 32.5,
      color: '#4D4844',
    },
  ]),
  forgotPasswordText: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      height: 16,
      fontSize: 14,
      lineHeight: Platform.select({
        ios: 0,
        android: 16,
      }),
      textAlign: 'left',
      color: '#4A90E2',
    },
  ]),
  signupText: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      height: 16,
      fontSize: 14,
      lineHeight: Platform.select({
        ios: 0,
        android: 16,
      }),
      textAlign: 'left',
      color: '#4A90E2',
    },
  ]),
  errorText: StyleSheet.flatten([
    FontStyles.normal,
    {
      height: 14,
      fontSize: 14,
      lineHeight: Platform.select({
        ios: 0,
        android: 16,
      }),
      textAlign: 'left',
      color: 'red',
      marginTop: 35,
    },
  ]),
})
