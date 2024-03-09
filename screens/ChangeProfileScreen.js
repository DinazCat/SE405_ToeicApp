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
import Feather from 'react-native-vector-icons/Feather';
import FormButton from '../components/FormButton';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Api from '../api/Api';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import axios from 'axios';

const ChangeProfileScreen = ({navigation, route}) => {
  const [OpenModal, setOpenModal] = useState(false);
  const [image, setimage] = useState();
  const [userData, setUserData] = useState(null);
  const [age, setAge] = useState('');
  const {profileData} = route.params;
  useEffect(() => {
    setUserData(route.params.profileData);
    if (profileData.age) setAge(profileData.age);
  }, []);
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
        name: userData.name,
        about: userData.about,
        email: userData.email,
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
  const takePhotoFromCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      setimage(img.path);
    });
  };
  const saveProfile = async () => {
    if (image == null) {
      const data = {
        id: profileData.id,
        name: userData.name,
        about: userData.about,
        email: userData.email,
        age: age,
      };
      await Api.updateUser(data);
      Alert.alert('Success!', 'Your profile updated');
    } else uploadImage();
  };
  function RenderModal() {
    return (
      <Modal visible={OpenModal} animationType="slide" transparent={true}>
        <View
          style={{
            height: 160,
            width: 300,
            borderRadius: 15,
            backgroundColor: PRIMARY_COLOR,
            borderColor: 'white',
            borderWidth: 2,
            alignSelf: 'center',
            marginVertical: 300,
            position: 'absolute',
          }}>
          <TouchableOpacity
            style={{marginLeft: 255, padding: 5}}
            onPress={() => setOpenModal(false)}>
            <Icon
              name={'times-circle'}
              style={{color: 'white', fontSize: 20, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={styles.popover}>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <View style={styles.popoverItem}>
                <Icon name="camera" size={35} color={card_color} />
                <Text style={{fontSize: 16, marginTop: 8, color: 'white'}}>
                  Take photo
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageAsync}>
              <View style={styles.popoverItem}>
                <Icon name="photo-video" size={35} color={card_color} />
                <Text style={{fontSize: 16, marginTop: 8, color: 'white'}}>
                  Libraries
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'#222'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
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

        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#555'} size={23} />
          <TextInput
            placeholder={'Name'}
            placeholderTextColor={'#555'}
            value={userData ? userData.name : ''}
            onChangeText={txt => setUserData({...userData, name: txt})}
            autoCorrect={false}
            style={[styles.textInput]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="clipboard-outline" color={'#222'} size={23} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder={'About Me'}
            placeholderTextColor={'#555'}
            value={userData ? userData.about : ''}
            onChangeText={txt => setUserData({...userData, about: txt})}
            autoCorrect={true}
            style={[styles.textInput, {height: 40, color: '#555'}]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={'#555'} size={21} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#555'}
            keyboardType="email-address"
            value={userData ? userData.email : ''}
            onChangeText={txt => setUserData({...userData, email: txt})}
            autoCorrect={false}
            style={[styles.textInput, {height: 40, color: '#555'}]}
          />
        </View>

        <View style={styles.action}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1412/1412443.png',
            }}
            style={{width: 28, height: 28}}
          />
          <TextInput
            placeholder={'Age'}
            keyboardType="number-pad"
            placeholderTextColor={'#555'}
            autoCorrect={false}
            value={age}
            onChangeText={age => {
              if (parseInt(age) > 0 || age == '')
                setAge(age.replace(/[^0-9]/g, ''));
            }}
            style={[styles.textInput, {color: ''}]}
          />
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

export default ChangeProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  popover: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popoverItem: {
    alignItems: 'center',
    margin: 16,
  },
});
