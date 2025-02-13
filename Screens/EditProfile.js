import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ClearDtaa } from './Utility/asyncStorageUtils';

const EditProfile = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.errorCode) {
        Alert.alert('Error', 'Could not select an image. Please try again.');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setProfilePicture(selectedImage.uri);
      }
    });
  };

  const handleNavigation = (field, value) => {
    navigation.navigate('EditDetailScreen', { field, value });
  };
  const LogOut = async () =>{
    await ClearDtaa();
    navigation.navigate('UserAuth');
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.backButtonText}>{Platform.OS === 'ios' ? '‹ Back' : 'Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <View style={styles.profilePicture}>
              <Text style={styles.profilePictureText}>Profile Picture</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.editPictureText}>Edit profile picture</Text>
      </View>

      {/* Profile Fields Section */}
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation('Username', 'mansikasagani')}>
          <Text style={styles.listLabel}>Username</Text>
          <Text style={styles.listValue}>mansikasagani</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation('Bio', '')}>
          <Text style={styles.listLabel}>Bio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation('Social Media Links', '')}>
          <Text style={styles.listLabel}>Social Media Links</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation('Musician Type', '')}>
          <Text style={styles.listLabel}>Musician Type</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation('Genre', '')}>
          <Text style={styles.listLabel}>Genre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.listItem,{color:"red"}]} onPress={() => LogOut()}>
          <Text style={styles.listLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB', // Light background color
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: '#587BF2', // Blue color
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#587BF2', // Blue color
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  editPictureText: {
    marginTop: 10,
    fontSize: 14,
    color: '#7C7C7C',
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  listLabel: {
    fontSize: 16,
    color: '#333333',
  },
  listValue: {
    fontSize: 16,
    color: '#666666',
  },
});

export default EditProfile;
