import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const {width, height} = Dimensions.get('window');
  const TextCard = ({postData}) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
    return (  
        <View style={styles.headerContainer}>
        <View style={styles.UserInfoContainer}>
          <TouchableOpacity >
            <Image
              style={styles.UserImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
              }}
            />
          </TouchableOpacity>
          <View style={styles.UserInfoTextContainer}>
            <TouchableOpacity>
              <Text style={[styles.UsernameText]}>{postData?.userName}</Text>
            </TouchableOpacity>
            <Text style={styles.PostTime}>{postData?.postTime}</Text>
            <Text style={{fontSize:18, color:'black', width:screenWidth*0.65}}>
                {postData?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    headerContainer:{
        paddingVertical: 5,

    },
    UserInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,      
    },
    UserImage:{
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    UserInfoTextContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 5,
    },
    UsernameText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444'
    },
    PostTime:{
        fontSize: 13,
        color:"white",
        color: '#888',
    },

  
  });
  export default TextCard ;
  