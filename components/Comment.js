import { StyleSheet, Text, View, TouchableOpacity, Image,TextInput } from 'react-native'
import React, { useEffect, useState, } from 'react'
import socketServices from '../api/socketService';
import Api from '../api/Api';
import firestore from '@react-native-firebase/firestore';
//realtime cho 1 comment, truyền id qua bên này r ms truy vấn, đệ quy đấy, dự định là bỏ reply đi
const Reply = ({ item }) => {

    return(
        <View style={{ marginLeft: 20 }}>
        <View
        style={styles.container}>
        <TouchableOpacity>
            <Image
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
                style={styles.image}
            />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.textContainer}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
                {item? item.userName : 'Cát'}
            </Text>
            <Text multiline style={{fontSize: 15, marginTop: 3}}>
                {item? item.text: ''} 
            </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={styles.replyStyle}>Reply</Text>
        </TouchableOpacity>
        </View>
    )
}
const Comment = ({item, onUserPress, onEdit, onDelete, flag, onReply}) => {
    const [comment, setComment] = useState(null)
    const [user, SetUser] = useState(null)
    const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
    // const getComment=async()=>{

    //       const data = await Api.getOneComment(listcm[i].commentId)
    //     setComment(data)
    //   }
    //   useEffect(() => {
    //     getComment();
    //   }, [item]);
    useEffect(() => {
        // socketServices.initializeSocket()
        getComments()
      }, []);
      const getComments = async()=>{
        // socketServices.on(item,(data) => {
        //   setComment(data)
        //   getUser(data.userId)
        // })
         firestore()
        .collection('Comments')
        .doc(item)
        .onSnapshot(doc => {
          if(doc.exists){
          const data = doc.data()
         setComment(data)
         getUser(data.userId)
        }
        });    
      }
      const getUser = async (id) => {
        const data = await Api.getUserData(id)
        SetUser(data)
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
      }
  return (
    <View>
      {user && (
        <View>
          <View style={styles.container}>
            <TouchableOpacity onPress={onUserPress}>
              <Image
                source={{
                  uri: user.userImg
                    ? user.userImg
                      ? user.userImg
                      : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                    : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
                }}
                style={styles.image}
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

            <TouchableOpacity style={styles.textContainer}>
              <Text style={{fontSize: 16, fontWeight: '600', color:'black'}}>{user.name}</Text>
              <Text style={{fontSize: 12, fontWeight: '500'}}>{comment.time}</Text>
              <Text multiline style={{fontSize: 15, marginTop: 3, color:'black'}}>
                {comment ? comment.text : ''}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => onReply(item,user.name)}>
            <Text style={styles.replyStyle}>Reply</Text>
          </TouchableOpacity>
        </View>
      )}
      {comment &&
        comment.replies &&
        comment.replies.map((reply, index) => (
          <View key={index}>
            {/* <Reply item={reply} /> */}
            {/* {reply.replies && reply.replies.length > 0 && */}
            <View style={{marginLeft: 20}}>
              <Comment item={reply} flag={1} onReply={onReply} />
            </View>
            {/* } */}
          </View>
        ))}
      {/* <Popover
            isVisible={isPopoverVisible}
            onRequestClose={() => setPopoverVisible(false)}
            fromView={popoverAnchor}>
            <View style={styles.popover}>              
                <TouchableOpacity onPress={handleEditComment}>
                    <View style={styles.popoverItem}>
                        <Icon name="edit" size={35} color="black" />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'black' }}>{language === 'vn' ? 'Sửa bình luận' : 'Edit comment'}</Text>
                    </View>
                </TouchableOpacity>           
                <TouchableOpacity onPress={handleDeleteComment}>
                    <View style={styles.popoverItem}>
                        <Icon name="trash-alt" size={35} color="black" />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'black' }}>{language === 'vn' ? 'Xóa bình luận' : 'Delete comment'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
      </Popover> */}
    </View>
  );
}

export default Comment

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,       
    },
    textContainer:{
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        padding: 4,
        paddingHorizontal: 8
    },
    image:{
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 22,
    },
    popover:{
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 16, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    popoverItem:{
        alignItems: 'center',
        margin: 20
    },
    replyStyle:{
        marginLeft: 55,
        textDecorationLine: 'underline'
    }
})