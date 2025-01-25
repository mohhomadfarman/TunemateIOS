import React, { useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';

import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import { isIOS } from '../Platform';
const AudioRow = ({ playSound, icon }) => (
  <View style={styles.audioBox}>
    <TouchableOpacity onPress={playSound}>
      <Image source={require('../Assets/play.png')} style={styles.playIcon} />
    </TouchableOpacity>
    <Image source={icon} style={styles.waveform} />
  </View>
);



function UserProfile({ navigation }) {

  const [sound, setSound] = useState(null);
  const playSound = () => {
    const soundInstance = new Sound(require('../Assets/music/trumpet-fanfare-63760.mp3'), (error) => {
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
    });
    setSound(soundInstance);
  };

  // Stop sound if it's playing
  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        console.log('Sound stopped');
      });
    }
  };

  // Use React Navigation's focus and unfocus hooks
  useFocusEffect(
    React.useCallback(() => {
      // Play sound when screen is focused
      // playSound();

      // Stop sound when screen is unfocused (navigating away)
      return () => {
        stopSound();
      };
    }, [])
  );
  
  const EditProfileTab = () =>{
    navigation.navigate('editProfile')
    console.log("first")
  }

  return (
    <ImageBackground
    source={require('../Assets/bg.jpg')}
    resizeMode="cover"
    style={styles.image}
  >
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent:"center",
    alignItems:"center"}}>
          <TouchableOpacity onPress={EditProfileTab}>
      <View style={styles.header} >
        <Image source={require('../Assets/MenuPng.png')} style={styles.profileMenu} />
      </View>
      </TouchableOpacity>


      <View  style={styles.profileCards}>
      <View  style={styles.ProfileWraper}>
      <Image source={require('../Assets/LogoProfile.png')}
                  style={styles.profilePic}
              />
                <Text style={[styles.rolesText,{paddingBottom:0,fontWeight:400, fontSize:14}]}>@Username  </Text>
       <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
       <Text style={styles.rolesText}>Vocalist  | </Text>
        <Text style={styles.rolesText}> Producer  | </Text>
        <Text style={styles.rolesText}>Rapper  | </Text>
        <Text style={styles.rolesText}>Bassist </Text>
       </View>
       <View style={{flexDirection:"row", justifyContent:"center",gap:8, width:"100%", marginBottom:10}}>
       {['Pop', 'RnB', 'Heavy Metal', 'House', 'Afrobeats'].map((genre) => (
       <Text style={[styles.rolesText,{fontWeight:"600",fontSize:14}]}>{genre}</Text>
        ))}
       </View>

       <View style={styles.bio}>
        <Text style={styles.Biotext}>
          I’m a 23-year-old pop and RnB artist. I’ve released 2 songs, and I love to post singing covers on TikTok. I love to collaborate.
        </Text>
      </View>
      <View >
        
      </View>
<View style={{marginTop:16,justifyContent:"center", alignItems:"center", flexDirection:"row",gap:6}}>
<Image source={require('../Assets/linkPng.png')} style={styles.linsPng}/>
  <Text style={{fontSize:12, color:"#fff",fontWeight:"600"}}>
     instagram.com/@username and 3 more</Text>
</View>

      <View style={[styles.container,{width:"100%"}]}>
     <AudioRow playSound={playSound} icon={require('../Assets/waves.png')} />
     <AudioRow playSound={playSound} icon={require('../Assets/waves.png')} />
     <AudioRow playSound={playSound} icon={require('../Assets/waves.png')} />
   </View>

   {/* <View style={styles.containerSocial}>
     <Image source={require('../AssetsUntitled-3.png')} style={styles.socialImage} />
     <Image source={require('../AssetsUntitled-2.png')} style={styles.socialImage} />
     <Image source={require('../AssetsUntitled-4.png')} style={styles.socialImage} />
     <Image source={require('../AssetsUntitled-5.png')} style={styles.socialImage} />
     <Image source={require('../AssetsUntitled-6.png')} style={styles.socialImage} />
   </View> */}

        </View>
      </View>

    </ScrollView>
    </ImageBackground>
  )
}



const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      width: "100%",
    },
    image:{
      flex:1,
    },
    profileCards:{
      flex:1,
      width:"100%",
      // padding:20
      paddingHorizontal:20
  
    },
    linsPng:{
      width:20,
      height:20
    },
    ProfileWraper:{
      // backgroundColor:"#ffffff80",
      flex:1,
      borderRadius:15,
      justifyContent:"center",
      alignItems:"center"
    },
    header: {
      width: "100%",
      alignItems: 'center',
      justifyContent: "flex-end",
      height: isIOS ? 90 : 80,
      padding: 30,
      paddingBottom:0,
      position: 'relative',
      flexDirection:"row",
    },
    profileMenu: {
      width: 30,
      height: 30,
      position: "absolute",
      right: 20,
      top: isIOS ? moderateScale(40) : 15,
    },
    profilePic: {
      width: isIOS ? 120: 120,
      height: isIOS ? 120: 120,
      borderRadius: 100,
      objectFit:"cover",
      borderWidth:7,
      borderColor:"#fff"
    },
    editProfile: {
      alignSelf: 'flex-end',
      marginRight: 15,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
      padding: 10,
    },
    editText: {
      color: '#000',
      fontWeight: '400',
      fontSize: 12,
    },
    rolesText: {
      marginTop: moderateScale(20),
      color: '#fff',
      textAlign: 'center',
      fontSize: isIOS ? moderateScale(16) : moderateScale(12),
      fontWeight:"600",
      paddingBottom: 0,
    },
   
    genreContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
      gap:24,
      marginHorizontal: 10
    },
    genreBtn: {
      borderRadius: 20,
    },
    genreText: {
      color: '#000',
      fontSize: isIOS ? moderateScale(10) : moderateScale(9),
    },
    bio: {
      backgroundColor: '#f2f4ff',
      paddingVertical: verticalScale(20),
      paddingHorizontal: horizontalScale(20),
      borderRadius: 10,
      color: '#000',
      // marginTop: 5,
      width:"100%"
    },
    Biotext: {
      textAlign: 'center',
      fontSize: isIOS ? moderateScale(13) : moderateScale(10),
      color: "#000"
    },
    sectionHeader: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10,
    },
    containerSocial: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      gap: isIOS ?24: 15,
      alignItems: "center",
      paddingHorizontal: 30,
      marginBottom: moderateScale(20)
    },
    socialImage: {
      width: isIOS? 50: 40,
      height: isIOS? 50: 40,
      resizeMode: 'contain',
    },
    audioBox: {
      flex: 1,
      width: "100%",
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
      width: "100%",
      height: 70,
      resizeMode: 'contain',
      // backgroundColor: '#a0a0a1',
      tintColor: "#fff"
    },
  
    uploadIcon: {
      flex: 1,
      width: 30,
      height: 30,
      marginRight: 10,
      backgroundColor: '#a0a0a1',
      borderRadius: 15,
      padding: 10,
      height: 60
    },
  
   
   
  });


export default UserProfile