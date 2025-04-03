/* eslint-disable no-undef */
jest.mock('@react-native-async-storage/async-storage');
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    // Needed for navigation
    gestureHandlerRootHOC: Component => Component,
    // Prevents crashes from animated wrapper components
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    Directions: {},
    // Default export fallback
    default: {},
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    NavigationContainer: ({children}) => children,
  };
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({children}) => children,
      Screen: ({children}) => children,
    }),
  };
});

jest.mock('@react-navigation/drawer', () => {
  return {
    createDrawerNavigator: jest.fn().mockReturnValue({
      Navigator: ({children}) => children,
      Screen: ({children}) => children,
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: ({children}) => children,
      Screen: ({children}) => children,
    }),
  };
});

jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-firebase/storage');
jest.mock('@react-native-firebase/firestore');
jest.mock('react-native-date-picker');
jest.mock('react-native-device-info');
jest.mock('@fortawesome/react-native-fontawesome');
jest.mock('react-native-vector-icons/Ionicons');
jest.mock('react-native-vector-icons/MaterialIcons');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('react-native-vector-icons/FontAwesome5');
jest.mock('react-native-permissions');
jest.mock('react-native-image-crop-picker');
