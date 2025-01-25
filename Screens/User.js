import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { checkData, storeData } from './Utility/asyncStorageUtils';
import Profile from './Profile';
import LinearGradient from 'react-native-linear-gradient';
import SwipeCarousel from '../components/Slider';
import { isIOS } from '../Platform';
import { moderateScale } from '../Metrics';

function User({ navigation }) {
  const [data, setData] = useState("0");  // To store the fetched data
  const width = Dimensions.get('window').width;



  // useFocusEffect will refresh the data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const result = await checkData();
        setData(result);  // Update state with the stored data
    
        if (result === "0") {
          navigation.navigate('SplashScreenFive');
        }
      };
      fetchData(); // Fetch the data when screen comes into focus
      return () => {}; // Cleanup if needed when leaving the screen
    }, [navigation])
  );

  const onClick = async () => {
    const result = await checkData();
    if (result === "2") {
      navigation.navigate('MusicianTypeScreen2');
    } else {
      fetchData();
    }
  };
  const cards = [
    { id: 1, text: <Profile /> },
    { id: 2, text: <Profile /> },
    { id: 3, text: <Profile /> },
  ];

  return (
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.background}>
      {data === "1" ? (
        <SwipeCarousel cards={cards} />
      ) : (
        <>
          {/* <Image source={require('../Assets//LogoMusic.png')} style={styles.profileMenu} /> */}

          <View style={styles.viewBox}>

          <LinearGradient  colors={['#8a59fe', '#59dee5']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{flex:1,borderRadius:10, justifyContent:"center",}} >
            <Text style={styles.SigninText}>
            Dream collaboration?
            Tunemate has you covered.
            </Text>
          
          </LinearGradient>
          </View>
          <View style={styles.viewBox}>
            <TouchableOpacity onPress={onClick} style={styles.FilterBox}>
              <Text style={styles.TextWhite}>Filter your matches</Text>
            </TouchableOpacity>
            <Text style={styles.TxtDivide}>OR</Text>
            <TouchableOpacity style={[styles.FilterBox,{ backgroundColor:"#544fb0",}]}>
              <Text style={styles.TextWhite}>Get randomly matched</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SigninText:{
fontSize:isIOS ? moderateScale(24) : moderateScale(18),
textAlign:"center",
fontWeight:"400",
color:"#fff",
padding:20

  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  profileMenu: {
    marginTop:30,
    width: 60,
    height: 60,
    position: 'absolute',
    left: 20,
    top: 15,
  },
  viewBox: {
    // flex: 1,
    width:"100%",
    height:200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%',
    marginBottom:100
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 45,
    color: '#fff',
    marginBottom: 8,
  },
  textSub: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFF',
  },
  FilterBox: {
    backgroundColor: '#a0a1a0',
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#143774",
  },
  TxtDivide: {
    marginVertical: 30,
    color:"#fff",
  },
  TextWhite:{
    color:"#fff",
    fontSize: moderateScale(16),
    fontWeight:"bold"
  }
});

export default User;
