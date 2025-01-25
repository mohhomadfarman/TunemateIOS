import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioUpload from '../components/AudioUpload';
import AudioPlayer from '../components/AudioPlayer';
import PitchVisualizer from '../components/PitchVisualizer';
import { saveFileLocally } from '../utils/fileUtils';
import AudioWaveform from '../components/PitchVisualizer';


const AudioScreen = () => {
    const [filePath, setFilePath] = useState(null);

    const handleFileSelected = async (file) => {
        const localPath = await saveFileLocally(file);
        setFilePath(localPath); // Save the local file path for playback
    };

    return (
        <View style={styles.container}>
            <AudioUpload onFileSelected={handleFileSelected} />
            {filePath && (
                <View style={styles.audioInfoContainer}>
                    <Text>Audio saved locally at: {filePath}</Text>
                    <AudioPlayer filePath={filePath} />
                    <AudioWaveform />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:300,
        padding: 20,
    },
    audioInfoContainer: {
        marginTop: 20,
    },
});

export default AudioScreen;
