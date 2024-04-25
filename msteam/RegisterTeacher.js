import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {PRIMARY_COLOR} from '../assets/colors/color';
import Api from '../api/Api';
import auth from '@react-native-firebase/auth';
import FormInput from '../components/FormInput';
import moment from 'moment';

const RegisterTeacher = ({navigation}) => {
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState('');
  const [initBirthdate, setInitBirthdate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 19);
    date.setMonth(11);
    date.setDate(31);
    return date;
  });
  const [birthdate, setBirthdate] = useState(initBirthdate);
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [score, setScore] = useState('');
  const [otherCertificates, setOtherCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [openPicker, setOpenPicker] = useState(false);

  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const showDatePicker = () => {
    setOpenPicker(true);
  };

  const hideDatePicker = () => {
    setOpenPicker(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setBirthdate(date);
  };

  const onNext = () => {
    if (
      name === '' ||
      birthdate === '' ||
      phone === '' ||
      university === '' ||
      score === '' ||
      skills.length === 0
    ) {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    } else if (score < 880 || score > 990) {
      Alert.alert(
        'Invalid score',
        'Your TOEIC score must be higher than 880 and less than 990',
      );
      return;
    }

    navigation.push('GetImageTeacher', {
      id: profileData.id,
      name: name,
      birthdate: `${birthdate.getDate()}/${
        birthdate.getMonth() + 1
      }/${birthdate.getFullYear()}`,
      university: university,
      phone: phone,
      score: score,
      otherCertificate: otherCertificates,
      skills: skills,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Register Teacher</Text>

      <ScrollView style={{width: '100%'}}>
        <View style={styles.stepContainer}>
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
          <View style={[styles.step]} />
        </View>

        <Text style={styles.title}>Enter Your Full Name</Text>
        <FormInput
          onChangeText={value => setName(value)}
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Your Birthdate</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showDatePicker}>
          <View style={styles.iconStyle}>
            <FontAwesome5 name="calendar" size={22} color="#666" light />
          </View>
          <Text style={{fontSize: 16, color: '#333', padding: 2}}>
            {moment(birthdate).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={openPicker}
          mode="date"
          date={birthdate}
          maximumDate={initBirthdate}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.note}>
          *You must be 18 years or older to register
        </Text>

        <Text style={styles.title}>Enter Your Phone Number</Text>
        <FormInput
          onChangeText={value => setPhone(value)}
          iconType="phone-alt"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Enter Your University</Text>
        <FormInput
          onChangeText={value => setUniversity(value)}
          iconType="school"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Your Toeic Score</Text>
        <FormInput
          onChangeText={value => setScore(value)}
          iconType="certificate"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.note}>*Required Toeic score is 880+</Text>

        <Text style={styles.title}>Enter Your Other Certificates</Text>
        <View style={styles.multilineContainer}>
          <View style={styles.iconStyle}>
            <FontAwesome5 name="certificate" size={22} color="#666" light />
          </View>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={value => {
              temp = value.trim().split('\n');
              setOtherCertificates(temp);
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.title}>Enter Your Skills</Text>
        <FormInput
          onChangeText={value => {
            temp = value.split(',');
            setSkills(temp);
          }}
          iconType="pen-fancy"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.note}>*Each skill is separated by a ","</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Homeinstack')}>
            <Text style={styles.button}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <Text style={styles.button}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: 'green',
    marginBottom: 20,
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  step: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multilineContainer: {
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexBasis: 'auto',
    minHeight: 50,
  },
  note: {
    marginTop: -10,
    marginBottom: 10,
    fontWeight: 600,
    color: PRIMARY_COLOR,
  },
  button: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
    color: 'green',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterTeacher;
