import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterTeacher from '../msteam/RegisterTeacher';
import GetBankAccount from '../msteam/GetBankAccount';
import GetCertificateImage from '../msteam/GetCertificateImage';

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
        name="GetCertificateImage"
        component={GetCertificateImage}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="GetBankAccount"
        component={GetBankAccount}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
