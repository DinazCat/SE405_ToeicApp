import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;
    // useEffect(() => {
    //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
    //     if (value == null) {
    //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
    //       setIsFirstLaunch(true);
    //     } else {
    //       setIsFirstLaunch(false);
    //     }
    //   });
    // }, []);
    // if (isFirstLaunch === null) {
    //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    // } else if (isFirstLaunch == true) {
    //   routeName = 'Onboarding';
    // } else {
    //   routeName = 'Login';
    // }
    useEffect(() => {
      GoogleSignin.configure({
        webClientId: '235184996000-kim1tm7pcdqahbdlolgle0pha3fl021g.apps.googleusercontent.com',
      });
    }, []);
  return (
    // <Stack.Navigator initialRouteName={routeName}>
    <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen}
        options={{ header: () => null }} />
        <Stack.Screen name="Login" component={LoginScreen}
        options={{ header: () => null }} />
        <Stack.Screen name="Signup" component={SignupScreen}
        options={{ header: () => null }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
        options={({navigation}) => ({
            title: 'Reset',
            headerTitleAlign: 'center',
            headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#f9fafd',
            elevation: 0,
            },
            headerLeft: () => (
            <View style={{color: '#fff'}}>
                <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#fff"
                color="#333"
                onPress={() => navigation.goBack()}
                />
            </View>
            ), 
        })} />  
    </Stack.Navigator>
  )
}

export default AuthStack