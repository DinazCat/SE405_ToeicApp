import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import socketServices from '../api/socketService';

const ProfileScreen = ({navigation, route}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState(null);
  const [likes, setLikes] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const {userId} = route.params
  const getProfile = async () => {
    const data = await Api.getUserData(userId)
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
    getPosts()
    getpostLiked();
  }, []);

  const getPosts = async()=>{
    socketServices.on(userId+'userPosts',(data) => {
      setPosts(data)
    })
  }
  const getpostLiked = async()=>{
    const data = await Api.filterOnlyPost(auth().currentUser.uid,'Liked')
    setLikes(data)
  }
  const PopupMenu = () =>{
    const[visible,setvisible] = useState(false);
    const options = [
      {
        title:'Saved',
        action:()=>{
          navigation.push('SavedPostScreen')
        },

      },
    ];

    return(
      <View style={{flexDirection:'row'}}>
       {visible&& <View style = {styles.popup}>
            {
              options.map((op,i)=>(
                <TouchableOpacity  style={[styles.popupitem,{borderBottomWidth:i===options.length-1?0:1}]} key={i} onPress={op.action}>
                  <Text>{op.title}</Text>
                </TouchableOpacity>
              ))
            }
          </View>}
       <TouchableOpacity style={styles.MenuButton} onPress={()=>setvisible(!visible)}>
            <Icon name={'bars'} style={{fontSize:20}}  color={'#000'}/>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
              <View style={{flexDirection:'row',}}>
            <View style={{flex:1}}/>
          {(auth().currentUser.uid ===  userId ) && <PopupMenu/>}
          </View>
      <View>
        <Image
          style={styles.userImg}
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
            marginLeft: 100,
            marginTop: 100,
            width: 30,
            height: 30,
          }}></Image>
      </View>

      <Text style={[styles.userName]}>
        {profileData
          ? profileData.name
            ? profileData.name
            : profileData.email
          : 'Your name'}
      </Text>
      <Text multiline style={styles.aboutUser}>
        {profileData ? profileData.about || 'No details added.' : ''}
      </Text>
      {(userId==auth().currentUser.uid)?
      <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
        width: 90,
      }}
      onPress={() => {
        navigation.navigate('ChangeProfile', {profileData: profileData});
      }}>
      <Text style={[styles.userBtnTxt, {color: 'black'}]}>
        {'Edit Profile'}
      </Text>
      <Icon
        name={'pen'}
        style={{color: 'black', fontSize: 20, marginLeft: '20%'}}
      />
    </TouchableOpacity>
    : null
      }
      <View style={styles.userBtnWrapper}>
        <View style={styles.userBtn}>
          <Text style={styles.userBtnTxt}>{'Level ' + level}</Text>
        </View>
      </View>

      <View style={styles.userInfoWrapper}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 0 ? '#F1A3A2' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{posts?.length}</Text>
            <Text style={styles.userInfoSubTitle}>{'Posts'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 1 ? '#A2F3AD' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{likes?.length}</Text>
            <Text style={styles.userInfoSubTitle}>{'Likes'}</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 1 ? '#FAF7A8' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{1}</Text>
            <Text style={styles.userInfoSubTitle}>{'Tests'}</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      {selectedTab == 0 && (
        <>
          {posts?.map((item, key) => (
            <PostCard
              key={key}
              item={item}
              onCommentPress={() => navigation.navigate('CommentScreen', {postId:item.postId})}
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              editright={true}
              fixPost={()=>
                navigation.navigate('FixPostScreen', {PostId:item.postId})
              }
            />
          ))}
        </>
      )}
      {selectedTab == 1 && (
        <>
          {likes?.map((item, index) => (
            <PostCard
              key={index}
              item={item}
              onCommentPress={() => navigation.navigate('CommentScreen', {postId:item.postId})}
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              onUserPress={() => {
                navigation.navigate('ProfileScreen', {userId: item.userId});
              }}
              editright={false}
            />
          ))}
        </>
      )}
      {/* {selectedTab == 2 && (
        <>
          {following.map((item, index) => (
            <AvatarComponent
              key={index}
              item={item}
              //onFollowsChange={(followers, following) => setProfileData({ ...profileData, followers: followers, following: following })}
              onUserPress={() =>
                navigation.push('profileScreen', {userId: item})
              }
            />
          ))}
        </>
      )} */}
    </ScrollView>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: '#fff'
  },
  userImg: {
      height: 130,
      width: 130,
      borderRadius: 65,
  },
  userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
  },
  aboutUser: {
      fontSize: 14,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
  },
  userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
  },
  userBtn: {
      width: '50%',
      borderColor: '#66cc00',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
      alignItems: 'center',
  },
  userBtnTxt: {
      color: '#66cc00',
      fontSize: 16,
      fontWeight: '500',
  },
  userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
  },
  userInfoItem: {
      justifyContent: 'center',
      width: 110,
      borderRadius: 5,
      paddingVertical: 2,
  },
  userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#666',
      textAlign: 'center',
  },
  userInfoSubTitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
  },
  UserImage: {
      width: 60,
      height: 60,
      borderRadius: 20,
      marginLeft: 10,
  },
  MenuButton:{
    color: 'black', 
    fontSize: 40, 
    padding: 10,
    alignSelf:"center",
  },
  popup:{
    borderRadius:8,
    borderColor:'#333',
    borderWidth:1,
    backgroundColor:'#fff',
    width:62,
    height:35,
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