import {View, Text, StyleSheet, TextInput, Image, ScrollView, Animated, Dimensions,} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

const {width} = Dimensions.get('window');

const  WriteP23QuestionForm = ({item, onAnswerChange, flag, check}) => {
  return (
    <Animated.View style={styles.container}>     
      <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Response the email</Text>
      <View style={styles.boxstyle}>
          <ScrollView>
          <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginTop:'3%', marginBottom:'3%'}}>{item.Question}</Text>
          {item.Direction && 
          <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginBottom:'3%'}}>
            <Text style={{fontWeight:'500'}}>Directions: </Text>{item.Direction}
          </Text>}
          </ScrollView>
      </View>
      
      <View style={{flex: 1, width:'90%', alignSelf:'center', backgroundColor:'white', borderColor:PRIMARY_COLOR, borderWidth:2, marginTop:'3%', marginBottom: '10%', borderRadius:15}}>
           {flag == 'QuestionScreen' ? (
               <TextInput
               multiline={true}
               style={{fontSize: 16, marginLeft: 3, color:'black',borderRadius:15}}
               placeholder="Write your answer here"
               placeholderTextColor={'rgba(0,0,0,0.8)'}
               onChangeText={text => {onAnswerChange(text, item.Id)}}
             />
        ) : (
          <Text style={{fontSize: 16, marginLeft: 3, color: 'black'}}>
            {check.answer}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: width,
  },

  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
  },
  boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", maxHeight:"40%",borderWidth: 1,
      borderColor: '#CFCFCF', borderRadius:15,
    },
  
});
export default WriteP23QuestionForm;
