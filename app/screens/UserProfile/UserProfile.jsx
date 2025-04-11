import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {getAllPosts, getUserData} from './utilities';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import styles from './styles';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePostItem from '../../components/ProfilePostItem/ProfilePostItem';
import {Routes} from '../../navigation/Routes';

const UserProfile = ({route, navigation}) => {
  const userID = route.params.userID;
  const fromSettings = route.params.fromSettings;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    getUserData(userID)
      .then(data => {
        if (data) {
          setUserData(data);
        } else {
          console.log('No user data found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });

    getAllPosts(userID)
      .then(data => {
        if (data) {
          setPostsData(data);
          console.log('Posts data: ', data);
          setIsLoading(false);
        } else {
          console.log('No posts data found');
        }
      })
      .catch(error => {
        console.error('Error fetching user posts: ', error);
      });
  }, [userID]);

  return (
    <View style={{flex: 1}}>
      <PurpleHeader
        title={userData?.userName}
        press={() => navigation.goBack()}
      />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <View>
          <View style={styles.profileInfoContainer}>
            <View>
              <ProfilePicture
                style={styles.profilePicture}
                imageUrl={userData?.profilePicture}
              />
              {fromSettings && (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderRadius: 100,
                    borderColor: '#8a2be2',
                    borderWidth: 1,
                  }}>
                  <Icon name={'add'} color={'black'} size={scaleFontSize(20)} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.aboutContainer}>
              <Text style={styles.userName}>
                {userData?.firstName} {userData?.lastName}
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/*posts, followers and following */}
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.numberOfCategory}>{userData?.posts}</Text>
                  <Text style={styles.categoryText}>
                    post{userData?.posts !== 1 ? 's' : ''}
                  </Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.numberOfCategory}>
                    {userData?.followers?.length}
                  </Text>
                  <Text style={styles.categoryText}>
                    follower{userData?.followers?.length !== 1 ? 's' : ''}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: horizontalScale(10),
                  }}>
                  <Text style={styles.numberOfCategory}>
                    {userData?.following?.length}
                  </Text>
                  <Text style={styles.categoryText}>following</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.userBio}>{userData?.bio}</Text>
            {fromSettings && (
              <TouchableOpacity>
                <Icon
                  name={'create'}
                  color={'#8a2be2'}
                  size={scaleFontSize(25)}
                  style={{marginRight: horizontalScale(5)}}
                />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            testID="FlatList"
            contentContainerStyle={{
              paddingBottom: verticalScale(100),
            }}
            style={{
              marginTop: verticalScale(10),
              marginHorizontal: horizontalScale(10),
            }}
            data={postsData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ProfilePostItem
                post={item}
                onPress={() =>
                  navigation.navigate(Routes.ViewPost, {
                    postData: item,
                    userData: userData,
                  })
                }
              />
            )}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: verticalScale(20),
                  fontSize: scaleFontSize(20),
                  color: '#6e6e6e',
                  fontWeight: 'bold',
                }}>
                No posts yet
              </Text>
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};
export default UserProfile;
