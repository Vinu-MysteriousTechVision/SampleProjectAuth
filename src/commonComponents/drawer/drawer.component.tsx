import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TextInputProperties,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native'
import { DrawerMenuEnum } from '../../constants'
import { DrawerStyles } from '../../style'
import {
  DrawerHeader,
  IDrawerHeaderDispatchProps,
  IDrawerHeaderStateProps,
} from './drawer.header'
import {
  DrawerMenuList,
  IDrawerMenuListDispatchProps,
  IDrawerMenuListStateProps,
} from './drawer.menuList'

export interface IDrawerComponentStateProps extends IDrawerMenuListStateProps, IDrawerHeaderStateProps {}
// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IDrawerComponentDispatchProps extends IDrawerMenuListDispatchProps, IDrawerHeaderDispatchProps {}

interface IDrawerProps extends IDrawerComponentStateProps, IDrawerComponentDispatchProps {}

interface IDrawerState {}

export class Drawer extends React.Component<IDrawerProps, IDrawerState> {

  constructor(props: IDrawerProps) {
    super(props)
  }

  public componentDidMount() {
    const {} = this.props
  }

  public render() {
    const { onPressMenu, menuSections } = this.props
    return (
      <View style={DrawerStyles.mainContainer}>
        <ScrollView>
          <DrawerHeader userName="山田　花子"/>
          <DrawerMenuList
            // Note that component use just object passed from container.
            onPressMenu={onPressMenu}
            menuSections={menuSections}
          />
        </ScrollView>
      </View>
    )
  }
}
