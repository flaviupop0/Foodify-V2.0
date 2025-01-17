import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import AuthScreen from '../screens/Login/AuthScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';

const Stack = createStackNavigator();

const MainNavigation = ({onLogin}) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Login}>
        {props => <AuthScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name={Routes.SignUp} component={RegisterScreen} />
      <Stack.Screen name={Routes.ForgetPassword} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
