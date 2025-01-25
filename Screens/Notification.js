
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkData, storeData } from './Utility/asyncStorageUtils';
import { getStyles } from './Style/style';
import { moderateScale, verticalScale } from '../Metrics';

function Notification() {

  const NotificationLink =[
    {name:"You and @mansim are a match",
      img:"../Assets/LogoMusic.png"
    },
    {name:"@mxbsupercute Hi",
      img:"../Assets/LogoMusic.png"
    },
    {name:"You and @mansim are a match",
      img:"../Assets/LogoMusic.png"
    },
    {name:"You and @reallygood are a match",
      img:"../Assets/LogoMusic.png"
    }
  ]
  return (
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.background}>
    <View style={{height:verticalScale(70), justifyContent:"center", borderBottomWidth:3, borderBottomColor:"#fff"}}>
    {/* <Image source={require('../AssetsLogoMusic.png')} style={styles.profileMenu} />
     */}
     <Text style={{color:"#fff", fontSize:moderateScale(25), marginTop:moderateScale(10), marginBottom:moderateScale(10), marginLeft:moderateScale(10),textAlign:"center",fontWeight:"bold"}}>Inbox</Text>
    </View>

      {/* <ImageBackground source={require('../Assetsbg_two.jpg')} resizeMode="cover" style={styles.background}> */}
       <ScrollView contentContainerStyle={styles.scroll} style={{ width: '100%',height:"100%" }}>

       <View style={styles.notiBox}>
            <Image style={styles.notifImag} source={require('../Assets/LogoMusic.png')}  />
            <View>
            <Text style={[styles.notiTitle,{fontWeight:"bold",fontSize:16}]}>Notification</Text>
            <Text style={[styles.notiTitle]}>You and sandwich match</Text>
            </View>
            </View>
            <View style={styles.notiBox}>
            <Image style={styles.notifImag} source={require('../Assets/LogoMusic.png')}  />
            <View>
            <Text style={[styles.notiTitle,{fontWeight:"bold",fontSize:16}]}>Activity</Text>
            <Text style={[styles.notiTitle]}>Sabdwich sent you a message</Text>
            </View>
            </View>
        {NotificationLink?.map((item)=>(
            <View style={styles.notiBox}>
            {/* <Image style={styles.notifImag} source={require('../Assets/LogoMusic.png')}  /> */}
            <View style={[styles.notifImag,{backgroundColor:"#5371ff",borderRadius:100, marginRight:8}]}></View>
            <Text style={styles.notiTitle}>{item?.name}</Text>
            </View>
        ))}
        {!NotificationLink && <Text>No Notification</Text>}
       
       </ScrollView>
       {/* </ImageBackground> */}
  </ImageBackground>
  )
}


const styles = StyleSheet.create({
  notiBox:{
flexDirection:"row",
justifyContent:"flex-start",
alignItems:"center",
width:"100%",
padding:22,
borderBottomWidth:3,
borderColor:"#fff"
  },
  
  scroll:{
    flex:1
  },
  notiTitle:{
    color:"#fff"
  },
  notifImag:{
    width:60,
    height:60
  },
  profileMenu: {
    width: 60,
    height: 60,
    // position: 'absolute',
    left: 20,
    top: 15,
  },
  background: {
    width: '100%',
    height: '100%',
    
  },
  backgroundG:{
    flex:1,
    marginTop:80,
    borderTopWidth:3,
    borderColor:"#fff",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    height:"100%"
  }
 
});


export default Notification