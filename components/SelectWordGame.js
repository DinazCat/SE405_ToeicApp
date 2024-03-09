import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
const SelectWordGame=({item, vocabs, click})=> {
const [sign, setsign] = useState('1');
// const [VocabGame, setVocabGame] = useState(null)
// const [Loading, setLoading] = useState(false)
// const getRandomNumber = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };
// const getRandomItems = (list) => { 
//   const randomItems = []; 
//   randomItems.push(item)
//   const listLength = vocabs.length;
//   while (randomItems.length < 3) { 
//     const randomIndex = getRandomNumber(0, listLength - 1); 
//     if (!randomItems.includes(list[randomIndex]) && !randomItems.includes(item)) { randomItems.push(list[randomIndex]); } 
//   } 
//     return randomItems; 
//   };
//   useEffect(() => {
//     const creatList = getRandomItems(vocabs);
//     const shuffledData = creatList.sort(() => Math.random() - 0.5);
//     setVocabGame(shuffledData);
//     setLoading(true);
    

// }, []);
return (
  <Animated.View style={styles.container}> 
    <Text style={[AppStyle.textstyle.parttext,{marginTop:15}]}> Choose right answer:</Text>
    <View style={{marginTop:'10%'}}>
      <Text style={styles.buttonText}> {item.Translate + " ("+ item.Type+")"}</Text>
     <>
      <TouchableOpacity  style={[styles.buttonstyle,(sign!='1'&&vocabs[0]==item.Vocab)?styles.answerboxStyleTrue:sign=='A'&&(vocabs[0]==item.Vocab?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('A'), click(0)}}>
      <Text style={styles.buttonText}>{vocabs[0]}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[1]==item.Vocab)?styles.answerboxStyleTrue:sign=='B'&&(vocabs[1]==item.Vocab?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('B'), click(1)}}>
      <Text style={styles.buttonText}>{vocabs[1]}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[2]==item.Vocab)?styles.answerboxStyleTrue:sign=='C'&&(vocabs[2]==item.Vocab?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('C'), click(2)}}>
      <Text style={styles.buttonText}>{vocabs[2]}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[3]==item.Vocab)?styles.answerboxStyleTrue:sign=='D'&&(vocabs[3]==item.Vocab?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('D'), click(3)}}>
      <Text style={styles.buttonText}>{vocabs[3]}</Text>
    </TouchableOpacity>
     </>
    </View>
  </Animated.View>
)
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width
  },
  buttonstyle:{
      width:'94%', height:50, alignSelf:'center', backgroundColor:card_color, borderRadius:20,justifyContent:'center', marginTop:15
  },
  buttonText:{
      color:'black', fontSize:22, fontWeight:'400', marginLeft:10
  },
  answerboxStyleTrue:{
    width:'94%', height:50, alignSelf:'center', backgroundColor:PRIMARY_COLOR, borderRadius:20,justifyContent:'center', marginTop:15
  },
  answerboxStyleFalse:{
    width:'94%', height:50, alignSelf:'center', backgroundColor:'#990000', borderRadius:20,justifyContent:'center', marginTop:15
  },})
export default  SelectWordGame