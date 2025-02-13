import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, textInputSocial, ImageBackground, Modal, Pressable, Alert } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
// import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { isAndroid } from '../Platform';
import Popup from '../components/Popup';
import { getLocalData, storeData } from './Utility/asyncStorageUtils';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Genre, GetMusician } from '../redux/UserSlice';
const { width } = Dimensions.get('window');



function MusicianTypeScreen2({navigation}) {
  const [currentStep, setCurrentStep] = useState(1);
  const MusicianLists = useSelector((state) => state?.Users?.GetMusicianLists?.musician_types);
  const GenreLists = useSelector((state) => state?.Users?.Get_GenreLists?.genres);
  const isLoading = useSelector((state) => state?.Users?.loading);


  const dispatch = useDispatch();
  // Handle next and back buttons
   useEffect(() => {
      const fetchData = async () => {
        try {
          const isStep2 = await getLocalData('isStepTwoComplete');
          if(isStep2 === "true"){
            navigation.navigate('SplashScreenFour');
          }
        const musicianData =  await dispatch(GetMusician());
        if(musicianData?.payload?.message){
        //  Alert("Error", musicianData?.payload?.message);
         MusicianLists=[];
        }
          await dispatch(Get_Genre());
  
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [dispatch]);
  
    const toggleSelection = useCallback((type, isGenre, item) => {
      const setter = isGenre ? setSelectedGenres : setSelectedMusicians;
      setter((prev) => {
        const isSelected = prev.includes(type);
        if (isSelected) {
          return prev.filter((t) => t !== type);
        } else if (prev.length < 7) {
          return [...prev, type];
        } else {
          Alert.alert('Error', 'Select only 7 items');
          return prev;
        }
      });
  
    }, []);


  
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

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {currentStep === 1 &&
                       <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, gap: 0, justifyContent: "center" }}>
                        {MusicianLists?.map((item) => (
                          <TouchableOpacity
                            key={item?._id}
                            style={[styles.button, selectedMusicians.includes(item?._id) && styles.buttonSelected]}
                            onPress={() => toggleSelection(item?._id, false, item)}
                          >
                            <Text
                              style={[
                                styles.buttonText,
                                selectedMusicians.includes(item?._id) && styles.buttonTextSelected,
                              ]}
                            >
                              {item?.musician_type}
                            </Text>
                          </TouchableOpacity>
                        )
        
        
                        )}
                      </View>
                    }
                    {currentStep === 2 &&
                      <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, gap: 0, justifyContent: "center" }}>
                        {GenreLists?.map((item) => (
                          <TouchableOpacity
                            key={item?.document_id}
                            style={[styles.button, selectedGenres.includes(item?.document_id) && styles.buttonSelected]}
                            onPress={() => toggleSelection(item?.document_id, true, item)}
                          >
                            <Text
                              style={[
                                styles.buttonText,
                                selectedGenres.includes(item?.document_id) && styles.buttonTextSelected,
                              ]}
                            >
                              {item?.genreType}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    }
            </ScrollView>
       </ImageBackground>
        </View>
  )
}


const stepTitles = { 1: "What type of musician are you?", 2: "What genre describes you?", 3: "Matched Profiles"};


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