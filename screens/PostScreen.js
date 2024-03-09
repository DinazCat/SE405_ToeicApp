import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import VideoPlayer from 'react-native-video-player'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import socketServices from '../api/socketService';

const PostScreen = ({navigation, route}) => {
const {postId,sign} = route.params
const [postData, setPostData] = useState(null);
const [isLike, setIsLike] = useState(false);
const [countCm, setCountCm] = useState(0);
const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
onUserPress=() => navigation.navigate('profileScreen', {userId: postData.userId})
onCommentPress=() => navigation.navigate('CommentScreen',{postId:postData.postId,topic:postData.topic, user:postData.userId})
  const getLevel = async () => {
    const data = await Api.getUserData(postData?.userId)
    if(data?.currentScore){
      if(data.currentScore>=0 && data.currentScore <= 250){
        setLevelSource(require('../assets/Lv0.png'))
      }
      else if(data.currentScore <= 400){
        setLevelSource(require('../assets/Lv1.png'))
      }
      else if(data.currentScore <= 600){
        setLevelSource(require('../assets/Lv2.png'))
      }
      else if( data.currentScore <= 780){
        setLevelSource(require('../assets/Lv3.png'))
      }
      else if(data.currentScore <= 900){
        setLevelSource(require('../assets/Lv4.png'))
      }
      else if(data.currentScore <= 990){
        setLevelSource(require('../assets/Lv5.png'))
      }
    }
  };
  useEffect(() => {
    socketServices.initializeSocket()
    getPost()
  }, []);
  const getPost = async()=>{
    console.log('id'+postId)
    socketServices.on(postId+'detailpost',(data) => {
      setPostData(data)
    })
  }

  useEffect(() => {
    checkLike();
    getLevel();
    if(sign=='cmt'&&postData!=null){
      navigation.navigate('CommentScreen',{postId:postData.postId,topic:postData.topic, user:postData.userId})
    }
  }, [postData]);
 
  const onLike=async()=>{
    const foundItem = postData?.likes.find(i => i === auth().currentUser.uid);
    if(foundItem){
      setIsLike(false)
      const newList = postData.likes.filter(item => item !== auth().currentUser.uid);
      await Api.updatePost(postData.postId,{likes:newList})
    }
    else{
      setIsLike(true)
      const list = postData.likes
      list.push(auth().currentUser.uid)
      await Api.updatePost(postData.postId,{likes:list})
      const currentDate = new Date()
      const currentDay = currentDate.getDate(); 
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear(); 
      const currentHours = currentDate.getHours(); 
      const currentMinutes = currentDate.getMinutes();
      const time = currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
      const data = {
        PostownerId: postData.userId,
        guestId: auth().currentUser.uid,
        classify: 'Like',
        time: time,
        text:'liked your post about topic: ' + postData.topic,
        postid: postData.postId,
        Read: 'no',
      };
      await Api.addNotification(data)
    }
  }
  const checkLike=()=>{
    const foundItem = postData?.likes.find(i => i === auth().currentUser.uid);
    if(foundItem) setIsLike(true)
    else setIsLike(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.UserInfoContainer}>
          <TouchableOpacity onPress={onUserPress}>
            <Image
              style={styles.UserImage}
              source={{
                uri: postData?.userImg
                  ? postData.userImg
                    ? postData.userImg
                    : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
              }}
            />
            <Image
              source={levelsource}
              resizeMode="contain"
              style={{
                position: 'absolute',
                marginLeft: 30,
                marginTop: 32,
                width: 15,
                height: 15,
              }}></Image>
          </TouchableOpacity>
          <View style={styles.UserInfoTextContainer}>
            <TouchableOpacity>
              <Text style={[styles.UsernameText]}>{postData?.userName}</Text>
            </TouchableOpacity>
            <Text style={styles.PostTime}>{postData?.postTime}</Text>
            <Text style={styles.PostTime}>
              in{' '}
              <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>
                {postData?.topic}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.TextContainer}>
            <Text
                style={[
                styles.TopicText,
                ]}>
                Chia sẻ tài liệu TOEIC mới nhất 10/2023
            </Text>
            <Text
                style={[
                styles.ContentText,
                ]}>
                <Text style={[styles.ContentText, {fontWeight: '700'}]}>600 Essential Words For The TOEIC {'\n'}</Text>
                Thông qua cuốn tài liệu luyện thi này sẽ giúp bạn nắm vững những nền tảng tiếng Anh cơ bản để hiểu hết những ngữ cảnh. Đặc biệt là những ngữ cảnh thường gặp trong một bài thi quốc tế TOEIC.{'\n'}           
                Những từ vựng này không phải là từ chuyên môn, mà là những từ vựng thông dụng có thể dùng được trong rất nhiều ngữ cảnh khác nhau. Với cuốn sách này các bạn có thể khiến cho vốn từ của mình ngày càng trở nên phong phú và có thể áp dụng nó trong bất kỳ hoàn cảnh nào.
            </Text>
            <Image source={{uri: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg'}} style={styles.PostImage}/>
        </View>
        <View style={styles.FileWrapper}>
            <Image style={styles.FileImage}
                source={{
                  uri:'https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png',
                }}/>
            <Text>600-Essential-Words-For-The-TOEIC-PDF.pdf</Text>
        </View> */}
      <View style={styles.TextContainer}>
        <Text style={styles.PostText}>{postData?.text}</Text>
        <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>
          {'#' + postData?.hashtag}
        </Text>

        {postData?.postImg?.map((item, key) => {
          return (
            <View key={key}>
              {item.type == 'img' ? (
                <Image source={{uri: item.uri}} style={styles.PostImage} />
              ) : item.type == 'video'?(
                <VideoPlayer
                  video={{uri: item.uri}}
                  videoWidth={400}
                  videoHeight={200}
                  disableControlsAutoHide={true}
                  disableSeek={true}
                  endThumbnail={{
                    uri: 'https://tse1.mm.bing.net/th?id=OIP.pENsrXZ3F7yXMHHRIHS22QHaEK&pid=Api&rs=1&c=1&qlt=95&w=192&h=108',
                  }}
                />
              ) : (
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center',height:200, width:400, alignSelf:'center'}} onPress={()=>navigation.navigate('ReadPDFScreen',{link:item.uri})}>
                <Image source={{uri:'https://tse3.mm.bing.net/th?id=OIP.gh9hvhaRiqOVr8zU54fm-AHaEK&pid=Api&P=0&h=220'}} style={{height:160, width:360, marginTop:5}} resizeMode='cover'/>
                <Text style={{color:'black', fontSize:14}}>{item.name}</Text>
             </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.devider} />
      <View style={styles.InteractionContainer}>
        <TouchableOpacity onPress={onLike}>
          <View style={styles.Interaction}>
            <Ionicons
              name={isLike ? 'heart' : 'heart-outline'}
              size={25}
              color={isLike ? PRIMARY_COLOR : '#666'}
            />
            <Text style={styles.InteractionText}>
              {postData?.likes.length === 1
                ? '1 Like'
                : postData?.likes.length > 1
                ? postData?.likes.length + ' Likes'
                : 'Like'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCommentPress}>
          <View style={styles.Interaction}>
            <Image
              style={styles.iconWrapper}
              source={require('../assets/comment.png')}
            />
            <Text style={[styles.InteractionText]}>
              {countCm === 1
                ? '1 Comment'
                : countCm > 1
                ? countCm + ' Comments'
                : 'Comment'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostScreen

const styles = StyleSheet.create({
  container:{
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 5,
      flex: 1,
  },
  headerContainer:{
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
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
  devider:{
      borderBottomColor: '#DDDDDD',
      borderBottomWidth: 1,
      width: '92%',
      alignSelf: 'center',
      marginTop: 10,
  },
  TextContainer: {
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
      margin: 5,
      paddingHorizontal: 5
  },
  TopicText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#666',
      marginTop: 5
  },
  ContentText: {
      fontSize: 16,
      textAlign: 'justify',
  },
  FileWrapper:{
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
      margin: 5,
      padding: 5,
      flexDirection: 'row'
  },
  FileImage:{
      height: 20,
      width: 20,
      marginRight: 5
  },
  PostImage:{
      margin: 5,
      marginTop:5,
      resizeMode: 'contain',
      borderRadius: 5,
      height: 200
  },
  InteractionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
  },
  Interaction:{
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: 5,
  },
  InteractionText:{
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 5,
      marginLeft: 5,
      color: '#555'
  },
  iconWrapper: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  PostImage:{
    margin: 5,
    marginTop:5,
    resizeMode: 'cover',
    borderRadius: 5,
    height: 200
},
})