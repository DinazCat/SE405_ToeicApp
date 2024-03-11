import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Keyboard } from 'react-native';
import ReplyCard from '../ComponentTeam/ReplyCard';


const ReplyScreen = ({navigation}) => {
const comments=[{
    userName:'Huỳnh Thị Minh',
    postTime:'1PM at 2/24/2024',
    text:'Dạ cô.',
},
{
    userName:'Huỳnh Thị Minh',
    postTime:'1PM at 2/24/2024',
    text:'Em không thấy ạ',
}
]
  return (
  <View style={styles.container}> 
    <ScrollView>
      <View style={styles.headerContainer}>
          <TouchableOpacity   onPress={() => navigation.goBack()}>
              <Ionicons 
                  name="arrow-back"
                  size={28}
                  backgroundColor='transparent'
                  color={'#111'}                          
                  />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: '#111'}]}>Reply to Nguyễn Quỳnh Hoa post</Text>       
        </View>
      {comments.map((comment, index) => (
          <ReplyCard key={index} postData={comment} 
          />
        ))}
    </ScrollView>
    <View
        style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TextInput
        //   ref={textInputRef}
        //   value={comment}
        //   onChangeText={txt => {
        //     setComment(txt);
        //   }}
          placeholder={'Type here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.commentInput, {color: '#666'}]}
        />
        <Text
          style={{marginRight: 10, fontSize: 18, fontWeight: '600', color: '#444'}}
          >
          {'Send'}
        </Text>
      </View>
    </View>
  )
}

export default ReplyScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#DFDCDC',
    borderBottomWidth: 1,
    backgroundColor: '#9ACC1C'
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
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})