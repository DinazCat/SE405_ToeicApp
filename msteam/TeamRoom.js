import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    SafeAreaView,
    TextInput
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
  import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import PostinTeam from '../ComponentTeam/PostinTeam';
import RecordingCard from '../ComponentTeam/RecordingCard'
import FileCard from '../ComponentTeam/FileCard';
import FolderCard from '../ComponentTeam/FolderCard';
import { createMeeting, token } from '../api/apiVideoSDK';
import auth from '@react-native-firebase/auth';
import MeetingRoom from './MeetingRoom';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView, 
} from "@videosdk.live/react-native-sdk";
import socketServices from '../api/socketService';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api'
const {width, height} = Dimensions.get('window');
  const TeamRoom = ({navigation}) => {
    const [meetingId, setMeetingId] = useState(null);
    const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      return COLORS[randomIndex];
    };
    const [profileData, setProfileData] = useState(null);
    const getProfile = async () => {
      const data = await Api.getUserData(auth().currentUser.uid)
      setProfileData(data)
    }
    useEffect(() => {
      // socketServices.initializeSocket()
      // receiveMeetingId()
      getProfile()
    }, []);
    // const receiveMeetingId = async()=>{
    //   socketServices.on('getMeetingId',(data) => {
    //     setMeetingId(data.MeetingId)
    //   });
    // }
    // const sendMeetingId = async(data)=>{
    //   socketServices.emit('MeetingId', data);
    // }
    const getMeetingId = async (id) => {
      const meetingId = id == null ? await createMeeting({ token }) : id;
      console.log(meetingId)
      //sau này thêm tên class
      // sendMeetingId({MeetingId:meetingId})
      setMeetingId(meetingId);
    };
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [isJoin,setIsJoin] = useState(false);
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

  }, []);
    const [selectedTab, setSelectedTab] = useState(1);
    const postData=[
        {
            userName:'Nguyễn Quỳnh Hoa',
            postTime:'1PM at 2/24/2024',
            text:'Lịch học tuần này đã thay đổi, các bạn chú ý theo dõi nhé.',
            sign:'topic'
        },
        {
            userName:'Nguyễn Quỳnh Hoa',
            postTime:'1PM at 2/24/2024',
            sign:'meeting'
        }
    ]
    const Record=[
      {
          User:'Nguyễn Quỳnh Hoa',
          Time:'1PM at 2/24/2024',
          Name:'Buổi học ngày 24/2/2024'
      },
      {
        User:'Nguyễn Thị Thy',
        Time:'1PM at 3/24/2024',
        Name:'Buổi học ngày 24/3/2024'
      }
  ]
  const fileandfolder=[
    {
        User:'Nguyễn Quỳnh Hoa',
        Time:'1PM at 2/24/2024',
        Name:'Tài liệu các đề thi 2023',
        sign:'folder'
    },
    {
      User:'Nguyễn Thị Thy',
      Time:'1PM at 3/24/2024',
      Name:'Buổi học ngày 24/3/2024',
      sign:'file'
    }
]
const PopupMenu = () =>{
  const[visible,setvisible] = useState(false);
  const options = [
    {
      title:"Create folder",
      action:async()=>{
        setvisible(false)
      }
    },
    {
      title:'Up file',
      action:()=>{
        setvisible(false)
      },
    },
    {
      title:'No option',
      action:()=>{
        setvisible(false)
      },
    }
  ];
  
  return(
    <View style={{flexDirection:'colunm'}}>
     {visible&&<View style={{backgroundColor:'white'}}>
          {
            options.map((op,i)=>(
              <TouchableOpacity  style={[styles.popupitem]} key={i} onPress={op.action}>
                <Text style={{color:'black', fontSize:15}}>{op.title}</Text>
                {i!=2&&<Text>--------</Text>}
              </TouchableOpacity>
            ))
          }
        </View>
        }
     <TouchableOpacity  onPress={()=>setvisible(!visible)}>
         <Icon name={'plus'} size={20} color={ 'white' }/>
      </TouchableOpacity>
    </View>
  )
}

