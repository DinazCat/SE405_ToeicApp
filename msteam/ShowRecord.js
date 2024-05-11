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
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
useEffect(() => {
  const updateScreenWidth = () => {
    setScreenWidth(Dimensions.get('window').width);
  };
  const updateScreenHeight= () => {
    setScreenHeight(Dimensions.get('window').height);
  };

  Dimensions.addEventListener('change', updateScreenWidth);
  Dimensions.addEventListener('change', updateScreenHeight);
  // return () => {
  //   Dimensions.removeEventListener('change', updateScreenWidth);
  // };
}, []);
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
          <View style={{ flex: 1 }}>
          <VideoPlayer
            video={{uri:url}}
            videoWidth={screenWidth}
            videoHeight={screenHeight*0.9}
            // disableControlsAutoHide={true}
            // disableSeek={true}
            showDuration={true}
            fullScreenOnLongPress={true}
            endThumbnail={{uri:'https://tse1.mm.bing.net/th?id=OIP.pENsrXZ3F7yXMHHRIHS22QHaEK&pid=Api&rs=1&c=1&qlt=95&w=192&h=108'}}
          />
          </View>

          
      
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