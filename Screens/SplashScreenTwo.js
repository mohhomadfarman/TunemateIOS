// import { Image } from '@rneui/base';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, useColorScheme, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { moderateScale } from '../Metrics';
import SplashBox from '../components/SplashBox';
import { useFocusEffect } from '@react-navigation/native';
import { checkData, getLocalData } from './Utility/asyncStorageUtils';
function SplashScreenTwo({ navigation }) {
  const scheme = useColorScheme();
  const [data, setData] =useState()

 useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      const result = await getLocalData("Username");
      setData(result);  // Update state with the stored data
  
    
    };
    fetchData(); // Fetch the data when screen comes into focus
    return () => {}; // Cleanup if needed when leaving the screen
  }, [navigation])
);



  return (
    <View  style={styles.container}>
     <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.background}>
 
      <SplashBox
       Route={()=>navigation.navigate('ProfileStepTwo')}
       LogoImage={require('../Assets/LogoMusic.png')}
       meinTitle="Step 1 Complete"
       SubTitle={`Welcome, ${data}`}
       SubTitle2={data}
       subStyle={styles}
       />
    </ImageBackground>
    
  </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    widths:{
        width:"100%"
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
    welcomText:{
        fontSize: moderateScale(42),
        fontWeight:"300",
        justifyContent: 'center',
        textAlign:"center",
        color:"#99c1da"
    },
    brandName: {
        marginTop:10,
      fontSize: moderateScale(40),
      fontWeight:"500",
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: "center",
      color:"#fff",
    },
    welcomContainer:{
        width:"60%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
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
  

export default SplashScreenTwo;