import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const VocabLessonCard = ({display,onpress}) => {
  // useEffect(() => {
  //  console.log('LId'+display.Id)
  //     }, []);
  return (
    <View>
      <TouchableOpacity style={styles.boxstyle} onPress={onpress}>
        <Image
          source={{
            uri: display.Image,
          }}
          style={{width: 100, height: 100}}
        />
        <View style={{flexDirection: 'column', width:'65%'}}>
        <Text style={[styles.TextFont, {fontWeight: '500', color:PRIMARY_COLOR}]}>
             Topic: {display.Topic}
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
            Quantity: {display.VocabQuantity}
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  boxstyle: {
    flexDirection: 'row',
    width: '96%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: 5,
    height: 120,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
  TextFont: {
    fontSize: 20,
    marginLeft: 5,
    color: 'black',
  },
});
export default VocabLessonCard;
