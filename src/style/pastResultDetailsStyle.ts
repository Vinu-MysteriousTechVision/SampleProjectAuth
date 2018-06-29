import { Dimensions, Platform, StyleSheet } from 'react-native'
import { Utils } from '../utils/utils'
import { colors } from './colors'
import { FontStyles } from './fontStyles'

const windowWidth = Dimensions.get('window').width // full width
const windowHeight = Dimensions.get('window').height // full height

export const PastResultDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: 75,
    justifyContent: 'center',
  },
  resultHeaderTitle: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      height: 20,
      fontSize: 20,
      lineHeight: Platform.select({
        ios: 0,
        android: 22,
      }),
      textAlign: 'left',
      color: '#464B4D',
      letterSpacing: 3.2,
      marginTop: 5,
    },
  ]),
  descriptionContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  resultDescription: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      fontSize: 16,
      lineHeight: Platform.select({
        ios: 0,
        android: 30,
      }),
      textAlign: 'left',
      color: '#464B4D',
      letterSpacing: 0.8,
    },
  ]),
  emptyContainer: {
    position: 'absolute',
    width: windowWidth,
    top: (windowHeight + Utils.getNavBarHeight()) / 2 - 100,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activityIndicator: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: (windowHeight + Utils.getNavBarHeight()) / 2 - 100,
    left: windowWidth / 2 - 50,
  },
})