function AttendeeCard({ person, color }){
  const { webcamStream, webcamOn, micOn, micStream } = useParticipant(person);
  return(
    webcamOn && webcamStream ? (
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={"cover"}
        style={{
          borderRadius:15, backgroundColor:card_color, width:140, height:140, alignSelf:'center', elevation: 5, justifyContent:'center',alignItems:'center', marginHorizontal:5, marginVertical:5
        }}
      />
    ) : 
      <View style={{borderRadius:15, backgroundColor:card_color, width:140, height:140, alignSelf:'center', elevation: 5, justifyContent:'center',alignItems:'center', marginHorizontal:5, marginVertical:5}}>
        <View style={[styles.UserImage,{backgroundColor:color, alignItems:'center', justifyContent:'center'}]} >
                  <Text style={{textAlign:'center'}}>NL</Text>
        </View>
        <Text style={styles.UsernameText}>{person}</Text>
        <TouchableOpacity>
        <Icon name="microphone" color="black" size={20} />
      </TouchableOpacity>
        
    </View>
  )
}
function MeetingRoomtemp(){
  const { leave, toggleWebcam, toggleMic, participants } = useMeeting({onParticipantLeft});
  useEffect(() => {
    JoinMeeting();
  }, []);
  const JoinMeeting=async ()=>{
    const participantsArrId = [...participants.keys()];
    const documentRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');
    await documentRef.update({
      Participants:firestore.FieldValue.arrayUnion({id:participantsArrId[participantsArrId.length-1], name:profileData.name})
    }).then(()=>{
      console.log('haha')
    });
 }
 //Event to determine some other participant has joined
//  async function onParticipantJoined(participant) {
//   console.log(" onParticipantJoined", participant);

//   const documentRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');
//   await documentRef.update({
//     Participants:firestore.FieldValue.arrayUnion({id:participant.id,name:profileData?.name})
//   }).then(()=>{

//   });

// }
  async function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant.id);
    const documentRef = firestore().collection('Class').doc('0VA2PZf3PVGlbWlF9EiV');
    await documentRef.update({
      Participants:firestore.FieldValue.arrayRemove({id:participant.id,name:profileData.name})
    }).then(()=>{
      // navigation.push('MeetingRoom',{Cam:isCamMuted,Mic:isMicMuted,meetingId:meetingId,userId:participantId, toggleMic:()=>toggleMic(),toggleWebcam:()=>handleCamToggle(),
      //   leave:()=>leave()})
      setIsJoin(false)
    });
  }
  const participantsArrId = [...participants.keys()];
  const [Share,SetShare] = useState(false)
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
    <TouchableOpacity  onPress={() => {leave(); setMeetingId(null); setIsJoin(false)}}>
      <Icon name="phone-slash" color="#8B0016" size={20} />
    </TouchableOpacity>
  </View>
  
  </View>
  );
}
const [isMicMuted, setIsMicMuted] = useState(false); 
const [isCamMuted, setIsCamMuted] = useState(false); 
const [isCreate, setIsCreate] = useState(false)
function MeetingView() {
  // Get `participants` from useMeeting Hook
  const {  leave, toggleWebcam, enableWebcam, disableWebcam, toggleMic, participants } = useMeeting({});
  const { localWebcamOn } = useMeeting();
   //Event to determine if the meeting has been left
   function onMeetingLeft() {
    console.log("onMeetingLeft");
    setIsJoin(false)
    setMeetingId(null)
  }

   const { join } = useMeeting({});

  //Getting the leave and end method from hook and assigning event callbacks
  const { end } = useMeeting({
    onMeetingLeft,
  });
 
  //  const participantsArrId = [...participants.keys()];
  const handleMicToggle = () => {
    toggleMic(); 
    setIsMicMuted(!isMicMuted);
  };

  const handleCamToggle = () => {
    console.log('kkkkk')
    toggleWebcam()
    console.log('jk'+localWebcamOn)
    setIsCamMuted(!isCamMuted); 
  };
 
  // const sendParticipants = async(a)=>{
  //   console.log('hhhh'+a)
  //   socketServices.emit('Participants', a);
  // }

  return (

    <View style={{borderRadius:15, backgroundColor:PRIMARY_COLOR, width:screenWidth*0.9, height:130, alignSelf:'center', elevation: 5, marginTop:10, justifyContent:'space-evenly', alignItems:'center'}}>
          <Text style={{fontSize:20, color:'white'}}>Meeting start</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:10, width:120}}>
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
          <TouchableOpacity onPress={()=>{end()}}>
            <Text>End</Text>
          </TouchableOpacity>
          </View>
    
       <TouchableOpacity
       style={{backgroundColor:'white', width:50, borderRadius:20 ,height:40, justifyContent:'center', alignItems:'center'}}
        onPress={() => {
          join();
          setIsJoin(true);
        }}>
          <Text>Join</Text>
        </TouchableOpacity>
        
     
        </View>
  );
}


  
    return  meetingId==null?(
        <View style={styles.container}>
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
            Lớp luyện SW Toeic 150+
          </Text>
          <View style={{flex:1}}/>
          <TouchableOpacity style={{marginRight: '5%'}} 
           onPress={() => {
           setIsCreate(true);
            getMeetingId();
          }}
          // onPress={()=>navigation.push('MeetingRoom')}
          >
            <Icon name={'video'} color="white" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{width: '90%', height: 40, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', alignSelf:'center'}}>
        <TouchableOpacity style={[styles.historyButton]}
        onPress={() => {setSelectedTab(1)}}>
          <Text style={[AppStyle.button.buttonText, {color: selectedTab == 1 ? PRIMARY_COLOR : '#333'}]}>Posts</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 30, backgroundColor: 'black', marginHorizontal: 10}} />
        <TouchableOpacity style={styles.historyButton}
        onPress={() => {setSelectedTab(2)}}>
          <Text style={[AppStyle.button.buttonText, {color: selectedTab == 2 ? PRIMARY_COLOR : 'black'}]}>Files</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 30, backgroundColor: 'black', marginHorizontal: 10}} />
        <TouchableOpacity style={styles.historyButton}
        onPress={() => {setSelectedTab(3)}}>
          <Text style={[AppStyle.button.buttonText, {color: selectedTab == 3 ? PRIMARY_COLOR : 'black'}]}>Recordings</Text>
        </TouchableOpacity>
      </View>
      {selectedTab==1&&<View>
        {
       <FlatList
        data={postData}
        renderItem={({item, index}) => (
          <PostinTeam
            key={index}
            item = {item}
          />
        )}
       />}
       
      </View>
      
       }
       {selectedTab==2&&
       <FlatList
       data={fileandfolder}
       renderItem={({item, index}) => {
        if(item.sign=='file'){
          return(
            <FileCard record={item}/>
          )}
        else if(item.sign=='folder'){
        return(
          <FolderCard record={item}/>
        )
        }
       }}
      />}
       {selectedTab==3&&
       <FlatList
       data={Record}
       renderItem={({item, index}) => (
         <RecordingCard
          record={item}
         />
       )}
      />}
      <TouchableOpacity style={{position:'absolute',marginLeft: screenWidth-80, marginTop:screenHeight-120,borderRadius:25, width:50, height:50, backgroundColor:PRIMARY_COLOR, justifyContent:'center', alignItems:'center'}}
      onPress={()=>navigation.push('NewPost')}>
      {selectedTab==1&&<Icon name={'pen'} color="white" size={20} />}
      {selectedTab==2&& <PopupMenu/>}
      {selectedTab==3&& <Ionicons name={'arrow-up-outline'} size={20} color={ 'white' } />}
      </TouchableOpacity>
      </View>):(
      <MeetingProvider
      config={{
        meetingId,
        micEnabled: isMicMuted,
        webcamEnabled: isCamMuted,
        name: "Test User",
      }}
      token={token}
    >
     {isJoin?<MeetingRoomtemp/>:
      <View style={styles.container}>
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
          Lớp luyện SW Toeic 150+
        </Text>
        <View style={{flex:1}}/>
        <TouchableOpacity style={{marginRight: '5%'}} 
         onPress={() => {
          getMeetingId();
        }}
        // onPress={()=>navigation.push('MeetingRoom')}
        >
          <Icon name={'video'} color="white" size={20} />
        </TouchableOpacity>
      </View>
      <View style={{width: '90%', height: 40, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', alignSelf:'center'}}>
      <TouchableOpacity style={[styles.historyButton]}
      onPress={() => {setSelectedTab(1)}}>
        <Text style={[AppStyle.button.buttonText, {color: selectedTab == 1 ? PRIMARY_COLOR : '#333'}]}>Posts</Text>
      </TouchableOpacity>
      <View style={{width: 1, height: 30, backgroundColor: 'black', marginHorizontal: 10}} />
      <TouchableOpacity style={styles.historyButton}
      onPress={() => {setSelectedTab(2)}}>
        <Text style={[AppStyle.button.buttonText, {color: selectedTab == 2 ? PRIMARY_COLOR : 'black'}]}>Files</Text>
      </TouchableOpacity>
      <View style={{width: 1, height: 30, backgroundColor: 'black', marginHorizontal: 10}} />
      <TouchableOpacity style={styles.historyButton}
      onPress={() => {setSelectedTab(3)}}>
        <Text style={[AppStyle.button.buttonText, {color: selectedTab == 3 ? PRIMARY_COLOR : 'black'}]}>Recordings</Text>
      </TouchableOpacity>
    </View>
    {selectedTab==1&&<View>
      {
     <FlatList
      data={postData}
      renderItem={({item, index}) => (
        <PostinTeam
          key={index}
          item = {item}
        />
      )}
     />}
     <MeetingView/>
    </View>
    
     }
     {selectedTab==2&&
     <FlatList
     data={fileandfolder}
     renderItem={({item, index}) => {
      if(item.sign=='file'){
        return(
          <FileCard record={item}/>
        )}
      else if(item.sign=='folder'){
      return(
        <FolderCard record={item}/>
      )
      }
     }}
    />}
     {selectedTab==3&&
     <FlatList
     data={Record}
     renderItem={({item, index}) => (
       <RecordingCard
        record={item}
       />
     )}
    />}
    <TouchableOpacity style={{position:'absolute',marginLeft: screenWidth-80, marginTop:screenHeight-120,borderRadius:25, width:50, height:50, backgroundColor:PRIMARY_COLOR, justifyContent:'center', alignItems:'center'}}
    onPress={()=>navigation.push('NewPost')}>
    {selectedTab==1&&<Icon name={'pen'} color="white" size={20} />}
    {selectedTab==2&& <PopupMenu/>}
    {selectedTab==3&& <Ionicons name={'arrow-up-outline'} size={20} color={ 'white' } />}
    </TouchableOpacity>
    </View>
     }
     </MeetingProvider>
     )  
      
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    historyButton:{
        height:30,
        width: '30%',
        borderBottomColor:'#000',
        borderBottomWidth:1
      },
      MenuButton:{
        color: 'black', 
        fontSize: 30, 
        padding: 10,
        alignSelf:"center",
      },
      popup:{
        borderRadius:8,
        borderColor:'#333',
        borderWidth:1,
        backgroundColor:'#fff',
        width:80,
        height:85,
        textAlign:'center',
      },
      popupitem:
      {
        borderBottomColor:'black', 
        alignItems:'center', 
        width:80, 
        alignSelf:'center',
  
      },
        container2: {
          backgroundColor: '#363636',
          flex:1
          
        },
        flatListContent: {
            paddingHorizontal: 10,
            paddingVertical: 10,
          },
          separator: {
            // height: 10, // khoảng cách giữa các mục
            width:10
          },
          //card
          headerContainer:{
            paddingVertical: 5,
    
        },
        UserInfoContainer:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 5,      
        },
        UserImage:{
            width: 46,
            height: 46,
            borderRadius: 23,
    
        },
        UserInfoTextContainer:{
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 5,
        },
        UsernameText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#444'
        },
        PostTime:{
            fontSize: 13,
            color:"white",
            color: '#888',
        },
        MenuButton:{
            color: 'black', 
            fontSize: 30, 
            padding: 10,
            alignSelf:"center",
          },
          popup:{
            borderRadius:8,
            borderColor:'#333',
            borderWidth:1,
            backgroundColor:'#fff',
            width:62,
            height:65,
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
  
  });
  export default TeamRoom;
  