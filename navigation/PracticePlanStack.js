import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Image, ActivityIndicator, Text} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import PracticePlanTest from '../screens/PracticePlanTest';
import PracticePlan from '../screens/PracticePlan';
import PartPracticePlan from '../screens/PartPracticePlan';
import ChoosePracticePlan from '../screens/ChoosePracticePlan';
import PracticePlanTime from '../screens/PracticePlanTime';
import QuestionScreen from '../screens/QuestionScreen';
import TestQuestions from '../screens/TestQuestions';
import InPartCard from '../components/InPartCard';
import InTestCard from '../components/InTestCard';
import CompleteCard from '../components/CompleteCard';
import ResultTable from '../components/ResultTable';
import CompleteTestCard from '../components/CompleteTestCard';
import ReviewQuestion from '../screens/ReviewQuestion';
import Api from '../api/Api';
import { AuthContext } from './AuthProvider';

const Stack = createNativeStackNavigator();

const PracticePlanStack = () => {
  const {user} = useContext(AuthContext);
  const [initialScreen, setInitialScreen] = useState('');
  const [isLoading, setLoading] = useState(true);

  const isPracticePlanExist = async () => { 
    const PracticePlan = await Api.getPracticePlan(user.uid)
    .catch(error => console.error(error));
    if (PracticePlan) {
        setInitialScreen('PracticePlan');
        setLoading(false); 
    } else {
        setInitialScreen('ChoosePracticePlan');
        setLoading(false);
    } 
  };
    
  useEffect(() => {
    isPracticePlanExist();
  }, []);

  if(isLoading){
    return (
      <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
    )   
  }
  return (
    <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen name="ChoosePracticePlan" component={ChoosePracticePlan} options={{ header: () => null }} />
        <Stack.Screen name="PracticePlan" component={PracticePlan} options={{ header: () => null }} />
        <Stack.Screen name="PracticePlanTime" component={PracticePlanTime} options={{ header: () => null }} />
        <Stack.Screen name="PracticePlanTest" component={PracticePlanTest} options={{ header: () => null }} />
        <Stack.Screen name="PartPracticePlan" component={PartPracticePlan} options={{ header: () => null }} />
        <Stack.Screen name='InPartCard' component={InPartCard} options={{ header: () => null }}/>
        <Stack.Screen name='InTestCard' component={InTestCard} options={{ header: () => null }}/>
        <Stack.Screen name='QuestionScreen' component={QuestionScreen} options={{ header: () => null }}/>
        <Stack.Screen name='CompleteCard' component={CompleteCard} options={{ header: () => null }}/>
        <Stack.Screen name='TestQuestions' component={TestQuestions} options={{ header: () => null }}/>
        <Stack.Screen name='ResultTable' component={ResultTable} options={{ header: () => null }}/>
        <Stack.Screen name='CompleteTestCard' component={CompleteTestCard} options={{ header: () => null }}/>
        <Stack.Screen name='ReviewQuestion' component={ReviewQuestion} options={{ header: () => null }}/>
    </Stack.Navigator>
  )
}

export default PracticePlanStack

const styles = StyleSheet.create({})