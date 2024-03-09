import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionScreen from '../screens/QuestionScreen';
import Api from '../api/Api'
import SmallHistoryCard from '../components/SmallHistoryCard';
import PostCard from '../components/PostCard';
const SavedPostScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  useEffect(()=>{
      getPost()
    },[])
    const getPost = async()=>{
      const data = await Api.getsavePost()
      setPosts(data)
    }
  return (
      <View style={styles.container}>
         <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
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
          Saved Post
        </Text>
      </View>
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
          editright={'unsave'}
          Remove={async ()=>{
            const filteredData = posts.filter(i => i.postId !== item.postId);
            const list = [...filteredData];
            setPosts(list)
            await Api.updateAlarmVocab({SavedPost:list} )
          }}
        />
      )}
      keyExtractor={item => item.postId}
      showsVerticalScrollIndicator={false}
    />
              </ImageBackground>
        
        
      </View>
    )
  }
  const styles = StyleSheet.create({
      container: {
        backgroundColor: "#FFFFFF", 
        flex:1,
        height:1000
      },
      upzone: {
          height:'8%',
          backgroundColor:'#990000',
          justifyContent: 'center',
          alignItems: 'center',
      },})
export default SavedPostScreen