import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect, useContext} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {PRIMARY_COLOR} from '../assets/colors/color';
import FileItem from '../ComponentTeam/FileItem';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../api/Api';
import uploadfile from '../api/uploadfile';
import axios from 'axios';
import eventEmitter from '../utils/EventEmitter';

const CreateAsignment2 = ({navigation, route}) => {
  const [title, setTitle] = useState();
  const [instruction, setInstruction] = useState();
  const [point, setPoint] = useState();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [dueDate, setDueDate] = useState();
  const [dueTime, setDueTime] = useState();
  const [date1, setDate1] = useState(new Date());
  const [time1, setTime1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time2, setTime2] = useState(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showTimePicker1, setShowTimePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [showTimePicker2, setShowTimePicker2] = useState(false);
  const [task, setTask] = useState();
  const [taskTime, setTaskTime] = useState();
  const [numberOfAttemps, setNumberOfAttemps] = useState();
  const [assignToItems, setAsignToItems] = useState([
    {label: 'All members', value: 'all'},
  ]);
  const [assignTo, setAsignTo] = useState(
    assignToItems.length > 0 ? assignToItems[0].value : null,
  );
  const [openAssignPicker, setOpenAssignPicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedQList, setSelectedQList] = useState([]);
  const [partName, setPartName] = useState();

  useEffect(() => {
    const listener = data => {
      setSelectedQList(data.selectedQuestions);
      setPartName(data.part);
    };

    eventEmitter.on('updateSelectedQList', listener);

    return () => {
      eventEmitter.removeListener('updateSelectedQList', listener);
    };
  }, []);

  const onDatePickerChange = (event, selectedDate, type) => {
    if (type === 1) {
      const currentDate = selectedDate || date1;
      setShowDatePicker1(Platform.OS === 'ios');
      setDate1(currentDate);

      const dateObject = new Date(currentDate);

      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;

      setStartDate(formattedDate);
    } else if (type === 2) {
      const currentDate = selectedDate || date2;
      setShowDatePicker2(Platform.OS === 'ios');
      setDate2(currentDate);

      const dateObject = new Date(currentDate);
      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      setDueDate(formattedDate);
    }
  };

  const onTimePickerChange = (event, selectedTime, type) => {
    if (type === 1) {
      const currentTime = selectedTime || time1;
      setShowTimePicker1(Platform.OS === 'ios');
      setTime1(currentTime);

      const dateObject = new Date(currentTime);
      const formattedTime = `${dateObject.getHours()}:${String(
        dateObject.getMinutes(),
      ).padStart(2, '0')}`;
      setStartTime(formattedTime);
    } else if (type === 2) {
      const currentTime = selectedTime || time2;
      setShowTimePicker2(Platform.OS === 'ios');
      setTime2(currentTime);

      const dateObject = new Date(currentTime);
      const formattedTime = `${dateObject.getHours()}:${String(
        dateObject.getMinutes(),
      ).padStart(2, '0')}`;
      setDueTime(formattedTime);
    }
  };

  const onSaveAsignment = async () => {
    console.log(selectedQList);
    const asignment = {
      classId: route.params.classId,
      className: route.params.className,
      title: title,
      instruction: instruction,
      point: point,
      startDate: date1,
      startTime: time1,
      dueDate: date2,
      dueTime: time2,
      createdAt: new Date(),
      attemptsAllow: numberOfAttemps,
      test: {
        time: taskTime * 60,
        part: partName,
        questions: selectedQList,
      },
      type: 2,
      //resourceFiles: files,
    };
    console.log(asignment);

    const res = await Api.addAsignment(asignment);
    if (res) {
      navigation.replace('Asignment');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ChooseTestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={[styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
          <View style={{flex: 1}} />
          <View style={{height: 360, backgroundColor: '#E8E8E8'}}>
            <View style={styles.panel}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: '#DDD',
                  borderBottomWidth: 1,
                  marginBottom: 25,
                }}>
                <Text
                  style={[
                    styles.panelSubtitle,
                    {color: '#222', flex: 1, textAlign: 'center'},
                  ]}>
                  {'Choose Test'}
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <IonIcon name="close-outline" color={'#444'} size={25} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.push('PartList', {skill: 'L'})}>
                  <Image
                    source={require('../assets/headphones.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.panelSubtitle}>Listening</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.push('PartList', {skill: 'R'})}>
                  <Image
                    source={require('../assets/book.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.panelSubtitle}>Reading</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => navigation.push('PartList', {skill: 'S'})}>
                  <Image
                    source={require('../assets/microphone.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.panelSubtitle}>Speaking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => navigation.push('PartList', {skill: 'W'})}>
                  <Image
                    source={require('../assets/pen.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.panelSubtitle}>Writing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.push('Test', {from: 'assignment'})}>
                  <Image
                    style={{width: 65, height: 75}}
                    source={require('../assets/test1.png')}
                    resizeMode="stretch"
                  />
                  <Text style={styles.panelSubtitle}>Test</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Create New Asignment</Text>
        </View>
        <View style={{flex: 1}} />
        <Text style={styles.SaveText} onPress={onSaveAsignment}>
          Save
        </Text>
      </View>
      <ScrollView style={{paddingHorizontal: 5}}>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Title*: </Text>
        <TextInput
          multiline={true}
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={title}
          onChangeText={txt => setTitle(txt)}
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instructions: </Text>
        <TextInput
          multiline={true}
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={instruction}
          onChangeText={txt => setInstruction(txt)}
        />
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <IonIcon name="attach-outline" color={'#555'} size={22} />
            <Text style={[styles.SecondaryText, {color: '#555'}]}>
              Attach files
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Points: </Text>
        <TextInput
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={point}
          onChangeText={txt => setPoint(txt)}
          keyboardType="numeric"
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Assign To: </Text>
        <DropDownPicker
          open={openAssignPicker}
          value={assignTo}
          items={assignToItems}
          setOpen={setOpenAssignPicker}
          setValue={setAsignTo}
          setItems={setAsignToItems}
          style={styles.Input}
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.label}
          selectedItemLabelStyle={styles.selectedLabel}
          listItemLabelStyle={styles.listItemLabel}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '55%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Start Date: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{startDate}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowDatePicker1(true)}>
                <IonIcon name="calendar-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '44%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Start Time: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{startTime}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowTimePicker1(true)}>
                <IonIcon name="time-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '55%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Date: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{dueDate}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowDatePicker2(true)}>
                <IonIcon name="calendar-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '44%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Time: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{dueTime}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowTimePicker2(true)}>
                <IonIcon name="time-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.KeyText, {marginTop: 10}]}>
            Select Test or Task:
          </Text>
          <Picker
            style={styles.Input}
            selectedValue={task}
            onValueChange={(itemValue, itemIndex) => setTask(itemValue)}>
            <Picker.Item label="Java" value="Test ETS 1" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C#" value="csharp" />
          </Picker>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.KeyText, {marginTop: 10}]}>
            Attempts Allowed:
          </Text>
          <TextInput
            style={[styles.Input, {marginLeft: 10}]}
            placeholderTextColor={'#555'}
            width={'15%'}
            value={numberOfAttemps}
            onChangeText={txt => setNumberOfAttemps(txt)}
            keyboardType="numeric"
          />
          <Text style={[styles.KeyText, {marginTop: 10}]}>Time:</Text>
          <TextInput
            style={[styles.Input, {marginLeft: 10}]}
            placeholderTextColor={'#555'}
            width={'15%'}
            value={taskTime}
            onChangeText={txt => setTaskTime(txt)}
            keyboardType="numeric"
          />
          <Text style={[styles.KeyText, {marginTop: 10, fontWeight: '400'}]}>
            m
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Choose Test</Text>
        </TouchableOpacity>

        {selectedQList.length !== 0 && (
          <View style={styles.QuestionsInfoContainer}>
            <View style={{marginRight: 80}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name={'book-outline'} style={styles.iconStyle} />
                <Text style={styles.QuestionsInfoText}>Part: {partName}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name={'help-circle-outline'}
                  style={styles.iconStyle}
                />
                <Text style={styles.QuestionsInfoText}>
                  Number of questions: {selectedQList.length}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name={'time-outline'} style={styles.iconStyle} />
                <Text style={styles.QuestionsInfoText}>
                  Time: {taskTime ? taskTime + ' minutes' : 'Unlimited'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {showDatePicker1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date1}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) =>
              onDatePickerChange(event, selectedDate, 1)
            }
          />
        )}
        {showTimePicker1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time1}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) =>
              onTimePickerChange(event, selectedTime, 1)
            }
          />
        )}
        {showDatePicker2 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date2}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) =>
              onDatePickerChange(event, selectedDate, 2)
            }
          />
        )}
        {showTimePicker2 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time2}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) =>
              onTimePickerChange(event, selectedTime, 2)
            }
          />
        )}
        <ChooseTestModal />
      </ScrollView>
    </View>
  );
};

export default CreateAsignment2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  KeyText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
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
    alignSelf: 'center',
    color: '#333',
  },
  RowDirectionContainer: {
    flexDirection: 'row',
  },
  SecondaryText: {
    color: '#000',
    fontSize: 15,
  },
  IconWrapper: {
    marginHorizontal: 5,
    color: '#154D00',
    fontSize: 17,
    alignSelf: 'center',
  },
  IconInput: {
    fontWeight: '700',
    marginLeft: 10,
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    marginTop: '5%',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  SaveText: {
    color: 'white',
    marginRight: 10,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 18,
    color: '#555',
    height: 30,
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#E8E8E8',
    width: '100%',
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  QuestionsInfoContainer: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    //marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
  QuestionsInfoText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  iconStyle: {
    color: '#000',
    fontSize: 25,
    padding: 5,
  },
});
