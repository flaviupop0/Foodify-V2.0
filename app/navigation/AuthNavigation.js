import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import LoggedInScreen from '../screens/LoggedInScreen/LoggedInScreen';
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
      <Stack.Screen name={Routes.Menu} component={Settings} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
