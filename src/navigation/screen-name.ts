import { screenName as rootScreenName } from '../root/navigation'
import { screenName as loginScreenName } from '../login/navigation'
import { screenName as drawerScreenName } from '../commonComponents/drawer/navigation'

export const screenName = {
  ...rootScreenName,
  ...drawerScreenName,
  ...loginScreenName
}
