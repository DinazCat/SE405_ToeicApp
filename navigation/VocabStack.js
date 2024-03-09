import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Vocab from '../screens/Vocab';
import InVocabLessonCard from '../components/InVocabLessonCard';
import VocabLessonCard from '../components/VocabLessonCard';
import Game from '../components/Game';
import GameScreen from '../screens/GameScreen';
const Stack = createNativeStackNavigator();
export default function VocabStack() {
    return (
            <Stack.Navigator >
                <Stack.Screen name='Vocabinstack' component={Vocab} options={{ header: () => null }}/>
                <Stack.Screen name='InVocabLessonCard' component={InVocabLessonCard} options={{ header: () => null }}/>
                <Stack.Screen name='VocabLessonCard' component={VocabLessonCard} options={{ header: () => null }}/>
                <Stack.Screen name='Game' component={Game} options={{ header: () => null }}/>
                <Stack.Screen name='GameScreen' component={GameScreen} options={{ header: () => null }}/>
            </Stack.Navigator>
    );
  };