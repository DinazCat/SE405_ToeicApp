import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput,Alert,FlatList} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Keyboard } from 'react-native';
import ReplyCard from '../ComponentTeam/ReplyCard';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppStyle from '../theme'
import AgendaItem from '../ComponentTeam/AgendaItem';
import { PRIMARY_COLOR } from '../assets/colors/color';

const CreateAgenda = ({navigation}) => {
    const [isopen1, setopen1] = useState(false);
    const [isopen2, setopen2] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState('selectedTime');
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
  
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleConfirm = (time) => {
        const date = new Date(time);
        const hour = date.getHours(); // Lấy giá trị giờ (trong định dạng 24 giờ)
        const minute = date.getMinutes(); // Lấy giá trị phút
      hideTimePicker();
      setSelectedTime(hour+':'+minute);
    };
  return (
    <ScrollView>
  <View style={styles.container}> 
      <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Ionicons 
                  name="arrow-back"
                  size={28}
                  backgroundColor='transparent'
                  color={'#111'}                          
                  />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: '#111'}]}>Create agenda</Text>       
        </View>
        <Text style={styles.text}>Choose class: </Text>
        <DropDownPicker
            items={[
              {label: 'Lớp luyện SW', value: 'Lớp luyện SW'},
              {label: 'Lớp luyện LR', value: 'Lớp luyện LR'},
            ]}
            open={isopen1}
            setOpen={() => setopen1(!isopen1)}
            value={''}
            containerStyle={{
              height: 50,
              width:'95%',
              marginLeft: 10,
              alignSelf: 'center',
              marginVertical:7
            }}
            style={{backgroundColor: '#fafafa', width:'90%'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            // setValue={item => setnumber(item)}
            maxHeight={100}
            zIndex={2}
          />
        <Text style={styles.text}>Choose day: </Text>
        <DropDownPicker
            items={[
              {label: 'Monday', value: 'Monday'},
              {label: 'Tuesday', value: 'Tuesday'},
              {label: 'Wednesday', value: 'Wednesday'},
              {label: 'Thursday', value: 'Thursday'},
              {label: 'Friday', value: 'Friday'},
              {label: 'Saturday', value: 'Saturday'},
              {label: 'Sunday', value: 'Sunday'},
            ]}
            open={isopen2}
            setOpen={() => setopen2(!isopen2)}
            value={''}
            containerStyle={{
              height: 50,
              width:'95%',
              marginLeft: 10,
              alignSelf: 'center',
              marginVertical:7
            }}
            style={{backgroundColor: '#fafafa',width:'90%'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            // setValue={item => setnumber(item)}
            maxHeight={100}
            zIndex={1}
          />
           <View style={{marginHorizontal:15}}/>
        <Text style={styles.text}>Choose time: </Text>
        <View style={{flexDirection:'row', width:'95%', alignSelf:'center', justifyContent:'space-evenly', marginVertical:7}}>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>From</Text>
            <TouchableOpacity onPress={showTimePicker} style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'black', marginLeft:7}}>{selectedTime}</Text></TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>To</Text>
            <TouchableOpacity onPress={showTimePicker} style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'black',marginLeft:7}}>{selectedTime}</Text></TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
        </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15}}>
        <TouchableOpacity
                style={[
                  AppStyle.button.button1,{marginRight:10}
                ]}
               >
                <Text style={AppStyle.button.button1_Text}>Add</Text>
              </TouchableOpacity>
        </View>
    
        <View style={{marginTop:40}}>
            <Text style={styles.text2}>Monday</Text>
            <FlatList style={{width:'100%', alignSelf:'center'}}
       data={schedule[0]}
       renderItem={({item, index}) => (
         <AgendaItem
          item={item}
         />
       )}
      />
            <Text style={styles.text2}>Tuesday</Text>
            <Text style={styles.text2}>Wednesday</Text>
            <Text style={styles.text2}>Thursday</Text>
            <Text style={styles.text2}>Friday</Text>
            <Text style={styles.text2}>Saturday</Text>
            <Text style={styles.text2}>Sunday</Text>
        </View>
    </View>
    </ScrollView>
  )
}

export default CreateAgenda

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#DFDCDC',
    borderBottomWidth: 1,
    backgroundColor: '#9ACC1C'
  },
  headerText:{
    fontSize: 20,
    marginLeft: 20,
    color: '#333'
  },
  text:{
    color:'black', fontSize:18, marginLeft:10
  },
  text2:{
    color:PRIMARY_COLOR, fontSize:18, marginLeft:10, fontWeight:'500'
  },
  historyButton:{
    width:'43%',
    height:30,
    borderBottomColor:'#0000FF',
    borderBottomWidth:1
  },

})