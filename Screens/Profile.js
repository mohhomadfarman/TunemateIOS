import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';
import { isIOS } from '../Platform';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/UserSlice';
import Loader from '../components/Loader';


const AudioRow = ({ playSound, icon }) => (
  <View style={styles.audioBox}>
    <TouchableOpacity onPress={playSound}>
      <Image source={require('../Assets/play.png')} style={styles.playIcon} />
    </TouchableOpacity>
    <Image source={icon} style={styles.waveform} />
  </View>
);

function Profile({ profile, navigation }) {
  const [sound, setSound] = useState(null);
  const [loading,setLoading] = useState(false);
  console.log(profile,"profileprofileprofile")
  // const [profile,setProfile] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getUserProfile()).then((res) => {
  //     setProfile(res?.payload);
  //     setLoading(false);
  //   })
  // }, []);




  const playSound = () => {
    const soundInstance = new Sound(
      require('../Assets/music/trumpet-fanfare-63760.mp3'),
      (error) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        soundInstance.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          soundInstance.release(); // Release when done to free up resources
        });
      }
    );
    setSound(soundInstance);
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        console.log('Sound stopped');
      });
      sound.release();
      setSound(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        stopSound();
      };
    }, [sound])
  );

  const EditProfileTab = () => {
    navigation.navigate('editProfile');
    console.log('Navigating to Edit Profile');
  };
  return (
    loading ?<Loader/>
:    <ImageBackground
      source={require('../Assets/bg.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <TouchableOpacity onPress={EditProfileTab}>
          <View style={styles.header}>
            <Image
              source={require('../Assets/MenuPng.png')}
              style={styles.profileMenu}
            />
          </View>
        </TouchableOpacity> */}

        <View style={styles.profileCards}>
          <View style={styles.ProfileWraper}>
            <Image
              source={require('../Assets/LogoProfile.png')}
              style={styles.profilePic}
            />
            <Text
              style={[
                styles.rolesText,
                { paddingBottom: 0, fontWeight: '400', fontSize: 14 },
              ]}
            >
              {profile?.username}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
             {profile?.musicianDetails?.map((item, index) => (
              item?.musicianType !== null && (
                <Text key={index} style={styles.rolesText}>
                  {item?.musicianType} {index !== profile?.musicianDetails.length - 1 ? "   |" : ""}
                </Text>
              )
            ))}

             
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                marginBottom: 10,
              }}
            >
              {['Pop', 'RnB', 'Heavy Metal', 'House', 'Afrobeats'].map(
                (genre, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.rolesText,
                      { fontWeight: '600', fontSize: 14 },
                    ]}
                  >
                    {genre}
                  </Text>
                )
              )}
            </View>

            <View style={styles.bio}>
              <Text style={styles.Biotext}>
               {profile?.bio}
              </Text>
            </View>
            <View
              style={{
                marginTop: 16,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 6,
              }}
            >
              <Image
                source={require('../Assets/linkPng.png')}
                style={styles.linsPng}
              />
              <Text style={{ fontSize: 12, color: '#fff', fontWeight: '600' }}>
                {[
                    profile?.insta_link || "N/A",
                    profile?.soundcloud_link || "N/A",
                    profile?.spotify_link || "N/A",
                    profile?.tiktok_link || "N/A",
                    profile?.youtube_link || "N/A",
                ]
                  .slice(0, 1)
                  .map((item) => item)}{' '}
                and 3 more
              </Text>
            </View>

            <View style={[styles.container, { width: '100%' }]}>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <AudioRow
                    key={index}
                    playSound={playSound}
                    icon={require('../Assets/waves.png')}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    flex: 1,
  },
  profileCards: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  linsPng: {
    width: 20,
    height: 20,
  },
  ProfileWraper: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: isIOS ? 90 : 80,
    padding: 30,
    paddingBottom: 0,
    position: 'relative',
    flexDirection: 'row',
  },
  profileMenu: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 20,
    top: isIOS ? moderateScale(40) : 15,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 7,
    borderColor: '#fff',
  },
  rolesText: {
    marginTop: moderateScale(20),
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  bio: {
    backgroundColor: '#f2f4ff',
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 10,
    width: '100%',
  },
  Biotext: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#000',
  },
  audioBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  playIcon: {
    width: 20,
    height: 30,
    marginRight: 10,
  },
  waveform: {
    flex: 1,
    width: '100%',
    height: 70,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});

export default Profile;
