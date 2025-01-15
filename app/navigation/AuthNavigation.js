import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import LoggedInScreen from '../screens/LoggedInScreen/LoggedInScreen';
import HamburgerMenu from '../screens/HamburgerMenu/HamburgerMenu';
import Settings from '../screens/Settings/Settings';

const Stack = createStackNavigator();

const AuthNavigation = ({onLogout}) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LoggedInScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.LoggedInScreen}
        component={props => <LoggedInScreen {...props} onLogout={onLogout} />}
      />
      <Stack.Screen name={Routes.Menu} component={HamburgerMenu} />
      <Stack.Screen name={Routes.Settings} component={Settings} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
