import { StyleSheet, Text, View, Image, TouchableOpacity,Alert,ScrollView} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VideoPlayer from 'react-native-video-player'
import Api from '../api/Api'
import auth from '@react-native-firebase/auth';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import { useNavigation } from '@react-navigation/native';
import SpeakP1QuestionForm from '../components/SpeakP1QuestionForm';
import SpeakP2QuestionForm from '../components/SpeakP2QuestionForm';
import SpeakP34QuestionForm from '../components/SpeakP34QuestionForm';
import SpeakP5QuestionForm from '../components/SpeakP5QuestionForm';
import SpeakP6QuestionForm from '../components/SpeakP6QuestionForm';
import WriteP1QuestionForm from '../components/WriteP1QuestionForm';
import WriteP23QuestionForm from '../components/WriteP23QuestionForm';
import firestore from '@react-native-firebase/firestore';


const PostCard = ({item, onUserPress, onCommentPress, onGotoPostPress,editright, Remove, fixPost}) => {  
  const navigation = useNavigation();
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const [Allow, SetAllow] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [countCm, setCountCm] = useState(0);
  const getLevel = async () => {
    const data = await Api.getUserData(item.userId)
    if(data.currentScore){
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

  const onLike=async()=>{
    const foundItem = item.likes.find(i => i === auth().currentUser.uid);
    if(foundItem){
      setIsLike(false)
      const newList = item.likes.filter(item => item !== auth().currentUser.uid);
      await Api.updatePost(item.postId,{likes:newList})
    }
    else{
      setIsLike(true)
      const list = item.likes
      list.push(auth().currentUser.uid)
      await Api.updatePost(item.postId,{likes:list})
      const currentDate = new Date()
      const currentDay = currentDate.getDate(); 
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear(); 
      const currentHours = currentDate.getHours(); 
      const currentMinutes = currentDate.getMinutes();
      const time = currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
      const data = {
        PostownerId: item.userId,
        guestId: auth().currentUser.uid,
        classify: 'Like',
        time: time,
        text:'liked your post about topic: ' + item.topic,
        postid: item.postId,
        Read: 'no',
      };
      await Api.addNotification(data)
    }
  }
  const checkLike=()=>{
    const foundItem = item.likes.find(i => i === auth().currentUser.uid);
    if(foundItem) setIsLike(true)
    else setIsLike(false)
  }
  function allow()
  {
    if( auth().currentUser.uid ===  item.userId)
    {
      SetAllow(true);
    }
    else SetAllow(false);
  }
  // const countComment=async(cmId)=>{
  //   const data = await Api.getOneComment(cmId)
  //   console.log(data)
  //   if(data!='-1'){
  //   let tong = data.replies?.length||0
  //   if(tong==0) return 0;
  //   for(let i = 0; i < tong; i++){
  //     tong=  parseInt(countComment(data.replies[i])) + parseInt(tong)
  //   }
  // }else return 0
  //   }
  // const countComment1=()=>{
  //   let tong = 0;
  //     for(let i = 0; i < item.comments.length;i++){
  //       tong = parseInt(countComment(item.comments[i])) + 1 + parseInt(tong)
  //     }
  //     setCountCm(tong)
  //     console.log("tong"+tong)
  //   }
  useEffect(() => {
    allow();
})
  useEffect(() => {
    getLevel();
    checkLike();
  }, [item]);

  const PopupMenu = ({Allow,EditRight}) =>{
    const[visible,setvisible] = useState(false);
    const options = [
      {
        title:"Delete",
        action:async()=>{
          setvisible(false)
          // await Api.deletePost(item.postId)
          try {
            const collectionRef = firestore().collection('Posts');
            await collectionRef.doc(item.postId).delete();
            Alert.alert('Success!', "Post delete successfully");
          } catch (error) {
            console.error('Lỗi khi xóa document:', error);
          }
        },
      },
      {
        title:'Edit',
        action:()=>{
          setvisible(false)
          fixPost()
        },
      }
    ];
    const options2 = [
      {
        title:(EditRight!='unsave')?'Save':'unSave',
        action:async ()=>{
          if(EditRight=='unsave'){
            setvisible(false)
            Alert.alert('Success!', "You have successfully removed the post from the list");
            // await Api.savePost(item.postId)
            Remove()
          }
          else{
          setvisible(false)
          Alert.alert('Success!', "Post save successfully");
          await Api.savePost(item.postId)
          }
        },
      }
    ]

    return(
      <View style={{flexDirection:'row'}}>
       {(visible && Allow && EditRight==true)? <View style = {styles.popup}>
            {
              options.map((op,i)=>(
                <TouchableOpacity  style={[styles.popupitem]} key={i} onPress={op.action}>
                  <Text>{op.title}</Text>
                </TouchableOpacity>
              ))
            }
          </View>:
          (visible)?
          <View style = {[styles.popup,{height:40}]}>
          {
            options2.map((op,i)=>(
              <TouchableOpacity  style={[styles.popupitem]} key={i} onPress={op.action}>
                <Text>{op.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>:null
          }
       <TouchableOpacity style={styles.MenuButton} onPress={()=>setvisible(!visible)}>
            <Icon name={'ellipsis-h'}  color={'#555'}/>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.Container}>
      <View style={styles.UserInfoContainer}>
        <TouchableOpacity onPress={onUserPress}>
        <Image
            style={styles.UserImage}
            source={{
              uri: item.userImg
                ? item.userImg
                  ? item.userImg
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
          <Image
            source={levelsource}
            resizeMode="contain"
            style={{
              position: 'absolute',
              marginLeft: 28,
              marginTop: 30,
              width: 15,
              height: 15,
            }}></Image>
        </TouchableOpacity>
        <View style={styles.UserInfoTextContainer}>
          <TouchableOpacity>
            <Text style={styles.UsernameText}>{item.userName}</Text>
          </TouchableOpacity>
          <Text style={styles.PostTime}>{item.postTime}</Text>
        </View>
        <View style={{flex: 1}} />
      <PopupMenu Allow = {Allow} EditRight = {editright}/>
      </View>

      <Text style={styles.PostTitle}>Topic: {item.topic}</Text>

      {(item.text!='')?<Text style={styles.PostText}>
        {item.text}
      </Text>:null}
      <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>
          {"#"+item.hashtag}
        </Text>

      <TouchableOpacity onPress={onGotoPostPress}>
        <Text
          style={[
            styles.PostText,
            {textDecorationLine: 'underline', color: '#226EE8'},
          ]}>
          Go to post
        </Text>
      </TouchableOpacity>

      <View>
        {(item.postImg)?(item.postImg[0].type == 'img') ? 
          <Image source={{uri: item.postImg[0].uri}} style={styles.PostImage} />
         : (item.postImg[0].type == 'video') ? 
          <VideoPlayer
            video={{uri:item.postImg[0].uri}}
            videoWidth={400}
            videoHeight={200}
            disableControlsAutoHide={true}
            disableSeek={true}
            endThumbnail={{uri:'https://tse1.mm.bing.net/th?id=OIP.pENsrXZ3F7yXMHHRIHS22QHaEK&pid=Api&rs=1&c=1&qlt=95&w=192&h=108'}}
          />
        :(item.postImg[0].type == 'pdf') ? 
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center',height:200, width:400, alignSelf:'center'}} onPress={()=>navigation.navigate('ReadPDFScreen',{link:item.postImg[0].uri})}>
        <Image source={{uri:'https://tse3.mm.bing.net/th?id=OIP.gh9hvhaRiqOVr8zU54fm-AHaEK&pid=Api&P=0&h=220'}} style={{height:160, width:360, marginTop:5}} resizeMode='cover'/>
        <Text style={{color:'black', fontSize:14}}>{item.postImg[0].name}</Text>
     </TouchableOpacity>
        :
        <ScrollView style={{flexDirection:'column' }}>
        {(item.postImg[0].part=='W1')&&<WriteP1QuestionForm item={item.postImg[0].item} part={item.postImg[0].part}  flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
        {(item.postImg[0].part=='W2'||item.postImg[0].part=='W3')&&<WriteP23QuestionForm item={item.postImg[0].item} part={item.postImg[0].part}  flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
            {(item.postImg[0].part == 'S1')&&<SpeakP1QuestionForm item={item.postImg[0].item} part={item.postImg[0].part} flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
            {(item.postImg[0].part == 'S2')&&<SpeakP2QuestionForm item={item.postImg[0].item} part={item.postImg[0].part} flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
            {(item.postImg[0].part == 'S3')&&<SpeakP34QuestionForm item={item.postImg[0].item} part={item.postImg[0].part} flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
            {(item.postImg[0].part == 'S4')&&<SpeakP5QuestionForm item={item.postImg[0].item} part={item.postImg[0].part} flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
            {(item.postImg[0].part == 'S5')&&<SpeakP6QuestionForm item={item.postImg[0].item} part={item.postImg[0].part} flag={'ReviewQuestion'} check={item.postImg[0].check}/>}
      </ScrollView>
        :null}
      </View>

      <View style={styles.devider} />

      <View style={styles.InteractionContainer}>
        <TouchableOpacity onPress={onLike}>
          <View style={styles.Interaction}>
          <Ionicons name={isLike ? 'heart' : 'heart-outline'} size={25} color={isLike? PRIMARY_COLOR : '#666'} />
            <Text style={styles.InteractionText}>
              { item.likes.length === 1 ? '1 Like' :
                      item.likes.length > 1 ? item.likes.length + ' Likes' :
                      'Like'}
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
              {countCm === 1 ? '1 Comment' :
                      countCm > 1 ? countCm + ' Comments' :
                      'Comment'}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
                <View style={styles.Interaction}>
                    <Ionicons name="arrow-redo-outline"size={25} color={'#666'}/>
                    <Text style={[styles.InteractionText, , {color: '#666'}]}>{language === 'vn' ? 'Chia sẻ' : 'Share'}</Text>
                </View>
            </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default PostCard

const styles = StyleSheet.create({
    Container:{
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        padding: 5
    },
    UserInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
    },
    UserImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    UserInfoTextContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 5,
    },
    UsernameText:{
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
    PostTime:{
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: '#666',
    },
    PostText:{
        fontSize: 14,
        marginBottom: 10,
    },
    PostTitle:{
        fontSize: 16,
        marginBottom: 10,
        fontWeight:"bold",
        color:"black",
    },
    PostImgsContainer:{
        width: '100%', 
    
    },
    PostImage:{
        margin: 5,
        marginTop:5,
        resizeMode: 'cover',
        borderRadius: 5,
        height: 200
    },
    devider:{
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        width: '92%',
        alignSelf: 'center',
        marginTop: 15,
    },
    InteractionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
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
    MenuButton:{
        color: 'black', 
        fontSize: 30, 
        padding: 10,
        alignSelf:"center",
      },
      popup:{
        borderRadius:8,
        borderColor:'#333',
        borderWidth:1,
        backgroundColor:'#fff',
        width:62,
        height:65,
        textAlign:'center',
      },
      popupitem:
      {
        borderBottomColor:'black', 
        alignItems:'center', 
        width:60, 
        alignSelf:'center',
        paddingVertical:5
      }
})