/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { isAndroid } from './Platform'; // Correct import
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';



export const IndexApp = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <App />
    </Provider>
  </SafeAreaView>

  );
}

AppRegistry.registerComponent(appName, () => IndexApp);

