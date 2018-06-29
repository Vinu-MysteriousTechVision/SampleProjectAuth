import { Platform, StyleSheet } from 'react-native'
import { colors } from './colors'
import { FontStyles } from './fontStyles'

export const Homestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBgColor,
    paddingHorizontal: 20,
  },
  pageTitle: StyleSheet.flatten([
    FontStyles.normal,
    {
      color: colors.topPageFontColor,
      fontSize: 24,
      lineHeight: 26,
      textAlign: 'left',
      fontWeight: '600',
      marginTop: 20,
    },
  ]),
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    marginVertical: 10,
    padding: 0,
  },
  stepImageContainer: {
    height: 100,
    backgroundColor: 'transparent',
  },
  setpDescriptionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 100,
    backgroundColor: 'transparent',
    marginLeft: 20,
  },
  stepImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  stepTextContainer: {
    width: 84,
    height: 19,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#83C0FF',
    borderWidth: 1,
    borderRadius: 42,
    borderColor: 'transparent',
    alignSelf: 'center',
  },
  stepText: StyleSheet.flatten([
    FontStyles.normal,
    {
      color: '#FFFFFF',
      lineHeight: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
  ]),
  stepTitle: StyleSheet.flatten([
    FontStyles.normal,
    {
      position: 'absolute',
      bottom: 0,
      height: 16,
      color: colors.topPageFontColor,
      fontWeight: '600',
      justifyContent: 'flex-end',
    },
  ]),
  stepTitleShadowView: {
    backgroundColor: '#FFED0D73',
    height: 10,
  },
  stepDescription: StyleSheet.flatten([
    FontStyles.normal,
    {
      color: colors.topPageFontColor,
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '400',
      textAlign: 'left',
      marginTop: 10,
    },
  ]),
  button: {
    height: 44,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: StyleSheet.flatten([
    FontStyles.normal,
    {
      color: '#FFFFFF',
      fontWeight: '600',
      alignSelf: 'center',
      marginTop: 5,
    },
  ]),
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  linkText: {
    color: '#9B9B9B',
  },
  linkUnderline: {
    justifyContent: 'center',
    backgroundColor: '#9B9B9B',
    height: 1,
  },
})
