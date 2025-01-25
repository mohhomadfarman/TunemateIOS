import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Function to store data
export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('mykey', value);
    console.log('Data saved successfully.');
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const storeLocalData = async (value,key) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully.');
    console.log(key, value);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const getLocalData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.error('Error reading data:', e);
  }
};

export const ClearDtaa = async () =>{
  try{
    return AsyncStorage.clear();

} catch (e) {
  console.error('Error reading data:', e);
}
}
// Function to get stored data
export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('mykey');
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.error('Error reading data:', e);
  }
};

// Function to check data and handle navigation
export const checkData = async (key) => {
  try {
    let data;
    
    // If a key is provided, fetch data for that key
    if (key) {
      data = await getData(key);
    } else {
      // If no key is provided, fetch default or some global data (if applicable)
      data = await getData(); 
    }
    
    console.log('Fetched Data:', data); // Logs the fetched data
    return data; // Return the fetched data
  } catch (e) {
    console.error('Error in checkData:', e);
    return null; // Return null if an error occurs
  }
};

