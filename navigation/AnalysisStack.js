import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ActivityIndicator, Text} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Analysis from '../screens/Analysis';
import HistoryScreen from '../screens/HistoryScreen';
import CompleteCard from '../components/CompleteCard';
import CompleteCard2 from '../components/CompleteCard2';
import TestResultScreen from '../screens/TestResultScreen';
const Stack = createNativeStackNavigator();
export default function AnalysisStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Analysis' component={Analysis} options={{ header: () => null }}/>
            <Stack.Screen name='HistoryScreen' component={HistoryScreen} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteCard' component={CompleteCard} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteCard2' component={CompleteCard2} options={{ header: () => null }}/>
            <Stack.Screen name='TestResultScreen' component={TestResultScreen} options={{ header: () => null }}/>
        </Stack.Navigator>
    );
  };