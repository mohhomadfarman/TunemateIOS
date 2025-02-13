import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import SplashBox from '../components/SplashBox'
import { moderateScale } from '../Metrics';
import { storeData } from './Utility/asyncStorageUtils';
import { AuthProvider } from '../AppNavigator';

function SplashScreenFive({navigation}) {
  const NextFetch = async() =>{
    await storeData("2"); 
   navigation.navigate('User')
  }
  

  return (
    <AuthProvider>
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.background}>
    <View  style={styles.container}>
        <SplashBox
         Route={NextFetch}
         LogoImage={require('../Assets/LogoMusic.png')}
         meinTitle="Step 3 Complete"
         SubTitle="Lets get you connected"
         subStyle={styles}
         />
        
    </View>

</ImageBackground>
</AuthProvider>
  )
}


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


export default SplashScreenFive