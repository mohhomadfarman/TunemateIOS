import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, textInputSocial, ImageBackground, Modal, Pressable } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
// import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { isAndroid } from '../Platform';
import Popup from '../components/Popup';
import { storeData } from './Utility/asyncStorageUtils';
const { width } = Dimensions.get('window');

// if (isAndroid) {
//   console.log("Running on Android");
// Sound.setCategory('Playback');

// } else {
//   console.log("Running on iOS");
// }

function MusicianTypeScreen2({navigation}) {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [currentStep, setCurrentStep] = useState(1); // Stepper state
    const [bio, setBio] = useState(''); // State for bio input
  
    const [sound, setSound] = useState(null);
    const [audioUri, setAudioUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null); // Store async data here


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
            ["Pianist", "Bassist"],
        ["Wind Player", "String Player"],
        ["Orchestrator", "Composer"],
        ["Conductor", "Guitarist"],
        ["Drummer"], 
      ],
      Step2: [
        ["Pop", "RnB"],
        ["Hip-hop", "Trap"],
        ["Drill", "EDM"],
        ["Jazz", "Country"],
        ["Indie", "Lofi"],
        ["K-pop", "Latin"],
        ["Afrobeats", "Reggae"],
        ["Opera", "Classical"],
        ["Choral","Ethnic Pop"],
        ["Hindustani","Heavy Metal"],

      ],
  
    };
  
    // Titles for each step
    const stepTitles = {
      1: "What type of musician are you looking for?",
      2: "What genre are you looking for?",


    };
  // Handle next and back buttons
  const handleNext = () => {
    if (currentStep) {
      setCurrentStep(currentStep + 1);
    }
    
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };




const NextFetch = async() =>{
  await storeData("1"); 
 navigation.navigate('ProfileTab')
}

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.Image}>

        <Text style={styles.title}>{stepTitles[currentStep]}</Text>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}

            <>
               <Text style={styles.subtitle}>Pick up to 7</Text>
              <ScrollView contentContainerStyle={styles.contentContainer} style={{width:"100%",height:"100%"}}>

              {musicianTypes[`Step${currentStep}`]?.map((pair, index) => (
                  <View key={index} style={styles.row}>
                    {pair?.map((type) => (
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
    

<View style={styles.footer}>
         
<TouchableOpacity style={[styles.footerButton]} onPress={currentStep === 1 ? ()=>navigation.navigate('ProfileTab') : handleBack} >
            <Text style={styles.footerText}>Back</Text>
          </TouchableOpacity>

     
         <TouchableOpacity 
           style={styles.footerButton} 
           onPress={currentStep ===2 ? ()=> NextFetch() : handleNext}
         >
           <Text style={styles.footerText}> Continue</Text>
         </TouchableOpacity>
       </View>
       <TouchableOpacity style={styles.link}>
         <Text style={styles.linkText}>Don't see your musicianship? Click here</Text>
       </TouchableOpacity> 

   
      {/* </ScrollView> */}
    </ImageBackground>
    <View style={styles.centeredView}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
 <View style={styles.modalView}>
          <Popup close={() => setModalVisible(!modalVisible)} Title="hello" />

           
          </View>
        </Modal>
        </View>
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
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      color: 'white',
      textAlign: 'center',
      fontWeight: '400',
      marginVertical: verticalScale(60),
      marginBottom:moderateScale(15),
      marginHorizontal:horizontalScale(10)
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
      marginTop: 0,
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
      marginTop: 20,
      paddingHorizontal: 20,
      paddingBottom:moderateScale(20),
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
      marginBottom: moderateScale(20),
      textAlign:"center",
      justifyContent:"center",
      alignContent:"center"
    },
    linkText: {
      color: 'white',
      fontSize: 11,
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
      width: 30,
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
   
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      position:"absolute",
      height:"100%"

      // marginTop: 22,
    },
    modalView: {
      margin: 20,
      marginVertical:verticalScale(180),
      backgroundColor: 'white',
      // height:400,
      flex:1,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
   
   
  });

export default MusicianTypeScreen2