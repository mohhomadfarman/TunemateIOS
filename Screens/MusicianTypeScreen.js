import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Modal,
  TextInput,
  Image,
  TouchableNativeFeedback,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetMusician, Get_Genre, UpdateBio, UpdateGenra, UpdateMusician, update_SocialMedia_Link } from '../redux/UserSlice';
import Loader from '../components/Loader';
import { horizontalScale, moderateScale, verticalScale } from '../Metrics';
import SubHeadingTextLine from '../components/SubHeadingTextLine';
import { getLocalData, storeLocalData } from './Utility/asyncStorageUtils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import KeywordAvoidingContent from '../components/KeywordAvoidingContent';

const { width } = Dimensions.get('window');

function MusicianTypeScreen({ navigation }) {
  const [selectedMusicians, setSelectedMusicians] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [bio, setBio] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoader, setIsLoader] = useState(false);

  const [socialMediaLinks, setSocialMediaLinks] = useState({
    insta_link: '',
    tiktok_link: '',
    soundcloud_link: '',
    spotify_link: '',
    youtube_link: '',
  });

  const dispatch = useDispatch();
  const MusicianLists = useSelector((state) => state?.Users?.GetMusicianLists?.musician_types);
  const GenreLists = useSelector((state) => state?.Users?.Get_GenreLists?.genres);
  const isLoading = useSelector((state) => state?.Users?.loading);


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
      console.log(musicianData?.payload?.message)
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

  const handleNext = useCallback(() => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);




  const handleSocialMediaChange = (key, value) => {
    setSocialMediaLinks((prev) => ({ ...prev, [key]: value }));
  };


  // Function to retrieve all selected data
  const getDetailsForDB = () => ({
    selectedMusicians,
    selectedGenres,
    bio,
    socail: { ...socialMediaLinks }, // Include the social media links
  });

  const transformArray = (key, arr) => {
    return arr.map((id) => ({
      musicianTypeId: id,
    }));
  };


  const musicianPayload = {
    musicianChoice: "predefined",
    musicians: transformArray('musicianTypeId', selectedMusicians),
  };
  const GenraPayload = {
    genreChoice: "predefined",
    genres: transformArray('genreId', selectedGenres),
  };

  const handleNavigation = useCallback(async () => {

    try {
      if (currentStep === 1) {
        setIsLoader(true);
        const result = await dispatch(UpdateMusician(musicianPayload));
        if (result?.meta?.requestStatus === "fulfilled") {
          setIsLoader(false);
          Alert.alert("Success", "Musician Has been Updated!");
          handleNext();
        } else {
          Alert.alert("Error", "Something went wrong");
        }


      } else if (currentStep === 2) {
        setIsLoader(true);
        const result = await dispatch(UpdateGenra(GenraPayload));
        if (result?.meta?.requestStatus === "fulfilled") {
          setIsLoader(false);
          Alert.alert("Success", "Genre Has been Updated!");
          handleNext();
        } else {
          Alert.alert("Error", "Something went wrong");
        }


      } else if (currentStep === 3) {
        setIsLoader(true);
        const result = await dispatch(UpdateBio({ bio: getDetailsForDB().bio }));
        if (result?.meta?.requestStatus === "fulfilled") {
          setIsLoader(false);
          // Alert.alert("Success", "Bio is updated");
          handleNext();
        } else {
          Alert.alert("Error", "Enter up to 50 words for Bio");
        }
      } else if (currentStep === 4) {
        setIsLoader(true);
        const response = await dispatch(update_SocialMedia_Link(getDetailsForDB().socail));
        if (response?.payload?.status === "success") {
          setIsLoader(false);
          Alert.alert("Success", "Social Media Links Updated");
          storeUserToken("true", "isStepTwoComplete");
          navigation.navigate("SplashScreenFour");
        }
      }
    } catch (error) {
      console.error("Error in handleNavigation:", error);
    }
  }, [currentStep, selectedMusicians, selectedGenres, bio, socialMediaLinks, dispatch, navigation]);



  const storeUserToken = async (userToken, key) => {
    if (userToken) {
      return await storeLocalData(userToken, key);  // Store the username
    } else {
      Alert.alert('Error', 'Please enter a valid username (max 12 characters).');
    }
  };


  return (
    <View style={styles.container}>
      {(isLoading || isLoader) ? (
        <Loader />
      ) : (
        <ImageBackground source={require('../Assets/bg.jpg')} resizeMode="cover" style={styles.Image}>
          <Text style={[styles.title]}>{stepTitles[currentStep]}</Text>
          {currentStep !== 3 && currentStep !== 4 &&
            <SubHeadingTextLine LineWidth="30%" textOne={`Pick up to ${7 - (currentStep === 1 ? selectedMusicians.length : currentStep === 2 ? selectedGenres.length : 0)}`} lineColor="#fff" />
          }
            
          {/* {currentStep ===3 && <SubHeadingTextLine LineWidth="30%"  lineColor="#fff" />} */}
          {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
          <KeywordAvoidingContent contentStyle={styles.contentContainer} width="100%">
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
            {currentStep === 3 && (
            <View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%"}}>
              <View style={[styles.bioContainer,{marginTop:verticalScale(60)}]}>
                <Text style={styles.bioTitle}>Write a bio for your profile?</Text>
                  <TextInput
                  style={styles.textInput}
                  placeholder="Up to 50 words"
                  placeholderTextColor="#9E9E9E"
                  value={bio}
                  onChangeText={setBio}
                  maxLength={300}
                  multiline
                />
                  </View>
              </View>
            )}

            {currentStep === 4 && (
              <View style={styles.containerSocial}>
                {SocailMediaLinks?.map((item) => (
                  <View key={item.key} style={styles.socialMediaBox}>
                    <Image source={item.img} style={styles.socialImage} />
                    <TextInput
                      style={styles.textInputSocial}
                      placeholder={item.lable}
                      placeholderTextColor="#ffffff"
                      value={socialMediaLinks[item.key.toLowerCase() + '_link']} // Match the key with the state
                      onChangeText={(text) => handleSocialMediaChange(item.key.toLowerCase() + '_link', text)} // Update state
                    />
                  </View>
                ))}
              </View>

            )}
          </KeywordAvoidingContent>
          {/* </ScrollView> */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={handleBack}>
              <Text style={styles.footerText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={handleNavigation}>
              <Text style={styles.footerText}>{currentStep === 4 ? 'Finish' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>

          {currentStep === 3 && <TouchableOpacity onPress={() => handleNext()}>
            <Text style={{ color: "#fff", fontSize: moderateScale(14), marginTop: 0, textAlign: "center" }}>Skip the Step</Text></TouchableOpacity>}
          {currentStep < 3 ? < TouchableOpacity style={styles.link}
          // onPress={() => toggleSelectionV(currentStep === 1 ? "musicianship" : "genre")}
          >
            <Text style={styles.linkText}>
              {currentStep < 3
                ? `Don't see your ${currentStep === 1 ? 'musicianship' : 'genre'}? Click here`
                : ''}
            </Text>

          </TouchableOpacity> :

            <View style={styles.link}></View>
          }


        </ImageBackground>
      )}
    </View>
  );
}
const SocailMediaLinks = [
  { img: require("../Assets//Untitled-3.png"), lable: "Instagram username", key: "instagram" },
  { img: require("../Assets//Untitled-2.png"), lable: "TikTok username", key: "TikTok" },
  { img: require("../Assets//Untitled-5.png"), lable: "SoundCloud username", key: "SoundCloud" },
  { img: require("../Assets//Spotify.png"), lable: "Spotify username", key: "Spotify" },
  { img: require("../Assets//Untitled-6.png"), lable: "Youtube username", key: "Youtube" }]



const stepTitles = { 1: "What type of musician are you?", 2: "What genre describes you?", 3: "Bio", 4: "Link your Social Media" };

const styles = StyleSheet.create({
  container: { flex: 1 },
  Image: { paddingHorizontal: 10, flex: 1 },
  contentContainer: { alignItems: 'center', justifyContent: "center" },
  title: { fontSize: moderateScale(40), color: 'white', textAlign: 'center', fontWeight: '400', marginVertical: verticalScale(60), marginBottom: moderateScale(15), marginHorizontal: horizontalScale(0) },
  subtitle: { fontSize: moderateScale(16), color: 'white', textAlign: 'center', fontWeight: '300', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginVertical: moderateScale(12) },
  bgCover: { backgroundColor: "#d9d9d9", borderRadius: 6, padding: 0, justifyContent: "center", alignItems: "center" },
  button: { backgroundColor: '#fafdfd', paddingHorizontal: moderateScale(10), paddingVertical: 10, borderRadius: 30, width: "46%", marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  buttonSelected: { backgroundColor: '#496ed6' },
  buttonText: { color: '#000', fontSize: moderateScale(14), textAlign: 'center' },
  buttonTextSelected: { color: '#fff' },
  bioContainer: { width: '100%', alignItems: 'center', backgroundColor: "#d9d9d9", borderRadius: 15, padding: 25, position: "relative", marginBottom: "13%", paddingBottom: moderateScale(50) },
  bioTitle: { color: 'white', fontSize: 13, marginBottom: 20 },
  textInput: { height: moderateScale(200), width: '100%', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 15, fontSize: 14, borderRadius: 10, textAlignVertical: 'top', color: '#000' },
  completeButton: { position: "absolute", bottom: moderateScale(-40), width: "100%", paddingVertical: 20, backgroundColor: "#000", borderRadius: 100, marginTop: "10%" },
  completeButtonText: { color: "white", fontSize: 14, fontWeight: "700", textAlign: "center" },
  footer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, paddingHorizontal: moderateScale(10), paddingBottom: moderateScale(20) },
  footerButton: { padding: 10, backgroundColor: 'rgba(0,0,0,1)', borderRadius: 10, width: '45%', alignItems: 'center' },
  footerText: { color: 'white' },
  disabledButton: { backgroundColor: 'gray', opacity: 0.5 },
  modalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', paddingHorizontal: 20 },
  socialMediaBox: { marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  socialImage: { height: 50, width: 50, objectFit: "contain" },
  textInputSocial: { paddingLeft: moderateScale(15), fontSize: moderateScale(12), height: moderateScale(45), backgroundColor: '#d9d9d9', color: 'white', width: '80%', borderRadius: 15, paddingVertical: moderateScale(20), height: moderateScale(60), marginLeft: moderateScale(10) },
  link: { paddingVertical: verticalScale(0), justifyContent: "center", alignItems: "center", paddingBottom: 50 },
  linkText: { color: 'white', fontSize: moderateScale(14), textAlign: "center" },
  containerSocial: { gap: 16, marginTop: 18 }
});

export default MusicianTypeScreen;
