import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Api from '../api/Api';

const CompleteTestCard = ({navigation,route})=> {
    const {answer, sign, questionL, isFromPL, isMiniTest, testHistory} = route.params
    const [reviewList, setReviewList] = useState(null)
    const [score, setScore] = useState(0)
    const [quantity, setQuantity] = useState(route.params.quantity)
    const [message, setMessage] = useState('')

    const SetScore = ()=>{
      if(isMiniTest) {
        let score = 0 , sum =0;
        for(let i = 0 ; i < questionL.length; i++){
          if(questionL[i].part=='L1'||questionL[i].part=='L2'||questionL[i].part=='R1'){
            if(answer[i].Select==answer[i].Default){
              score = score + 1;
            }
            sum++;
          }
          else{
            for(let j = 0; j < answer[i].Default.length; j++){
              if(answer[i].Select[j]==answer[i].Default[j]){
                score = score + 1;
              }
              sum++;
            }            
          }
        }
        setScore(score);
        setQuantity(sum);
        if(score < 12) {setMessage('You need to try harder!')}
        else {setMessage('Congratulations!')}
      }
      else {
        setScore(testHistory.Correct);
        setQuantity(200);
        if(score < 100) {setMessage('You need to try harder!')}
        else {setMessage('Congratulations!')}
      }
    }

    const setReview= async()=>{
      if(questionL){
        setReviewList(questionL);
      }
    }
    
    useEffect(()=>{
      setReview();
      SetScore();
    },[])

    const onContinue = () => {
      if(isMiniTest){
        let currentLevel = 0;
        const correctPer = score / quantity;
        if(correctPer >= 0 && correctPer < 0.2){
          currentLevel = 0;
        }
        else if(correctPer < 0.4){
          currentLevel = 1;
        }
        else if(correctPer < 0.6){
          currentLevel = 2;
        }
        else{
          currentLevel = 3;
        }
        navigation.navigate('PracticePlanTime', {targetLevel: route.params.targetLevel, currentLevel: currentLevel});
      }
      else navigation.navigate('Testinstack');
    }
   
    const onShowAnswer = () =>{
      if(isMiniTest){
        navigation.push('ResultTable', {
          History: answer,
          questionList: reviewList,
          score:score,
          quantity:quantity,
          isMiniTest: route.params.isMiniTest
        })
      }
      else{
        navigation.push('TestResult', {
          History: answer,
          questionList: reviewList,
          testHistory: testHistory,
        })
      }
    }
    const checkMess = ()=>{
      const rate = parseInt((score * 100) / quantity)
      if(rate < 50){
        return "Your skills are still very poor, you need to put in more effort"
      }
      else if(rate >=50 && rate <= 70)
      {
        return "Your score is not very high, please continue to practice more"
      }
      else if(rate > 70 && rate <= 90)
      {
        return "Congratulations, you are about to become a master, keep trying"
      }
      else if(rate > 90)
      {
        return "Congratulations, you are a master, please maintain your current form"
      }
      return "Your skills are still very poor, you need to put in more effort"
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg3.png')}
          style={{flex: 1, resizeMode: 'cover'}}>
          {!isMiniTest && <TouchableOpacity
            style={{marginLeft: '2%', marginTop: 10}}
            onPress={() => {
              if(isFromPL){
                navigation.navigate('PartPracticePlan');
              }
        
              else {
                navigation.navigate('Testinstack')
              }
            }}>
            <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={27} />
          </TouchableOpacity>}
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: '50%',
              backgroundColor: 'white',
            }}>
            <Text
              style={{color: 'black', fontWeight: '500', fontSize: 30, textAlign:'center', marginBottom: 5}}>
              {checkMess()}
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '400', fontSize: 20}]}>
              You have completed the test
            </Text>
            <Text style={[styles.TextFont, {fontWeight: 'bold', color: PRIMARY_COLOR}]}>
                {testHistory.TestName}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: '6%',
              marginTop: '10%',
              fontSize: 25,
              fontWeight: '500',
              color: 'black',
            }}>
            Result: {score}/{quantity}
          </Text>
          <View style={styles.boxstyle}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                Correct rate:
              </Text>
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                {parseInt((score * 100) / quantity)}%
              </Text>
            </View>
            <Progress.Bar
              progress={score / quantity||0.0}
              width={250}
              height={10}
              style={{height: 10}}
              color={PRIMARY_COLOR}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={onShowAnswer}>
              <Text style={AppStyle.button.button2_Text}>Show answer</Text>
            </TouchableOpacity>
            {sign == 'Home' ? (
              <TouchableOpacity
                style={[AppStyle.button.button2]}
                onPress={() =>
                  navigation.push('QuestionScreen', {
                    questionList: reviewList,
                    sign: 'noMax',
                  })
                }>
                <Text style={AppStyle.button.button2_Text}>Do again</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[AppStyle.button.button2]}
                onPress={onContinue}>
                <Text style={AppStyle.button.button2_Text}>{isMiniTest ? 'Continue': 'Go Back'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }


export default CompleteTestCard

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextFont:{
        fontSize:22, marginLeft:5, color:'black'
    },
     
    boxstyle:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:5, height:120, justifyContent:'space-evenly',borderWidth: 1,
        borderColor: '#CFCFCF', borderRadius:15, alignItems:'center', 
    },
})