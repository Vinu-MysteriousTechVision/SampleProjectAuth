/*
import moment from 'moment'
*/
import { Platform, StatusBar } from 'react-native'

/*
 * This method is used to generate the date in japanese format Eg: 2018年3月22日
 **/
 /*
function generateDate(date: string) {
  const year = moment(date, 'YYYY/MM/DD').year()
  const month = moment(date, 'YYYY/MM/DD').month() + 1
  const day = moment(date, 'YYYY/MM/DD').date()

  const dateString = year + '年' + month + '月' + day + '日'

  return dateString
}*/

function getStatusBarHeight() {
  let statusBarHeight: number = 0
  if (Platform.OS === 'android') {
    if (Platform.Version >= 21) {
      statusBarHeight = StatusBar.currentHeight || 0
    } else {
      statusBarHeight = 0
    }
  } else {
    statusBarHeight = 20
  }
  return statusBarHeight
}

function getNavBarHeight() {
  const navBarHeight = getStatusBarHeight() + 50
  return navBarHeight
}

export const Utils = {
  // generateDate,
  getStatusBarHeight,
  getNavBarHeight,
}
