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
  const General = ({calendar, classId, start, finish}) => {
    const navigation = useNavigation();
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [isDrop, setIsDop] = useState(false)
    const [content, setContent] = useState()
    const RealTimePost = ()=>{
      const collectionRef = firestore().collection("PostInTeam");
      collectionRef.onSnapshot({ 
          includeQueryMetadataChanges: false,
          includeDocumentMetadataChanges: false
        }, (querySnapshot) => {
          let list = []
          querySnapshot.forEach((doc) => {
            const newDocumentData = doc.data();
             if(newDocumentData.classId==classId&&newDocumentData.sign!="Meeting"){
                list.push({...newDocumentData,type:'Post'})
             }         
          });
          setContent(list)
        });
  
    }
    useEffect(() => {
      RealTimePost();
    }, []);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

  }, []);

    return (  
        <View style={{width:screenWidth*0.95, alignSelf:'center', marginTop:10,}}>
            <View style={{ flexDirection:'row', height:30, alignItems:'center'}}>
            
            <TouchableOpacity
            style={{marginLeft: 10}}
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
            <Text style={{color:'black', fontWeight:'600', fontSize:20, marginLeft:10}}>General</Text>
      </View>
      {isDrop&&
      <View style={{width:'96%', alignSelf:'center'}}>
        <Text style={{fontWeight:600, color:PRIMARY_COLOR, fontSize:16, marginTop:5}}>Schedule: {start+'-'+finish}</Text>
        <FlatList
               data={calendar}
               style={{marginTop:5}}
               renderItem={({item, index}) => {
                        return (
                           <View style={{height:50, alignSelf:'center', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', backgroundColor:card_color, width:350}}>
                            <Text style={{color:'black', fontWeight:500}}>{item.Date}</Text>
                            <Text style={{color:'black', fontWeight:500}}>{item.Time_start+ ' -> '+item.Time_finish}</Text>
                           </View>
                        )
               }}
             />
       <Text style={{fontWeight:600, color:PRIMARY_COLOR, fontSize:16,marginTop:5}}>Notifications:</Text>
       <FlatList
               data={content}
               renderItem={({item, index}) => {
                        return (
                            <PostinTeam item={item} 
                            />
                        )
               }}
             />
      </View>
     }
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
  export default General ;
  