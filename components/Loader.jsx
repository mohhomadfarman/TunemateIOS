import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Image } from 'react-native';

function Loader() {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000, // Duration of one rotation (in milliseconds)
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={require('../Assets/bg.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <Animated.Image
        source={require('../Assets/LogoProfile.png')}
        style={[styles.logo, { transform: [{ rotate }] }]}
      />
    </ImageBackground>
  );
}

export default Loader;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
