import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterTeacher from '../msteam/RegisterTeacher';
import BankAccountTeacher from '../msteam/BankAccountTeacher';
const Stack = createNativeStackNavigator();
export default function RegisterTeacherStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterTeacher"
        component={RegisterTeacher}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="BankAccountTeacher"
        component={BankAccountTeacher}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
