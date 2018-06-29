import * as React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'
import { FontStyles } from '../style'

export interface ICustomButtonStateProps {
  title: string
  disabled?: boolean
}

export interface ICustomButtonDispatchProps {
  onPressAction: () => void
}

interface ICustomButtonComponentProps
  extends ICustomButtonStateProps,
    ICustomButtonDispatchProps {
  buttonStyle?: ViewStyle
}

export const CustomButton: React.SFC<ICustomButtonComponentProps> = props => {
  const { buttonStyle, title, onPressAction, disabled } = props
  return (
    <View>
      {(disabled && (
        <View
          style={[
            CustomButtonStyles.buttonContainer,
            buttonStyle,
            { backgroundColor: '#4A90E280' },
          ]}
        >
          <Text style={CustomButtonStyles.title}>{title}</Text>
        </View>
      )) || (
        <TouchableHighlight
          style={[CustomButtonStyles.buttonContainer, buttonStyle]}
          onPress={onPressAction}
          underlayColor="rgba(74, 144, 226, 0.6)"
        >
          <Text style={CustomButtonStyles.title}>{title}</Text>
        </TouchableHighlight>
      )}
    </View>
  )
}

CustomButton.defaultProps = {
  disabled: false,
}

export const CustomButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: 266,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 22,
    backgroundColor: '#4A90E2',
  },
  title: StyleSheet.flatten([
    FontStyles.fontW6,
    {
      height: 18,
      fontSize: 16,
      lineHeight: Platform.select({
        ios: 0,
        android: 18,
      }),
      textAlign: 'left',
      color: '#FFFFFF',
    },
  ]),
})
