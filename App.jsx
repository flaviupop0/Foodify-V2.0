import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './app/navigation/MainNavigation';
import AuthNavigation from './app/navigation/AuthNavigation';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth().onIdTokenChanged(async firebaseUser => {
      if (firebaseUser) {
        // Get a fresh token
        const idToken = await firebaseUser.getIdToken(true);

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          token: idToken, // Store the latest token
        };

        // Save user data to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuth(true);
      } else {
        // User is logged out
        await AsyncStorage.removeItem('user');
        setUser(null);
        setIsAuth(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#8a2be2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <AuthNavigation
          onLogout={() => {
            auth().signOut();
            setIsAuth(false);
          }}
        />
      ) : (
        <MainNavigation onLogin={() => setIsAuth(true)} />
      )}
    </NavigationContainer>
  );
}
