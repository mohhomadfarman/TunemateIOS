import React from 'react';
import {Image, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const AudioUpload = ({ onFileSelected }) => {
  const pickAudioFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      onFileSelected(res[0]);  // Pass the file to the parent component
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error:', err);
      }
    }
  };

  return (
    // <Button title="Upload Audio" onPress={pickAudioFile} />
<>
   
   <TouchableOpacity  onPress={pickAudioFile} style={{width:"100%",flex:1}}>
    <Image source={require('../Assets/material-symbols_upload.png')} style={{
      flex: 1,
      resizeMode: 'contain',
      backgroundColor: '#a0a0a1',
      width:"100%",
      borderRadius: 15,
      padding: 10,
      height:60
    }} />
    </TouchableOpacity>
    </>
  );
};

export default AudioUpload;
