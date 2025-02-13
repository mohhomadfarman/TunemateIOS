import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { isAndroid } from '../Platform';
import { useFocusEffect } from '@react-navigation/native';
import { moderateScale, verticalScale } from '../Metrics';
import SubHeadingTextLine from '../components/SubHeadingTextLine';
import AudioUpload from '../components/AudioUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');


// if (isAndroid) {
//   console.log("Running on Android");
Sound.setCategory('Playback');

// } else {
//   console.log("Running on iOS");
// }


const AudioRow = ({ playSound, icon,type }) => (
  <View style={styles.audioBox}>
    {type ==="upload"? 
    <>
     <TouchableOpacity onPress={playSound}>
      <Image source={require('../Assets//play.png')} style={styles.playIcon} />
    </TouchableOpacity>
    <AudioUpload/>
    </>
    :
  <>
<TouchableOpacity onPress={playSound}>
      <Image source={require('../Assets//play.png')} style={styles.playIcon} />
    </TouchableOpacity>
    <Image source={icon} style={styles.waveform} />
    
    </>
    }
    
  </View>
);

function Musician({navigation}) {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [currentStep, setCurrentStep] = useState(1); // Stepper state
    const [bio, setBio] = useState(''); // State for bio input
  
    const [sound, setSound] = useState(null);
    const [audioUri, setAudioUri] = useState(null);

    


    // Function to play the sound
    const playSound = () => {
      const soundInstance = new Sound(require('../Assets/music/trumpet-fanfare-63760.mp3'), (error) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        soundInstance.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          soundInstance.release(); // Release when done to free up resources
        });
      });
      setSound(soundInstance);
    };
  
    // Stop sound if it's playing
    const stopSound = () => {
      if (sound) {
        sound.stop(() => {
          console.log('Sound stopped');
        });
      }
    };

    // Use React Navigation's focus and unfocus hooks
    useFocusEffect(
      React.useCallback(() => {
        // Play sound when screen is focused
        // playSound();
  
        // Stop sound when screen is unfocused (navigating away)
        return () => {
          stopSound();
         
        };
        
      }, [])
    );
  

    const toggleSelection = (type) => {
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter(t => t !== type));
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    };
  
    // Titles for each step
    const stepTitles = {
      1: "Upload your",
    };
  
    
  
    const handleBack = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };
  

    const GotoNext = () =>{
      stopSound()
      navigation.navigate('SplashScreenFive')
    }

  return (

  <View style={styles.container}>
  <ImageBackground source={require('../Assets//bg.jpg')} resizeMode="cover" style={styles.Image}>
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.ScroolClass}>

    <Text style={styles.title}>{stepTitles[currentStep]}</Text>
      <Text style={[styles.title,{marginTop:0,marginBottom:30}]}>music</Text>
      <SubHeadingTextLine textOne={"Upload up to 3 MP3 snippets of your"} textTwo={"music"}  lineColor="#fff"/>
      {/* Title based on current step */}
      <View style={{flex:1,width:"100%",padding:20, alignItems:"center",justifyContent:"center",marginTop:moderateScale(24)}}>
      

        {/* Render step-specific content */}
        {currentStep === 1 && (
          <View style={[ styles.marginTops]}>
            {/* First Audio Row */}
            <AudioRow playSound={playSound} icon={require('../Assets//waves.png')} />

            {/* Second Audio Row */}
            <AudioRow playSound={playSound} icon={require('../Assets//waves.png')} />

            {/* Third Audio Row with Upload Icon */}
            <AudioRow playSound={playSound} type="upload" icon={require('../Assets//material-symbols_upload.png')} />
          </View>
        )}
      </View>

      {/* Footer with navigation buttons */}
     

      {/* Optional Link */}
      
    </ScrollView>
    <View style={styles.footer}>
        {/* Back Button */}
        <TouchableOpacity 
          style={[styles.footerButton, currentStep === 1 && styles.disabledButton]} 
          onPress={handleBack} 
          disabled={currentStep === 1}
        >
          <Text style={styles.footerText}>Back</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate('SplashScreenFive')}>
          <Text style={styles.footerText}>Continue</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Skip this step</Text>
      </TouchableOpacity>
      
  </ImageBackground>
</View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    Image:{
      flex:1
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent:"center"
    },
    ScroolClass:{
      flex:1,
      // marginVertical:verticalScale(60),
      // backgroundColor:"#fff",
      flexDirection:"column",
    },
    title: {
      fontSize: 40,
      color: 'white',
      textAlign: 'center',
      fontWeight: '400',
      marginVertical: 10,
      marginTop:moderateScale(60),
      
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontWeight: '300',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginVertical: 10,
    },

    button: {
      backgroundColor: '#fafdfd',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 30,
      width: (width / 2) - 40,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    marginOff:{
  marginBottom:0
    },
    buttonSelected: {
      backgroundColor: '#496ed6',
    },
    buttonTextSelected: {
      color: '#fff',
    },
    buttonText: {
      color: '#000',
      fontSize: 12,
      textAlign: 'center',
    },
    bioContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor:"#d9d9d9",
      borderRadius:15,
      padding:25,
      position:"relative",
      marginBottom:"30%"
    },
    bioTitle: {
      color: 'white',
      fontSize: 13,
      marginBottom: 20,
    },
    textInputSocial: {
      backgroundColor: '#EDEDED',
      borderRadius: 10,
      padding: 15,
      width: '100%',
      height: 200,
      textAlignVertical: 'top',
      fontSize: 14,
      color: 'black',
      marginBottom:20
    },
    completeButton: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 70,
      borderRadius: 25,
      marginTop: 20,
      position:"absolute",
      bottom:verticalScale(-30)
    },
    completeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: moderateScale(0),
      marginBottom: moderateScale(20),
      paddingHorizontal: 20,
    },
    footerButton: {
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    footerText: {
      color: 'white',
    },
    disabledButton: {
      opacity: 0.5,
    },
    link: {
      marginBottom: moderateScale(50),
      textAlign:"center",
    },
    linkText: {
      color: 'white',
      fontSize: moderateScale(14),
      textAlign:"center",
    },
    containerSocial: {
      // backgroundColor: '#001f3f', // Example background color
      flex: 1,
      width:"100%"
    },
    socialMediaBox: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: '#515151',
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
    },
    socialImage: {
      width: 50,
      height: 50,
      objectFit:"contain",
      marginRight: 10,
    },
    textInputSocial: {
      flex: 1,
      color: '#ffffff',
      fontSize: 14,
      paddingHorizontal: 15,
      backgroundColor: '#a0a1a7',
      borderRadius: 20,
      padding: 10,
      fontWeight:"300",
      height:60
    },
    audioBox: {
      flex:1,
      width:"100%",
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: '#515151',
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
    },
    playIcon: {
      width: 25,
      height: 30,
      marginRight: 10,

    },
    waveform: {
      flex: 1,
      height: 40,
      resizeMode: 'contain',
      backgroundColor: '#a0a0a1',
      borderRadius: 15,
      padding: 10,
      height:60
    },
    uploadIcon: {
      flex: 1,
      width: 30,
      height: 30,
      marginRight: 10,
      backgroundColor: '#a0a0a1',
      borderRadius: 15,
      padding: 10,
      height:60
    },
  });

export default Musician
