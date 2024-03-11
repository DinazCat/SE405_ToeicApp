import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList
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
const {width, height} = Dimensions.get('window');
  const TeamRoom = ({navigation}) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
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
    return (
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
          <TouchableOpacity style={{marginRight: '5%'}} onPress={()=>navigation.push('MeetingRoom')}>
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
      {selectedTab==1&&<FlatList
        data={postData}
        renderItem={({item, index}) => (
          <PostinTeam
            key={index}
            item = {item}
          />
        )}
       />}
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
    );
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
  
      }

  
  });
  export default TeamRoom;
  