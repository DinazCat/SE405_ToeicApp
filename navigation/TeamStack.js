import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Teams from '../msteam/Teams';
import TeamRoom from '../msteam/TeamRoom';
import MeetingRoom from '../msteam/MeetingRoom';
import ReplyScreen from '../msteam/ReplyScreen';
import NewPost from '../msteam/NewPost';
import AttendeeScreen from '../msteam/AttendeeScreen';
import NewTeam from '../msteam/NewTeam';
import JoinTeam from '../msteam/JoinTeam';
import AsignmentScreen from '../msteam/AsignmentScreen';
import AsignmentDetail from '../msteam/AsignmentDetail';
import CreateAsignment from '../msteam/CreateAsignment';
import CreateAsignment2 from '../msteam/CreateAsignment2';
import ClassMembers from '../msteam/ClassMembers';
import ShowRecord from '../msteam/ShowRecord';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DateItem from '../ComponentTeam/DateItem';
import FileViewScreen from '../msteam/FileViewScreen'
import OpenFolder from '../msteam/OpenFolder';
import RegisterCourse from '../msteam/RegisterCourse';

const Stack = createNativeStackNavigator();
export default function TeamStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Teams' || routeName === undefined) {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Teams"
        component={Teams}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TeamRoom"
        component={TeamRoom}
        options={{header: () => null}}
      />
      <Stack.Screen
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
        name="NewPost"
        component={NewPost}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AttendeeScreen"
        component={AttendeeScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="NewTeam"
        component={NewTeam}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="JoinTeam"
        component={JoinTeam}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Asignment"
        component={AsignmentScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AsignmentDetail"
        component={AsignmentDetail}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CreateAsignment"
        component={CreateAsignment}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CreateAsignment2"
        component={CreateAsignment2}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ClassMembers"
        component={ClassMembers}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ShowRecord"
        component={ShowRecord}
        options={{header: () => null}}
      />
       <Stack.Screen
        name="DateItem"
        component={DateItem}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FileViewScreen"
        component={FileViewScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="OpenFolder"
        component={OpenFolder}
        options={{header: () => null}}
      />
        <Stack.Screen
        name="RegisterCourse"
        component={RegisterCourse}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
