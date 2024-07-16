import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsFeedScreen from './screens/NewsFeed/NewsFeed';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './screens/Messages/Messages';
import NotificationsScreen from './screens/Notifications/Notifications';
import SettingsScreen from './screens/Settings/Settings';

const Tab = createBottomTabNavigator();

const LoggedInScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Messages':
              iconName = focused
                ? 'chatbubble-ellipses'
                : 'chatbubble-ellipses-outline';
              break;
            case 'Notifications':
              iconName = focused
                ? 'notifications-circle-sharp'
                : 'notifications-circle-outline';
              break;
            case 'News':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Profile':
              iconName = focused
                ? 'person-circle-sharp'
                : 'person-circle-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings-sharp' : 'settings-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8a2be2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      })}>
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="News"
        component={NewsFeedScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 5,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    paddingBottom: 5,
  },
});

export default LoggedInScreen;
