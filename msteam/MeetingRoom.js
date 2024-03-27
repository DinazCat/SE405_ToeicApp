import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    TextInput
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import AppStyle from '../theme'
  import AttendeeCard from '../ComponentTeam/AttendeeCard';
  import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    MediaStream,
    RTCView,
  } from "@videosdk.live/react-native-sdk";
  import { createMeeting, token } from '../api/apiVideoSDK';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import socketServices from '../api/socketService';
import firestore from '@react-native-firebase/firestore';
const {width, height} = Dimensions.get('window');
  const MeetingRoom = ({navigation,route}) => {
    const {Cam, Mic, meetingId, toggleMic,toggleWebcam,
      leave} = route.params;
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [participantsArrId , setParticipantsArrId] = useState([])
    const [Share,SetShare] = useState(false)
    useEffect(() => {
      listenToClassDocument()
      // socketServices.initializeSocket()
      // receiveParticipants()
    }, []);
    // const receiveParticipants = async()=>{
    //   socketServices.on('getParticipants',(data) => {
    //     setParticipantsArrId(data)
    //     console.log('data: '+data)
    //   });
    // }
    const listenToClassDocument = (documentId) => {
      const documentRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');
      const unsubscribe = documentRef.onSnapshot((documentSnapshot) => {
         const data = documentSnapshot.data();
         setParticipantsArrId(data.Participants)
      }, (error) => {
        console.error('Lỗi khi lắng nghe thay đổi:', error);
      });
    
      // Trả về hàm unsubscribe để ngừng lắng nghe khi cần
      return unsubscribe;
    };
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
  const data=[{
    Name:'N.T.B.Linh'
  },
  {
    Name:'N.T.B.Linh'
  },
  {
    Name:'N.T.B.Linh'
  },
  {
    Name:'N.T.B.Linh'
  }
]
  const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};
// const { join, leave, toggleWebcam, toggleMic, participants } = useMeeting({});
// const participantsArrId = [...participants.keys()];
// const { webcamStream, webcamOn, micOn, micStream } = useParticipant(participantsArrId);
const [isMicMuted, setIsMicMuted] = useState(Mic); // State để lưu trạng thái mic
  const handleMicToggle = () => {
    toggleMic(); 
    setIsMicMuted(!isMicMuted);
  };
  const [isCamMuted, setIsCamMuted] = useState(Cam); 

  const handleCamToggle = () => {
    toggleWebcam(); 
    setIsCamMuted(!isCamMuted); 
  };
    return (
      // <MeetingProvider
      //   config={{
      //     meetingId,
      //     micEnabled: Mic,
      //     webcamEnabled: true,
      //     name: 'Test User',
      //   }}
      //   token={token}>
          <View style={styles.container}>
        <View style={[AppStyle.viewstyle.component_upzone,{backgroundColor:'#363636'}]}>
          <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <View>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
             Buổi học ngày 29/2/2024
          </Text>
          <Text style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 18,
              marginLeft: 15,
            }}>01:44 24 attendees</Text>
          </View> 
          <View style={{flex:1}}/>
          <TouchableOpacity  onPress={() => {
          handleMicToggle()
        }}>
           {isMicMuted==false?<FontAwesome name="microphone-slash" color="gray" size={20} />:<FontAwesome name="microphone" color="black" size={20} />}
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
          handleCamToggle()
        }}>
           {isCamMuted==false?<Icon name="video-slash" color="gray" size={20} />:<Icon name="video" color="gray" size={20} />}
          </TouchableOpacity>
        </View>
        {!Share&&(participantsArrId.length>0)&&<FlatList
        style={{alignSelf:'center',marginTop:10}}
      data={participantsArrId}
      renderItem={({item, index}) => (
        <AttendeeCard
          key={index}
          person = {item}
          color={getRandomColor()}
        />
      )}
      numColumns={2}
      contentContainerStyle={styles.flatListContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />}
       {Share&&<View style={{height:400, alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:width*0.95, height:300, backgroundColor:'black'}}>

        </View>
        </View>}
        <View style={{flex:1}}/>
        {Share&&<View style={{marginBottom:5}}>
          <FlatList
        horizontal
       data={data}
       renderItem={({item, index}) => (
        <AttendeeCard
        key={index}
        person = {item}
        color={getRandomColor()}
      />
       )}
      />
        </View>
        }
        <View
        style={{
          height: 50,
          backgroundColor: 'gray',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
       
        <TouchableOpacity onPress={()=>navigation.push('AttendeeScreen')}>
          <Icon name="users" color="black" size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="rocketchat" color="black" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetShare(!Share)}>
        <Ionicons name={'arrow-up-outline'} size={20} color={ 'black' } />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => {leave();navigation.goBack()}}>
          <Icon name="phone-slash" color="#8B0016" size={20} />
        </TouchableOpacity>
      </View>
      
      </View>
        // </MeetingProvider>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#363636',
      flex: 1,
    },
    flatListContent: {
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      separator: {
        // height: 10, // khoảng cách giữa các mục
        width:10
      },
  });
  export default MeetingRoom;
  