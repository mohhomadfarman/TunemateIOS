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
import EditDetailScreen from './Screens/EditDetailScreen';
import FillterMatch from './Screens/FillterMatch';

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
      initialRouteName="User"
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

  // AsyncStorage.removeItem('isStepTwoComplete');

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
      <Tab.Screen name="EditDetailScreen" component={EditDetailScreen} options={{ headerShown: false}} />
      <Tab.Screen name="FillterMatch" component={FillterMatch} options={{ headerShown: false}} />
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



// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from './components/Loader';
// import AboutUs from './Screens/About';
// import SplashScreenTwo from './Screens/SplashScreenTwo';
// import SplashScreenThree from './Screens/SplashScreenThree';
// import MusicianTypeScreen from './Screens/MusicianTypeScreen';
// import Forget from './Screens/Forget';
// import Login from './Screens/Login';
// import HomeScreen from './HomeScreen';
// import SplashScreen from './SplashScreen';
// import Notification from './Screens/Notification';
// import User from './Screens/User';
// import UserProfile from './Screens/UserProfile';
// import MusicianTypeScreen2 from './Screens/MusicianTypeScreen2';
// import SplashScreenFive from './Screens/SplashScreenFive';
// import SplashScreenFour from './Screens/SplashScreenFour';
// import Musician from './Screens/Musician';
// import AudioScreen from './Screens/AudioScreen';
// import FillterMatch from './Screens/FillterMatch';
// import SignupScreen from './HomeScreen';

// // Import your screens here
// // ... existing imports ...

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // Create auth context
// const AuthContext = createContext(null);

// // Auth provider component
// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isLoading: true,
//     isSignedIn: false,
//     isOnboarded: false,
//     token: null
//   });

//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       const [token, isUserComplete, isFinalSubmit, username] = await Promise.all([
//         AsyncStorage.getItem('userToken'),
//         AsyncStorage.getItem('isUserComplete'),
//         AsyncStorage.getItem('isFinalSubmit'),
//         AsyncStorage.getItem('isUsername')
//       ]);

//       setAuthState({
//         isLoading: false,
//         isSignedIn: !!token,
//         isOnboarded: !!(token && isUserComplete && username && isFinalSubmit),
//         token
//       });
//     } catch (error) {
//       console.error('Auth state check failed:', error);
//       setAuthState({
//         isLoading: false,
//         isSignedIn: false,
//         isOnboarded: false,
//         token: null
//       });
//     }
//   };

//   const authContext = {
//     ...authState,
//     signIn: async (token) => {
//       await AsyncStorage.setItem('userToken', token);
//       setAuthState(prev => ({
//         ...prev,
//         isSignedIn: true,
//         token
//       }));
//     },
//     signOut: async () => {
//       await AsyncStorage.multiRemove(['userToken', 'isUserComplete', 'isUsername']);
//       setAuthState({
//         isLoading: false,
//         isSignedIn: false,
//         isOnboarded: false,
//         token: null
//       });
//     },
//     completeOnboarding: async () => {
//       await AsyncStorage.setItem('isUserComplete', 'true');
//       setAuthState(prev => ({
//         ...prev,
//         isOnboarded: true
//       }));
//     }
//   };

//   if (authState.isLoading) {
//     return <Loader />;
//   }

//   return (
//     <AuthContext.Provider value={authContext}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Protected route wrapper
// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isOnboarded } = useContext(AuthContext);

//   if (!isSignedIn) {
//     return <AuthStack />;
//   }

//   if (!isOnboarded) {
//     return <OnboardingStack />;
//   }

//   return children;
// };

// // Auth stack (public routes)
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="SplashScreen" component={SplashScreen} />
//     <Stack.Screen name="HomeScreen" component={SignupScreen} />
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="Forget" component={Forget} />
//   </Stack.Navigator>
// );

// // Onboarding stack (protected but not fully onboarded)
// const OnboardingStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Signup" component={AboutUs}  />
//     <Stack.Screen name="ProfileStepOne" component={SplashScreenTwo}  />
//     <Stack.Screen name="ProfileStepTwo" component={SplashScreenThree}  />
//     <Stack.Screen name="MusicianTypeScreen" component={MusicianTypeScreen}  />
//     <Stack.Screen name="MusicianTypeScreen2" component={MusicianTypeScreen2}  />
//     <Stack.Screen name="SplashScreenFive" component={SplashScreenFive}  />
//     <Stack.Screen name="SplashScreenFour" component={SplashScreenFour}  />
//     <Stack.Screen name="Musician" component={Musician}  />
//     <Stack.Screen name="AudioScreen" component={AudioScreen}  />

//     <Tab.Screen name="FillterMatch" component={FillterMatch}  />
//     {/* ... other onboarding screens ... */}
//   </Stack.Navigator>
// );

// // Main app stack (fully protected routes)
// const MainAppStack = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       // ... your existing tab navigator options ...
//     })}
//   >
//     <Tab.Screen name="Notification" component={Notification} />
//     <Tab.Screen name="User"  component={User} />
//     <Tab.Screen name="Profile" component={UserProfile} />
//     {/* ... other protected screens ... */}
//   </Tab.Navigator>
// );

// // Root navigator
// const AppNavigator = () => {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <ProtectedRoute>
//           <MainAppStack />
//         </ProtectedRoute>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default AppNavigator;v c
