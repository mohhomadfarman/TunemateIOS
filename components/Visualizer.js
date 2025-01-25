// Visualizer.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const BAR_COUNT = 50;
const MAX_HEIGHT = 150;
const BAR_WIDTH = 5;

const Visualizer = () => {
  const [sound, setSound] = useState(null);
  const [pitchData, setPitchData] = useState(new Array(BAR_COUNT).fill(0));
  const intervalRef = useRef(null);

  useEffect(() => {
    // Load sound file (use a valid local or remote path)
    const newSound = new Sound('your_audio_file.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setSound(newSound);
    });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playAudio = () => {
    if (sound) {
      sound.play(() => {
        console.log('Finished playing');
      });

      // Simulate pitch analysis every 100ms
      intervalRef.current = setInterval(() => {
        const newData = Array(BAR_COUNT)
          .fill()
          .map(() => Math.random() * MAX_HEIGHT); // Random values for now
        setPitchData(newData);
      }, 100);
    }
  };

  const stopAudio = () => {
    if (sound) {
      sound.pause();
      clearInterval(intervalRef.current); // Stop updating the pitch
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play" onPress={playAudio} />
      <Button title="Pause" onPress={stopAudio} />

      <View style={styles.visualizer}>
        <Svg height={MAX_HEIGHT} width={BAR_COUNT * BAR_WIDTH}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#FF00FF" stopOpacity="1" />
              <Stop offset="50%" stopColor="#0000FF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FF0000" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {pitchData.map((value, index) => (
            <Rect
              key={index}
              x={index * BAR_WIDTH}
              y={MAX_HEIGHT - value}
              width={BAR_WIDTH - 2}
              height={value}
              fill="url(#grad)"
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  visualizer: {
    marginVertical: 20,
  },
});

export default Visualizer;
