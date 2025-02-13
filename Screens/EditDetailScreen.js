import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const EditDetailScreen = ({ route, navigation }) => {
  const { field, value } = route.params;
  const [input, setInput] = useState(value);

  const handleSave = () => {
    Alert.alert('Saved!', `${field} has been updated to "${input}".`);
    navigation.navigate('editProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Edit ${field}`}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder={`Enter ${field}`}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#587BF2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditDetailScreen;
