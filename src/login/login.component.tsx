import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TextInputProperties,
  TextInputStatic,
  TouchableHighlight,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  CustomButton,
  ICustomButtonDispatchProps,
  ICustomButtonStateProps,
} from '../commonComponents/custom.ButtonComponent'
import { CommonStyles, LoginStyle } from '../style'
import { validateEmail, validatePassword } from '../utils/validator'

import dismissKeyboard from 'dismissKeyboard'
import TextInputState from 'TextInputState'

export interface ILoginComponentStateProps {
  isLoading: boolean
  errorText: string
}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface ILoginComponentDispatchProps {
  onDidMount: () => void
  onLogin: (email: string, password: string) => void
  onForgotPassword: () => void
  onSignupAction: () => void
}

interface ILoginProps
  extends ILoginComponentStateProps,
    ILoginComponentDispatchProps {
  navigator: Navigator
}

type NameType = 'email' | 'password'

type FormState = { [name in NameType]: string }

type TextInputField = React.Component<TextInputProperties, React.ComponentState> & TextInputStatic

interface ILoginState {
  form: FormState
  errorMessage: string
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  // Navigation options
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
    }
  }

  private static getDerivedStateFromProps(nextProps: ILoginProps, prevState: ILoginState) {
    const nextState = {} as ILoginState

    // Check have any error from API Request
    if (nextProps.errorText !== prevState.errorMessage) {
      nextState.errorMessage = nextProps.errorText
    }
    return nextState
  }

  public state: ILoginState = {
    form: {
      email: '',
      password: '',
    },
    errorMessage: '',
  }

  private formRef: { [name in keyof FormState]: TextInputField | null } = {
    email: null,
    password: null,
  }

  constructor(props: ILoginProps) {
    super(props)
    this.onChangeEmailTextinput = this.onChangeEmailTextinput.bind(this)
    this.onChangePWDTextinput = this.onChangePWDTextinput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  public componentDidMount() {
    const { onDidMount } = this.props
    onDidMount()
  }

  public render() {
    const {
      onLogin,
      onSignupAction,
      onForgotPassword,
      isLoading,
      errorText,
    } = this.props
    const { email, password } = this.state.form
    const { errorMessage } = this.state

    return (
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        style={LoginStyle.container}
        contentContainerStyle={{ alignItems: 'center' }}
        keyboardShouldPersistTaps={'always'}
        enableOnAndroid={true}
      >
        <View style={LoginStyle.scrollContainer}>
          <View style={LoginStyle.imageIcon}/>
          <View style={LoginStyle.separator}/>
          <Text style={LoginStyle.titleText}>Login</Text>
          <TextInput
            ref={(refObj: TextInputField) => {
              this.formRef.email = refObj
            }}
            style={[CommonStyles.textinput, { marginTop: 32 }]}
            placeholder="User name or E-mail"
            placeholderTextColor="#C2C9CC"
            underlineColorAndroid="#FFFFFF"
            onChangeText={this.onChangeEmailTextinput}
            value={email}
            returnKeyType="next"
            returnKeyLabel="Next"
            keyboardType="email-address"
            blurOnSubmit={false}
            onFocus={this.onFocus}
            onSubmitEditing={this.focusNextField(this.formRef.password)}
          />
          <TextInput
            ref={(refObj: TextInputField) => {
              this.formRef.password = refObj
            }}
            style={[CommonStyles.textinput, { marginTop: 32 }]}
            placeholder="Password"
            placeholderTextColor="#C2C9CC"
            underlineColorAndroid="#FFFFFF"
            secureTextEntry={true}
            onChangeText={this.onChangePWDTextinput}
            value={password}
            returnKeyType="done"
            returnKeyLabel="Done"
            onSubmitEditing={this.onSubmit}
            blurOnSubmit={true}
            onFocus={this.onFocus}
          />
          <TouchableHighlight
            style={{ alignSelf: 'flex-end', marginTop: 16 }}
            onPress={onForgotPassword}
            underlayColor="rgba(255,255,255,1)"
          >
            <Text style={LoginStyle.forgotPasswordText}>Did you forget your password?</Text>
          </TouchableHighlight>
          <Text style={[LoginStyle.errorText]}>{errorMessage}</Text>
          <CustomButton
            title="Login"
            onPressAction={this.onSubmit}
            buttonStyle={{ borderRadius: 5, width: 294, marginTop: 5 }}
            disabled={!this.isFillAllRequiredField}
          />
          <TouchableHighlight
            style={{ marginTop: 24, marginBottom: 20 }}
            onPress={onSignupAction}
            underlayColor="rgba(255,255,255,1)"
          >
            <Text style={LoginStyle.signupText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
        <ActivityIndicator
          animating={isLoading}
          style={[LoginStyle.activityIndicator, { width: isLoading ? 100 : 0, height: isLoading ? 100 : 0 }]} size="large" color="#262626"/>
      </KeyboardAwareScrollView>
    )
  }

  private checkValidation(email: string, password: string): boolean {
    let errorMsg: string = ''
    let isValidForm: boolean = true

    if (!validateEmail(email) && email !== '') {
      errorMsg = 'メールアドレスが正しくありません' // 'E-mail address is wrong'
      isValidForm = false
    } else if (!validatePassword(password) && password !== '') {
      errorMsg = 'パスワードが正しくありません' // 'The password is in correct'
      isValidForm = false
    }

    this.setState({ errorMessage: errorMsg })

    return isValidForm
  }

  private onChangeEmailTextinput(text: string) {
    this.setState({
      form: {
        ...this.state.form,
        email: text,
      },
    })
    if (this.state.errorMessage !== '') {
      this.checkValidation(text, this.state.form.password)
    }
  }

  private onChangePWDTextinput(text: string) {
    this.setState({
      form: {
        ...this.state.form,
        password: text,
      },
    })
    if (this.state.errorMessage !== '') {
      this.checkValidation(this.state.form.email, text)
    }
  }

  private onSubmit() {
    dismissKeyboard()
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField())

    const { email, password } = this.state.form
    if (!this.checkValidation(email, password)) {
      return
    }
    this.props.onLogin(email, password)
  }

  private onFocus() {
    const { email, password } = this.state.form
    if (email !== '' || password !== '') {
      this.checkValidation(email, password)
    }
  }

  private focusNextField = (nextField: TextInputField | null) => () => {
    const { email, password } = this.state.form
    this.checkValidation(email, password)

    if (nextField !== null) {
      nextField.focus()
    }
  }

  private get isFillAllRequiredField(): boolean {
    const { email, password } = this.state.form
    return validateEmail(email) && validatePassword(password)
  }
}
