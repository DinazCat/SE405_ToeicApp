import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import { useNavigation } from '@react-navigation/native';
import TextCard from './TextCard';
const {width, height} = Dimensions.get('window');
const PostinTeam = ({item}) => {
  const navigation = useNavigation();
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [count, setCount] = useState(item.likes);
  const [count1, setCount1] = useState(item.replies.length);
useEffect(() => {
  const updateScreenWidth = () => {
    setScreenWidth(Dimensions.get('window').width);
  };

  Dimensions.addEventListener('change', updateScreenWidth);

  // return () => {
  //   Dimensions.removeEventListener('change', updateScreenWidth);
  // };
}, []);
const PopupMenu = () =>{
  const[visible,setvisible] = useState(false);
  const options = [
    {
      title:"Delete",
      action:async()=>{
        setvisible(false)
      }
    },
    {
      title:'Edit',
      action:()=>{
        setvisible(false)
      },
    }
  ];
  
  return(
    <View style={{flexDirection:'colunm'}}>
        <TouchableOpacity style={styles.MenuButton} onPress={()=>setvisible(!visible)}>
          <Icon name={'ellipsis-h'}  color={'#555'}/>
      </TouchableOpacity>
     {visible&&<View style = {styles.popup}>
          {
            options.map((op,i)=>(
              <TouchableOpacity  style={[styles.popupitem]} key={i} onPress={op.action}>
                <Text>{op.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        }
    </View>
  )
}
const getLikes = async()=>{
  const documentRef = firestore().collection('PostInTeam').doc(item.id);
  documentRef.onSnapshot((documentSnapshot) => {
    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data();

      setCount(documentData.likes)
      setCount1(documentData.replies.length)
    } else {
      console.log('Document does not exist.');
    }
  });

}
useEffect(() => {
 getLikes()
}, []);
  return (  
     <View style={{borderRadius:15, backgroundColor:card_color, width:screenWidth*0.9, alignSelf:'center', elevation: 5, marginTop:10}}>
      {/* <FlatList
      data={classData}
      renderItem={({item, index}) => (
        <TextCard
          key={index}
          postData = {item}
        />
      )}
     /> */}
     <View style={{flexDirection:'row'}}>
     <View style={{width:'90%'}}>
     {item.type=='Post'?<TextCard
          postData = {item}
        />:
        <View style={styles.headerContainer}>
      <View style={styles.UserInfoContainer}>
        <TouchableOpacity style={{borderRadius:25, width:40, height:40, backgroundColor:'gray', justifyContent:'center', alignItems:'center'}}>
        <Icon name={'video'} color="black" size={20} />
        </TouchableOpacity>
        <View style={styles.UserInfoTextContainer}>
          <TouchableOpacity>
            <Text style={[styles.UsernameText,{width:screenWidth*0.7}]}>The meeting was started by {item?.userName}</Text>
          </TouchableOpacity>
          <Text style={styles.PostTime}>{item?.postTime}</Text>
          {/* <TouchableOpacity>
          <Text style={{fontSize:15, color:'blue', width:screenWidth*0.7}}>
              Show meeting
          </Text>
          </TouchableOpacity> */}
         
        </View>
      </View>
    </View>
    }
    </View>
    <View style={{width:'10%'}}>
    <PopupMenu/>
    </View>
     </View>
      <View style={{height:0.5,backgroundColor:'gray', marginTop:5, marginBottom:5}}/>
      <TouchableOpacity style={{flexDirection:'row', marginLeft:5, marginTop:5}}  onPress={() => {
          navigation.push('ReplyScreen',{postId:item.id, postName:item.userName, sign:'Post'})
       }}>
      <Icon name={'reply'} color="gray" size={15} />
      <Text style={{marginLeft:5, fontSize:15, color:'gray'}}>Reply</Text>
      <TouchableOpacity onPress={async ()=>{
        let i = count + 1
        setCount(i)
        await firestore().collection('PostInTeam').doc(item.id).update({
          likes: i
        });
      }}>
        <View style={styles.Interaction}>
        <Ionicons name={'heart'} size={20} color={ 'gray' } />
          <Text style={styles.InteractionText}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{flex:1}}/>
      <Text style={{marginRight:5, fontSize:15, color:'gray'}}>{count1 +" Answer"}</Text>
      </TouchableOpacity>
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
Interaction:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems:'center',
  paddingVertical: 2,
  paddingHorizontal: 5,
  marginLeft: 5,
},
InteractionText:{
  fontSize: 12,
  fontWeight: 'bold',
  marginLeft: 5,
  color: '#555'
},
MenuButton:{
color: 'black', 
fontSize: 30, 
padding: 10,
},
popup:{
borderRadius:8,
borderColor:'#333',
borderWidth:1,
backgroundColor:'white',
width:50,
height:65,
textAlign:'center',
position:'relative'
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
export default PostinTeam ;
