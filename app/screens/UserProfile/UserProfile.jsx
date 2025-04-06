import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {getUserData} from './utilities';

const UserProfile = ({navigation}) => {
  const userID = navigation.getParam('userID', 'defaultUserID');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData(userID)
      .then(data => {
        if (data) {
          setUserData(data);
          console.log('Dateles fetched successfully: ', data);
        } else {
          console.log('No user data found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });
  }, [userID]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={{uri: 'https://example.com/user-profile.jpg'}}
        style={{width: 100, height: 100, borderRadius: 50}}
      />
      <Text style={{fontSize: 20, marginTop: 10}}>John Doe</Text>
      <Text style={{fontSize: 16, color: 'gray'}}>@johndoe</Text>
    </View>
  );
};
export default UserProfile;
