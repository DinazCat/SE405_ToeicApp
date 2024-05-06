import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import TeacherScreen from '../msteam/TeacherScreen';
import MyTeacher from '../msteam/MyTeacher';
import TeacherList from '../msteam/TeacherList';
import CourseList from '../msteam/CourseList';
import DetailCourse from '../msteam/DetailCourse';
import RegisterCourse from '../msteam/RegisterCourse';
import ProfileTeacher from '../msteam/ProfileTeacher';
import ProfileOfTeacher from '../msteam/ProfileOfTeacher';
import DrawerNavigator_teacher from './DrawerNavigator_teacher';

const Stack = createNativeStackNavigator();
export default function TeacherStack({navigation, route}) {
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
        name="Teacher"
        component={TeacherScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="MyTeacher"
        component={MyTeacher}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TeacherList"
        component={TeacherList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CourseList"
        component={CourseList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="DetailCourse"
        component={DetailCourse}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="RegisterCourse"
        component={RegisterCourse}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ProfileTeacher"
        component={ProfileTeacher}
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
