import React, { useState } from 'react'
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { getStyles } from './Style/style'
import { CheckBox } from '@rneui/themed'
import TextInputField from '../components/Inputs';

function Login({navigation}) {
  const [check1, setCheck1] = useState(false);
  // const toggleCheckbox = () => setChecked(!checked);
    const styles = getStyles();
  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={['#000428', '#004e92']} style={styles.background}> */}
      <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.image}>
      <ScrollView contentContainerStyle={styles.scroll} style={{ width: '90%',height:"100%"  }}>
          <Text style={styles.text}>Sign into</Text>
          <Text style={styles.text}>Account</Text>
          
          <View style={styles.containerBox}>
            <Text style={styles.tapText}>Create Your Account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInputField label="Email" placeholder="hello@reallygreatsite.com" />
            <TextInputField label="Password" placeholder="*******" />
            <View style={styles.containerBox2} >
                <Text style={styles.Forget}>Rember me</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.Forget}> Forget Password?</Text>
            </TouchableOpacity>
              </View>

            <TouchableOpacity style={styles.BtnSignup} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.BtnSignupTxt}>Submit</Text>
            </TouchableOpacity>
            
          </View>   

          </ScrollView>
    </ImageBackground>
    {/* </LinearGradient> */}
    </View>
  )
}


export default Login