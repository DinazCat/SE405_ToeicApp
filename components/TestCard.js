import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const TestCard=({item, onBegin})=>{
  return (
    <View>
      <View style={styles.boxstyle}>
        <Text style={{color:PRIMARY_COLOR, fontWeight:'500', fontSize:22, marginLeft:5}}>{item.Name}</Text>
        <View style={{flexDirection:'row', alignItems:'flex-start'}}>
        <Text style={[styles.TextFont,{fontWeight:'400',marginRight:5}]}>Time: <Text style={[styles.TextFont,{fontWeight:'300', }]}>120 minutes</Text></Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>| Parts: <Text style={[styles.TextFont,{fontWeight:'300',}]}>7</Text></Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>| Questions: <Text style={[styles.TextFont,{fontWeight:'300',}]}>200</Text></Text>
        </View>
        <TouchableOpacity style={[AppStyle.button.button1,{marginTop:5, marginLeft:5}]}
        onPress={onBegin}>
          <Text style={AppStyle.button.button1_Text}>Begin</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:'#F5F5F5', alignSelf:'center', marginTop:5, height:120, justifyContent:'space-evenly',borderWidth: 1,
      borderColor: '#CFCFCF', borderRadius:15
    },
    TextFont:{
      fontSize:15, marginLeft:5, color:'black'
    },
    begin:{
      backgroundColor:'#3366CC',
      borderRadius:25,
      width:90,
      height:30,
      justifyContent:'center'
    },
    BeginText:{
      color:'white', fontSize:14, fontWeight:'400', textAlign:'center'
    }
})
export default TestCard