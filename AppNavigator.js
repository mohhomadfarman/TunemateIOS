import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Login from './Screens/Login';
import Forget from './Screens/Forget';
import Notification from './Screens/Notification';
import User from './Screens/User';
import UserProfile from './Screens/UserProfile';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import AboutUs from './Screens/About';
import SplashScreenThree from './Screens/SplashScreenThree';
import SplashScreenTwo from './Screens/SplashScreenTwo';
import MusicianTypeScreen from './Screens/MusicianTypeScreen';
import MusicianTypeScreen2 from './Screens/MusicianTypeScreen2';
import SplashScreenFive from './Screens/SplashScreenFive';
import SplashScreenFour from './Screens/SplashScreenFour';
import Musician from './Screens/Musician';
import AudioScreen from './Screens/AudioScreen';
import UserChecking from './Screens/UserChecking';
import EditProfile from './Screens/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Icon mapping for tabs
const TAB_ICONS = {
  Notification: require('./Assets/002.png'),
  User: require('./Assets/003.png'),
  Profile: require('./Assets/001.png'),
};

// Profile Tab Navigator
function ProfileTabNavigator({ hiddenTab }) {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Image
            source={TAB_ICONS[route.name]}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
        tabBarActiveTintColor: '#00008B',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: hiddenTab
          ? { display: 'none' }
          : {
            backgroundColor: '#02a99c',
            paddingTop: 28,
            paddingBottom: 30,
            elevation: 0,
            shadowOpacity: 0,
          },
        tabBarLabelStyle: { display: 'none' },
      })}
    >
      <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Tab.Screen name="User" component={User} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// User Authentication Navigator
function UserAuth() {
  return (
    <Tab.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ tabBarStyle: { display: 'none' }, tabBarLabelStyle: { display: 'none' } }}
    >
      <Tab.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Tab.Screen name="Forget" component={Forget} options={{ headerShown: false}} />
    </Tab.Navigator>
  );
}

function UserAuthWithToken() {

  return (
    <Tab.Navigator
      initialRouteName="Signup"
      screenOptions={{ tabBarStyle: { display: 'none' }, tabBarLabelStyle: { display: 'none' } }}
    >
      <Tab.Screen name="Signup" component={AboutUs} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileStepOne" component={SplashScreenTwo} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileStepTwo" component={SplashScreenThree} options={{ headerShown: false }} />
      <Tab.Screen name="MusicianTypeScreen" component={MusicianTypeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="MusicianTypeScreen2" component={MusicianTypeScreen2} options={{ headerShown: false }} />
      <Tab.Screen name="SplashScreenFive" component={SplashScreenFive} options={{ headerShown: false }} />
      <Tab.Screen name="SplashScreenFour" component={SplashScreenFour} options={{ headerShown: false }} />
      <Tab.Screen name="Musician" component={Musician} options={{ headerShown: false }} />
      <Tab.Screen name="AudioScreen" component={AudioScreen} options={{ headerShown: false }} />
      <Tab.Screen name="editProfile" component={EditProfile} options={{ headerShown: false}} />
    </Tab.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [OnboardUser, setOnboardUser] = useState("UserAuth")

  useEffect(() => {
    const fetchUserToken = async () => {
      // await ClearDtaa()
      const userToken = await getLocalData('userToken');
      const isUserCleate = await getLocalData('isUserCleate');
      const isUsername = await getLocalData('isUsername');
      console.log(userToken)
      // setIsSignedIn(!!userToken);
    };
    fetchUserToken();
  }, []);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"UserAuth"}>
        <>
          <Stack.Screen
            name="ProfileTabNavigatorStep"
            component={() => <ProfileTabNavigator hiddenTab={true} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ProfileTab" component={ProfileTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="UserAuth" component={UserAuth} options={{ headerShown: false }} />
          <Stack.Screen name="UserAuthWithToken" component={UserAuthWithToken} options={{ headerShown: false }} />
          <Stack.Screen name="Checking" component={UserChecking} options={{ headerShown: false }} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
