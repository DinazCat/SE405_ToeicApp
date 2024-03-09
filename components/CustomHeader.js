import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import SmallHistoryCard from '../components/SmallHistoryCard'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import { Header } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CustomHeader({Title, navigation}) {
  return (
    <View>
       {/* <StatusBar backgroundColor={PRIMARY_COLOR} /> */}
      <View style={AppStyle.viewstyle.upzone}>   
        <Icon name={'bars'} style={{color: 'white', fontSize: 25, marginLeft:10,}} onPress={() => navigation.openDrawer()}/>
        <Text style={{ color:'white', fontSize:20, fontWeight: '500', flex: 1, textAlign: 'center' }}>{Title}</Text>
      </View>
    </View>
  )
}