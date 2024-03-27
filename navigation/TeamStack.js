import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Teams from '../msteam/Teams';
import TeamRoom from '../msteam/TeamRoom';
import MeetingRoom from '../msteam/MeetingRoom';
import ReplyScreen from '../msteam/ReplyScreen';
import NewPost from '../msteam/NewPost';
import AttendeeScreen from '../msteam/AttendeeScreen';
import NewTeam from '../msteam/NewTeam';
import JoinTeam from '../msteam/JoinTeam';

const Stack = createNativeStackNavigator();
export default function TeamStack() {
    return (
            <Stack.Navigator >
                <Stack.Screen name='Teams' component={Teams} options={{ header: () => null }}/>
                <Stack.Screen name='TeamRoom' component={TeamRoom} options={{ header: () => null }}/>
                <Stack.Screen name='MeetingRoom' component={MeetingRoom} options={{ header: () => null }}/>
                <Stack.Screen name='ReplyScreen' component={ReplyScreen} options={{ header: () => null }}/>
                <Stack.Screen name='NewPost' component={NewPost} options={{ header: () => null }}/>
                <Stack.Screen name='AttendeeScreen' component={AttendeeScreen} options={{ header: () => null }}/>
                <Stack.Screen name='NewTeam' component={NewTeam} options={{ header: () => null }}/>
                <Stack.Screen name='JoinTeam' component={JoinTeam} options={{ header: () => null }}/>
            </Stack.Navigator>
    );
  };