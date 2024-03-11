import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    TextInput
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const {width, height} = Dimensions.get('window');
  const NewPost = ({navigation}) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
    return (
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
             New post
          </Text>
          <View style={{flex:1}}/>
          <TouchableOpacity style={{marginRight: '5%'}}>
            <Icon name={'paper-plane'} color="white" size={20} />
          </TouchableOpacity>
        </View>
        <TextInput
              placeholder="Write something here..."
              multiline={true}
              style={styles.Input}
              placeholderTextColor='#555'
              height={screenHeight*0.5}
              width={'96%'}
              autoFocus={true}
            //   value={}
            //   onChangeText={(txt) => setText(txt)}
            />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    Input: {
        fontSize: 16, 
        marginLeft: 3,
        borderColor: '#DDD',
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        textAlignVertical: 'top',
        alignSelf:'center'
      },
  });
  export default NewPost;
  