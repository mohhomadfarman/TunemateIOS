import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from '../Metrics'
import Svg, { Line } from 'react-native-svg';

function SubHeadingTextLine({textOne, textTwo, lineColor,LineWidth,stylesContent}) {
  return (
    <>
          <View style={[{width:"100%", borderBottomColor:lineColor,  position:"relative", justifyContent:"center", alignItems:"center",marginBottom:40 },stylesContent]}>
          <Svg height="3" width={LineWidth?LineWidth: "15%"} style={{position:"absolute",left:0,top:5}}>
    <Line
      x1="0"
      y1="1.5"
      x2="130"
      y2="1.5"
      stroke="white"
      strokeWidth="3"
    />
  </Svg>
  <Svg height="3" width={LineWidth?LineWidth: "15%"} style={{position:"absolute",right:0,top:5}}>
    <Line
      x1="0"
      y1="1.5"
      x2="130"
      y2="1.5"
      stroke="white"
      strokeWidth="3"
    />
  </Svg>
          <Text style={{color:"#fff", textAlign:"center", fontSize:moderateScale(14),position:"absolute", paddingHorizontal:2,paddingTop:8}}>{textOne}</Text>
        {textTwo && <Text style={{color:"#fff", textAlign:"center", fontSize:moderateScale(14), position:"absolute",top:13,paddingHorizontal:2,paddingBottom:8}}>{textTwo}</Text>}  

          </View> 
          </>
  )
}

export default SubHeadingTextLine