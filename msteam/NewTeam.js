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
const optionList = [
  {
    label: `Total free`,
    value: `Total free`,
  },
  {
    label: 'Free 2 days',
    value: 'Free 2 days',
  },
  {
    label: 'Pay charge',
    value: 'Pay charge',
  },
];

const NewTeam = ({navigation, route}) => {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [maximumStudents, setMaximumStudents] = useState('');
  const [level, setLevel] = useState('');
  const [level1, setLevel1] = useState('');
  const [tuition, setTuition] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [hashtag, sethashtag] = useState('');
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDate1, setOpenDate1] = useState(false);
  const [openDate2, setOpenDate2] = useState(false);
  const [state, setState] = useState('');
  const {user} = useContext(AuthContext);

  const onSave = async () => {
    const expectedEndDate = new Date(startDate);
    expectedEndDate.setMonth(expectedEndDate.getMonth() + 1);
    const check = checkSkill();
    if (
      className === '' ||
      maximumStudents === '' ||
      hashtag === '' ||
      level === '' ||
      level1 === '' ||
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
    } else if (level <= 0 || level1 < 0) {
      Alert.alert('Level cannot be equal to 0!', 'Please re-enter level');
      return;
    } else if (level > check) {
      Alert.alert(
        `Level cannot be more than ${check}!`,
        'Please re-enter current score',
      );
      return;
    } else if (endDate < expectedEndDate) {
      Alert.alert(
        'Invalid end date value!',
        'The end date must be at least 1 month greater than the start date',
      );
      return;
    } else if (Number(level) < Number(level1)) {
      Alert.alert(
        `Target level is not smaller than base level!`,
        'Please re-enter current score',
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
      baseLevel: level1,
      Tuition: tuition,
      Description: description,
      TeacherName: auth().currentUser.displayName,
      PaymentPlan: state,
      Skill: hashtag,
    })
      .then(() => {
        navigation.navigate('Teams');
      })
      .catch(error => console.error(error));
  };
  const checkSkill = () => {
    if (hashtag == 'Listening') {
      return 495;
    } else if (hashtag == 'Reading') {
      return 495;
    } else if (hashtag == 'Speaking') {
      return 200;
    } else if (hashtag == 'Writting') {
      return 200;
    } else if (hashtag == 'L&R') {
      return 990;
    } else if (hashtag == 'S&W') {
      return 400;
    }
    return 0;
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
        <Text style={styles.title}>Choose skills that you teach: </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {backgroundColor: hashtag != 'Listening' ? '#EAABAB' : '#f0f0f0'},
            ]}
            onPress={() => {
              if (hashtag == 'Listening') sethashtag('');
              else sethashtag('Listening');
            }}>
            <Text style={[styles.panelButtonTitle]}>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {backgroundColor: hashtag != 'Reading' ? '#74A8C5' : '#f0f0f0'},
            ]}
            onPress={() => {
              if (hashtag == 'Reading') sethashtag('');
              else sethashtag('Reading');
            }}>
            <Text style={[styles.panelButtonTitle]}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {
                backgroundColor: hashtag != 'Speaking' ? '#FA9D68' : '#f0f0f0',
              },
            ]}
            onPress={() => {
              if (hashtag == 'Speaking') sethashtag('');
              else sethashtag('Speaking');
            }}>
            <Text style={[styles.panelButtonTitle]}>Speaking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {
                backgroundColor: hashtag != 'Writting' ? '#CF87DF' : '#f0f0f0',
              },
            ]}
            onPress={() => {
              if (hashtag == 'Writting') sethashtag('');
              else sethashtag('Writting');
            }}>
            <Text style={[styles.panelButtonTitle]}>Writting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {
                backgroundColor: hashtag != 'L&R' ? '#70DECE' : '#f0f0f0',
              },
            ]}
            onPress={() => {
              if (hashtag == 'L&R') sethashtag('');
              else sethashtag('L&R');
            }}>
            <Text style={[styles.panelButtonTitle]}>L&R</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.panelButton,
              {
                backgroundColor: hashtag != 'S&W' ? '#BCE37A' : '#f0f0f0',
              },
            ]}
            onPress={() => {
              if (hashtag == 'S&W') sethashtag('');
              else sethashtag('S&W');
            }}>
            <Text style={[styles.panelButtonTitle]}>S&W</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Base Level:</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setLevel1(value)}
          keyboardType="numeric"
        />
        <Text style={styles.note}>Ex: Level 550+</Text>
        <Text style={styles.title}>Target Level: max is {checkSkill()} </Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setLevel(value)}
          keyboardType="numeric"
        />
        <Text style={styles.note}>Ex: Level 550+</Text>
        <Text style={styles.title}>Payment Plans:</Text>
        <DropDownPicker
          placeholder="Select a payment plan"
          items={optionList}
          open={openDropdown1}
          setOpen={() => setOpenDropdown1(!openDropdown1)}
          value={state}
          setValue={item => setState(item)}
          maxHeight={160}
          style={[styles.input, {zIndex: 1}]}
          placeholderStyle={{fontSize: 16, color: '#555'}}
          labelStyle={{fontSize: 16, color: '#333'}}
          listItemContainer={{height: 40}}
          listItemLabelStyle={{fontSize: 16, color: '#333'}}
          dropDownContainerStyle={{backgroundColor: '#fafafa'}}
        />
        {state == 'Pay charge' && (
          <View>
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
          </View>
        )}

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
  panelButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  panelButtonTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
  },
});

export default NewTeam;
