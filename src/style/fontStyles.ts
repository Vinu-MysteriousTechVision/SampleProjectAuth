import { Platform, StyleSheet } from 'react-native'

export const FontStyles = StyleSheet.create({
  normal: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.select({
      ios: 'HiraginoSans-W3',
      android: 'sans-serif',
    }),
  },
  fontW3: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: Platform.select({
      ios: 'HiraginoSans-W3',
      android: 'sans-serif',
    }),
  },
  fontW6: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'HiraginoSans-W6',
      android: 'sans-serif',
    }),
  },
})
