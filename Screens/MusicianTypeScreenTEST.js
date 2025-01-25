import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextInput, ImageBackground, Alert } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';
import { checkData } from './Utility/asyncStorageUtils';

const { width } = Dimensions.get('window');

const MusicianTypeScreen = ({navigation}) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [bio, setBio] = useState('');
  const [data, setData] = useState(null); // Store async data here

  useEffect(() => {
    const fetchData = async () => {
      const result = await checkData(navigation);
      console.log(result)
      setData(result);  // Update the state
     
    };
    if(data==="1"){
      setCurrentStep(1);
      console.log(currentStep,"currentStep")

    }
    fetchData();
  }, [navigation]);


  const toggleSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Musician types with steps
  const musicianTypes = {
    Step1: [
      ["Vocalist", "Songwriter"],
      ["Beatmaker", "Producer"],
      ["DJ", "Rapper"],
      ["Engineer", "Sound Designer"],
      ["Remixer", "Band/Group"],
      ["Drummer"]
    ],
    Step2: [
      ["Pianist", "Bassist"],
      ["Wind Player", "String Player"],
      ["Orchestrator", "Composer"],
      ["Conductor", "Guitarist"]
    ],
    Step3: [
      ["Pop", "RnB"],
      ["Hip-hop", "Trap"],
      ["Drill", "EDM"],
      ["Jazz", "Country"],
      ["Indie", "Lofi"],
      ["Heavy Metal"]
    ],
    Step4: [
      ["Punk Rock", "Alt Rock"],
      ["Country Rock", "House"],
      ["Electronic", "Ambient"],
      ["Dubstep", "Trance"],
      ["Techno", "Synth Pop"],
      ["Soul"]
    ],
    Step5: [
      ["K-pop", "Latin"],
      ["Hindustani"],
      ["Afrobeats", "Reggae"],
      ["Ethnic Pop"],
      ["Opera", "Classical"],
      ["Choral"]
    ],
  };

  // Titles for each step
  const stepTitles = {
    1: "What type of musician are you?",
    2: "What type of musician are you?",
    3: "What genre describes you?",
    4: "What genre describes you?",
    5: "What genre describes you?",
    6: "Bio",
  };

  // Handle next and back buttons
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
    
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNavigation = () => {
    if (currentStep === 6 && data === "0") {
      navigation.navigate('SplashScreenFour');
    } else if (currentStep === 5 && data === "1") {
      navigation.navigate('Profile');
    } else {
      handleNext();
    }
  };
  

  return (
    // <View style={styles.container}>
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="contain" style={styles.Image}>

          {/* Dynamically changing title based on the current step
          <Text style={styles.title}>{stepTitles[currentStep]}</Text>

          {currentStep === 6 ? (
                <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.bioContainer}>
              <Text style={[styles.bioTitle,styles.marginOff]}>Write a bio for your</Text>
              <Text style={styles.bioTitle}>profile?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Up to 50 words"
                placeholderTextColor="#9E9E9E"
                value={bio}
                onChangeText={setBio}
                maxLength={300} // Adjust as per word limits
                multiline
              />
              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          ) : (
            <>
              <Text style={styles.subtitle}>Pick up to 7</Text>
              <ScrollView contentContainerStyle={styles.contentContainer} style={{width:"100%",height:"100%"}}>

              {musicianTypes[`Step${currentStep}`].map((pair, index) => (
                  <View key={index} style={styles.row}>
                    {pair.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[styles.button, selectedTypes.includes(type) ? styles.buttonSelected : null]}
                        onPress={() => toggleSelection(type)}
                      >
                        <Text style={[styles.buttonText, selectedTypes.includes(type) ? styles.buttonTextSelected : null]}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                  
                  </View>
              ))}
                </ScrollView>

            </>
          )}

          <View style={styles.footer}>
         
            <TouchableOpacity 
              style={[styles.footerButton, currentStep === 1 && styles.disabledButton]} 
              onPress={handleBack} 
              disabled={currentStep === 1}
            >
              <Text style={styles.footerText}>Back</Text>
            </TouchableOpacity>

        
            <TouchableOpacity 
              style={styles.footerButton} 
              onPress={handleNavigation}
            >
              <Text style={styles.footerText}>{currentStep === 6 ? 'Finish' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Don't see your musicianship? Click here</Text>
          </TouchableOpacity> */}

    </ImageBackground>
    // </View>

  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // gradient: {
  //   flex: 1,
  // },
  Image:{
  flex:1,
  width:"100%",
  height:"100%",
  objectFit:"cover"
  },
 
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    marginVertical: 10,
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
  textInput: {
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
    marginTop: 50,
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
    marginTop: 30,
    marginBottom: 20,
  },
  linkText: {
    color: 'white',
    fontSize: 11,
  },
});

export default MusicianTypeScreen;
