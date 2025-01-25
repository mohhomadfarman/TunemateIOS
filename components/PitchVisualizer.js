import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Example waveform data (replace this with actual waveform data)
const waveformData = [0, 10, 5, 30, 20, 60, 40, 50, 20, 30, 10, 0];

const AudioWaveform = () => {
  const height = 100; // Height of the waveform container
  const waveformWidth = waveformData.length * 10; // Width based on the data points

  const points = waveformData.map((value, index) => {
    const x = index * (waveformWidth / waveformData.length);
    const y = height - (value / Math.max(...waveformData)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <ScrollView horizontal contentContainerStyle={{ width: waveformWidth }}>
      <View>
        <Svg height={height} width={waveformWidth}>
          <Polyline
            points={points}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        </Svg>
      </View>
    </ScrollView>
  );
};

export default AudioWaveform;
