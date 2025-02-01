import axios from 'axios';
import { getLocalData } from '../Screens/Utility/asyncStorageUtils';
// import { baseURL } from '../config/config';
// import { getToken } from '../Utils/auth';

export const NewBaseURL = "https://emht92r6ib.execute-api.ap-south-1.amazonaws.com/Tunemate/"
const baseURL = "https://uy5ykkqpfc.execute-api.ap-south-1.amazonaws.com/Tunemate/"

export const axiosInstance = axios.create({
  baseURL: NewBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const token = getToken();

export const axiosInstanceToken = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  },
});

export const axiosInstanceTokenFormData = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    // 'Authorization': `Bearer ${token}`,
  },
});


// Helper Function to Create Axios Instances Dynamically
export const createAxiosInstance = async (baseURL, contentType = 'application/json') => {
  const userToken = await getLocalData('userToken'); // Fetch token from storage

  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': contentType,
      ...(userToken && { 'user-token': userToken }), // Add token if it exists
    },
  });
};

export const createAxiosInstanceTwo = async (basesURL) => {
  try {
    const userToken = await getLocalData('userToken'); // Fetch user token

    if (!userToken) {
      console.error('No user token found');
      throw new Error('Missing userToken in localStorage');
    }

    // Create Axios instance with userToken added to headers
    return axios.create({
      baseURL: basesURL,
      headers: {'userToken': userToken}
    });
  } catch (error) {
    console.error('Error creating Axios instance:', error);
    throw error; // Propagate the error
  }
};


