import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../api/Api';
import Comment from '../components/Comment';
import auth from '@react-native-firebase/auth';
import socketServices from '../api/socketService';
import { Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const CommentScreen = ({navigation, route}) => {
  const {postId, topic, user} = route.params
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [isReply, setIsReply] = useState('noreply')
  const [momId, setMomId] = useState(postId)
  const textInputRef = useRef(null);

  const handleReplyButtonPress = () => {
  textInputRef.current.focus();
  };
  const closeKeyBoard=()=>{
    Keyboard.dismiss();
  }
  const handleKeyboardHide = () => {
    setComment('');
    setIsReply('noreply')
    setMomId(postId)
    };
    
 Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
  // const getComment=async()=>{
  //   const list = []
  //   for(let i = 0; i < listcm.length;i++){
  //     const data = await Api.getOneComment(listcm[i].commentId)
  //     list.push(data)
  //   }
  //   setComments(list)
  // }
  // useEffect(() => {
  //   getComment();
  // }, [listcm]);
  useEffect(() => {
    // socketServices.initializeSocket()
    getComments()
  }, []);
  const getComments = async()=>{
    // socketServices.on(postId,(data) => {
    //   setComments(data)
    // })
      firestore()
        .collection('Posts')
        .doc(postId)
        .onSnapshot(doc => {
          if(doc.exists){
          const data = doc.data()
          setComments(data.comments)
        }
        });    
  }
  const allowSend = ()=>{
    if(comment=='')return false
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
        userId:auth().currentUser.uid,
        text:comment,
        time:time,
        replies:[],
        likes:[],
      }
      await Api.addComment(data,isReply, momId)
      if(momId != postId){
        const data1 = {
          PostownerId: user,
          CommentownerId:momId,
          guestId: auth().currentUser.uid,
          classify:'reply',
          time:time,
          text: 'reply your comment about the post have topic: '+ topic,
          postid:postId,
          Read:'no',
        };
        await Api.addNotification(data1) 
      }
        const data1 = {
          PostownerId: user,
          guestId: auth().currentUser.uid,
          classify:'Cmt',
          time:time,
          text: 'commented on your post about the topic: '+ topic,
          postid:postId,
          Read:'no',
        };
        await Api.addNotification(data1) 
        closeKeyBoard()

    }
  }
  return (
  <View style={styles.container}> 
    <ScrollView>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons 
                  name="arrow-back"
                  size={28}
                  backgroundColor='transparent'
                  color={'#111'}                          
                  />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: '#111'}]}>Comments</Text>       
        </View>
      {comments.map((comment, index) => (
          <Comment key={index} item={comment} flag={1}
          onReply={(id, userName)=>{
            setIsReply('reply')
            setMomId(id)
            setComment(userName)
            handleReplyButtonPress()
          }}
          />
        ))}
    </ScrollView>
    <View
        style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TextInput
          ref={textInputRef}
          value={comment}
          onChangeText={txt => {
            setComment(txt);
          }}
          placeholder={'Type comment here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.commentInput, {color: '#666'}]}
        />
        <Text
          style={{marginRight: 10, fontSize: 18, fontWeight: '600', color: '#444'}}
          onPress={() => {handlePostComment()}}
          >
          {'Send'}
        </Text>
      </View>
    </View>
  )
}

export default CommentScreen

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})