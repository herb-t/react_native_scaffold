import { Home, Main } from '../../components';
import SelectionsNavigator from '../../navigators/Selections';

export default {
  Home: {screen: Home},
  Main: {screen: Main},

  Selections: {
    screen: SelectionsNavigator,
    navigationOptions: {
      headerVisible: false
    }
  }
};
