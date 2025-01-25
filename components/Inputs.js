import { Text, TextInput, useColorScheme, View } from "react-native";
import { getStyles } from "../Screens/Style/style";

const TextInputField = ({ label, placeholder,onChangeText,secureTextEntry })=> {

    const scheme = useColorScheme();
    const styles = getStyles(scheme);
    const StylePage =getStyles(scheme)
    return(
        <View >
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholderTextColor={scheme === 'dark' ? 'lightgray' : 'lightgray'}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
    )};


  export default TextInputField;