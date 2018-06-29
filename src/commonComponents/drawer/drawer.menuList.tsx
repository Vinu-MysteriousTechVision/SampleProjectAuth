import * as React from 'react'
import {
  Button,
  Image,
  ListRenderItemInfo,
  ScrollView,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { DrawerMenuEnum, DrawerMenuSectionEnum } from '../../constants'
import { DrawerStyles } from '../../style'

export interface IDrawerMenuItem {
  id: DrawerMenuEnum
  name: string
  iconSource: any // required image uri
}

export interface IDrawerMenuSectoionItem {
  title: string
  data: IDrawerMenuItem[]
}

export interface IDrawerMenuListStateProps {
  menuSections: IDrawerMenuSectoionItem[]
}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IDrawerMenuListDispatchProps {
  onPressMenu: (menuId: DrawerMenuEnum) => void
}

interface IDrawerMenuListProps
  extends IDrawerMenuListStateProps,
    IDrawerMenuListDispatchProps {}

const renderItem = (onItemClick: (id: DrawerMenuEnum) => void) => ({
  item,
}: ListRenderItemInfo<IDrawerMenuItem>) => (
  <TouchableOpacity onPress={onItemClick.bind(null, item.id)}>
    <View style={DrawerStyles.drawerListItem}>
      <Image
        style={DrawerStyles.drawerListItemIcon}
        source={require('../../res/images/drawer/menuItemIcon.png')}
      />
      <Text style={DrawerStyles.drawerListItemText}>{item.name}</Text>
    </View>
  </TouchableOpacity>
)

const renderSectionHeaderView = (info: {
  section: SectionListData<IDrawerMenuSectoionItem>
}) => (
  <View
    style={{
      height: info.section.title === DrawerMenuSectionEnum.Section_1 ? 0 : 1,
      backgroundColor: '#BECFD7',
    }}
  />
)

const keyExtractor = (item: any, index: number) => item.id

export const DrawerMenuList: React.SFC<IDrawerMenuListProps> = props => {
  const { onPressMenu, menuSections } = props

  return (
    <View style={DrawerStyles.container}>
      <SectionList
        sections={props.menuSections}
        renderItem={renderItem(onPressMenu)}
        renderSectionHeader={renderSectionHeaderView}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}
