import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CreateUser } from './redux/UserSlice';
import { horizontalScale, verticalScale } from './Metrics';
import KeywordAvoidingContent from './components/KeywordAvoidingContent';
import Loader from './components/Loader';
import TextInputField from './components/Inputs';
import { getStyles } from './Screens/Style/style';
import { getLocalData, storeLocalData } from './Screens/Utility/asyncStorageUtils';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const styles = getStylesPage(scheme);
  const globalStyles = getStyles(scheme);

  const { status, error } = useSelector((state) => state.Users);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch and verify user token
  const fetchUserToken = async () => {
    setIsLoading(true);
    const isUserCreated = await getLocalData('isUserCleate');
    const storedToken = await getLocalData('userToken');

    console.log(isUserCreated,storedToken)

    if (isUserCreated === 'true' && storedToken) {
      navigation.navigate('UserAuthWithToken');
    } else if (storedToken) {
      navigation.navigate('UserAuth');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateInputs = () => {
    const { name, email, password } = formData;
    if (!name.trim()) return showAlert('Validation Error', 'Name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showAlert('Validation Error', 'Enter a valid email address.');
    if (password.length < 6)
      return showAlert('Validation Error', 'Password must be at least 6 characters.');
    return true;
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
    return false;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const { name, email, password } = formData;
    const userData = { fullname: name, email, password };

    try {
      const result = await dispatch(CreateUser(userData)).unwrap();

      if (result?.userToken) {
     
        await storeLocalData(result?.userToken, 'userToken');
        await storeLocalData(result?.userId, 'UserId');
        await storeLocalData('true', 'isUserCleate');
        fetchUserToken();
      } else {
        showAlert('Error', 'Something went wrong!');
      }
    } catch (err) {
      showAlert('Error', err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

   // State variable to hold the password
   const [password, setPassword] = useState('');

   // State variable to track password visibility
   const [showPassword, setShowPassword] = useState(false);

   // Function to toggle the password visibility state
   const toggleShowPassword = () => {
       setShowPassword(!showPassword);
   };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <ImageBackground source={require('./Assets/bg.jpg')} resizeMode="cover" style={styles.image}>
          <KeywordAvoidingContent width="90%">
            <Text style={globalStyles.text}>Create New</Text>
            <Text style={globalStyles.text}>Account</Text>

            <View style={styles.registerContainer}>
              <Text style={styles.tapText}>Already Registered?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}> Log in here</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInputField
                label="Name"
                placeholder="Full Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
              <TextInputField
                label="Email"
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
              <TextInputField
                label="Password"
                placeholder="*******"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
              />
              
              <TouchableOpacity style={styles.btnSignup} onPress={handleSignup}>
                <Text style={styles.btnSignupText}>Signup</Text>
              </TouchableOpacity>
            </View>

            {status === 'loading' && <Text style={styles.loadingText}>Creating account...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
          </KeywordAvoidingContent>
        </ImageBackground>
      )}
    </View>
  );
};

const getStylesPage = (scheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: scheme === 'dark' ? '#333' : '#FFF',
    },
    image: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnSignup: {
      alignItems: 'center',
      paddingVertical: verticalScale(16),
      backgroundColor: '#02140a',
      marginTop: verticalScale(20),
      borderRadius: 20,
    },
    btnSignupText: {
      color: '#fff',
      fontSize: horizontalScale(16),
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: verticalScale(16),
    },
    tapText: {
      fontSize: horizontalScale(12),
      color: '#999',
    },
    loginText: {
      fontSize: horizontalScale(12),
      color: '#496ed6',
    },
    inputContainer: {
      width: '100%',
      paddingHorizontal: horizontalScale(15),
      gap: verticalScale(15),
    },
    loadingText: {
      fontSize: horizontalScale(14),
      color: '#666',
    },
    errorText: {
      fontSize: horizontalScale(14),
      color: 'red',
    },
  });

export default HomeScreen;
