import {View, Text, SafeAreaView,Image, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/SettingScreen';
import TestStack from './TestStack';
import VocabStack from './VocabStack';
import HomeStack from './HomeStack';
import ForumStack from './ForumStack';
import PracticePlanStack from './PracticePlanStack';
import Analysis from '../screens/Analysis';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import firestore from '@react-native-firebase/firestore';
import { subDays, format } from 'date-fns';
import auth from '@react-native-firebase/auth';
import AnalysisStack from './AnalysisStack';

const Drawer = createDrawerNavigator();
const SideMenu = () => {
  <SafeAreaView style={{flex: 1}}>
    <View></View>
  </SafeAreaView>;
};
function DrawerNavigator() {
 
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerLabelStyle:{
        fontWeight:'500',
        color:'black',
        fontSize:18
      },
      drawerActiveTintColor:PRIMARY_COLOR
    }}
      drawerContent={props => {
        return (
          <SafeAreaView>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerLabel: 'Home', 
          drawerIcon: () => (
            <Image source={require("../assets/house.png")}/>
          ),
          headerShown:false
        }}
        
      />
      <Drawer.Screen name="Test" component={TestStack}
       options={{
        drawerLabel: 'Test', 
        drawerIcon: () => (
          <Image source={require("../assets/testIcon.png")}/>
        ),
        headerShown:false
      }} />
      <Drawer.Screen name="Vocab" component={VocabStack}
      options={{
        drawerLabel: 'Vocabulary', 
        drawerIcon: () => (
          <Image source={require("../assets/dictionary.png")}/>
        ),
        headerShown:false
      }}  />
      <Drawer.Screen name="PracticePlanStack" component={PracticePlanStack} 
      options={{
        drawerLabel: 'Practice Plan', 
        drawerIcon: () => (
          <Image source={require("../assets/route.png")}/>
        ),
        headerShown:false
      }}/>
      <Drawer.Screen name="Forum" component={ForumStack} 
      options={{
        drawerLabel: 'Forum', 
        drawerIcon: () => (
          <Image source={require("../assets/Socialicon.png")}/>
        ),
        headerShown:false
      }}/>
      <Drawer.Screen name="Setting" component={SettingScreen} 
      options={{
        drawerLabel: 'Setting', 
        drawerIcon: () => (
          <Image source={require("../assets/cogwheel.png")}/>
        ),
        headerShown:false
      }}/>
       <Drawer.Screen name="AnalysisStack" component={AnalysisStack} 
      options={{
        drawerLabel: 'Analysis', 
        drawerIcon: () => (
          <Image source={require("../assets/exploration.png")}/>
        ),
        headerShown:false
      }}/>
    </Drawer.Navigator>
    
  );
}
export default DrawerNavigator;
