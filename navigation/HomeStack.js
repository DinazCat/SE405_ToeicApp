import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ActivityIndicator, Text} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import PartFormat from '../components/PartFormat';
import InPartCard from '../components/InPartCard';
import CompleteCard from '../components/CompleteCard';
import CompleteCard2 from '../components/CompleteCard2';
import QuestionScreen from '../screens/QuestionScreen';
import SavedVocabScreen from '../screens/SavedVocabScreen';
import Game from '../components/Game';
import GameScreen from '../screens/GameScreen';
import GetUserGoal from '../screens/GetUserGoal';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';
import ResultTable from '../components/ResultTable';
import TestResultScreen from '../screens/TestResultScreen';
import ReviewQuestion from '../screens/ReviewQuestion';
import HistoryScreen from '../screens/HistoryScreen';
import AddPostScreen from '../screens/AddPostScreen';
import Test from '../screens/Test';
import TestQuestions from '../screens/TestQuestions';
import CompleteTestCard from '../components/CompleteTestCard';
import InTestCard from '../components/InTestCard';
import SavedQuestionScreen from '../screens/SavedQuestionScreen';

const Stack = createNativeStackNavigator();
export default function HomeStack() {
    const {user} = useContext(AuthContext);
    const [initialScreen, setInitialScreen] = useState();
    const [isLoading, setLoading] = useState(true);
    const isUserGoalDataNull = async () => {
        // const userData = await Api.getAllUsers()
        // .catch(error => console.error(error));
        // userData.forEach((data) => {
        //     if(data.id == user.uid && data.Target){
        //         setInitialScreen('Homeinstack');
        //         setLoading(false); 
        //     } else {
        //         setInitialScreen('GetUserGoal');
        //         setLoading(false);
        //     }          
        // })
        // setLoading(false);
        // setInitialScreen('HomeinStack')  
        const userData = await Api.getUserData(user.uid)
        .catch(error => console.error(error));

        if (userData && userData.targetScore) {
            setInitialScreen('Homeinstack');
            setLoading(false); 
        } else if(userData != 0){
            setInitialScreen('GetUserGoal');
            setLoading(false);
        } 
   
    };
      
    useEffect(() => {
        isUserGoalDataNull();
    }, []);

    if(isLoading){
        return (
            <View style={{backgroundColor: '#F3FFE7',position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', paddingTop: 150}}>
                <Text style={{fontSize: 28, color: '#0E7C00', fontWeight: '600', marginBottom: 15}}>TOEIC with Coco</Text>
                <Image 
                    source={require('../assets/penguin.png')} style={{height: 250, width: 200, resizeMode: 'cover'}}
                    />
                <ActivityIndicator size="large" color="#0E7C00" style={{marginTop: 20}}/>
            </View> 
        )   
      }
    return (
        <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen name="GetUserGoal" component={GetUserGoal} options={{ header: () => null }} /> 
            <Stack.Screen name='Homeinstack' component={Home} options={{ header: () => null }}/>
            <Stack.Screen name='PartFormat' component={PartFormat} options={{ header: () => null }}/>
            <Stack.Screen name='InPartCard' component={InPartCard} options={{ header: () => null }}/>
            <Stack.Screen name='InTestCard' component={InTestCard} options={{ header: () => null }}/>
            <Stack.Screen name='Testinstack' component={Test} options={{ header: () => null }}/>
            <Stack.Screen name='QuestionScreen' component={QuestionScreen} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteCard' component={CompleteCard} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteCard2' component={CompleteCard2} options={{ header: () => null }}/>
            <Stack.Screen name='SavedVocabScreen' component={SavedVocabScreen} options={{ header: () => null }}/>
            <Stack.Screen name='Game' component={Game} options={{ header: () => null }}/>
            <Stack.Screen name='GameScreen' component={GameScreen} options={{ header: () => null }}/>
            <Stack.Screen name='ResultTable' component={ResultTable} options={{ header: () => null }}/>
            <Stack.Screen name='TestResult' component={TestResultScreen} options={{ header: () => null }}/>
            <Stack.Screen name='ReviewQuestion' component={ReviewQuestion} options={{ header: () => null }}/>
            <Stack.Screen name='HistoryScreen' component={HistoryScreen} options={{ header: () => null }}/>
            <Stack.Screen name="AddPost" component={AddPostScreen} options={{ header: () => null }} />
            <Stack.Screen name='TestQuestions' component={TestQuestions} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteTestCard' component={CompleteTestCard} options={{ header: () => null }}/>  
            <Stack.Screen name="SavedQuestionScreen" component={SavedQuestionScreen} options={{ header: () => null }} /> 
        </Stack.Navigator>
    );
  };