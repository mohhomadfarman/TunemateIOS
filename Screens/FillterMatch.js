import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { checkData } from './Utility/asyncStorageUtils';
import SwipeCarousel from '../components/Slider';
import { isIOS } from '../Platform';
import { moderateScale } from '../Metrics';
import { useDispatch } from 'react-redux';
import { RendomMatch } from '../redux/UserSlice';
import Loader from '../components/Loader';
import Profile from './Profile';

function FillterMatch({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();

  // Fetch profiles when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        // Make API call and handle response
        const response = await dispatch(RendomMatch());

        
        if(response?.payload.message){
            Alert.alert(response?.payload?.message);
        }
        if (response?.payload) {
          setProfiles(response?.payload || []); // Ensure payload is properly set
        } else {
          throw new Error('No profiles found');
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);

        // Handle missing authentication token error
        if (error?.message === 'Missing Authentication Token') {
          Alert.alert('Authentication Error', 'Please log in again to continue.');
        } else if (error?.message === 'No profiles found') {
          Alert.alert('Data Not Found', 'No profiles were found. Please try again later.');
        } else {
          // General error handling
          Alert.alert('Error', 'Failed to load profiles. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [dispatch]);

  
  // Cards are conditionally populated based on profiles data
  const cards = profiles?.similar_profiles?.length > 0 
    ? profiles?.similar_profiles?.map((profile, index) => ({
        id: index + 1,
        text: profile,
      }))
    : [
        { id: 1, text: <Profile /> },
        { id: 2, text: <Profile /> },
        { id: 3, text: <Profile /> },
      ];


  return (
    <ImageBackground
      source={require('../Assets/bg.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      {loading ? <Loader /> : <SwipeCarousel cards={cards} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SigninText: {
    fontSize: isIOS ? moderateScale(24) : moderateScale(18),
    textAlign: 'center',
    fontWeight: '400',
    color: '#fff',
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  profileMenu: {
    marginTop: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    left: 20,
    top: 15,
  },
  viewBox: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginBottom: 100,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 45,
    color: '#fff',
    marginBottom: 8,
  },
  textSub: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFF',
  },
  FilterBox: {
    backgroundColor: '#143774',
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtDivide: {
    marginVertical: 30,
    color: '#fff',
  },
  TextWhite: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default FillterMatch;
