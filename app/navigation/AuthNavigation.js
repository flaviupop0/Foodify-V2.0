import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import LoggedInScreen from '../screens/LoggedInScreen/LoggedInScreen';
import HamburgerMenu from '../screens/HamburgerMenu/HamburgerMenu';
import Settings from '../screens/Settings/Settings';
import ProfileSettings from '../screens/ProfileSettings/ProfileSettings';
import EditFieldScreen from '../screens/EditFieldScreen/EditFieldScreen';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import SuccessChangePassword from '../screens/ChangePassword/SuccessChangePassword';
import DeleteAccount from '../screens/DeleteAccount/DeleteAccount';
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
      <Stack.Screen name={Routes.EditField} component={EditFieldScreen} />
      <Stack.Screen name={Routes.ChangePassword} component={ChangePassword} />
      <Stack.Screen
        name={Routes.SuccessChangePassword}
        component={SuccessChangePassword}
      />
      <Stack.Screen name={Routes.DeleteAccount} component={DeleteAccount} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
