import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import AuthScreen from '../screens/Login/AuthScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import LoggedInScreen from '../screens/LoggedInScreen/LoggedInScreen';
import Settings from '../screens/Settings/Settings';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Login} component={AuthScreen} />
      <Stack.Screen name={Routes.SignUp} component={RegisterScreen} />
      <Stack.Screen name={Routes.ForgetPassword} component={ForgotPassword} />
      <Stack.Screen name={Routes.LoggedInScreen} component={LoggedInScreen} />
      <Stack.Screen name={Routes.Menu} component={Settings} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
