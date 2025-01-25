// AudioPlayer.js
import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({ filePath, index }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (filePath) {
      const soundInstance = new Sound(filePath, null, (error) => {
        if (error) {
          console.log(`Failed to load the sound for file at index ${index}`, error);
          return;
        }
      });
      setSound(soundInstance);

      return () => {
        soundInstance.release(); // Cleanup on component unmount
      };
    }
  }, [filePath]);

  const togglePlayPause = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
    } else {
      sound.play((success) => {
        if (success) {
          console.log('Finished playing');
        } else {
          console.log('Playback failed');
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Button
        title={isPlaying ? `Pause Audio ${index + 1}` : `Play Audio ${index + 1}`}
        onPress={togglePlayPause}
      />
    </View>
  );
};

export default AudioPlayer;
