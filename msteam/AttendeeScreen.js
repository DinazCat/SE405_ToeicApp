import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput,Alert, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Keyboard } from 'react-native';
import ReplyCard from '../ComponentTeam/ReplyCard';
import AttendeeCardLong from '../ComponentTeam/AttendeeCardLong';

const {width, height} = Dimensions.get('window');
const AttendeeScreen = ({navigation}) => {
const users=[{
    Name:'Huỳnh Thị Minh',
    camera:true,
    mic:true
},
{
    Name:'Nguyễn Khang',
    camera:true,
    mic:false
}
]
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
const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};
  return (
  <View style={styles.container}> 
    <ScrollView>
      <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Ionicons 
                  name="arrow-back"
                  size={28}
                  backgroundColor='transparent'
                  color={'white'}                          
                  />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: 'white'}]}>Attendees List</Text>       
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            placeholder="Enter name..."
            placeholderTextColor={'#555'}
            // onChangeText={text => {
            //   setContent(text)
            // }}
            />
          <TouchableOpacity>
            <Ionicons name={'search-outline'} style={styles.IconButton}/>        
          </TouchableOpacity>
        </View> 
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:5, marginTop:20}}>
        <Text style={{color:'white', fontSize:20}}>In the meeting: 24 people </Text>
        <Text style={{color:'#0000CD', fontSize:18,textDecorationLine: 'underline' }}>Unmute all</Text>
        </View>

      {users.map((item, index) => (
           <AttendeeCardLong
           key={index}
           person = {item}
           color={getRandomColor()}
         /> 
        ))}
    </ScrollView>
    
    </View>
  )
}

export default AttendeeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#363636'
  },
  headerContainer:{
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#DFDCDC',
    borderBottomWidth: 1,
    backgroundColor: '#363636'
  },
  headerText:{
    fontSize: 20,
    marginLeft: 20,
    color: '#333'
  },
  commentInput:{
    width: '80%',
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 6,
  },
  bottomViewContainer:{
    width: '90%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#555',
    alignSelf:'center'
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    width: '90%',
    height: 45,
    alignSelf:'center'
  },
  input:{
    fontSize: 16,
    width: '88%'
  },
  IconButton:{
    color: '#fff', 
    fontSize: 25, 
    padding: 5,
    marginTop: 4
    //marginLeft: 5
  },
})