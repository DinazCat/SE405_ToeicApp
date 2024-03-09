import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated
} from 'react-native';
import React, {useState, memo} from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
const ListentoSelectGame=({item,vocabs,sound,click})=> {
const [sign, setsign] = useState('1');
  const play = () => {
    if(sound){
    if(!sound.isPlaying())
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
          sound.stop()
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
    
  };
return (
  <Animated.View style={styles.container}> 
    <Text style={[AppStyle.textstyle.parttext,{marginTop:15}]}> Listen and select:</Text>
    <View style={{marginTop:'10%'}}>
      <TouchableOpacity style={{alignSelf:'center'}}  onPress={play}>
      <Icon
          name={'volume-up'}
          style={{color: 'black', fontSize: 30,}}
        />
      </TouchableOpacity>
      <View style={{marginTop:25}}>
      <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
          <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[0]==item.Translate)?styles.answerboxStyleTrue:sign=='A'&&(vocabs[0]==item.Translate?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('A'), click(0)}}>
              <Text style={styles.buttonText}>{vocabs[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[1]==item.Translate)?styles.answerboxStyleTrue:sign=='B'&&(vocabs[1]==item.Translate?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('B'), click(1)}}>
              <Text style={styles.buttonText}>{vocabs[1]}</Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
          <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[2]==item.Translate)?styles.answerboxStyleTrue:sign=='C'&&(vocabs[2]==item.Translate?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('C'), click(2)}}>
              <Text style={styles.buttonText}>{vocabs[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonstyle,(sign!='1'&&vocabs[3]==item.Translate)?styles.answerboxStyleTrue:sign=='D'&&(vocabs[3]==item.Translate?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>{setsign('D'), click(3)}}>
              <Text style={styles.buttonText}>{vocabs[3]}</Text>
          </TouchableOpacity>
      </View>
      </View>
     
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
      height:70, width:'40%', borderRadius:15, backgroundColor:card_color, justifyContent:'center', alignItems:'center'
  },
  buttonText:{
      color:'black', fontSize:22, fontWeight:'400', marginLeft:10
  },
  answerboxStyleTrue:{
    width:'40%', height:70, backgroundColor:PRIMARY_COLOR, borderRadius:15,justifyContent:'center', alignItems:'center'
  },
  answerboxStyleFalse:{
    width:'40%', height:70,  backgroundColor:'#990000', borderRadius:15,justifyContent:'center',  alignItems:'center'
  }
})
export default memo(ListentoSelectGame)