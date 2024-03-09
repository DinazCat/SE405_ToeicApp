import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import React, { useState,useEffect} from 'react'
import Notification from '../components/Notification'
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import socketServices from '../api/socketService';
const NotificationScreen = ({navigation}) => {
  const [notiL, setNotiL] = useState(null)

  useEffect(() => {
    socketServices.initializeSocket()
    getNotis()
  }, []);
  const getNotis = async()=>{
    const list = []
    socketServices.on(auth().currentUser.uid+'noti',(data) => {
      if(list.length>0){
        const foundItem = list.find(i => i.Id === data.Id);
        if(!foundItem){
          list.push(data)
          setNotiL(list)
        }
      }
      else{
        list.push(data)
        setNotiL(list)
      }
    })
  }
  const removeNoti=async(id) => {
    const filteredData = notiL.filter(
      i => i.Id !== id,
    );
    setNotiL(filteredData);
    await Api.deleteNotification(id)
  }
  const Action = (item) => {
    if (item.classify == 'Like') {
      navigation.push('PostScreen',{postId: item.postid,sign:'nocmt'})
    } else {
      navigation.push('PostScreen',{postId: item.postid, sign:'cmt'})}
    }
  
  return (
    <View
      style={[styles.container,]}>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#9ACC1C'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} style={{fontSize: 30, color : '#222', padding: 5}}/>   
        </TouchableOpacity>
        <Text
          style={styles.headertext}>
          {'Notifications'}
        </Text>
      </View>
      <View style={{height: 1, backgroundColor: '#DDD'}} />
      {(notiL)?<FlatList
        data={notiL}
        renderItem={({item, index}) => (
          <Notification
            key={index}
            item={item}
            Remove={()=>{
              removeNoti(item.Id)
            }}
            action={() => {
              Action(item);
            }}
          />
        )}
       />:
      <Text style={{textAlign:'center'}}>There are no announcements</Text>
      } 
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headertext: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600',
    color: '#222',
    
  },
})