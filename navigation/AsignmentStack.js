import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsignmentScreen from '../msteam/AsignmentScreen';
import AsignmentDetail from '../msteam/AsignmentDetail';
import AsignmentDetail2 from '../msteam/AsignmentDetail2';
import CreateAsignment from '../msteam/CreateAsignment';
import CreateAsignment2 from '../msteam/CreateAsignment2';
import BeforeNewAsignment from '../msteam/BeforeNewAsignment';
import FileViewScreen from '../msteam/FileViewScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AsignmentStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Asignment' || routeName === undefined) {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
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
        name="AsignmentDetail2"
        component={AsignmentDetail2}
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
        name="BeforeNewAsignment"
        component={BeforeNewAsignment}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FileViewScreen"
        component={FileViewScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
