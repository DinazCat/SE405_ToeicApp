import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionCard from './QuestionCard';
const {width} = Dimensions.get('window');
const ReadP1QuestionForm = React.memo(({item}) => {
  return (
    <Animated.View style={styles.container}>
     <View style={styles.box}>
      <QuestionCard question={item.Question} 
              answer={item.Answer}/>
     </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width
  },
  TimeFont: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, marginTop:"5", height:300,borderRadius:15
  },
  box:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:600,borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center',marginLeft:"5%"
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  },
  answerLong:{
      color:'black', fontSize:18,marginLeft:"5%"   
  },
  answerZone:{
      flexDirection:'row', alignItems:'center', marginTop:'3%'
  }
});
export default ReadP1QuestionForm;
