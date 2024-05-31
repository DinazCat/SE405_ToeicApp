import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import ChatMessage from '../ComponentTeam/ChatMessage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import messaging from '@react-native-firebase/messaging';
import Incomingvideocall from '../utils/incoming-video-call';
import Toast from 'react-native-simple-toast';
import {token, createMeeting} from '../api/apiVideoSDK';
import Api from '../api/Api';
import auth from '@react-native-firebase/auth';
import VoipPushNotification from 'react-native-voip-push-notification';
import socketServices from '../api/socketService';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import uploadfile from '../api/uploadfile';
import axios from 'axios';

const ChatRoom = ({route, navigation}) => {
  const {chatRoomData} = route.params;
  const [currentUser, setCurrentUser] = useState();
  const [messages, setMessages] = useState(chatRoomData.messages || []);
  const [haveMesssage, setHaveMessage] = useState(!chatRoomData.isNewChat);
  const [inputMessage, setInputMessage] = useState('');
  const [callee, setCallee] = useState(chatRoomData.calleeId);
  const [isCalling, setisCalling] = useState(false);
  const [videosdkToken, setVideosdkToken] = useState(null);
  const [videosdkMeeting, setVideosdkMeeting] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [file, setFile] = useState(null);

  const flatListRef = useRef(null);

  const videosdkTokenRef = useRef();
  const videosdkMeetingRef = useRef();
  videosdkTokenRef.current = videosdkToken;
  videosdkMeetingRef.current = videosdkMeeting;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    socketServices.initializeSocket();
    socketServices.on('new message', async ({message, roomId}) => {
      // setMessages([...messages, message]);
      // console.log([...messages, message]);
      if (roomId == chatRoomData.Id) await getChatRoomData();
      scrollToBottom();
    });
    // return () => {
    //   socketServices.disconnect();
    // };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatRoomData]);

  const getChatRoomData = async () => {
    const chatRoom = await Api.getChatRoomData(chatRoomData.Id);
    setMessages(chatRoom.messages);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(auth().currentUser.uid);
      setCurrentUser(data);
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      const {callerInfo, videoSDKInfo, type} = JSON.parse(
        remoteMessage.data.info,
      );
      switch (type) {
        case 'CALL_INITIATED':
          const incomingCallAnswer = async ({callUUID}) => {
            await Api.updateCallStatus({
              callerInfo,
              type: 'ACCEPTED',
            });
            Incomingvideocall.endIncomingcallAnswer(callUUID);
            setisCalling(false);
            await getTokenAndMeetingId();
            // Linking.openURL(
            //   `videocalling://meetingscreen/${videoSDKInfo.token}/${videoSDKInfo.meetingId}`,
            // ).catch(err => {
            //   console.log(`Error`, err);
            // });
            navigation.navigate('CallRoom', {
              name: callerInfo.name,
              token: videoSDKInfo.token,
              meetingId: videoSDKInfo.meetingId,
            });
          };

          const endIncomingCall = () => {
            Incomingvideocall.endIncomingcallAnswer();
            Api.updateCallStatus({callerInfo, type: 'REJECTED'});
          };

          Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
          Incomingvideocall.displayIncomingCall(callerInfo.name);

          break;
        case 'ACCEPTED':
          setisCalling(false);
          getTokenAndMeetingId();
          navigation.navigate('CallRoom', {
            name: callee,
            token: videosdkTokenRef.current,
            meetingId: videosdkMeetingRef.current,
          });
          break;
        case 'REJECTED':
          Toast.show('Call Rejected');
          setisCalling(false);
          break;
        case 'DISCONNECT':
          Platform.OS == 'android' && Incomingvideocall.endIncomingcallAnswer();
          break;
        default:
          Toast.show('Call Could not placed');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getTokenAndMeetingId() {
    const videoSDKtoken = token;
    const videoSDKMeetingId = await createMeeting({token: videoSDKtoken});
    setVideosdkToken(videoSDKtoken);
    setVideosdkMeeting(videoSDKMeetingId);
  }

  const onVideoCall = async () => {
    const calleeData = await Api.getUserData(callee);
    if (calleeData) {
      if (calleeData.length === 0) {
        console.log('CallerId Does not Match');
      } else {
        //initiateCall() is used to send a notification to the receiving user and start the call.
        await Api.initiateCall({
          callerInfo: currentUser,
          calleeInfo: calleeData,
          videoSDKInfo: {
            token: videosdkTokenRef.current,
            meetingId: videosdkMeetingRef.current,
          },
        });
        setisCalling(true);
      }
    }
  };

  // Callback function to scroll to the end of the FlatList
  const scrollToBottom = () => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: false});
      }, 100);
    }
  };

  const sendMessage = async () => {
    if (!socketServices || !inputMessage.trim()) return;

    const message = {
      from: {
        userId: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.userImg,
      },
      content: inputMessage,
      timestamp: new Date().getTime(),
      type: 'text',
    };

    if (haveMesssage) {
      console.log(chatRoomData.Id);
      socketServices.emit('chat message', {roomId: chatRoomData.Id, message});
      socketServices.emit('chats update', {roomId: chatRoomData.Id});
      setInputMessage('');
    } else {
      const newChatRoom = {
        users: [
          {
            userId: currentUser.id,
            name: currentUser.name,
            avatar: currentUser.userImg,
          },
          {
            userId: chatRoomData.toUid,
            name: chatRoomData.name,
            avatar: chatRoomData.imageUri,
          },
        ],
        messages: [],
      };
      const result = await Api.addNewChat(newChatRoom);
      console.log(result);
      if (result) {
        socketServices.emit('join room', {
          roomId: result,
          userId: currentUser.id,
        });
        socketServices.emit('join room', {
          roomId: result,
          userId: chatRoomData.Uid,
        });

        socketServices.emit('chat message', {roomId: result, message});
        socketServices.emit('chats update', {roomId: result});
        setInputMessage('');
        setHaveMessage(true);
      }
    }
  };

  const openLibrary = async () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(async img => {
      setImagePath(img.path);
      await sendImage(img.path);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
    }).then(async img => {
      setImagePath(img.path);
      await sendImage(img.path);
    });
  };

  const uploadImg = async img => {
    const formData = new FormData();
    formData.append('image', {
      uri: img,
      name: 'image.jpg',
      type: 'image/jpg',
    });

    console.log(img);

    const config = {
      method: 'post',
      url: `http://${uploadfile.ipAddress}/uploadImgToStorage`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    const response = await axios(config);
    return response.data.imgUrl;
  };

  const sendImage = async imagePath => {
    if (!imagePath) return;
    const imgUrl = await uploadImg(imagePath);
    if (!imgUrl) return;

    const message = {
      from: {
        userId: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.userImg,
      },
      imageUrl: imgUrl,
      timestamp: new Date().getTime(),
      type: 'image',
    };

    if (haveMesssage) {
      socketServices.emit('chat message', {roomId: chatRoomData.Id, message});
      socketServices.emit('chats update', {roomId: chatRoomData.Id});
    } else {
      const newChatRoom = {
        users: [
          {
            userId: currentUser.id,
            name: currentUser.name,
            avatar: currentUser.userImg,
          },
          {
            userId: chatRoomData.toUid,
            name: chatRoomData.name,
            avatar: chatRoomData.imageUri,
          },
        ],
        messages: [],
      };
      const result = await Api.addNewChat(newChatRoom);
      console.log(result);
      if (result) {
        socketServices.emit('join room', {
          roomId: result,
          userId: currentUser.id,
        });
        socketServices.emit('join room', {
          roomId: result,
          userId: chatRoomData.Uid,
        });

        socketServices.emit('chat message', {roomId: result, message});
        socketServices.emit('chats update', {roomId: result});
        setHaveMessage(true);
      }
    }

    setImagePath(null);
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });
      setFile(res[0]);
      await sendFile(res[0]);
    } catch (err) {}
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      const response = await axios.post(
        `http://${uploadfile.ipAddress}/uploadFile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      return response.data.file;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const sendFile = async file => {
    if (!file) return;

    const fileData = await uploadFile(file);
    if (!fileData) return;

    const message = {
      from: {
        userId: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.userImg,
      },
      file: fileData,
      timestamp: new Date().getTime(),
      type: 'file',
    };

    if (haveMesssage) {
      socketServices.emit('chat message', {roomId: chatRoomData.Id, message});
      socketServices.emit('chats update', {roomId: chatRoomData.Id});
    } else {
      const newChatRoom = {
        users: [
          {
            userId: currentUser.id,
            name: currentUser.name,
            avatar: currentUser.userImg,
          },
          {
            userId: chatRoomData.toUid,
            name: chatRoomData.name,
            avatar: chatRoomData.imageUri,
          },
        ],
        messages: [],
      };
      const result = await Api.addNewChat(newChatRoom);
      console.log(result);
      if (result) {
        socketServices.emit('join room', {
          roomId: result,
          userId: currentUser.id,
        });
        socketServices.emit('join room', {
          roomId: result,
          userId: chatRoomData.Uid,
        });

        socketServices.emit('chat message', {roomId: result, message});
        socketServices.emit('chats update', {roomId: result});
        setHaveMessage(true);
      }
    }

    setFile(null);
  };

  const truncateText = (text, maxLength) => {
    const truncatedText =
      text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    return truncatedText;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri:
              chatRoomData.imageUri ||
              'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
          }}
        />
        <Text style={styles.header} numberOfLines={1}>
          {truncateText(chatRoomData.name, 18)}
        </Text>
        <View style={{flex: 1}}></View>
        <TouchableOpacity>
          <IonIcon name="call" style={styles.iconButton2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVideoCall}>
          <IonIcon name="videocam" style={styles.iconButton2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatRoomOptions', route.params)}>
          <IonIcon
            name="alert-circle"
            style={[styles.iconButton2, {marginRight: 10}]}
          />
        </TouchableOpacity>
      </View>
      {!haveMesssage ? (
        <View
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
            marginTop: '5%',
            marginHorizontal: 10,
            padding: 5,
            borderColor: '#AAA',
            borderWidth: 1,
          }}>
          <Text style={{color: '#555'}}>
            You don't have messages with this person yet. Send your first
            message...{' '}
          </Text>
        </View>
      ) : (
        <View style={styles.chatFlow}>
          <FlatList
            data={messages}
            renderItem={({item, index}) => {
              const isFirstMessageOfDay =
                index === 0 ||
                new Date(messages[index - 1].timestamp).toDateString() !==
                  new Date(item.timestamp).toDateString();
              return (
                <View>
                  {isFirstMessageOfDay && (
                    <Text style={styles.DateText}>
                      {new Date(item.timestamp).toDateString()}
                    </Text>
                  )}
                  <ChatMessage
                    item={item}
                    isMine={item.from.userId === auth().currentUser.uid}
                  />
                </View>
              );
            }}
            ref={flatListRef}
            onLayout={scrollToBottom}
          />
        </View>
      )}
      <View style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TouchableOpacity onPress={openLibrary}>
          <IonIcon name="image-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <IonIcon name="camera-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickFile}>
          <IonIcon name="document-attach-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TextInput
          value={inputMessage}
          onChangeText={txt => {
            setInputMessage(txt);
          }}
          placeholder={'Type here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.chatInput, {color: '#666'}]}
        />
        <Text
          onPress={sendMessage}
          style={[
            styles.sendButton,
            {color: !inputMessage.trim() ? '#555' : PRIMARY_COLOR},
          ]}>
          {'Send'}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    display: 'flex',
    paddingBottom: 90,
  },
  image: {
    borderRadius: 25,
    width: 32,
    height: 32,
    marginLeft: 15,
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
    maxWidth: '50%',
  },
  chatFlow: {
    padding: 10,
    height: '100%',
    //display: 'flex',
    //flexDirection: 'column',
  },
  myChatContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  chatWrapper: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    flex: 1,
  },
  sendButton: {
    marginRight: 10,
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 5,
  },
  chatInput: {
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 6,
    flex: 1,
  },
  bottomViewContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconButton: {
    fontSize: 25,
    color: '#555',
    padding: 2,
    margin: 2,
  },
  iconButton2: {
    fontSize: 25,
    color: 'white',
    padding: 2,
    marginHorizontal: 7,
  },
  DateText: {
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
});
export default ChatRoom;
