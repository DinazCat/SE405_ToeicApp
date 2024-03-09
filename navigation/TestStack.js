import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ActivityIndicator, Text} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test from '../screens/Test';
import ResultTable from '../components/ResultTable';
import TestResultScreen from '../screens/TestResultScreen';
import ReviewQuestion from '../screens/ReviewQuestion';
import TestQuestions from '../screens/TestQuestions';
import CompleteTestCard from '../components/CompleteTestCard';
import InTestCard from '../components/InTestCard';

const Stack = createNativeStackNavigator();
export default function TestStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Testinstack' component={Test} options={{ header: () => null }}/>
            <Stack.Screen name='InTestCard' component={InTestCard} options={{ header: () => null }}/>
            <Stack.Screen name='ResultTable' component={ResultTable} options={{ header: () => null }}/>
            <Stack.Screen name='TestResult' component={TestResultScreen} options={{ header: () => null }}/>
            <Stack.Screen name='ReviewQuestion' component={ReviewQuestion} options={{ header: () => null }}/>
            <Stack.Screen name='TestQuestions' component={TestQuestions} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteTestCard' component={CompleteTestCard} options={{ header: () => null }}/>
        </Stack.Navigator>
    );
  };