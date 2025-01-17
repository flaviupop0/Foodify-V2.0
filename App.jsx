import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './app/navigation/MainNavigation';
import AuthNavigation from './app/navigation/AuthNavigation';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(async firebaseUser => {
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          await AsyncStorage.removeItem('user');
          setUser(null);
          setIsAuth(false);
          setLoading(false);
          return;
        }

        const idToken = await firebaseUser.getIdToken(true);
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          token: idToken,
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuth(true);
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
        setIsAuth(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
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
