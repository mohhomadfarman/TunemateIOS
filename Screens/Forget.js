import React, { useRef, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getStyles } from './Style/style'
import { verticalScale } from '../Metrics'
import TextInputField from '../components/Inputs';


function Forget({navigation}) {
    const [check1, setCheck1] = useState(false);
    // const toggleCheckbox = () => setChecked(!checked);
      const styles = getStyles();
      const stylesPage = getStylesPage();


      const [otp, setOtp] = useState(['', '', '', '']);
      const [isFocused, setIsFocused] = useState([false, false, false, false]); // Track focus state


      // References for each TextInput
      const otpRefs = useRef([]);
    
      // Function to handle input change and move to the next field
      const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    
        // If the user types a digit, move to the next input
        if (text && index < otpRefs.current.length - 1) {
          otpRefs.current[index + 1].focus();
        }
      };
    
      // Handle backspace to move focus to the previous input
      const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
          otpRefs.current[index - 1].focus();
        }
      };


      const handleFocus = (index) => {
        const newFocus = [...isFocused];
        newFocus[index] = true;
        setIsFocused(newFocus);
      };
    
      const handleBlur = (index) => {
        const newFocus = [...isFocused];
        newFocus[index] = false;
        setIsFocused(newFocus);
      };
    
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.image}>
    <ScrollView contentContainerStyle={styles.scroll} style={{ width: '90%',height:"100%"}}>
        <Text style={styles.text}>Forgot</Text>
        <Text style={styles.text}>Password</Text>
        
        <View style={styles.container2}>
          <Text style={styles.tapText}>Please enter your registered email
                address to recover your password
                </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInputField label="Email" placeholder="hello@reallygreatsite.com" />
          <Text style={stylesPage.p}>You should recieve a code in your email
                </Text> 
            <View style={stylesPage.container2}>
                {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={[stylesPage.otpInput, 
            isFocused[index] && stylesPage.focusedOtpInput,]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={1}
          ref={(ref) => (otpRefs.current[index] = ref)} // Assign ref to the input
        />
      ))}
            </View>
          <TouchableOpacity style={styles.BtnSignup} onPress={() => navigation.navigate('AboutUs')}>
            <Text style={styles.BtnSignupTxt}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color:"#fff",fontSize:12,marginTop:10}} >Go Back</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
  </ImageBackground>
  </View>
  )
}
function getStylesPage(scheme) {
    const isDark = scheme === 'dark';
    return StyleSheet.create({
        p:{
            textAlign:"center",
            fontSize:12,
            color:"#99c1da"
        },
        image: {
          flex: 1,
          width:"100%",
          justifyContent: 'center',
          alignItems:"center"
        },
        container2: {
            gap:8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
            borderWidth: 0,
          },
          otpInput: {
            borderWidth: 0,
            borderColor: '#000',
            paddingTop: 20,
            paddingBottom: 20,
            width: "20%",
            flex:1,
            textAlign: 'center',
            fontSize: 18,
            borderRadius: 15,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            backgroundColor: '#a0a1a0',
          },
          focusedOtpInput: {
            borderColor: '#ccc', // Keep the border color neutral even on focus
            borderRadius: 0,
          },

    })
}


export default Forget