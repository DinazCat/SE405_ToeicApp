import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import { useNavigation } from '@react-navigation/native';
import InPartCard from './InPartCard';
const PartFormatCard=({display})=>{
  const { navigate } = useNavigation()
  return (
    <View>
      <TouchableOpacity style={AppStyle.viewstyle.column_card} onPress={() => navigate('InPartCard',{part:display.part, Analysis:display?.Analysis, MaxQ: display.MaxQ})}>
        <Text style={{color:PRIMARY_COLOR, fontWeight:'500', fontSize:17, marginLeft:5}}>{display.PartName}</Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>Number of sentences completed: <Text style={[styles.TextFont,{fontWeight:'400',}]}>{display?.Analysis?.Qty||display?.MaxQ||0}</Text></Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>Correct: <Text style={[styles.TextFont,{fontWeight:'400',}]}>{display?.Analysis?.Score||0}</Text></Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
      TextFont:{
        fontSize:15, marginLeft:5, color:'black'
      }
})
export default PartFormatCard