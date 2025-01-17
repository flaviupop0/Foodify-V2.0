import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import LoggedInScreen from '../screens/LoggedInScreen/LoggedInScreen';
import HamburgerMenu from '../screens/HamburgerMenu/HamburgerMenu';
import Settings from '../screens/Settings/Settings';
import ProfileSettings from '../screens/ProfileSettings/ProfileSettings';
const Stack = createStackNavigator();

const AuthNavigation = ({onLogout}) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LoggedInScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.LoggedInScreen}>
        {props => <LoggedInScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name={Routes.Menu} component={HamburgerMenu} />
      <Stack.Screen name={Routes.Settings} component={Settings} />
      <Stack.Screen name={Routes.ProfileSettings} component={ProfileSettings} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
