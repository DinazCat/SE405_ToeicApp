import { View, Text, Image,TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import AppStyle from '../theme'

const HistoryTestCard = ({item, click}) => {
  return (
    <TouchableOpacity style={{flexDirection:'row', height:50, justifyContent:'space-between', alignItems:'center', width:'97%',marginTop:5, justifyContent: 'center'}} onPress={click}>
      <Image  style={{width:'15%', height:40,}} source={require("../assets/test1.png")} resizeMode='contain'/>
      <View style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center', width:'80%', borderBottomColor:'black', borderBottomWidth:1}}>
        <View>
        <Text style={{fontSize:17, color:'black', marginLeft: 10, fontWeight: '500'}}>{item.TestName}</Text>
        <Text style={{fontSize:14, color:'#555', marginLeft: 10}}>{item.Date}</Text>
        </View>
      <Text style={AppStyle.button.buttonText}>{item.Correct}/200</Text>
      </View>
    </TouchableOpacity>
  )
}

export default HistoryTestCard