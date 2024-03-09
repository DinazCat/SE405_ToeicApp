import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

const QuestionCard=({question, answer,click, flag,Select ,Default})=> {
const [sign, setsign] = useState('1');
  return(
      <View style={styles.boxstyle}>
      <Text style={{color:'black', fontSize:20,textAlign:'left', marginLeft:"5%", marginTop:'3%'}}>{question}</Text>
    {
      flag =='QuestionScreen'&&
      <View style={{flexDirection:'colunm',}}>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,sign=='A'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('A'), click(0)}}>
            <Text style={styles.answertext}>A</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}> {answer[0].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,sign=='B'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('B'),click(1)}}>
            <Text style={styles.answertext}>B</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[1].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,sign=='C'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('C'),click(2)}}>
            <Text style={styles.answertext}>C</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[2].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,sign=='D'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('D'),click(3)}}>
            <Text style={styles.answertext}>D</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[3].script}</Text>
      </View>
      </View>
}
{
  flag=='ReviewQuestion'&&
      <View style={{flexDirection:'colunm',}}>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(Default==0)?PRIMARY_COLOR:(Select==0)?'red':'white'}]}>
            <Text style={styles.answertext}>A</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}> {answer[0].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(Default==1)?PRIMARY_COLOR:(Select==1)?'red':'white'}]}>
            <Text style={styles.answertext}>B</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[1].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(Default==2)?PRIMARY_COLOR:(Select==2)?'red':'white'}]}>
            <Text style={styles.answertext}>C</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[2].script}</Text>
      </View>
      <View  style={styles.answerZone}>
      <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(Default==3)?PRIMARY_COLOR:(Select==3)?'red':'white'}]}>
            <Text style={styles.answertext}>D</Text>
        </TouchableOpacity>
        <Text style={styles.answerLong}>{answer[3].script}</Text>
      </View>
      </View>
    }
    {
      flag=='SavedScreen'&&
      <View style={{flexDirection:'colunm',}}>
      <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,sign=='A'&&(answer[0].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('A')}}>
              <Text style={styles.answertext}>A</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}> {answer[0].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,sign=='B'&&(answer[1].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('B')}}>
              <Text style={styles.answertext}>B</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{answer[1].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,sign=='C'&&(answer[2].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('C')}}>
              <Text style={styles.answertext}>C</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{answer[2].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,sign=='D'&&(answer[3].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('D')}}>
              <Text style={styles.answertext}>D</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{answer[3].script}</Text>
        </View>
        </View>

    }
      
    </View>
    )
}
const styles = StyleSheet.create({
 
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, marginTop:"5",borderRadius:15
  },
  box:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:900,borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center',marginLeft:"5%"
  },
  answerboxStyleTrue:{
    width:40, height:40,backgroundColor:PRIMARY_COLOR, borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleFalse:{
    width:40, height:40,backgroundColor:'red', borderRadius:25,borderColor:'red', borderWidth:2, alignItems:'center', justifyContent:'center'
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
export default QuestionCard