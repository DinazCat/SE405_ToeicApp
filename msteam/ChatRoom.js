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

const ChatRoom = ({route, navigation}) => {
  const [user, setUser] = useState();
  const [callee, setCallee] = useState('DxL5c5T2XYZZE0ONGGPLpj0tOsK2');
  const [isCalling, setisCalling] = useState(false);
  const [videosdkToken, setVideosdkToken] = useState(null);
  const [videosdkMeeting, setVideosdkMeeting] = useState(null);

  const videosdkTokenRef = useRef();
  const videosdkMeetingRef = useRef();
  videosdkTokenRef.current = videosdkToken;
  videosdkMeetingRef.current = videosdkMeeting;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(auth().currentUser.uid);
      setUser(data);
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
          console.log(10);
          const incomingCallAnswer = ({callUUID}) => {
            Api.updateCallStatus({
              callerInfo,
              type: 'ACCEPTED',
            });
            Incomingvideocall.endIncomingcallAnswer(callUUID);
            setisCalling(false);
            getTokenAndMeetingId();
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
          console.log(10.1);

          break;
        case 'ACCEPTED':
          console.log(11);
          setisCalling(false);
          getTokenAndMeetingId();
          navigation.navigate('CallRoom', {
            name: callee,
            token: videosdkTokenRef.current,
            meetingId: videosdkMeetingRef.current,
          });
          break;
        case 'REJECTED':
          console.log(12);
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
          callerInfo: user,
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

  const chatData = [
    {
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:01',
      isMine: false,
      type: 'text',
    },
    {
      user: {
        name: 'Cát',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:02',
      isMine: true,
      type: 'text',
    },
    {
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:03',
      isMine: false,
      type: 'text',
    },
    {
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      time: '13:03',
      image:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      isMine: false,
      type: 'image',
    },
    {
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      time: '13:03',
      isMine: false,
      type: 'file',
    },
  ];
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
            uri: route.params.imageUri,
          }}
        />
        <Text style={styles.header} numberOfLines={1}>
          {route.params.roomName}
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

      <View style={styles.chatFlow}>
        <FlatList
          data={chatData}
          renderItem={({item, index}) => {
            return <ChatMessage item={item} />;
          }}
        />
      </View>
      <View style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TouchableOpacity>
          <IonIcon name="image-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon name="camera-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon name="document-attach-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TextInput
          //   ref={textInputRef}
          //   value={comment}
          //   onChangeText={txt => {
          //     setComment(txt);
          //   }}
          placeholder={'Text here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.chatInput, {color: '#666'}]}
        />
        <Text style={styles.sendButton}>{'Send'}</Text>
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
    display: 'flex',
    flexDirection: 'column',
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
    color: '#555',
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
});
export default ChatRoom;
