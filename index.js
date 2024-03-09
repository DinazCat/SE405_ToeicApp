/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';

console.disableYellowBox = true; 
console.warn = () => {}; 
console.error = () => {}; 

AppRegistry.registerComponent(appName, () => App);
