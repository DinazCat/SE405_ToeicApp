import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {Keyboard} from 'react-native';
import ReplyCard from '../ComponentTeam/ReplyCard';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppStyle from '../theme';
import AgendaItem from '../ComponentTeam/AgendaItem';
import {PRIMARY_COLOR} from '../assets/colors/color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';

const CreateAgenda = ({navigation}) => {
  const [isopen1, setopen1] = useState(false);
  const [isopen2, setopen2] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classItem, setClassItem] = useState();
  const [classID, setClassID] = useState();
  const [className, setClassName] = useState();
  const [DateItem, setDateItem] = useState();
  const [DateItemValue, setDateItemValue] = useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('selectedTime');
  const [selectedTimeTo, setSelectedTimeTo] = useState('selectedTime');
  const [schedule_, setSchedule_] = useState([[], [], [], [], [], [], []]);
  const getClassOfTeacher = async () => {
    try {
      const docId = auth().currentUser.uid;
      const documentSnapshot = await firestore()
        .collection('Users')
        .doc(docId)
        .get();

      if (documentSnapshot.exists) {
        let list = [];
        for (let i = 0; i < documentSnapshot.data().Classes.length; i++) {
          const classtemp = await firestore()
            .collection('Class')
            .doc(documentSnapshot.data().Classes[i])
            .get();
          list.push({
            label: classtemp.data().ClassName,
            value: documentSnapshot.data().Classes[i],
          });
        }
        setClasses(list);
      } else {
        // Tài liệu không tồn tại
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };
  const getAgendaOfTeacher = async()=>{
    const data = await Api.getAgendaOfUser(auth().currentUser.uid)
    setSchedule_(data)
  }
  useEffect(() => {
    getAgendaOfTeacher();
    getClassOfTeacher();
  }, []);

  const addToSchedule = () => {
    switch (DateItemValue) {
      case 'Sunday':
        let a = schedule_[6];
        a.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [...prevList, a]);
        break;
      case 'Monday':
        let b = schedule_[0];
        b.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [b, ...prevList.slice(1)]);
        break;
      case 'Tuesday': // Thứ ba
        let c = schedule_[1];
        c.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [
          ...prevList.slice(0, 1),
          c,
          ...prevList.slice(2),
        ]);
        break;
      case 'Wednesday': // Thứ tư
        let d = schedule_[2];
        d.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [
          ...prevList.slice(0, 2),
          d,
          ...prevList.slice(3),
        ]);
        break;
      case 'Thursday': // Thứ năm
        let e = schedule_[3];
        e.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [
          ...prevList.slice(0, 3),
          e,
          ...prevList.slice(4),
        ]);
        break;
      case 'Friday': // Thứ sáu
        let f = schedule_[4];
        f.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [
          ...prevList.slice(0, 4),
          f,
          ...prevList.slice(5),
        ]);
        break;
      case 'Saturday': // Thứ bảy
        let g = schedule_[5];
        g.push({
          Name: className,
          Time: selectedTimeFrom + '-' + selectedTimeTo,
        });
        setSchedule_(prevList => [...prevList.slice(0, 5), g]);
        break;
      default:
        break;
    }
  };
  const addSchedule = async () => {
    const documentRef = firestore().collection('Class').doc(classID);
    await documentRef
      .update({
        Schedule: firestore.FieldValue.arrayUnion({
          Date: DateItemValue,
          Time_start: selectedTimeFrom,
          Time_finish: selectedTimeTo,
        }),
      })
      .then(() => {
        addToSchedule();
      });
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmFrom = time => {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();
    hideTimePicker();
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    const a = `${formattedHour}:${formattedMinute}`;
    setSelectedTimeFrom(a);
  };
  const handleConfirmTo = time => {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();
    hideTimePicker();
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    const a = `${formattedHour}:${formattedMinute}`;
    setSelectedTimeTo(a);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={28}
              backgroundColor="transparent"
              color={'#111'}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: '#111'}]}>
            Create agenda
          </Text>
        </View>
        <Text style={styles.text}>Choose class: </Text>
        <DropDownPicker
          items={classes}
          open={isopen1}
          setOpen={() => setopen1(!isopen1)}
          value={classItem}
          containerStyle={{
            height: 50,
            width: '95%',
            marginLeft: 10,
            alignSelf: 'center',
            marginVertical: 7,
          }}
          style={{backgroundColor: '#fafafa', width: '95%'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeValue={value => {
            console.log(value);
            setClassID(value);
          }}
          onSelectItem={item => setClassName(item.label)}
          dropDownStyle={{backgroundColor: '#fafafa', width: '95%'}}
          setValue={item => {
            setClassItem(item);
          }}
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
          value={DateItem}
          containerStyle={{
            height: 50,
            width: '95%',
            marginLeft: 10,
            alignSelf: 'center',
            marginVertical: 7,
          }}
          style={{backgroundColor: '#fafafa', width: '95%'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeValue={value => {
            setDateItemValue(value);
          }}
          dropDownStyle={{backgroundColor: '#fafafa', width: '95%'}}
          setValue={item => setDateItem(item)}
          maxHeight={400}
          zIndex={1}
        />
        <View style={{marginHorizontal: 15}} />
        <Text style={styles.text}>Choose time: </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            marginVertical: 7,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>From</Text>
            <TouchableOpacity
              onPress={showTimePicker}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', marginLeft: 7}}>
                {selectedTimeFrom}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmFrom}
              onCancel={hideTimePicker}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>To</Text>
            <TouchableOpacity
              onPress={showTimePicker}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', marginLeft: 7}}>
                {selectedTimeTo}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTo}
              onCancel={hideTimePicker}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 15,
          }}>
          <TouchableOpacity
            style={[AppStyle.button.button1, {marginRight: 10}]}
            onPress={() => addSchedule()}>
            <Text style={AppStyle.button.button1_Text}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 40}}>
          <Text style={styles.text2}>Monday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[0]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Tuesday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[1]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Wednesday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[2]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Thursday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[3]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Friday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[4]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Saturday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[5]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
          <Text style={styles.text2}>Sunday</Text>
          <FlatList
            style={{width: '100%', alignSelf: 'center'}}
            data={schedule_[6]}
            renderItem={({item, index}) => <AgendaItem item={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAgenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#DFDCDC',
    borderBottomWidth: 1,
    backgroundColor: '#9ACC1C',
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    color: '#333',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  text2: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  historyButton: {
    width: '43%',
    height: 30,
    borderBottomColor: '#0000FF',
    borderBottomWidth: 1,
  },
});
