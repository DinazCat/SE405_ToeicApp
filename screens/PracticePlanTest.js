import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,ImageBackground } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Api from '../api/Api';

const PracticePlanTest=({navigation, route})=> {

  const onBegin = async () => {
    const listP1 = await Api.getQuestion(2,'ListenPart1');
    const listP2 = await Api.getQuestion(1,'ListenPart2');
    const listP3 = await Api.getQuestion(1,'ListenPart3');
    const listP4 = await Api.getQuestion(1,'ListenPart4');
    const listP5 = await Api.getQuestion(1,'ReadPart1');
    const listP6 = await Api.getQuestion(1,'ReadPart2');
    const listP7 = await Api.getQuestion(1,'ReadPart3');

    let questionList = [];
    const getRandomQuestions = (partQuestions, count, part) => {
      const shuffledQuestions = partQuestions.sort(() => Math.random() - 0.5);
      const questions = shuffledQuestions.slice(0, count);
      const result = questions.map(question => ({
        ...question,
        part: part,
      }));  
      return result;
    };
    
    questionList = questionList.concat(getRandomQuestions(listP1, 2, 'L1'));
    questionList = questionList.concat(getRandomQuestions(listP2, 1, 'L2'));
    questionList = questionList.concat(getRandomQuestions(listP3, 1, 'L3'));
    questionList = questionList.concat(getRandomQuestions(listP4, 1, 'L4'));
    questionList = questionList.concat(getRandomQuestions(listP5, 1, 'R1'));
    questionList = questionList.concat(getRandomQuestions(listP6, 1, 'R2'));
    questionList = questionList.concat(getRandomQuestions(listP7, 1, 'R3'));

    //console.log(questionList);
    navigation.navigate('TestQuestions', {questionList: questionList, isFromPL: true, isMiniTest: true, targetLevel: route.params.targetLevel});
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg5.png')} style={{ flex: 1, resizeMode: 'cover' }}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text style={{textAlign:'center', color:'white', fontSize:20, marginLeft:'30%', fontWeight: '500'}}>Practice Plan</Text>
        </View>
      <View style={{marginTop:'90%', width:'80%', alignSelf:'center'}}>
      <Text style={{fontSize:20, color:'black', textAlign:'center', fontWeight:'500'}}>To begin, let's take an assessment test to determine the appropriate practice plan.</Text>
      <Text style={[styles.TextStyle, {marginTop:'5%'}]}>Time: 12m</Text>
      <Text style={styles.TextStyle}>Question: 8</Text>
      </View>
      <TouchableOpacity style={[AppStyle.button.button2,{marginTop:'10%'}]} onPress={onBegin}>
        <Text style={AppStyle.button.button2_Text}>Begin</Text>
      </TouchableOpacity>
     
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextStyle:{
        fontSize:18, color:'black', textAlign:'center', fontWeight:'400'
    },
})
export default PracticePlanTest