import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import SplashBox from './components/SplashBox';
import { storeData } from './Screens/Utility/asyncStorageUtils';

export default function SplashScreen({ navigation }) {
  useEffect(() => {

    const fetchData = async () => {
      await storeData("0"); 
    };
    fetchData();

  }, [navigation]);
  return (
    <View  style={styles.container}>
      
      <ImageBackground source={require('./Assets/bg.jpg')} resizeMode="cover" style={styles.image}>

      <SplashBox
       Route={()=>navigation.navigate('HomeScreen')}
       LogoImage={require('./Assets/LogoMusic.png')}
       meinTitle="Tunemate"
       subStyle={styles}
       />
      {/* <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

        <View style={styles.brandbox} >
          <Image
            source={require('../AssetsLogoMusic.png')}
            style={styles.logo}
            alt='Select Images'
          />
          <Text 
          style={styles.brandName}
          >Tunemate</Text>
            <Text
             style={styles.tapText}
             >Tap to Continue</Text>
        </View>
        </TouchableOpacity> */}

        </ImageBackground>

    </View>
    
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandbox:{
      flex:1,
      justifyContent: 'star',
      alignItems: 'center',
    },
    background:{
        width:"100%",
        height:"100%",
      justifyContent: 'start',
      alignItems: 'center',
      
    },
    brandName: {
        marginTop:10,
      fontSize: 48,
      fontWeight:"500",
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: "center",
      color:"#fff",
    },
    tapText:{
        marginTop:20,
        fontSize: 14,
        fontWeight:"300",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        color:"#fff",
    },
    logo:{
        marginTop:100,
        width:200,
        height:200
    }
  });
  