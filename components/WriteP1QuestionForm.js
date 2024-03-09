import {View, Text, StyleSheet, TextInput, Image, ScrollView, Animated, Dimensions,} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

const {width} = Dimensions.get('window');

const WriteP1QuestionForm = ({item, onAnswerChange, flag, check}) => {

  return (
    <Animated.View style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 20,
          textAlign: 'left',
          marginTop: '5%',
          marginLeft: '5%',
        }}>
        Describe the picture:
      </Text>
      <Image
        source={{uri: item.Picture}}
        style={{
          height: 220,
          width: '88%',
          alignSelf: 'center',
          marginTop: '5%',
        }}></Image>
      <Text
        style={{
          color: 'black',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          marginTop: '3%',
        }}>
        {item.SugesstedWord}
      </Text>
      <View
        style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          borderColor: PRIMARY_COLOR,
          borderWidth: 2,
          marginTop: '3%',
          marginBottom: '10%',
        }}>
        {flag == 'QuestionScreen' ? (
          <TextInput
            multiline={true}
            //value={answer}
            onChangeText={text => {
              onAnswerChange(text, item.Id);
            }}
            style={{fontSize: 16, marginLeft: 3, color: 'black'}}
            placeholder="Write your answer here"
            placeholderTextColor={'rgba(0,0,0,0.8)'}
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
  
});
export default WriteP1QuestionForm;
  