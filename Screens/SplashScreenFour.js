import React from 'react'
import SplashBox from '../components/SplashBox'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { moderateScale } from '../Metrics'

function SplashScreenFour({navigation}) {
  return (
    <View  style={styles.container}>
    {/* <LinearGradient
      colors={['#000428', '#004e92']}
      style={styles.background}
    > */}
  <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.background}>
      <SplashBox
       Route={() => navigation.navigate('Musician')}
       LogoImage={require('../Assets/LogoMusic.png')}
       meinTitle="Step 2 Complete"
       SubTitle="Now, show us your work!"
       subStyle={styles}
       />
       </ImageBackground>
    {/* </LinearGradient> */}
    
  </View>
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

export default SplashScreenFour