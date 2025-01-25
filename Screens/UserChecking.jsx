import React, { useEffect } from 'react';
import { View } from 'react-native';
import Loader from '../components/Loader';
import { getLocalData } from './Utility/asyncStorageUtils';

function UserChecking({ navigation }) {
  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const userToken = await getLocalData('userToken');
        const isUserCleate = await getLocalData('isUserCleate');

        if (!userToken) {
          navigation.navigate('UserAuth');
        } else if (userToken && isUserCleate === 'true') {
          navigation.navigate('UserAuthWithToken');
        } else {
          navigation.navigate('UserAuthWithToken'); // Add fallback or default route if needed
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
        // Optionally handle navigation in case of an error
      }
    };

    fetchUserToken();
  }, [navigation]);

  return <Loader />;
}

export default UserChecking;
