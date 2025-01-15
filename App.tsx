import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './app/navigation/MainNavigation';
import AuthNavigation from './app/navigation/AuthNavigation';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#8a2be2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <AuthNavigation onLogout={() => setIsAuth(false)} />
      ) : (
        <MainNavigation onLogin={() => setIsAuth(true)} />
      )}
    </NavigationContainer>
  );
}
