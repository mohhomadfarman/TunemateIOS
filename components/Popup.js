import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

function Popup({close, Title, data}) {

  return (
<View>
<Text style={styles.title}>
{Title}
</Text>


<Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={close}>
                <Text>Complete</Text>
            </Pressable>
</View>
  )
}


const styles =StyleSheet.create({
    title:{
        fontSize:16,
        color:"#000"
    }
})

export default Popup