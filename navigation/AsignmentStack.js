import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsignmentScreen from '../msteam/AsignmentScreen';
import AsignmentDetail from '../msteam/AsignmentDetail';
import AsignmentDetail2 from '../msteam/AsignmentDetail2';
import CreateAsignment from '../msteam/CreateAsignment';
import CreateAsignment2 from '../msteam/CreateAsignment2';
import BeforeNewAsignment from '../msteam/BeforeNewAsignment';
import FileViewScreen from '../msteam/FileViewScreen';
import PartList from '../msteam/PartList';
import InPartCard from '../components/InPartCard';
import CompleteCard from '../components/CompleteCard';
import CompleteCard2 from '../components/CompleteCard2';
import QuestionScreen from '../screens/QuestionScreen';
import ResultTable from '../components/ResultTable';
import TestResultScreen from '../screens/TestResultScreen';
import ReviewQuestion from '../screens/ReviewQuestion';
import Test from '../screens/Test';
import TestQuestions from '../screens/TestQuestions';
import CompleteTestCard from '../components/CompleteTestCard';
import InTestCard from '../components/InTestCard';
import ReviewAssignment from '../msteam/ReviewAssignment';
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
        name="ReviewAsignment"
        component={ReviewAssignment}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FileViewScreen"
        component={FileViewScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PartList"
        component={PartList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="InPartCard"
        component={InPartCard}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="InTestCard"
        component={InTestCard}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Testinstack"
        component={Test}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CompleteCard"
        component={CompleteCard}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CompleteCard2"
        component={CompleteCard2}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ResultTable"
        component={ResultTable}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ReviewQuestion"
        component={ReviewQuestion}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TestQuestions"
        component={TestQuestions}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CompleteTestCard"
        component={CompleteTestCard}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
