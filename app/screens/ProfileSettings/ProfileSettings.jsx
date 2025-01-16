import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {scaleFontSize} from '../../../assets/styles/scaling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileSettings = ({navigation}) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userProfile');
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(user);
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };
    getUserData();
  }, []);
  return (
    <View style={styles.container}>
      <PurpleHeader press={navigation.goBack} title={'Profile settings'} />
      <View style={styles.infoContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: user.profilePicture}}
            resizeMode="cover"
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.editIcon}>
            <MaterialCommunityIcons
              name="pencil"
              size={scaleFontSize(20)}
              color="#8a2be2"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileSettings;
