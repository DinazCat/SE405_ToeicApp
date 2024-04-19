import { StyleSheet, Text, View, Image, TouchableOpacity,Alert,ScrollView, Dimensions} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player'
import Api from '../api/Api'
const {width, height} = Dimensions.get('window');
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const ShowRecord = ({route, navigation}) => {
    const {url, name} = route.params
    return(
        <View style={styles.container}>
            <View style={AppStyle.viewstyle.component_upzone}>
            <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
              <FontAwesome name="chevron-left" color="white" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 20,
                marginLeft: 15,
              }}>
              {name}
            </Text>
          </View>

          <VideoPlayer
            video={{uri:url}}
            videoWidth={400}
            videoHeight={height*0.8}
            disableControlsAutoHide={true}
            disableSeek={true}
            endThumbnail={{uri:'https://tse1.mm.bing.net/th?id=OIP.pENsrXZ3F7yXMHHRIHS22QHaEK&pid=Api&rs=1&c=1&qlt=95&w=192&h=108'}}
          />
      
        </View>
    
    )
}
export default ShowRecord
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
})