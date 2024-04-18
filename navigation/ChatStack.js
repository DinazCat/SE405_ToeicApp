import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from '../msteam/Chat';
import ChatRoom from '../msteam/ChatRoom';
import ChatRoomOptions from '../msteam/ChatRoomOptions';
import ClassMembers from '../msteam/ClassMembers';
import MeetingRoom from '../msteam/MeetingRoom';
import ReplyScreen from '../msteam/ReplyScreen';
import AttendeeScreen from '../msteam/AttendeeScreen';
import NewChat from '../msteam/NewChat';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function ChatStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Chat' || routeName === undefined) {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
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
      <Stack.Screen
        name="ChatRoomOptions"
        component={ChatRoomOptions}
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
