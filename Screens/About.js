import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
  Alert,
  Button,
} from 'react-native';
import { getStyles } from './Style/style';
import { getLocalData, storeLocalData } from './Utility/asyncStorageUtils';
import { moderateScale } from '../Metrics';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useDispatch } from 'react-redux';
import { CreateUsername, TM_Add_userName } from '../redux/UserSlice';
import Loader from '../components/Loader';

function AboutUs({ navigation }) {
  const scheme = useColorScheme();
  const styles = getStyles(scheme);
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch()

  // State to store username input and its availability status
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false); // For showing green checkmark when valid
  const [isLoading, setIsLoading] = useState(false); // For showing green checkmark when valid


  useEffect(() => {
    const fetchUserToken = async () => {
      const isUsername = await getLocalData('isUsername');

      if(isUsername === "true"){
       setIsLoading(true)
        navigation.navigate('ProfileStepOne')
      }
    };
    fetchUserToken();
  }, [dispatch,!isLoading]);


  // Function to handle username input change
  const handleUsernameChange = (value) => {
    if (value.length <= 12) {
      setUsername(value);  // Update username state
      setIsUsernameValid(value.length > 0 && value.length <= 12); // Set username validity
    } else {
      Alert.alert('Error', 'Username cannot be more than 12 characters.');
      setIsUsernameValid(false);  // Reset the validation if it's not valid
    }
  };

  // Function to store the username in async storage
  const storeUsername = async () => {
    const USER_ID = await getLocalData('UserId') 
 if (username.length > 0 && username.length <= 12) {
  setIsLoading(true)
        dispatch(TM_Add_userName({newUsername:username,userId:USER_ID})).then((res)=>{
          if(res.payload.message){
            Alert.alert('Success', res.payload.message);
            if(res.payload){
              setIsLoading(false)
              storeUserToken("true", "isUsername");
              storeUserToken(username, "Username");
              navigation.navigate('ProfileStepOne')
            }
          }
        })
     ;  // Store the username
      // navigation.navigate('ProfileStepOne')
    } else {
      Alert.alert('Error', 'Please enter a valid username (max 12 characters).');
    }
  };


  const storeUserToken = async (userToken,key) => {
    if (userToken) {
    return await storeLocalData(userToken, key);  // Store the username
    } else {
      Alert.alert('Error', 'Please enter a valid username (max 12 characters).');
    }
  };


  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [types.images], // Only allow image file types
        allowMultiSelection: false,
      });

      if (response && response[0] && response[0].uri) {
        setSelectedImage({ uri: response[0].uri });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  return (
   
    <View style={styles.container}>
       {isLoading ? <Loader/> :
      <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scroll} style={{ width: '90%', height: "100%" }}>
          <Text style={styles.text}>Create new</Text>
          <Text style={styles.text}>Account</Text>

          <View style={styles.container2}>
            <Text style={styles.tapText}>Already Registered?</Text>
            <TouchableOpacity 
              accessibilityRole="button" 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>Log in here</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>

{selectedImage ? (
  <TouchableOpacity style={styles.ImagesWrapper} onPress={pickImage}>
        <Image source={selectedImage} style={styles.ImagesProfile} />
  </TouchableOpacity>
      ) : (

        <TouchableOpacity style={styles.ImagesWrapper} onPress={pickImage}>
        <Image source={require('../Assets/LogoProfile.png')} style={styles.ImagesProfile} />
  </TouchableOpacity>
      )}


            <View style={styles.width100}>
              <Text style={{ textAlign: "center", marginTop: 60, color: "#fff" }}>Create Username</Text>

              <View style={styles.inputWrapper}>
               <View  style={[styles.inputOnbording,{flex:1, flexDirection:"row", justifyContent:"space-between",alignItems:"center" }]}>
                <TextInput
                  placeholderTextColor={'#fff'}
                  style={[styles.inputOnbordingTwo]}
                  placeholder={"Username"}
                  value={username}
                  onChangeText={handleUsernameChange}  // Validate input length
                />
                {/* Conditionally render green checkmark image if username is valid */}
                {isUsernameValid && (
                  <Image
                    source={require('../Assets/check.png')}  // Custom checkmark image
                    style={styles.checkIcon}  // Style for the checkmark image
                  />
                )}
                </View>
              </View>
            </View>
          </View>
          <Text style={{color:"#fff",fontSize:moderateScale(14)}}>Upto 12 characters Only</Text>

          <TouchableOpacity onPress={storeUsername} style={styles.BtnSignup}>
            <Text style={styles.BtnSignupTxt}>Complete and Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
      }
    </View>
  );
}

export default AboutUs;
