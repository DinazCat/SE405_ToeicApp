import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {PRIMARY_COLOR} from '../assets/colors/color';
import {AuthContext} from '../navigation/AuthProvider';
import Api from '../api/Api';
import uploadfile from '../api/uploadfile';
import axios from 'axios';

const RegisterTeacher3 = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {registerTeacher} = useContext(AuthContext);
  // const [teacherData,setTeacherData] = useState({...route.params})

  const uploadImg = async(img)=>{
    console.log(img)
    const formData = new FormData();
          formData.append('image', {
            uri: img,
            name: 'image.jpg',
            type: 'image/jpg',
          });
          console.log('haha')
          const response = await axios.post(
            'http://192.168.1.4:3000/upload',
            formData,
          );
          console.log(response.data.photo)
          return response.data.photo
  }
  const onSave = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Password confirmation does not match!');
    } else {
      // const teacherData = {...route.params};
      console.log('hihi')
      let temp = {...route.params}
      if(temp.otherCertificateImages.length>0){
        for(let i = 0; i < temp.otherCertificateImages.length; i++){
          temp.otherCertificateImages[i] = uploadImg(temp.otherCertificateImages[i])
        }
      }
      temp.backIDImage = uploadImg(temp.backIDImage)
      temp.frontIDImage = uploadImg(temp.frontIDImage)
      temp.toeicCertificateImage = uploadImg(temp.toeicCertificateImage)
      // registerTeacher(email, password, temp);
    }
  };

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
        <TouchableOpacity onPress={() => navigation.pop(3)}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: '100%'}}>
        <View style={styles.stepContainer}>
          <View style={[styles.step]} />
          <TouchableOpacity
            style={[styles.step]}
            onPress={() => navigation.goBack()}
          />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
        </View>

        <Text style={styles.title}>Enter Your Email</Text>
        <FormInput
          onChangeText={value => setEmail(value)}
          iconType="envelope"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <Text style={styles.title}>Create password</Text>
        <FormInput
          onChangeText={value => setPassword(value)}
          iconType="lock"
          secureTextEntry={true}
        />

        <Text style={styles.title}>Confirm password</Text>
        <FormInput
          onChangeText={value => setConfirmPassword(value)}
          iconType="lock"
          secureTextEntry={true}
        />

        <View style={{width: '40%', alignSelf: 'center'}}>
          <FormButton title={'Complete'} onPress={onSave} />
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
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 24,
    color: 'green',
    width: '100%',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    bottom: 0,
    marginBottom: 4,
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
});

export default RegisterTeacher3;
