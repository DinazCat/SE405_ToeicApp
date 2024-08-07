import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from '../msteam/Chat';
import ChatRoom from '../msteam/ChatRoom';
import ChatRoomOptions from '../msteam/ChatRoomOptions';
import CallRoom from '../msteam/CallRoom';
import NewGroupChat from '../msteam/NewGroupChat';
import ChatMembers from '../msteam/ChatMembers';
import AddChatMember from '../msteam/AddChatMember';
import NewChat from '../msteam/NewChat';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import OverlayPermissionModule from 'videosdk-rn-android-overlay-permission';
import RNCallKeep from 'react-native-callkeep';
import {Platform, LogBox} from 'react-native';

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

  useEffect(() => {
    // const options = {
    //   android: {
    //     alertTitle: 'Permissions required',
    //     alertDescription: 'This section needs to access your phone accounts',
    //     cancelButton: 'Cancel',
    //     okButton: 'ok',
    //     imageName: 'phone_account_icon',
    //   },
    // };
    // RNCallKeep.setup(options);
    RNCallKeep.setAvailable(true);

    // if (Platform.OS === 'android') {
    //   OverlayPermissionModule.requestOverlayPermission();
    // }
  }, []);
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
        name="NewGroupChat"
        component={NewGroupChat}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatRoomOptions"
        component={ChatRoomOptions}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CallRoom"
        component={CallRoom}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatMembers"
        component={ChatMembers}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AddChatMember"
        component={AddChatMember}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
