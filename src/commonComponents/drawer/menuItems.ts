import { DrawerMenuEnum, DrawerMenuSectionEnum } from '../../constants'
import { IDrawerMenuItem, IDrawerMenuSectoionItem } from './drawer.menuList'

export const home: IDrawerMenuItem = {
  id: DrawerMenuEnum.Home,
  name: 'Home',
  iconSource: require('../../res/images/drawer/menuItemIcon.png'),
}

// NOTE: logout option added for the development purpose
export const logout: IDrawerMenuItem = {
  id: DrawerMenuEnum.Logout,
  name: 'Logout',
  iconSource: require('../../res/images/drawer/menuItemIcon.png'),
}

export const MENU_SECTIONS: IDrawerMenuSectoionItem[] = [
  {
    title: DrawerMenuSectionEnum.Section_1,
    data: [home],
  },
  { title: DrawerMenuSectionEnum.Section_2, data: [logout] }, // NOTE: logout option added for the development purpose
]
