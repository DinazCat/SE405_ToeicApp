import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import PostinTeam from '../ComponentTeam/PostinTeam';
import RecordingCard from '../ComponentTeam/RecordingCard';
import FileCard from '../ComponentTeam/FileCard';
import FolderCard from '../ComponentTeam/FolderCard';
import {createMeeting, token, startRecord, stopRecord} from '../api/apiVideoSDK';
import auth from '@react-native-firebase/auth';
import MeetingRoom from './MeetingRoom';
import DateItem from '../ComponentTeam/DateItem';
import {AuthContext} from '../navigation/AuthProvider';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import socketServices from '../api/socketService';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const TeamRoom = ({navigation}) => {
  const {user, isTeacher} = useContext(AuthContext);
  const [meetingId, setMeetingId] = useState(null);
  const COLORS = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];
  const [classInfo, setClassInfo] = useState(null)
  const [rangeDate, setRangeDate] = useState(null)
 
  const getInFoClass = async()=>{
    const classtemp = await firestore()
    .collection('Class')
    .doc('0VA2PZf3PVGlbWlF9EiV')
    .get();
    setClassInfo(classtemp.data())
    const content = await Api.getRangeDate('0VA2PZf3PVGlbWlF9EiV')
    setRangeDate(content)
    // RealTimePost(content)
  }


  useEffect(() => {
    getInFoClass();
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const Side = () => {
  
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
            <View 
             style={{
              height: 300,
              width: '100%',
              borderRadius: 15,
              backgroundColor: PRIMARY_COLOR,
              position: 'absolute',
              marginTop: 480,
              borderColor: 'black',
              //borderWidth: 1,
            }}
            >
              <TouchableOpacity
            style={{marginLeft: 350, padding: 5}}
            onPress={() => toggleModal()}>
            <Icon
              name={'times-circle'}
              style={{color: 'black', fontSize: 20, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', width:390, alignSelf:'center'}}>
          <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => {}}>
                <Image
                  source={require('../assets/contract.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={[AppStyle.textstyle.normaltext,{width:'auto'}]}>Assignments</Text>
            </View>
          <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => {}}>
                <Image
                  source={require('../assets/timetable.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={[AppStyle.textstyle.normaltext,{width:'auto'}]}>Schedule</Text>
            </View>
            </View>
          
              </View>
        </Modal>
    )
  }
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  };
  const [profileData, setProfileData] = useState(null);
  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
  };
  useEffect(() => {
    socketServices.initializeSocket()
    receiveMeetingId()
    getProfile();
  }, []);
  const receiveMeetingId = async()=>{
    socketServices.on('getMeetingId',(data) => {
      if(data.ClassId=='0VA2PZf3PVGlbWlF9EiV'){
        setMeetingId(data.MeetingId)
      }
    });
  }
  const sendMeetingId = async(data)=>{
    // console.log("send ")
    // socketServices.emit('MeetingId', data);
    const documentRef = firestore()
    .collection('Class')
    .doc('0VA2PZf3PVGlbWlF9EiV');
  await documentRef
    .update({
      MeetingId:data
    })
  }
  
  const getMeetingId = async id => {
    const meetingId = id == null ? await createMeeting({token}) : id;
    console.log(meetingId);
    //sau này thêm tên class
    sendMeetingId(meetingId)
    //  const documentRef = firestore()
    //     .collection('Class')
    //     .doc('0VA2PZf3PVGlbWlF9EiV');
    //   await documentRef
    //     .update({
    //       MeetingId:meetingId
    //     })
    setMeetingId(meetingId);
  };
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [isJoin, setIsJoin] = useState(false);
  const [realJoin, setRealJoin] = useState(false);
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);
  const [selectedTab, setSelectedTab] = useState(1);
  const postData = [
    {
      userName: 'Nguyễn Quỳnh Hoa',
      postTime: '1PM at 2/24/2024',
      text: 'Lịch học tuần này đã thay đổi, các bạn chú ý theo dõi nhé.',
      sign: 'topic',
    },
    {
      userName: 'Nguyễn Quỳnh Hoa',
      postTime: '1PM at 2/24/2024',
      sign: 'meeting',
    },
  ];
  // const Record = [
  //   {
  //     User: 'Nguyễn Quỳnh Hoa',
  //     Time: '1PM at 2/24/2024',
  //     Name: 'Buổi học ngày 24/2/2024',
  //   },
  //   {
  //     User: 'Nguyễn Thị Thy',
  //     Time: '1PM at 3/24/2024',
  //     Name: 'Buổi học ngày 24/3/2024',
  //   },
  // ];
  const [records, setRecords] = useState(null);
  const getRecords = async ()=>{
    const data = await Api.getRecordings("0VA2PZf3PVGlbWlF9EiV");
    setRecords(data);
  }
  useEffect(() => {
    getRecords()
  }, []);
  const fileandfolder = [
    {
      User: 'Nguyễn Quỳnh Hoa',
      Time: '1PM at 2/24/2024',
      Name: 'Tài liệu các đề thi 2023',
      sign: 'folder',
    },
    {
      User: 'Nguyễn Thị Thy',
      Time: '1PM at 3/24/2024',
      Name: 'Buổi học ngày 24/3/2024',
      sign: 'file',
    },
  ];
  const PopupMenu = () => {
    const [visible, setvisible] = useState(false);
    const options = [
      {
        title: 'Create folder',
        action: async () => {
          setvisible(false);
        },
      },
      {
        title: 'Up file',
        action: () => {
          setvisible(false);
        },
      },
      {
        title: 'No option',
        action: () => {
          setvisible(false);
        },
      },
    ];

    return (
      <View style={{flexDirection: 'colunm'}}>
        {visible && (
          <View style={{backgroundColor: 'white'}}>
            {options.map((op, i) => (
              <TouchableOpacity
                style={[styles.popupitem]}
                key={i}
                onPress={op.action}>
                <Text style={{color: 'black', fontSize: 15}}>{op.title}</Text>
                {i != 2 && <Text>--------</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity onPress={() => setvisible(!visible)}>
          <Icon name={'plus'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  };

  function AttendeeCard({person, color}) {
    const {webcamStream, webcamOn, micOn, micStream} = useParticipant(person.id);
    return webcamOn && webcamStream ? (
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={{
          borderRadius: 15,
          backgroundColor: card_color,
          width: 140,
          height: 140,
          alignSelf: 'center',
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
        }}
      />
    ) : (
      <View
        style={{
          borderRadius: 15,
          backgroundColor: card_color,
          width: 140,
          height: 140,
          alignSelf: 'center',
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
        }}>
        {/* <View
          style={[
            styles.UserImage,
            {
              backgroundColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={{textAlign: 'center'}}>NL</Text>
        </View> */}
             <Image
          style={styles.UserImage}
          source={{
            uri: person
              ? person.image
                ? person.image
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
          }}
        />
        <Text style={styles.UsernameText}>{person.name}</Text>
        <TouchableOpacity>
          <Icon name="microphone" color="black" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
  function MeetingRoomtemp() {
    const {leave, toggleWebcam, toggleMic,toggleScreenShare,presenterId, participants,end,startRecording, stopRecording } = useMeeting({
      onParticipantLeft,
      onPresenterChanged,
      onMeetingLeft,
      onRecordingStateChanged
    });
    const [idPersonRecord, setIsIdPersonRecord] = useState(null)
    const [count_Record, setcount_Record] = useState(0)

   function onRecordingStateChanged(data) {
      const { status, id} = data;
    console.log(data)
    setIsIdPersonRecord(id)
      if (status === "RECORDING_STARTING") {
        setIsRecording(true);
        console.log("Meeting recording is starting");
      } else if (status === "RECORDING_STOPPED") {
        setIsRecording(false);
        console.log("Meeting recording is stopped");
      } else {
        //
      }
    }

    const handleStartRecording = async () => {
      startRecording(null, null, {
        layout: {
          type: "GRID",
          priority: "SPEAKER",
          gridSize: 4,
        },
        theme: "DARK",
        mode: "video-and-audio",
        quality: "high",
        orientation: "portrait",
      });
     
    };
  
    const handleStopRecording = async () => {
        const currentDate = moment().format('D/M/YYYY_h:mm A');
        const documentRef = firestore()
        .collection('Class')
        .doc('0VA2PZf3PVGlbWlF9EiV');
      await documentRef
        .update({
          Recordings: firestore.FieldValue.arrayUnion({
            id: meetingId,
            name: currentDate,
            user:profileData?.name,
            count:count_Record+1,
            composerId:idPersonRecord,
          }),
        })
        .then(() => {
          console.log('haha');
          setcount_Record(count_Record+1);
        });
        console.log("kkkk")
        stopRecording();
      setIsRecording1(false);
    };
    const { screenShareStream, screenShareOn } = useParticipant(presenterId);
    const [myIdMeeting, setMyIdMeeting] = useState(null)
    const [isRedording, setIsRecording] = useState(false)
    const [isRedording1, setIsRecording1] = useState(false)
    useEffect(() => {
      const participantsArrId = [...participants.keys()];
      setMyIdMeeting(participantsArrId[participantsArrId.length - 1])
      JoinMeeting();
    }, []);
    const JoinMeeting = async () => {
      const participantsArrId = [...participants.keys()];
      const e = [...participants]
      console.log(e)
      const documentRef = firestore()
        .collection('Class')
        .doc('0VA2PZf3PVGlbWlF9EiV');
      await documentRef
        .update({
          Participants: firestore.FieldValue.arrayUnion({
            id: participantsArrId[participantsArrId.length - 1],
            name: profileData?.name,
            image:profileData?.userImg,
          }),
        })
        .then(() => {
          console.log('haha');
        });
    };
    const [listAttendee, setListAttendee] = useState(null)
    useEffect(() => {
      const docRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');

      const unsubscribe = docRef.onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // Dữ liệu tài liệu đã được cập nhật
          setListAttendee(documentSnapshot.data().Participants);
        } else {
          // Tài liệu không tồn tại
          console.log('Document does not exist!');
        }
      });
  
      // Hủy đăng ký lắng nghe khi component unmount
      return () => unsubscribe();
    }, []);
    //Event to determine some other participant has joined
    //  async function onParticipantJoined(participant) {
    //   console.log(" onParticipantJoined", participant);

    //   const documentRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');
    //   await documentRef.update({
    //     Participants:firestore.FieldValue.arrayUnion({id:participant.id,name:profileData?.name})
    //   }).then(()=>{

    //   });

    // }
     //Callback for when the presenter changes
  function onPresenterChanged(presenterId) {
    if(presenterId){
      console.log(presenterId, "started screen share");
    }else{
      console.log("someone stopped screen share");
    }
  }
  async function onMeetingLeft() {
    console.log('onMeetingLeft');
    setIsJoin(false);
    setMeetingId(null);
    sendMeetingId(null)
    const documentRef = firestore()
    .collection('Class')
    .doc('0VA2PZf3PVGlbWlF9EiV');
  await documentRef
    .update({
      Participants: []
    })
    .then(() => {
    });
  }
    async function onParticipantLeft(participant) {
      console.log(' onParticipantLeft', participant.id);
      const documentRef = firestore()
        .collection('Class')
        .doc('0VA2PZf3PVGlbWlF9EiV');
      await documentRef
        .update({
          Participants: firestore.FieldValue.arrayRemove({
            id: participant.id,
            name: profileData?.name,
            image:profileData?.userImg,
          }),
        })
        .then(() => {
          // navigation.push('MeetingRoom',{Cam:isCamMuted,Mic:isMicMuted,meetingId:meetingId,userId:participantId, toggleMic:()=>toggleMic(),toggleWebcam:()=>handleCamToggle(),
          //   leave:()=>leave()})
          setIsJoin(false);
        });
    }
    const participantsArrId = [...participants.keys()];
    const [Share, SetShare] = useState(false);
    const handleMicToggle = () => {
      toggleMic();
      setIsMicMuted(!isMicMuted);
    };

    const handleCamToggle = () => {
      toggleWebcam();
      setIsCamMuted(!isCamMuted);
    };


    return (
      <View style={styles.container2}>
        <View
          style={[
            AppStyle.viewstyle.component_upzone,
            {backgroundColor: '#363636'},
          ]}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={()=>{setIsJoin(false)}}>
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
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 18,
                marginLeft: 15,
              }}>
              01:44 24 attendees
            </Text>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity style={{marginLeft:6}}
            onPress={() => {
              if(isRedording1){
                handleStopRecording();
              }
              else {
                setIsRecording1(true);
                handleStartRecording();
              }
            }}>
            {isRedording == false ? (
              <Icon name="record-vinyl" color="gray" size={20} />
            ) : (
              <Icon name="record-vinyl" color="#8B0016" size={20} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:6}}
            onPress={() => {
              handleMicToggle();
            }}>
            {isMicMuted == false ? (
              <FontAwesome name="microphone-slash" color="gray" size={20} />
            ) : (
              <FontAwesome name="microphone" color="black" size={20} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:6}}
            onPress={() => {
              handleCamToggle();
            }}>
            {isCamMuted == false ? (
              <Icon name="video-slash" color="gray" size={20} />
            ) : (
              <Icon name="video" color="gray" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {!screenShareOn && participantsArrId.length > 0 && (
          <FlatList
            style={{alignSelf: 'center', marginTop: 10}}
            data={listAttendee}
            renderItem={({item, index}) => (
              <AttendeeCard
                key={index}
                person={item}
                color={getRandomColor()}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
        {screenShareOn && screenShareStream && (
          <>
             <RTCView
          streamURL={new MediaStream([screenShareStream.track]).toURL()}
          objectFit={"contain"}
          style={{
            height: height*0.75,
            width:width*0.95,
            alignSelf:'center',
            marginVertical:5
          }}
        />
        <Text style={{color:"white", alignSelf:'center'}}>{profileData?.name} is sharing! </Text>
          </>
       
          
          // <View
          //   style={{
          //     height: 400,
          //     alignSelf: 'center',
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //   }}>
          //   <View
          //     style={{
          //       width: width * 0.95,
          //       height: 300,
          //       backgroundColor: 'black',
          //     }}></View>
          // </View>
        )}
         <View style={{flex: 1}} />
        {/*{Share &&(
          <View style={{marginBottom: 5}}>
            <FlatList
              horizontal
              data={participantsArrId}
              renderItem={({item, index}) => (
                <AttendeeCard
                  key={index}
                  person={item}
                  color={getRandomColor()}
                />
              )}
            />
          </View>
        )} */}
        <View
          style={{
            height: 50,
            backgroundColor: 'gray',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.push('AttendeeScreen',{list:participantsArrId})}>
            <Icon name="users" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="rocketchat" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {toggleScreenShare()}}>
            {(!screenShareOn||presenterId!=myIdMeeting)&&<Ionicons name={'arrow-up-outline'} size={20} color={'black'} />}
            {screenShareOn&&presenterId==myIdMeeting&&<Ionicons name={'stop-circle-outline'} size={20} color={'#8B0016'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              leave();
              setMeetingId(null);
              setIsJoin(false);
              setRealJoin(false)
            }}>
            <Icon name="phone-slash" color="#8B0016" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamMuted, setIsCamMuted] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  function MeetingView() {
    // Get `participants` from useMeeting Hook
    const {
      leave,
      toggleWebcam,
      enableWebcam,
      disableWebcam,
      toggleMic,
      participants,
    } = useMeeting({});
    const {localWebcamOn} = useMeeting();
    //Event to determine if the meeting has been left
    async function onMeetingLeft() {
      console.log('onMeetingLeft');
      setIsJoin(false);
      setRealJoin(false)
      setMeetingId(null);
      sendMeetingId(null)
      const documentRef = firestore()
      .collection('Class')
      .doc('0VA2PZf3PVGlbWlF9EiV');
    await documentRef
      .update({
        Participants: []
      })
      .then(() => {
      });
    }

    const {join} = useMeeting({});

    //Getting the leave and end method from hook and assigning event callbacks
    const {end} = useMeeting({
      onMeetingLeft,
    });

    //  const participantsArrId = [...participants.keys()];
    const handleMicToggle = () => {
      toggleMic();
      setIsMicMuted(!isMicMuted);
    };

    const handleCamToggle = () => {
      console.log('kkkkk');
      toggleWebcam();
      console.log('jk' + localWebcamOn);
      setIsCamMuted(!isCamMuted);
    };

    // const sendParticipants = async(a)=>{
    //   console.log('hhhh'+a)
    //   socketServices.emit('Participants', a);
    // }

    return (
      <View
        style={{
          borderRadius: 15,
          backgroundColor: PRIMARY_COLOR,
          width: screenWidth * 0.9,
          height: 130,
          alignSelf: 'center',
          elevation: 5,
          marginTop: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Meeting start</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
            width: 120,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleMicToggle();
            }}>
            {isMicMuted == false ? (
              <FontAwesome name="microphone-slash" color="gray" size={20} />
            ) : (
              <FontAwesome name="microphone" color="black" size={20} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCamToggle();
            }}>
            {isCamMuted == false ? (
              <Icon name="video-slash" color="gray" size={20} />
            ) : (
              <Icon name="video" color="gray" size={20} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              end();console.log("end")
            }}>
            <Text>End</Text>
          </TouchableOpacity>
        </View>

        {!realJoin&&<TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 50,
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            join();
            setIsJoin(true);
            setRealJoin(true)
          }}>
          <Text>Join</Text>
        </TouchableOpacity>}
        {realJoin&&<TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 50,
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setIsJoin(true);
          }}>
          <Text>Join</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  return meetingId == null ? (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          Lớp luyện SW Toeic 150+
        </Text>
        <View style={{flex: 1}} />
        {isTeacher&&<TouchableOpacity
          style={{marginRight: '5%'}}
          onPress={() => {
            setIsCreate(true);
            getMeetingId();
          }}
          // onPress={()=>navigation.push('MeetingRoom')}
        >
          <Icon name={'video'} color="white" size={20} />
        </TouchableOpacity>}
      </View>
      <View       style={{height:40}}>
      <ScrollView
      horizontal={true}>
        <View 
           style={{
        alignItems: 'center',
        alignSelf: 'center',
        height:40,
        flexDirection:'row'
          }}
          >
          <TouchableOpacity
          style={[styles.historyButton]}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Text
            style={[
              AppStyle.button.buttonText,
              {color: selectedTab == 1 ? PRIMARY_COLOR : '#333'},
            ]}>
            Posts
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            height: 30,
            backgroundColor: 'black',
            marginHorizontal: 10,
          }}
        />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Text
            style={[
              AppStyle.button.buttonText,
              {color: selectedTab == 2 ? PRIMARY_COLOR : 'black'},
            ]}>
            Files
          </Text>
        </TouchableOpacity>
        
        <View
          style={{
            width: 1,
            height: 30,
            backgroundColor: 'black',
            marginHorizontal: 10,
          }}
        />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Text
            style={[
              AppStyle.button.buttonText,
              {color: selectedTab == 3 ? PRIMARY_COLOR : 'black'},
            ]}>
            Recordings
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            height: 30,
            backgroundColor: 'black',
            marginHorizontal: 10,
          }}
        />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            toggleModal();
          }}>
          <Text
            style={[
              AppStyle.button.buttonText,
              {color: selectedTab == 4 ? PRIMARY_COLOR : 'black'},
            ]}>
            More
          </Text>
        </TouchableOpacity>
       
        {/* <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            setSelectedTab(4);
            navigation.navigate('AsignmentScreen');
          }}>
          <Text
            style={[
              AppStyle.button.buttonText,
              {color: selectedTab == 4 ? PRIMARY_COLOR : 'black'},
            ]}>
            Asignments
          </Text>
        </TouchableOpacity> */}

          </View>
      </ScrollView>
      </View>
      {selectedTab == 1 && (
        <View>
          {
            <FlatList
              data={rangeDate}
              renderItem={({item, index}) => (
                <DateItem item={item} key={index}/>
              )}
            />
          }
        </View>
      )}
      {selectedTab == 2 && (
        <FlatList
          data={fileandfolder}
          renderItem={({item, index}) => {
            if (item.sign == 'file') {
              return <FileCard record={item} />;
            } else if (item.sign == 'folder') {
              return <FolderCard record={item} />;
            }
          }}
        />
      )}
      {selectedTab == 3 && (
        <FlatList
          data={records}
          renderItem={({item, index}) => <RecordingCard record={item} 
          show = {()=>{navigation.push("ShowRecord",{url:item.File, name: item.Name})}}
          />}
        />
      )}
       {isTeacher&&selectedTab != 3&&<TouchableOpacity
        style={{
          position: 'absolute',
          marginLeft: screenWidth - 80,
          marginTop: screenHeight - 120,
          borderRadius: 25,
          width: 50,
          height: 50,
          backgroundColor: PRIMARY_COLOR,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.push('NewPost',{classId:'0VA2PZf3PVGlbWlF9EiV', userInfo:profileData})}>
        {selectedTab == 1 && <Icon name={'pen'} color="white" size={20} />}
        {selectedTab == 2 && <PopupMenu />}
        {/* {selectedTab == 3 && (
          <Ionicons name={'arrow-up-outline'} size={20} color={'white'} />
        )} */}
      </TouchableOpacity>}
      {Side()}
    </View>
  ) : (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: isMicMuted,
        webcamEnabled: isCamMuted,
        name: 'Test User',
      }}
      token={token}>
      {isJoin ? (
        <MeetingRoomtemp />
      ) : (
        <View style={styles.container}>
          <View style={AppStyle.viewstyle.component_upzone}>
            <TouchableOpacity
              style={{marginLeft: '2%'}}
              onPress={() => navigation.goBack()}>
              <FontAwesome name="chevron-left" color="white" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 20,
                marginLeft: 15,
              }}>
              Lớp luyện SW Toeic 150+
            </Text>
            <View style={{flex: 1}} />
            {isTeacher&&<TouchableOpacity
              style={{marginRight: '5%'}}
              onPress={() => {
                getMeetingId();
              }}
              // onPress={()=>navigation.push('MeetingRoom')}
            >
              <Icon name={'video'} color="white" size={20} />
            </TouchableOpacity>}
          </View>
          <View
            style={{
              width: '90%',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={[styles.historyButton]}
              onPress={() => {
                setSelectedTab(1);
              }}>
              <Text
                style={[
                  AppStyle.button.buttonText,
                  {color: selectedTab == 1 ? PRIMARY_COLOR : '#333'},
                ]}>
                Posts
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: 30,
                backgroundColor: 'black',
                marginHorizontal: 10,
              }}
            />
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => {
                setSelectedTab(2);
              }}>
              <Text
                style={[
                  AppStyle.button.buttonText,
                  {color: selectedTab == 2 ? PRIMARY_COLOR : 'black'},
                ]}>
                Files
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: 30,
                backgroundColor: 'black',
                marginHorizontal: 10,
              }}
            />
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => {
                setSelectedTab(3);
              }}>
              <Text
                style={[
                  AppStyle.button.buttonText,
                  {color: selectedTab == 3 ? PRIMARY_COLOR : 'black'},
                ]}>
                Recordings
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab == 1 && (
            <View>
             <MeetingView />
              {
               <FlatList
               data={rangeDate}
               renderItem={({item, index}) => (
                 <DateItem item={item} key={index}/>
               )}
             />
              }
            </View>
          )}
          {selectedTab == 2 && (
            <FlatList
              data={fileandfolder}
              renderItem={({item, index}) => {
                if (item.sign == 'file') {
                  return <FileCard record={item} />;
                } else if (item.sign == 'folder') {
                  return <FolderCard record={item} />;
                }
              }}
            />
          )}
          {selectedTab == 3 && (
            <FlatList
              data={Record}
              renderItem={({item, index}) => <RecordingCard record={item} 
              show = {()=>{navigation.push("ShowRecord",{url:item.File, name: item.Name})}}
              />}
            />
          )}
           {isTeacher&&selectedTab != 3&&<TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: screenWidth - 80,
              marginTop: screenHeight - 120,
              borderRadius: 25,
              width: 50,
              height: 50,
              backgroundColor: PRIMARY_COLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.push('NewPost', {classId:'0VA2PZf3PVGlbWlF9EiV'})}>
            {selectedTab == 1 && <Icon name={'pen'} color="white" size={20} />}
            {selectedTab == 2 && <PopupMenu />}
            {/* {selectedTab == 3 && (
              <Ionicons name={'arrow-up-outline'} size={20} color={'white'} />
            )} */}
          </TouchableOpacity>}
          {Side()}
        </View>
      )}
    </MeetingProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  historyButton: {
    height: 30,
    width: 100,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  MenuButton: {
    color: 'black',
    fontSize: 30,
    padding: 10,
    alignSelf: 'center',
  },
  popup: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 80,
    height: 85,
    textAlign: 'center',
  },
  popupitem: {
    borderBottomColor: 'black',
    alignItems: 'center',
    width: 80,
    alignSelf: 'center',
  },
  container2: {
    backgroundColor: '#363636',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  separator: {
    // height: 10, // khoảng cách giữa các mục
    width: 10,
  },
  //card
  headerContainer: {
    paddingVertical: 5,
  },
  UserInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  UserImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  UserInfoTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
  },
  UsernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  PostTime: {
    fontSize: 13,
    color: 'white',
    color: '#888',
  },
  MenuButton: {
    color: 'black',
    fontSize: 30,
    padding: 10,
    alignSelf: 'center',
  },
  popup: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 62,
    height: 65,
    textAlign: 'center',
  },
  popupitem: {
    borderBottomColor: 'black',
    alignItems: 'center',
    width: 60,
    alignSelf: 'center',
    paddingVertical: 5,
  },
  buttonmain: {
    height: 90,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  buttonzone: {
    flexDirection: 'column',
    width: 100,
    height: 120,
  },
});
export default TeamRoom;
