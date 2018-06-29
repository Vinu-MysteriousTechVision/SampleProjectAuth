import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { screenName } from '../navigation'
import { ButtonIdEnum, setCustomTopBar } from '../utils/navigationController'
import ViewPager from 'react-native-view-pager';
import { BarChart, Grid, PieChart, AreaChart } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import { Graph} from './root.chartComponent'

export interface IRootComponentStateProps {}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IRootComponentDispatchProps {
  onTapOnNavigationButton: (isDrawerOpened: boolean) => void
}

interface IRootProps extends IRootComponentStateProps, IRootComponentDispatchProps {}

interface IRootState {}
const graphData: { 'key': string, 'value': number}[] = [
  {'key' : 'FirstWeek','value': 50}, {'key' : 'SecondWeek','value': -40}, {'key' : 'ThirdWeek', 'value': 15},
  {'key' : 'FourthWeek', 'value': 65}, {'key' : 'FifthWeek', 'value': -85}, {'key' : 'SixWeek', 'value': 25}, {'key' : 'SeventhWeek', 'value': 75}]
const data = graphData.map((value, index) => {
  return value.value
})

export class Root extends React.Component<IRootProps, IRootState> {
  // Navigation options
  static get options() {
    return setCustomTopBar(ButtonIdEnum.Menu, 'Home')
  }
  /*
  public static onNavigationButtonPressed(buttonId: any, props: any) {
    alert('Nav button')
    if (Platform.OS === 'ios') {
      if (Root.isDrawerOpened) {
        Root.isDrawerOpened = false
        Navigation.mergeOptions(props.componentId, {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        })
      } else {
        Root.isDrawerOpened = true
        Navigation.mergeOptions(props.componentId, {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        })
      }
    } else {
      Navigation.mergeOptions(props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      })
    }
  }*/

  private static isDrawerOpened: boolean = true

  constructor(props: IRootProps) {
    super(props)
    Navigation.events().registerComponentDidAppearListener(
      (componentId: any, componentName: any) => {
        if (screenName.DRAWER === componentName) {
          Root.isDrawerOpened = true
        } else if (screenName.ROOT === componentName) {
          Root.isDrawerOpened = false
        }
      },
    )

    Navigation.events().registerComponentDidDisappearListener(
      (componentId: any, componentName: any) => {
        if (screenName.DRAWER === componentName) {
          Root.isDrawerOpened = false
        }
      },
    )
  }

  // Called when a TopBar button is pressed.
  public onNavigationButtonPressed(buttonId: any) {
    this.props.onTapOnNavigationButton(Root.isDrawerOpened)
  }

  public renderGraphTableData = () => {
    const data = graphData.map((value, index) => {
      return(
        <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50, margin: 5, paddingHorizontal: 20, backgroundColor: 'transparent'}}>
          <Text style={{ flex: 0.7, color: '#FFFFFF'}}>{value.key}</Text>
          <Text style={{ flex: 0.3,color: '#FFFFFF'}}>{value.value}</Text>
        </View>
      )
    })
    return(<View style={{flex: 1}}>{data}</View>)
  }

  public render() {
    return (
      <View style={{flex: 1, backgroundColor: 'gray'}}>
        <View style={{}}>
          <Graph data={data} graphData={graphData}/>
        </View>
        <View style={{flex: 1}}>
          <ScrollView style={{ flex: 1}}>
            {this.renderGraphTableData()}
          </ScrollView>
        </View>
      </View>
    )
  }
}
