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
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextCard from './TextCard';
const {width, height} = Dimensions.get('window');
  const ReplyCard = ({postData}) => {
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
        <View style={{borderRadius:15, backgroundColor:card_color, width:screenWidth*0.9, alignSelf:'center', elevation: 5, marginTop:10, flexDirection:'row'}}>
        <TextCard postData={postData} />
        <View style={{flex:1}}/>
        <View style={{width:50, flexDirection:'column', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={styles.MenuButton}>
            <Icon name={'ellipsis-h'}  color={'#555'}/>
        </TouchableOpacity>
            <TouchableOpacity >
          <View style={styles.Interaction}>
          <Ionicons name={'heart'} size={20} color={ 'gray' } />
            <Text style={styles.InteractionText}>
              2
            </Text>
          </View>
        </TouchableOpacity>
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
    MenuButton:{
        color: 'black', 
        fontSize: 30, 
        marginLeft:5
      },
     
      Interaction:{
        flexDirection: 'row',
    },
    InteractionText:{
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft:1,
        color: '#555'
    },
  
  
  });
  export default ReplyCard ;
  