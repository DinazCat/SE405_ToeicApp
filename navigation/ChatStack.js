import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from '../msteam/Chat';
import ChatRoom from '../msteam/ChatRoom';
import MeetingRoom from '../msteam/MeetingRoom';
import ReplyScreen from '../msteam/ReplyScreen';
import AttendeeScreen from '../msteam/AttendeeScreen';
import NewChat from '../msteam/NewChat';

const Stack = createNativeStackNavigator();
export default function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{header: () => null}}
      />
      {/* <Stack.Screen
        name="MeetingRoom"
        component={MeetingRoom}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ReplyScreen"
        component={ReplyScreen}
        options={{header: () => null}}
      />

      <Stack.Screen
        name="AttendeeScreen"
        component={AttendeeScreen}
        options={{header: () => null}}
      /> */}
    </Stack.Navigator>
  );
}
