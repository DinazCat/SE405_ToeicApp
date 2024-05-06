import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import TeacherScreen_tc from '../msteam/TeacherScreen_tc';
import CourseList_tc from '../msteam/CourseList_tc';
import ProfileOfTeacher from '../msteam/ProfileOfTeacher';

const Stack = createNativeStackNavigator();
export default function TeacherStack_tc({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Teacher' || routeName === undefined) {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Teacher_tc"
        component={TeacherScreen_tc}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CourseList_tc"
        component={CourseList_tc}
        options={{header: () => null}}
      />
       <Stack.Screen
        name="ProfileOfTeacher"
        component={ProfileOfTeacher}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
