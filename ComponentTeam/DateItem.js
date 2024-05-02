import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextCard from './TextCard';
import PostinTeam from './PostinTeam';
import RecordingCard from './RecordingCard';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
  const DateItem = ({item}) => {
    const navigation = useNavigation();
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [isDrop, setIsDop] = useState(false)
    const [content, setContent] = useState(item.Content)
    const RealTimePost = ()=>{
      const collectionRef = firestore().collection("PostInTeam");
      collectionRef.onSnapshot({ 
          includeQueryMetadataChanges: false,
          includeDocumentMetadataChanges: false
        }, (querySnapshot) => {
          let list = content
          list= list.filter(item => item.type !== "Post");
          querySnapshot.forEach((doc) => {
            const newDocumentData = doc.data();
              if(moment(newDocumentData.Date,"DD/MM/YYYY").isSame(moment(item.Date,"DD/MM/YYYY"))){
                list.push({...newDocumentData,type:'Post'})
              }
            
            
          });
          setContent(list)
        });
  
    }
    useEffect(() => {
      RealTimePost();
    }, []);
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
      const temp = [
        {
            userName: 'Nguyễn Quỳnh Hoa',
            postTime: '1PM at 2/24/2024',
            text: 'Lịch học tuần này đã thay đổi, các bạn chú ý theo dõi nhé.',
            sign: 'topic',
          },
      ]
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);

    return (  
        <View style={{width:screenWidth*0.9, alignSelf:'center', marginTop:10,}}>
            <View style={{ flexDirection:'row', height:30, alignItems:'center'}}>
            
            <TouchableOpacity
            // style={{marginLeft: 350, padding: 5}}
            onPress={() => {setIsDop(!isDrop)}}>
            {!isDrop&&<Icon
              name={'chevron-right'}
              style={{color: 'black', fontSize: 20, marginRight: 10}}
            />}
            {
                isDrop&&<Icon
                name={'chevron-down'}
                style={{color: 'black', fontSize: 20, marginRight: 10}}
              />
            }
                      </TouchableOpacity>
            <Text style={{color:'black', fontWeight:'600', fontSize:20, marginLeft:10}}>{item.Date}</Text>
      </View>
      {isDrop&&<FlatList
               data={content}
               renderItem={({item, index}) => {
                if (item.type == 'Record') {
                    return (
                        <RecordingCard record={item} 
                        show = {()=>{navigation.push("ShowRecord",{url:item.File, name: item.Name})}}
                        />
                    )
                    }
                    else if (item.type == 'Post') {
                        return (
                            <PostinTeam item={item} 
                            />
                        )
                        }
               }}
             />}
        </View>
        
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
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
        marginLeft:5
      },
     
      Interaction:{
        flexDirection: 'row',
    },
    InteractionText:{
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft:1,
        color: '#555'
    },
  
  
  });
  export default DateItem ;
  