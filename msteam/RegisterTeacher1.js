import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FormInput from '../components/FormInput';

const RegisterTeacher1 = ({navigation}) => {
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
  const [typeImage, setTypeImage] = useState();
  const [toeicImage, setToeicImage] = useState();
  const [otherImages, setOtherImages] = useState([]);
  const [openPicker, setOpenPicker] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //handle datetime picker
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

  //handle modal upload image
  const openLibrary = async () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 150,
      cropping: true,
    }).then(img => {
      if (typeImage === 'toeicImage') setToeicImage(img.path);
      else if (typeImage === 'otherImages') {
        setOtherImages([...otherImages, img.path]);
      }
    });
  };

  const openCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      width: 300,
      height: 150,
      cropping: true,
    }).then(img => {
      if (typeImage === 'toeicImage') setToeicImage(img.path);
      else if (typeImage === 'otherImages')
        setOtherImages([...otherImages, img.path]);
    });
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
    } else if (toeicImage === '') {
      Alert.alert(
        'Input cannot be blank!',
        'Please upload your TOEIC Certificate',
      );
      return;
    } else if (otherCertificates.length !== 0 && otherImages.length === 0) {
      Alert.alert(
        'Input cannot be blank!',
        'If you have other certificates, please upload images of them',
      );
      return;
    } else if (otherCertificates.length === 0 && otherImages.length !== 0) {
      Alert.alert(
        'Input cannot be blank!',
        'If you have other certificates, please enter them',
      );
      return;
    } else if (score < 880 || score > 990) {
      Alert.alert(
        'Invalid score',
        'Your TOEIC score must be higher than 880 and less than 990',
      );
      return;
    }

    navigation.push('RegisterTeacher2', {
      name: name,
      birthdate: `${birthdate.getDate()}/${
        birthdate.getMonth() + 1
      }/${birthdate.getFullYear()}`,
      phone: phone,
      university: university,
      score: score,
      skills: skills,
      otherCertificate: otherCertificates,
      toeicCertificateImage: toeicImage,
      otherCertificateImages: otherImages,
    });
  };

  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}>
            <FontAwesome5
              name={'times-circle'}
              style={{color: 'white', fontSize: 20}}
            />
          </TouchableOpacity>

          <View style={styles.popover}>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.popoverItem}>
                <FontAwesome5 name="camera" size={35} color={card_color} />
                <Text style={styles.popoverText}>Take photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openLibrary}>
              <View style={styles.popoverItem}>
                <FontAwesome5 name="photo-video" size={35} color={card_color} />
                <Text style={styles.popoverText}>Libraries</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Register Teacher</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: '100%', padding: 20, paddingTop: 0}}>
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
          <Text
            style={{fontSize: 16, color: '#333', padding: 2, paddingLeft: 8}}>
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

        <Text style={styles.title}>Enter Your Skills</Text>
        <View style={styles.multilineContainer}>
          <View style={styles.iconStyle}>
            <FontAwesome5 name="pen-fancy" size={22} color="#666" light />
          </View>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={value => {
              temp = value.trim().split('\n');
              setSkills(temp.filter(item => item !== ''));
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.note}>*(Required) Each skill is on a row</Text>

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
              setOtherCertificates(temp.filter(item => item !== ''));
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.note}>*Each certificate is on a row</Text>

        <View
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{flex: 1, height: 1, backgroundColor: '#000', marginTop: 16}}
          />
          <Text style={[styles.title, {fontWeight: '600'}]}>
            Upload Your Certificates
          </Text>
          <View
            style={{flex: 1, height: 1, backgroundColor: '#000', marginTop: 16}}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setOpenModal(true);
              setTypeImage('toeicImage');
            }}>
            <FontAwesome5 name="camera" size={35} color={card_color} />
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Toeic Certificate</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setOpenModal(true);
              setTypeImage('otherImages');
            }}>
            <FontAwesome5 name="camera" size={35} color={card_color} />
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Other Certificates</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/*Display toeic certificate image*/}
        {toeicImage && (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={[
                styles.title,
                {fontStyle: 'italic', width: '100%', marginBottom: 5},
              ]}>
              Your Toeic Certificate
            </Text>
            <View style={{position: 'relative', width: 300, height: 150}}>
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setToeicImage('')}>
                <Ionicons name="close" style={{color: 'white'}} size={20} />
              </TouchableOpacity>
              <Image source={{uri: toeicImage}} style={styles.image} />
            </View>
          </View>
        )}

        {/*Display other certificates image*/}
        {otherImages.length !== 0 && (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={[
                styles.title,
                {fontStyle: 'italic', width: '100%', marginBottom: 5},
              ]}>
              Your Other Certificates
            </Text>
            {otherImages.map((item, index) => (
              <View
                key={index}
                style={{
                  position: 'relative',
                  width: 300,
                  height: 150,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() =>
                    setOtherImages(otherImages.filter(i => i !== item))
                  }>
                  <Ionicons name="close" style={{color: 'white'}} size={20} />
                </TouchableOpacity>
                <Image source={{uri: item}} style={styles.image} />
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={onNext}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
        <View style={{height: 20}} />
      </ScrollView>
      {RenderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    padding: 20,
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    bottom: 0,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    color: 'green',
    width: '100%',
    textAlign: 'center',
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
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    marginVertical: 20,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    fontSize: 17,
    color: 'green',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modal: {
    height: 160,
    width: 300,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    borderColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: 300,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    paddingRight: 15,
    paddingTop: 7,
  },
  popover: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  popoverItem: {
    alignItems: 'center',
    margin: 16,
  },
  popoverText: {
    fontSize: 16,
    marginTop: 8,
    color: 'white',
  },
  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
  },
  removeImage: {
    position: 'absolute',
    padding: 2,
    zIndex: 1,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
});

export default RegisterTeacher1;
