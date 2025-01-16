import React from 'react';
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import styles from './style';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFontSize} from '../../../assets/styles/scaling';
import {Routes} from '../../navigation/Routes';
import {useSelector} from 'react-redux';

const Settings = ({navigation}) => {
  const user = useSelector(state => state.user.profile);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'white-content'} translucent={true} />
      <PurpleHeader press={navigation.goBack} title={'Settings'} />
      <View style={styles.infoContainer}>
        <Image
          source={{uri: user?.profilePicture}}
          resizeMode="cover"
          style={styles.profilePicture}
        />
        <Text style={styles.emailText}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>
      <View>
        <View style={styles.border} />
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate(Routes.ProfileSettings)}>
          <Ionicons
            name="person-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Profile settings</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons
            name="lock-closed-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Change password</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons name="mail-outline" color="grey" size={scaleFontSize(25)} />
          <Text style={styles.subtitle}>Change email address</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons
            name="trash-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Delete account</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
      </View>
    </View>
  );
};

export default Settings;
