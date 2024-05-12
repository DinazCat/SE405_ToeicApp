import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import AppStyle from '../theme';
import {PRIMARY_COLOR} from '../assets/colors/color';
import FormButton from '../components/FormButton';
import Api from '../api/Api';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

const tuitionList = [
  {
    label: `Tuition: 2.000.000 đ`,
    value: 2000000,
  },
  {
    label: 'Tuition: 2.500.000 đ',
    value: 2500000,
  },
  {
    label: 'Tuition: 3.000.000 đ',
    value: 3000000,
  },
];

const NewTeam = ({navigation, route}) => {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [maximumStudents, setMaximumStudents] = useState('');
  const [level, setLevel] = useState('');
  const [tuition, setTuition] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDate1, setOpenDate1] = useState(false);
  const [openDate2, setOpenDate2] = useState(false);
  const {user} = useContext(AuthContext);

  const onSave = async () => {
    const expectedEndDate = new Date(startDate);
    expectedEndDate.setMonth(expectedEndDate.getMonth() + 1);

    if (
      className === '' ||
      maximumStudents === '' ||
      level === '' ||
      tuition === '' ||
      description === ''
    ) {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    } else if (maximumStudents <= 0 || maximumStudents > 100) {
      Alert.alert(
        'Invalid maximum student value!',
        'The maximum number of students must be greater than 0 and not exceed 100',
      );
      return;
    } else if (level <= 0) {
      Alert.alert(
        'Level cannot be equal to 0!',
        'Please re-enter current score',
      );
      return;
    } else if (level > 990) {
      Alert.alert(
        'Level cannot be more than 990!',
        'Please re-enter current score',
      );
      return;
    } else if (endDate < expectedEndDate) {
      Alert.alert(
        'Invalid end date value!',
        'The end date must be at least 1 month greater than the start date',
      );
      return;
    }

    await Api.addClass({
      userId: user.uid,
      ClassName: className,
      Finish_Date: `${endDate.getDate()}/${
        endDate.getMonth() + 1
      }/${endDate.getFullYear()}`,
      Start_Date: `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`,
      MaximumStudents: maximumStudents,
      Level: level,
      Tuition: tuition,
      Description: description,
      TeacherName:auth().currentUser.displayName
    })
      .then(() => {
        navigation.navigate('Teams');
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Create a new class</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 5}}>
        <Text style={styles.title}>Class name: </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#555'}
          onChangeText={value => setClassName(value)}
        />

        <Text style={styles.title}>Description: </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#555'}
          onChangeText={value => setDescription(value)}
          multiline
        />

        <Text style={styles.title}>Maximum students: </Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setMaximumStudents(value)}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Level: </Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setLevel(value)}
          keyboardType="numeric"
        />
        <Text style={styles.note}>Ex: Level 550+</Text>

        <Text style={styles.title}>Tuition: </Text>
        <DropDownPicker
          placeholder="Select a tuition"
          items={tuitionList}
          open={openDropdown}
          setOpen={() => setOpenDropdown(!openDropdown)}
          value={tuition}
          setValue={item => setTuition(item)}
          maxHeight={160}
          style={[styles.input, {zIndex: 1}]}
          placeholderStyle={{fontSize: 16, color: '#555'}}
          labelStyle={{fontSize: 16, color: '#333'}}
          listItemContainer={{height: 40}}
          listItemLabelStyle={{fontSize: 16, color: '#333'}}
          dropDownContainerStyle={{backgroundColor: '#fafafa'}}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Start date: </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setOpenDate1(true)}>
              <TextInput style={styles.inputText} editable={false}>
                {moment(startDate).format('DD/MM/YYYY')}
              </TextInput>
              <IonIcon name="calendar-outline" color={'#555'} size={20} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={openDate1}
              mode="date"
              minimumDate={new Date()}
              date={startDate}
              onConfirm={date => {
                setOpenDate1(false);
                setStartDate(date);
              }}
              onCancel={() => setOpenDate1(false)}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.title}>End date: </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setOpenDate2(true)}>
              <TextInput style={styles.inputText} editable={false}>
                {moment(endDate).format('DD/MM/YYYY')}
              </TextInput>
              <IonIcon name="calendar-outline" color={'#555'} size={20} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={openDate2}
              mode="date"
              minimumDate={new Date()}
              date={endDate}
              onConfirm={date => {
                setOpenDate2(false);
                setEndDate(date);
              }}
              onCancel={() => setOpenDate2(false)}
            />
          </View>
        </View>

        <View style={{width: '40%', alignSelf: 'center', marginBottom: 20}}>
          <FormButton title={'Create'} onPress={onSave} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
  },
  title: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    marginLeft: 3,
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: '#333',
    width: '96%',
  },
  inputContainer: {
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    marginLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: 'center',
    flex: 1,
  },
  note: {
    marginTop: -2,
    marginLeft: 5,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});

export default NewTeam;
