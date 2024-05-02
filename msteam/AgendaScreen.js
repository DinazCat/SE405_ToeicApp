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
import AppStyle from '../theme'
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';


const {width, height} = Dimensions.get('window');
const timeToString=(time)=> {
const date = new Date(time);
return date.toISOString().split('T')[0];
}
const AgendaScreen = ({navigation}) => {
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
const getDayOfWeek=(dateString)=>{
  // Chuyển đổi chuỗi ngày thành đối tượng Date bằng moment
  const date = moment(dateString, 'YYYY-MM-DD').toDate();
  // Lấy số thứ tự của ngày trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
  const dayOfWeek = moment(date).day();
  return dayOfWeek;
}
const [items, setItems] = useState({});
const [schedule_, setSchedule_] = useState([[], [], [], [], [], [], []]);
const [isLoad, setIsLoad] = useState(false)
const schedule = [[
    {
      Name:'Lớp luyện SW',
      Time: '7h-9h'
    },
    {
      Name:'Lớp luyện SW 2',
      Time: '9h-11h'
    }
  ]
,
 [
    {
      Name:'Lớp luyện SW',
      Time: '7h-9h'
    },
    {
      Name:'Lớp luyện SW 2',
      Time: '9h-11h'
    }
  ],
  [{
    Name:'Lớp luyện SW',
    Time: '7h-9h'
  }],
  [{
    Name:'Lớp luyện SW',
    Time: '7h-9h'
  }],
  [{
    Name:'Lớp luyện SW',
    Time: '7h-9h'
  }],[{
    Name:'Lớp luyện SW',
    Time: '7h-9h'
  }],[{
    Name:'Lớp luyện SW',
    Time: '7h-9h'
  }]

]
const setVisibleDays = ()=>{
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const ngayA = moment(currentYear+"-"+currentMonth+"-"+currentDay, "YYYY-MM-DD");
const ngayTruoc = ngayA.clone().subtract(3, 'days').format("YYYY-MM-DD");
const ngaySau = ngayA.clone().add(4, 'days').format("YYYY-MM-DD");
return [ngayTruoc, ngaySau]
}
const getAgendaOfUser = async()=>{
const data = await Api.getAgendaOfUser(auth().currentUser.uid)
setSchedule_(data)
setIsLoad(true)
}
useEffect(() => {
getAgendaOfUser();
}, []);
const  loadItems = (day) => {

  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
        let i = 0;
        switch (getDayOfWeek(strTime)) {
          case 1: i = 0; break;
       
          case 2: i = 1;break;
            
          case 3: i = 2;break;
          case 4: i = 3;break;
          case 5: i = 4;break;
          case 6: i = 5;break;
          case 0: i = 6;break;
            
        }
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < schedule_[i].length; j++) {
          items[strTime].push({
            name: schedule_[i][j].Name ,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime,
            time:schedule_[i][j].Time
          });
        }
      }
    }
    
    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems)
  }, 1000);
};
const renderItem = (item)=>{
  return (
    <TouchableOpacity style={{marginRight:10, marginTop:10, height:80, backgroundColor:'white',  justifyContent:'center'}} >
    <Text style={{color:'black', fontSize:18, fontWeight:'500', marginHorizontal:7, marginVertical:3}}>{item.name}</Text>
    <Text style={{color:'black', fontSize:15, marginHorizontal:7}}>{item.time}</Text>
    </TouchableOpacity>

  )
}
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
          }}>
          Agenda
        </Text>
      </View>
     {isLoad&&<Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2024-03-05'}
      minDate={setVisibleDays()[0]}
      maxDate={setVisibleDays()[1]}
      renderItem={renderItem}
      />}
      <TouchableOpacity style={{position:'absolute',marginLeft: screenWidth-80, marginTop:screenHeight-120,borderRadius:25, width:50, height:50, backgroundColor:PRIMARY_COLOR, justifyContent:'center', alignItems:'center'}}
      onPress={()=>navigation.push('CreateAgenda')}>
      <Icon name={'plus'} size={20} color={ 'white' }/>
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  Input: {
      fontSize: 16, 
      marginLeft: 3,
      borderColor: '#DDD',
      borderRadius: 5,
      borderWidth: 1,
      margin: 5,
      padding: 5,
      textAlignVertical: 'top',
      alignSelf:'center'
    },
});
export default AgendaScreen;
