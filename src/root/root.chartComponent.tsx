import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import ViewPager from 'react-native-view-pager'
import { BarChart, Grid, PieChart, AreaChart, XAxis } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import * as scale from 'd3-scale'

export interface IGraphComponentStateProps {
  data: (number | undefined)[],
  graphData: { 'key': string, 'value': number}[]
}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IGraphComponentDispatchProps {}

interface IGraphProps extends IGraphComponentStateProps, IGraphComponentDispatchProps {}

interface IGraphState {}

const aryCharts: string[] = ['PieChart', 'BarChart', 'LineChart']

const fill = 'rgb(134, 65, 244)'
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

const Decorator = ({ x, y, data }: any) => {
  return data.map((value: any, index: number) => (
    <Circle
      key={ index }
      cx={ x(index) }
      cy={ y(value) }
      r={ 4 }
      stroke={ 'rgb(134, 65, 244)' }
      fill={ 'white' }
    />
  ))
}

const Line = ({ line }: any) => (<Path d={ line } stroke={ 'rgba(134, 65, 244)' } fill={ 'none' }/>)

export class Graph extends React.Component<IGraphProps, IGraphState> {

  public _viewPager: any
  public state: any = {
    page: 0,
    pageSelected: ''
  }
  constructor(props: IGraphProps) {
    super(props)
    this.state = {
      page: 0,
      pageSelected: '',
      previousPage: '',
      nextPage: aryCharts[1]
    }
  }

  public _renderPage(index: number) {

    const {data} = this.props

    const drawChart = (chartIndex: number) => {
      switch (chartIndex) {
        case 0:
          return (
           <PieChart
             style={{height: 200, margin: 20, backgroundColor: 'transparent', borderRadius: 20}} // #E8DDCB
             data={this.getPieChartData(data)}/>
          )
        case 1:
          return (
            <View style={{ height: 200, padding: 20 }}>
              <BarChart
                style={{ flex: 1}}
                data={data}
                svg={{fill}}
                contentInset={{top: 20, bottom: 20}}
              >
                <Grid/>
              </BarChart>
          </View>
          )
        case 2:
          return(
            <AreaChart
              style={{ height: 200 }}
              data={ data }
              svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
              contentInset={{ top: 20, bottom: 30 }}>
              <Grid/>
              <Line/>
              <Decorator/>
            </AreaChart>
          )
        default:
          return <View/>
      }
    }

    return (
      <View key={index}>
        <View style={{flex: 1}}>
          {drawChart(index)}
        </View>
      </View>
    )
  }

  public _nextPage(event: any) {
    let page = Math.min(this.state.page + 1, aryCharts.length - 1)
    this._viewPager.setPage(page)
    this.setState({
      page: page,
      previousPage: (page !== 0) ? aryCharts[page - 1] : '',
      nextPage: (page !== (aryCharts.length - 1)) ? aryCharts[page + 1] : ''
    })
  }

  public _previousPage(event: any) {
    let page = Math.max(this.state.page - 1, 0)
    this._viewPager.setPage(page)
    this.setState({
      page: page,
      previousPage: (page !== 0) ? aryCharts[page - 1] : '',
      nextPage: (page !== (aryCharts.length - 1)) ? aryCharts[page + 1] : ''
    })
  }

  public _onPageSelected(event: any) {
    this.setState({
      page: event.nativeEvent.position,
      previousPage: (event.nativeEvent.position !== 0) ? aryCharts[event.nativeEvent.position - 1] : '',
      nextPage: (event.nativeEvent.position !== (aryCharts.length - 1)) ? aryCharts[event.nativeEvent.position + 1] : ''
    })
  }

  public drawChartPage() {
    let pages = []
    for (let i = 0; i < aryCharts.length; i++) {
      pages.push(this._renderPage(i))
    }
    return pages
  }

  public render() {
    return (
      <View style={{height: 300, backgroundColor: 'gray'}}>
        <ViewPager
          ref={(viewPager: any) => {this._viewPager = viewPager}}
          style={styles.scrollview}
          initialPage={this.state.page}
          onPageSelected={this._onPageSelected.bind(this)}>
          {this.drawChartPage()}
        </ViewPager>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={this._previousPage.bind(this)}>
            <Text style={styles.message}>{this.state.previousPage}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={this._nextPage.bind(this)}>
            <Text style={styles.message}>{this.state.nextPage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  private getPieChartData(data: (number | undefined)[]) {
    const pieData = data
      .filter(value => { return ((value !== undefined) && (value > 0))})
      .map((value, index) => ({
          value,
          svg: {
            fill: randomColor(),
            onPress: () => {alert('press' + value)}
          },
          key: `pie-${index}`
      }))
    return pieData
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#e5e7ff'// '#031634',
  },
  page: {
    flex: 1,
    margin: 20,
    backgroundColor: '#E8DDCB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayname: {
    fontSize: 25,
    color: '#036564',
  },
  day: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#033649',
  },
  month: {
    fontSize: 25,
    color: '#036564',
  },
  bottom: {
    height: 60,
    backgroundColor: '#031634',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status: {
    flex: 1,
  },
  button: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#E8DDCB',
  }
});
