import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsFeedScreen from '../NewsFeed/NewsFeed';
import NotificationsScreen from '../Notifications/Notifications';
import SettingsScreen from '../Settings/Settings';
import {Dimensions, Text} from 'react-native';
import styles from './styles';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabNavigator = () => {
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
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused
                ? 'person-circle-sharp'
                : 'person-circle-outline';
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
        name="Notifications"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Home"
        component={NewsFeedScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({navigation}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'menu' : 'menu-outline'}
              size={size}
              color={color}
              onPress={() => navigation.openDrawer()}
            />
          ),
          tabBarLabel: ({color}) => (
            <Text
              style={[styles.tabBarLabel, {color: color}]}
              onPress={() => navigation.openDrawer()}>
              Menu
            </Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const LoggedInScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      drawerContent={() => <SettingsScreen />}
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: '#121C2C',
        width: Dimensions.get('window').width * 0.85,
      }}>
      <Drawer.Screen name="BottomTabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default LoggedInScreen;
