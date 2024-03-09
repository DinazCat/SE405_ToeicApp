import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const InTestCard=()=> {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg9.png')} style={{flex: 1, resizeMode: 'cover'}}>
        <TouchableOpacity style={{marginLeft: '2%', marginTop:10}}>
            <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={20} />
        </TouchableOpacity>
        <View style={{alignSelf:'center', justifyContent:'space-evenly', alignItems:'center'}}>
        <Text style={{color:PRIMARY_COLOR, fontWeight:'900', fontSize:25, marginLeft:5}}>Test 1</Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>Time: <Text style={[styles.TextFont,{fontWeight:'300', }]}>120 minute</Text></Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>Question: <Text style={[styles.TextFont,{fontWeight:'300',}]}>200</Text></Text>
        </View>
       
        <TouchableOpacity style={[AppStyle.button.button2,{marginTop:'100%'}]}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
          </TouchableOpacity>

        </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextFont:{
        fontSize:22, marginLeft:5, color:'black'
      },
     })
export default InTestCard