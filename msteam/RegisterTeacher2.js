import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import FormInput from '../components/FormInput';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const RegisterTeacher2 = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [typeImage, setTypeImage] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  //handle modal upload image
  const openLibrary = async () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 150,
      cropping: true,
    }).then(img => {
      if (typeImage === 'front') setFrontImage(img.path);
      else if (typeImage === 'back') setBackImage(img.path);
    });
  };

  const openCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      width: 300,
      height: 150,
      cropping: true,
    }).then(img => {
      if (typeImage === 'front') setFrontImage(img.path);
      else if (typeImage === 'back') setBackImage(img.path);
    });
  };

  const onNext = async () => {
    if (bank === '' || accountNumber === '' || accountName === '') {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    } else if (frontImage === '' || backImage === '') {
      Alert.alert('Input cannot be blank!', 'Please upload your ID card fully');
      return;
    }

    navigation.push('RegisterTeacher3', {
      ...route.params,
      frontIDImage: frontImage,
      backIDImage: backImage,
      bankInformation: {
        bankName: bank,
        accountNumber: accountNumber,
        accountName: accountName,
      },
    });
  };

  //Render Modal to choose upload image by take photo now or upload from library
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'green'}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Teacher</Text>
        <TouchableOpacity onPress={() => navigation.pop(2)}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: '100%', padding: 20, paddingTop: 0}}>
        <View style={styles.stepContainer}>
          <TouchableOpacity
            style={[styles.step]}
            onPress={() => navigation.goBack()}
          />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
        </View>

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
            Upload Your Bank Information
          </Text>
          <View
            style={{flex: 1, height: 1, backgroundColor: '#000', marginTop: 16}}
          />
        </View>

        <Text style={[styles.title, {marginTop: 10}]}>Enter Bank Name</Text>
        <FormInput
          onChangeText={value => setBank(value)}
          iconType="hotel"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Account Number</Text>
        <FormInput
          onChangeText={value => setAccountNumber(value)}
          iconType="money-check"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Account Name</Text>
        <FormInput
          onChangeText={value => setAccountName(value)}
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />

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
              setTypeImage('front');
            }}>
            <FontAwesome5 name="camera" size={35} color={card_color} />
            <Text style={styles.buttonText}>Front ID</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setOpenModal(true);
              setTypeImage('back');
            }}>
            <FontAwesome5 name="camera" size={35} color={card_color} />
            <Text style={styles.buttonText}>Back ID</Text>
          </TouchableOpacity>
        </View>

        {frontImage && (
          <View
            style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
            <Text style={styles.titleImage}>The front of the ID card</Text>
            <View style={{position: 'relative', width: 300, height: 150}}>
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setFrontImage('')}>
                <Ionicons name="close" style={{color: 'white'}} size={20} />
              </TouchableOpacity>
              <Image source={{uri: frontImage}} style={styles.image} />
            </View>
          </View>
        )}

        {backImage && (
          <View
            style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
            <Text style={styles.titleImage}>The back of the ID card</Text>
            <View
              style={{
                position: 'relative',
                width: 300,
                height: 150,
              }}>
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setBackImage('')}>
                <Ionicons name="close" style={{color: 'white'}} size={20} />
              </TouchableOpacity>
              <Image source={{uri: backImage}} style={styles.image} />
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={onNext}
          //  disabled={!frontImage ? true : false}
        >
          <Text style={[styles.button]}>Next</Text>
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
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
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
    alignSelf: 'center',
    marginBottom: 20,
  },
  step: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
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
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
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
  titleImage: {
    fontSize: 17,
    color: '#555',
    fontStyle: 'italic',
    width: '100%',
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
  },
  button: {
    textAlign: 'center',
    fontSize: 17,
    color: 'green',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  removeImage: {
    position: 'absolute',
    padding: 2,
    zIndex: 3,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
});

export default RegisterTeacher2;
