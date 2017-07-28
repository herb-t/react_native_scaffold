import { Home, Main } from '../../components';
import TabGroupANavigator from '../../navigators/TabGroupA';
import SettingsNavigator from '../../navigators/Settings';

export default {
  Home: {screen: Home},
  Main: {screen: Main},
  TabGroupA: {
    screen: TabGroupANavigator,
    navigationOptions: {
      headerVisible: false
    }
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: {
      headerVisible: false
    }
  }
};
