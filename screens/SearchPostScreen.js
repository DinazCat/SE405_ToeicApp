import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native'
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import { Keyboard } from 'react-native';

const SearchPostScreen = ({navigation,route}) => {
  const [postfilter, setPostFilter] = useState(null);
  const [checkSearch, setCheckSearch] = useState(false);
  const [content, setContent] = useState('');
  const {posts} = route.params
  const filterPost = () => {
    Keyboard.dismiss();
    if (content != '') {
      const newData = posts.filter(item => {
        const topic = item.topic.toUpperCase();
        const text = item.text.toUpperCase();
        const search = content.toUpperCase();
        if (topic.indexOf(search) > -1 || text.indexOf(search)>-1) {
          return item;
        } else {
          return null;
        }
      });
      setPostFilter(newData);
      setCheckSearch(true);
    } else {
      setCheckSearch(false);
    }
  };
  useEffect(() => {

  }, []);
  return (
    <View style={styles.container}>
       <View style={{flexDirection:'row'}}>
       <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name={'arrow-back-outline'} style={styles.IconButton}/>        
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            placeholder="Enter the topic, content..."
            placeholderTextColor={'#555'}
            onChangeText={text => {
              setContent(text)
            }}
            />
          <TouchableOpacity onPress={() => {filterPost()}}>
            <Ionicons name={'search-outline'} style={styles.IconButton}/>        
          </TouchableOpacity>
        </View>    
      </View>
      <View style={styles.devider}/>
      {postfilter&& <FlatList
          data={postfilter}
          renderItem={({item}) => (
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
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={false}           
        />   }
    </View>
  )
}

export default SearchPostScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection:'column',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#555',
    borderRadius: 25,
    borderWidth: 1,
    width: '90%',
    height: 45,
  },
  input:{
    fontSize: 16,
    width: '88%'
  },
  IconButton:{
    color: '#555', 
    fontSize: 25, 
    padding: 5,
    marginTop: 4
    //marginLeft: 5
  },
  devider:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
  },
})