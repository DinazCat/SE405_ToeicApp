import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsignmentScreen from '../msteam/AsignmentScreen';
import AsignmentDetail from '../msteam/AsignmentDetail';
const Stack = createNativeStackNavigator();

export default function AsignmentStack() {
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
    </Stack.Navigator>
  );
}
