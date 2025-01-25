import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { verticalScale } from '../Metrics'

function KeywordAvoidingContent({children,width,contentStyle}) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS ==="ios"?"padding":"heights"}>
    <ScrollView contentContainerStyle={contentStyle ? contentStyle: styles.scroll} style={{ width: width }}>
      {children}
      </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default KeywordAvoidingContent

const styles = StyleSheet.create({
  container:{
    flex:1,width:"100%",justifyContent:"center", alignItems:"center"
  },
  scroll: {
    // flex: 1,  // Replaces height & width with flex
    textAlign: 'center',
    marginTop: verticalScale(100),
  }
})