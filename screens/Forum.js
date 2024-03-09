import { StyleSheet, Text, View, TouchableOpacity, Image , FlatList,Modal,ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react';
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import socketServices from '../api/socketService';
import LottieView from 'lottie-react-native';

const Forum = ({navigation}) => {
  const [profileData, setProfileData] = useState(null);
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const [posts, setPosts] = useState(null);
  const [mark, setmark] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [hashtag, sethashtag] = useState('');
  const [postFilter, setPostFilter] = useState('');
  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid)
    setProfileData(data)
    if(data.currentScore){
      if(data.currentScore>=0 && data.currentScore <= 250){
        setLevel('0 (Basic Proficiency)')
        setLevelSource(require('../assets/Lv0.png'))
      }
      else if(data.currentScore <= 400){
        setLevel('1 (Elementary Proficiency)')
        setLevelSource(require('../assets/Lv1.png'))
      }
      else if(data.currentScore <= 600){
        setLevel('2 (Elementary Proficiency Plus)')
        setLevelSource(require('../assets/Lv2.png'))
      }
      else if( data.currentScore <= 780){
        setLevel('3 (Limited Working Proficiency)')
        setLevelSource(require('../assets/Lv3.png'))
      }
      else if(data.currentScore <= 900){
        setLevel('4 (Working Proficiency Plus)')
        setLevelSource(require('../assets/Lv4.png'))
      }
      else if(data.currentScore <= 990){
        setLevel('5 (International Professional Proficiency)')
        setLevelSource(require('../assets/Lv5.png'))
      }
    }
  };
  useEffect(() => {
    socketServices.initializeSocket()
    getProfile();
    getPosts();
    getMark()
  }, []);
  const getPosts = async()=>{
    socketServices.on('mainPosts',(data) => {
      setPosts(data)
    })
  }
  const getMark= async()=>
  {
    socketServices.on(auth().currentUser.uid+'sign',(data) => {
      setmark(true)
    })
    
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

const filter =async()=>{
  if(hashtag==''&&postFilter=='') return;
  else if(hashtag!=''&& postFilter==''){
    const data = await Api.filterOnlyhashtag(hashtag)
    setPosts(data)
  }
  else if(hashtag==''&& postFilter!=''){
    const data = await Api.filterOnlyPost(auth().currentUser.uid,postFilter)
    setPosts(data)
  }
  else if(hashtag!=''&& postFilter!=''){
    const data = await Api.filterBoth(auth().currentUser.uid,postFilter,hashtag)
    setPosts(data)
  }
}
  const FilterSide = () => {
  
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
            <View style={[styles.container,{backgroundColor:'rgba(0, 0, 0, 0.3)'}]}>
              <View style={{flex:1}}/>
              <View style={{height: 470,}}>
            <View style={styles.panel}>
                  <View style={{alignItems: 'center'}}>
              <Text style={[styles.panelSubtitle, {color: '#222'}]}>{'Filter by'}</Text>
              </View>    
            <View style={{height: 400, borderColor: '#DDD', borderBottomWidth: 1, borderTopWidth: 1}}>
              <Text style={[styles.TextStyle,{marginTop: 15}]}>Category</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(hashtag!='Q&A')?'#EAABAB':'white'}]}
                      onPress={() => {
                        if(hashtag=='Q&A')
                         sethashtag('');
                        else sethashtag('Q&A')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Q&A</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(hashtag!='Help?')? '#74A8C5':'white'}]}
                      onPress={() => {
                        if(hashtag=='Help?')
                        sethashtag('');
                       else sethashtag('Help?')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Help?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(hashtag!='Study Resources')? '#FA9D68':'white'}]}
                      onPress={() => {
                        if(hashtag=='Study Resources')
                        sethashtag('');
                       else sethashtag('Study Resources')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Study Resources</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(hashtag!='Exam Analysis')? '#CF87DF':'white'}]}
                      onPress={() => {
                        if(hashtag=='Exam Analysis')
                        sethashtag('');
                       else sethashtag('Exam Analysis')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Exam Analysis</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (hashtag!='Preparation Experiences')?'#F6F069':'white'}]}
                      onPress={() => {
                        if(hashtag=='Preparation Experiences')
                        sethashtag('');
                       else sethashtag('Preparation Experiences')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Preparation Experiences</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (hashtag!='Share Your Results')?'#51D855':'white'}]}
                      onPress={() => {
                        if(hashtag=='Share Your Results')
                        sethashtag('');
                       else sethashtag('Share Your Results')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Share Your Results</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(hashtag!='Events/News')? '#70DECE':'white'}]}
                      onPress={() => {
                        if(hashtag=='Events/News')
                        sethashtag('');
                       else sethashtag('Events/News')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Events/News</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (hashtag!='Review Exam Experiences')?'#E55858':'white'}]}
                      onPress={() => {
                        if(hashtag=='Review Exam Experiences')
                        sethashtag('');
                       else sethashtag('Review Exam Experiences')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Review Exam Experiences</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (hashtag!='Others')?'#BCE37A':'white'}]}
                      onPress={() => {
                        if(hashtag=='Others')
                        sethashtag('');
                       else sethashtag('Others')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Others</Text>
                      </TouchableOpacity>
                  </View>
                  <Text style={[styles.TextStyle,{marginTop: 15}]}>Post</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (postFilter!='Newest')?'#9ACC1C':'white'}]}
                      onPress={() => {
                        if(postFilter=='Newest')
                        setPostFilter('');
                       else setPostFilter('Newest')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Newest</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor:(postFilter!='Hottest')? '#9ACC1C':'white'}]}
                      onPress={() => {
                        if(postFilter=='Hottest')
                        setPostFilter('');
                       else setPostFilter('Hottest')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Hottest</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (postFilter!='Liked')?'#9ACC1C':'white'}]}
                      onPress={() => {
                        if(postFilter=='Liked')
                        setPostFilter('');
                       else setPostFilter('Liked')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Liked</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.panelButton, {backgroundColor: (postFilter!='Commented')?'#9ACC1C':'white'}]}
                      onPress={() => {
                        if(postFilter=='Commented')
                        setPostFilter('');
                       else setPostFilter('Commented')
                      }}>
                      <Text style={[styles.panelButtonTitle]}>Commented</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderColor: '#DDD', borderTopWidth: 1, padding: 5}}>
                      <TouchableOpacity
                          style={[styles.panelButton, {width: 100}]}
                          onPress={() => {toggleModal(), filter()}}>
                          <Text style={[styles.panelButtonTitle, {fontWeight: '700'}]}>Ok</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={[styles.panelButton, {width: 100}]}
                          onPress={() => {toggleModal(),setPostFilter(''),sethashtag('')}}>
                          <Text style={[styles.panelButtonTitle, {fontWeight: '700'}]}>Cancel</Text>
                      </TouchableOpacity>         
                  </View>
              </View>
            </View>
            </View>
            </View>
        </Modal>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOEIC Share Forum</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={() => navigation.navigate('SearchPost',{posts:posts})}>
          <Ionicons name={'search-outline'} style={styles.IconButton} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={toggleModal}>
          <Ionicons name={'filter-outline'} style={styles.IconButton} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setmark(false)
            navigation.push('NotificationScreen');
          }}>
          <Ionicons name={'notifications-outline'} style={styles.IconButton} />
          {(mark)&&<FontAwesome name="circle" style={styles.smallcircle}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Ionicons name={'settings-outline'} style={styles.IconButton} />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.devider}/> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {userId: auth().currentUser.uid})}>
          <Image
            style={styles.UserImage}
            source={{
              uri: profileData
                ? profileData.userImg
                  ? profileData.userImg
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
              marginTop: 33,
              width: 15,
              height: 15,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('AddPost',{sign:'Forum'})}>
          <View style={styles.addPostTextContainer}>
            <Text>{'Share something helpful for other TOEIC learners...'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        (posts==null)? 
        <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
        :
        <FlatList
        data={posts}
        renderItem={({item,index}) => (
          <PostCard
            item={item}
            onUserPress={() => {
              navigation.navigate('ProfileScreen', {userId: item.userId});
            }}
            onCommentPress={() => navigation.navigate('CommentScreen',{postId:item.postId,topic:item.topic, user:item.userId})}
            onGotoPostPress={() => navigation.navigate('PostScreen',{postId: posts[index].postId,sign:'nocmt'})}
            editright={false}
          />
        )}
        keyExtractor={item => item.postId}
        showsVerticalScrollIndicator={false}
      />
      }
      
      {FilterSide()}
    </View>
  );
}

export default Forum;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  header:{
    flexDirection:'row', 
    backgroundColor: '#9ACC1C', 
    alignItems: 'center', 
    padding: 10
  },
  UserImage:{
    width: 40,
    height: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  IconButton:{
    color: 'black', 
    fontSize: 25, 
    padding: 5
  },
  addPostTextContainer:{
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#666',
    marginLeft: 10,
    padding: 6,
    alignItems: 'center'
  },
  devider:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    margin: 5,
  },
  title:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
  smallcircle:{
    position:'absolute', 
    color:'#3300FF', 
    marginLeft:15, 
    marginVertical:10
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 18,
    color: '#555',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  panelButtonTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
  },
  TextStyle: {
    marginBottom: 5,
    fontSize: 15
  },
  panel: {
    padding: 20,
    backgroundColor: '#E8E8E8',
    width: '100%',
    position:'absolute'
  },
})