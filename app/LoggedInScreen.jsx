import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsFeedScreen from './screens/NewsFeed';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/Messages';
import NotificationsScreen from './screens/Notifications';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

const LoggedInScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="NewsFeed" component={NewsFeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default LoggedInScreen;
