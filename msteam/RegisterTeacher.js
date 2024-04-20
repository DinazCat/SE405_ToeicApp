import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Api from '../api/Api';
import auth from '@react-native-firebase/auth';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
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
  const [university, setUniversity] = useState('');
  const [phone, setPhone] = useState('');
  const [score, setScore] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState([]);
  const [skills, setSkills] = useState([]);
  const [otherCertificates, setOtherCertificates] = useState([]);

  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
    setName(data.name);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const uploadToeicCertificate = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 150,
      crop: true,
    }).then(image => {
      setImage1(image.path);
    });
  };

  const uploadOtherCertificates = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 150,
      crop: true,
      multiple: true,
    }).then(image => {
      image.forEach(img => {
        image2.push(img.path);
      });
    });
  };

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setBirthdate(date);
  };

  const onNext = () => {
    if (
      name === '' ||
      birthdate === '' ||
      university === '' ||
      phone === '' ||
      score === '' ||
      image1 === '' ||
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

    navigation.push('BankAccountTeacher', {
      type: 'Teacher',
      id: profileData.id,
      name: name,
      birthdate: birthdate,
      university: university,
      phone: phone,
      score: score,
      toeicCertificate: image1,
      otherCertificates: image2,
      skills: skills,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/bg1.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Register Teacher</Text>

        <ScrollView style={{width: '100%'}}>
          <FormInput
            lbValue={name}
            onChangeText={value => setName(value)}
            placeholderText="Full name"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={showDatePicker}>
            <View style={styles.iconStyle}>
              <FontAwesome5 name="calendar" size={22} color="#666" light />
            </View>
            <Text>{moment(birthdate).format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isVisible}
            mode="date"
            date={birthdate}
            maximumDate={initBirthdate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <FormInput
            lbValue={phone}
            onChangeText={value => setPhone(value)}
            placeholderText="Phone"
            iconType="phone-alt"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
          />

          <FormInput
            lbValue={university}
            onChangeText={value => setUniversity(value)}
            placeholderText="University"
            iconType="school"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            onChangeText={value => setScore(value)}
            placeholderText="Toeic score"
            iconType="certificate"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={{color: 'red'}}>*Required Toeic score is 880+</Text>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={uploadToeicCertificate}>
            <Text style={styles.buttonText}>{'Upload Toeic certificate'}</Text>
          </TouchableOpacity>
          {image1 && <Image source={{uri: image1}} style={styles.image} />}

          <View style={styles.multilineContainer}>
            <View style={styles.iconStyle}>
              <FontAwesome5 name="certificate" size={22} color="#666" light />
            </View>
            <TextInput
              style={styles.input}
              multiline
              value={otherCertificates}
              onChangeText={value => {
                temp = value.trim().split('\n');
                setOtherCertificates(temp);
              }}
              placeholder="Other certificates"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={uploadOtherCertificates}>
            <Text style={styles.buttonText}>{'Upload other certificates'}</Text>
          </TouchableOpacity>

          {image2.map((item, index) => (
            <Image key={index} source={{uri: item}} style={styles.image} />
          ))}

          <FormInput
            lbValue={skills}
            onChangeText={value => {
              temp = value.split(',');
              setSkills(temp);
            }}
            placeholderText="Skills"
            iconType="pen-fancy"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={{color: 'red'}}>*Each skill is separated by a ","</Text>

          <View style={{width: '40%', alignSelf: 'center'}}>
            <FormButton title={'Next'} onPress={onNext} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 32,
    marginBottom: 10,
    marginTop: 30,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9ACC1C',
  },
  image: {
    width: 380,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
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
});

export default RegisterTeacher;
