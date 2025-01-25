import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";

export const getStyles = (scheme) => {
    const isDark = scheme === 'dark';
  return StyleSheet.create({
    scroll: {
        flexGrow: 1,
      textAlign: "center",
      alignItems:"center",
      justifyContent:"center",
      marginTop: verticalScale(0)  // Scalable unit for responsiveness
    },
    checkIcon:{
      width:20,
      height:20,
    },
    image: {
      flex: 1,
      width:"100%",
      justifyContent: 'center',
      alignItems:"center"
    },
    background: {
      paddingTop: verticalScale(100),
      justifyContent: "center",
      alignItems: "center",  // AlignItems instead of AlignContent
    },
    text: {
      fontSize: horizontalScale(38),  // Scalable font size
      textAlign: "center",
      fontWeight: "bold",
      color: "#fff",
      fontSize:40,
      lineHeight:55
    },
    container2: {
      marginTop: verticalScale(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
    },
    loginText: {
      color: "#496ed6",
      fontSize: horizontalScale(12),
      marginTop: verticalScale(5),
    },
    ImagesWrapper:{
        width:moderateScale(120),
        height:moderateScale(120),
        backgroundColor:"#fff",
        borderRadius:100,
        objectFit:"contain",
        position:"absolute",
        overflow:"hidden",
        top:"-35%"
    },
    ImagesProfile:{

      width:"100%",
      height:"100%",
      backgroundColor:"#fff",
      borderRadius:100,
      objectFit:"cover",
  },
    wrapper:{
        position:"relative",
        width:"100%",
        // height:200,
        backgroundColor:"#a0a1a3",
        borderRadius: 20,
        marginTop:80,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:"20%",
        margin:"auto"
    },
    container: {
        flex: 1,
        width:"100%",
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: isDark ? '#333' : '#FFF',
      },
    inputContainer: {
        width: '100%',
        padding: horizontalScale(15),
 
      },
      input: {
        width: '100%',
        height: verticalScale(60), // Scalable height
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: verticalScale(10),
        padding: horizontalScale(10),
        borderRadius: 15,
        backgroundColor: '#a0a0a0',
        color: '#fff',
        marginBottom: verticalScale(8),
      },
      inputOnbording: {
        width: '100%',
        height: verticalScale(60), // Scalable height
        borderColor: 'gray',
        marginTop: verticalScale(10),
        padding: horizontalScale(20),
        borderRadius: 15,
        backgroundColor: '#dbdbdb',
        color: '#000',
        marginBottom: verticalScale(8),
      },
      inputOnbordingTwo:{
        height: verticalScale(80), // Scalable height
        width:"96%"
      },
      width100:{
        flex:1,
        width:"100%",
        padding:13

      },
      BtnSignup: {
        alignItems: 'center',
        paddingVertical: verticalScale(20), // Consolidated paddingTop & paddingBottom
        paddingHorizontal: horizontalScale(30),
        backgroundColor: '#02140a',
        marginTop: verticalScale(24),
        borderRadius: 20
      },
      BtnSignupTxt: {
        color: '#fff',
      },
      containerBox:{
        gap:4,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
      },
      containerBox2:{
        gap:4,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:44
      },
      Forget:{
        justifyContent:"space-between",
        flex:1,
        color:"#fff",
        fontSize:12
      },
      inputLabel:{
        color:"#ffff",
        fontSize:11,
        textTransform:"uppercase",
        fontWeight:"300"
      },
      tapText:{
        fontSize:12,
        fontWeight:"300",
        color:"#ffff",
        marginBottom:40,
        textAlign:"center"
      },
      loginText:{
        fontSize:12,
        fontWeight:"400",
        color:"#4f70ff",
        marginBottom:40
      }
  });
};
