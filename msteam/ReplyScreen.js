import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api';
import { Keyboard } from 'react-native';
import ReplyCard from '../ComponentTeam/ReplyCard';
import firestore from '@react-native-firebase/firestore';


const ReplyScreen = ({navigation, route}) => {
  const {postId,postName} = route.params
  const closeKeyBoard=()=>{
    Keyboard.dismiss();
  }
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
const [reply, setReply] = useState('')
const [replies, setReplies] = useState(null)
const [profileData, setProfileData] = useState(null);
const getProfile = async () => {
  const data = await Api.getUserData(auth().currentUser.uid);
  setProfileData(data);
};
useEffect(() => {
  getProfile();
}, []);
const getAnswers = async()=>{
  const documentRef = firestore().collection('PostInTeam').doc(postId);
  documentRef.onSnapshot((documentSnapshot) => {
    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data();

      setReplies(documentData.replies)
    } else {
      console.log('Document does not exist.');
    }
  });

}
useEffect(() => {
 getAnswers()
}, []);
const updateLikes = async(index)=>{
  let list = replies;
  list[index].likes = list[index].likes+1
  await firestore().collection('PostInTeam').doc(postId).update({
    replies: list,
  });

}
const allowSend = ()=>{
  if(reply=='')return false
  else return true
}
const handlePostComment =async() => {
  if(allowSend()==false){
    Alert.alert('Input cannot be blank!', 'Please enter your opinion to send');
    return;
  }
  else{
    const currentDate = new Date()
    const currentDay = currentDate.getDate(); 
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 
    const currentHours = currentDate.getHours(); 
    const currentMinutes = currentDate.getMinutes();
    const time = currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
    const data = {
      userName:profileData?.name,
      userImg:profileData?.userImg,
      text:reply,
      time:time,
      likes:0,
    }
    try {

  await firestore().collection('PostInTeam').doc(postId).update({
    replies: firestore.FieldValue.arrayUnion(data),
  });
      console.log('Document pushed successfully.');
      setReply('')
      closeKeyBoard()
    } catch (error) {
      console.error('Error pushing document:', error);
    }
  }
}

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
          <Text style={[styles.headerText, {color: '#111'}]}>Reply to {postName} post</Text>       
        </View>
      {replies!=null&&replies.map((comment, index) => (
          <ReplyCard key={index} postData={comment}  Id={postId} updateLike={()=>{updateLikes(index)}}
          />
        ))}
    </ScrollView>
    <View
        style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TextInput
        //   ref={textInputRef}
          value={reply}
          onChangeText={txt => {
            setReply(txt);
          }}
          placeholder={'Type here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.commentInput, {color: '#666'}]}
        />
        <TouchableOpacity onPress={()=> {handlePostComment()}}>
        <Text
          style={{marginRight: 10, fontSize: 18, fontWeight: '600', color: '#444'}}
          >
          {'Send'}
        </Text>
        </TouchableOpacity>

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