import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import TestCard from '../components/TestCard'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import CustomHeader from '../components/CustomHeader'
import Api from '../api/Api'
const Test=({navigation})=>{
  const [tests, setTests] = useState([]);

  const getTests = async() => {
    const list = await Api.getAllTest();
    setTests(list);
  }

  useEffect(() => {
    getTests();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
      <CustomHeader Title={'Test'} navigation={navigation}/>
      <FlatList
        data={tests}
        renderItem={({item, index}) => (
        <TestCard
          item={item} 
          onBegin={() => {
            let list = [];
            for(let question of item.Part1){
              question.part = 'L1';
              list.push(question);
            }
            for(let question of item.Part2){
              question.part = 'L2';
              list.push(question);
            }
            for(let question of item.Part3){
              question.part = 'L3';
              list.push(question);
            }
            for(let question of item.Part4){
              question.part = 'L4';
              list.push(question);
            }
            for(let question of item.Part5){
              question.part = 'R1';
              list.push(question);
            }
            for(let question of item.Part6){
              question.part = 'R2';
              list.push(question);
            }
            for(let question of item.Part7){
              question.part = 'R3';
              list.push(question);
            }
            navigation.navigate('TestQuestions', {questionList: list, testName: item.Name})
          }
          }
        />
      )}/>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },})
export default Test