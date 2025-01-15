import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsFeedScreen from '../NewsFeed/NewsFeed';
import NotificationsScreen from '../Notifications/Notifications';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
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
        name="Menu"
        component={HamburgerMenu}
        options={({navigation}) => ({
          tabBarButton: ({focused}) => (
            <TouchableOpacity
              style={{
                marginLeft: Dimensions.get('window').width * 0.15,
                marginTop: Dimensions.get('window').height * 0.004,
              }}
              onPress={() => navigation.openDrawer()}>
              <Ionicons
                name={focused ? 'menu' : 'menu-outline'}
                size={30}
                color={'grey'}
                onPress={() => navigation.openDrawer()}
              />
              <Text
                style={[styles.tabBarLabel, {color: 'grey'}]}
                onPress={() => navigation.openDrawer()}>
                Menu
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const LoggedInScreen = ({onLogout}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
      }}
      drawerContent={props => <HamburgerMenu {...props} onLogout={onLogout} />}
      drawerStyle={{
        backgroundColor: '#121C2C',
        width: Dimensions.get('window').width * 0.85,
      }}>
      <Drawer.Screen name="BottomTabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default LoggedInScreen;
