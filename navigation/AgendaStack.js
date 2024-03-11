import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AgendaScreen from '../msteam/AgendaScreen';
import CreateAgenda from '../msteam/CreateAgenda';
const Stack = createNativeStackNavigator();
export default function AgendaStack() {
    return (
            <Stack.Navigator >
                <Stack.Screen name='AgendaScreen' component={AgendaScreen} options={{ header: () => null }}/>
                <Stack.Screen name='CreateAgenda' component={CreateAgenda} options={{ header: () => null }}/>

            </Stack.Navigator>
    );
  };