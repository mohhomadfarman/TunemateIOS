// import { Image } from '@rneui/base';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, useColorScheme, ScrollView, StyleSheet, Image, Touchable } from 'react-native';
import { moderateScale } from '../Metrics';
import { getStyles } from '../Screens/Style/style';
function SplashBox({Route, LogoImage,meinTitle,SubTitle,subCss,subStyle,SubTitle2 }) {
  const scheme = useColorScheme();

 
  return (

         
            <ScrollView contentContainerStyle={getStyles().scroll} style={{ width: '90%',height:"100%" }}>
        <TouchableOpacity  onPress={Route}>

      <View style={styles.brandbox}  >
        <Image
          source={LogoImage}
          style={styles.logo}
          alt='Select Images'
        />
        <Text 
        style={styles.brandName}
        >{meinTitle}</Text>
<View style={[subStyle.widths,styles.welcomContainer]}>
        <Text style={[styles.welcomText,subCss]}>{SubTitle}</Text>
        <Text style={[styles.welcomText,subCss]}>{SubTitle2}</Text>
        </View>
          <Text
           style={styles.tapText}
           >Tap to Continue</Text>
      
      </View>
      </TouchableOpacity>
      </ScrollView>
      
   
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    brandbox:{
      flex:1,
      justifyContent: 'start',
      alignItems: 'center',
    },
    background:{
        width:"100%",
        height:"100%",
      justifyContent: 'start',
      alignItems: 'center',
      
    },
    welcomText:{
        fontSize: moderateScale(40),
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
  

export default SplashBox;