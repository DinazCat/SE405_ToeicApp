import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Api from '../api/Api';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import axios from 'axios';

const GetImageTeacher = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [image, setimage] = useState();
  const [profileData, setProfileData] = useState(null);
  const [age, setAge] = useState('');
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState([]);

  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
  };

  useEffect(() => {
    getProfile();
    if (profileData?.age) setAge(profileData.age);
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

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      });
      console.log(1);
      const response = await axios.post(
        'http://192.168.1.11:3000/upload',
        formData,
      );
      console.log(2);
      console.log(response.data.photo);
      const data = {
        name: profileData.name,
        about: profileData.about,
        email: profileData.email,
        userImg: response.data.photo,
        age: age,
      };
      await Api.updateUserPrivate(data);
      Alert.alert('Success!', 'Your profile updated');
    } catch (error) {
      console.error(error);
    }
  };
  const pickImageAsync = async () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(img => {
      setimage(img.path);
    });
  };

  const openCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => setimage(img.path));
  };

  const saveProfile = async () => {
    if (image == null) {
      const data = {
        id: profileData.id,
        name: profileData.name,
        about: profileData.about,
        email: profileData.email,
        age: age,
      };
      await Api.updateUser(data);
      Alert.alert('Success!', 'Your profile updated');
    } else uploadImage();
  };

  //Render Modal to choose upload image by take photo now or upload from library
  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => setOpenModal(false)}>
            <Icon name={'times-circle'} style={styles.closeButton} />
          </TouchableOpacity>

          <View style={styles.popover}>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.popoverItem}>
                <Icon name="camera" size={35} color={card_color} />
                <Text style={styles.popoverText}>Take photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImageAsync}>
              <View style={styles.popoverItem}>
                <Icon name="photo-video" size={35} color={card_color} />
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
      </View>

      <ScrollView style={{width: '100%'}}>
        <View style={styles.stepContainer}>
          <View style={[styles.step]} onPress={() => navigation.goBack()} />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.buttonContainer, {backgroundColor: PRIMARY_COLOR}]}
            onPress={() => setOpenModal(true)}>
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Toeic Certificate</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, {backgroundColor: PRIMARY_COLOR}]}
            onPress={() => setOpenModal(true)}>
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Other Certificates</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {image1 && <Image source={{uri: image1}} style={styles.image} />}
        {image2.map((item, index) => (
          <Image key={index} source={{uri: item}} style={styles.image} />
        ))}

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}>
            <View>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : profileData
                    ? profileData.userImg
                      ? profileData.userImg
                      : 'https://cdn-icons-png.flaticon.com/512/1144/1144811.png'
                    : 'https://cdn-icons-png.flaticon.com/512/1144/1144811.png',
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 50}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.cameraIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#222',
            }}>
            {profileData
              ? profileData.name
                ? profileData.name
                : profileData.email
              : 'Your name'}
          </Text>
        </View>

        <View style={{width: '40%', flexDirection: 'row'}}>
          <View width={'70%'}></View>
          <FormButton title={'Update'} onPress={saveProfile} />
        </View>
      </ScrollView>
      {RenderModal()}
    </View>
  );
};

export default GetImageTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
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
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    width: 380,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
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
    color: 'white',
    fontSize: 20,
    marginRight: 10,
    marginTop: 5,
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
  cameraIcon: {
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
    alignItems: 'center',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    color: '#333',
    paddingLeft: 10,
    fontSize: 15,
  },
});
