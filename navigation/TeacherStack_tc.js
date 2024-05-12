import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
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
        name="ProfileOfTeacher"
        component={ProfileOfTeacher}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
