import { StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native'
import React, { useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Api from '../api/Api'
const Notification = ({item,action,Remove}) =>
{
    const [profileData, setProfileData] = useState(null);
    const getProfile = async () => {
        const data = await Api.getUserData(item.guestId)
        setProfileData(data)
    }
    const updateNoti = async()=>{
        await Api.updateNotification(item.Id,{Read:'yes'})
    }
    useEffect(() => {
        getProfile()
        updateNoti()
      }, []);
    
    return(
        <TouchableOpacity style={[styles.container]} onPress={action}>
              <Image style={styles.UserImage} source={{ uri: profileData?.userImg
                ? profileData.userImg
                  ? profileData.userImg
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',}}/>
              <View style={{flexDirection:'column', width:300}}>
                <Text multiline={true} style={[styles.TextStyle]}>{profileData?.name+" "+item.text}</Text>
                <Text style={[styles.TextStyle]}>{item.time}</Text>
              </View>
            <TouchableOpacity style={styles.DeleteButton} onPress={Remove}>
                <Icon name={'times-circle'}  />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default Notification
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height: 70,
        width:'100%',
        backgroundColor:'#F5F5F5',
        alignSelf:'center',
        paddingHorizontal: 5,
        alignItems: 'center',
        borderColor: '#DDD',
        borderBottomWidth: 1
    },
    UserImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight:10,
        marginTop:2,
    },
    TextStyle:{
        color:'#444',
    },
    DeleteButton:{
        color: 'black', 
        fontSize: 30, 
        padding: 10,
      },
})