import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Forum from '../screens/Forum';
import CommentScreen from '../screens/CommentScreen';
import AddPostScreen from '../screens/AddPostScreen';
import PostScreen from '../screens/PostScreen';
import FilterSide from '../screens/FilterSide';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchPostScreen from '../screens/SearchPostScreen';
import ChangeProfileScreen from '../screens/ChangeProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChangeGoal from '../screens/ChangeGoal';
import TestResultScreen from '../screens/TestResultScreen';
import ReadPDFScreen from '../screens/ReadPDFScreen';
import SavedPostScreen from '../screens/SavedPostScreen';
import FixPostScreen from '../screens/FixPostScreen';

const Stack = createNativeStackNavigator();

export default function ForumStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Foruminstack"
        component={Forum}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FilterSide"
        component={FilterSide}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SearchPost"
        component={SearchPostScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfileScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChangeGoal"
        component={ChangeGoal}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ReadPDFScreen"
        component={ReadPDFScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SavedPostScreen"
        component={SavedPostScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FixPostScreen"
        component={FixPostScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}