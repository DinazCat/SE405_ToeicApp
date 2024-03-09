import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ResultCard=({ defaultanswer, useranswer, question, id, click})=> {

return (
  <TouchableOpacity onPress={click} >
    <View style={styles.AnswersWrapper}>
        {defaultanswer==useranswer? 
        <Icon
          name={'check'}
          style={{color: PRIMARY_COLOR, fontSize: 20,  marginLeft:10, width:'10%'}}
        />: useranswer == -1 ?
        <Icon
          name={'minus'}
          style={{color: '#2774D0', fontSize: 20,  marginLeft:10,width:'10%'}}
        />
        :
        <Icon
          name={'times'}
          style={{color: 'red', fontSize: 20,  marginLeft:10,width:'10%'}}
        />
        }
        <Text style={{color:'black', fontSize:16, fontWeight:'400', width: 100 }}> Question {question+1}</Text>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", width:'65%'}}>
          <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(defaultanswer==0)?PRIMARY_COLOR:(useranswer==0)?'red':'white'}]}>
              <Text style={styles.answertext}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(defaultanswer==1)?PRIMARY_COLOR:(useranswer==1)?'red':'white'}]}>
              <Text style={styles.answertext}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(defaultanswer==2)?PRIMARY_COLOR:(useranswer==2)?'red':'white'}]}>
              <Text style={styles.answertext}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(defaultanswer==3)?PRIMARY_COLOR:(useranswer==3)?'red':'white'}]}>
              <Text style={styles.answertext}>D</Text>
          </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
)
}
const styles = StyleSheet.create({

answerboxStyle:{
  width:30, height:30,backgroundColor:'white', borderRadius:25,borderColor:'black', borderWidth:1.5, alignItems:'center', justifyContent:'center'
},
answertext:{
  color:'black',fontWeight:'500', fontSize:20
},
AnswersWrapper: {
  flexDirection: 'row',
  width: '100%',
  borderColor: '#DDD',
  borderBottomWidth: 1,
  paddingVertical: 10,  
  paddingHorizontal: 12,
  alignItems: 'center'
},
});
export default ResultCard