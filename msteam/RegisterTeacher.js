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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import AppStyle from '../theme';
import Api from '../api/Api';
import auth from '@react-native-firebase/auth';

const RegisterTeacher = ({navigation, route}) => {
  const [profileData, setProfileData] = useState(null);

  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text style={styles.title}>Register Teacher</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#555'} size={23} />
          <TextInput
            placeholder={'Name'}
            placeholderTextColor={'#555'}
            value={profileData ? profileData.name : ''}
            //onChangeText={txt => setUserData({...profileData, name: txt})}
            autoCorrect={false}
            style={[styles.input]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={'#555'} size={21} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#555'}
            keyboardType="email-address"
            //  value={profileData ? profileData.email : ''}
            //onChangeText={txt => setUserData({...profileData, email: txt})}
            autoCorrect={false}
            style={[styles.input, {height: 40, color: '#555'}]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="school-outline" color={'#222'} size={23} />
          <TextInput
            placeholder={'University'}
            placeholderTextColor={'#555'}
            //value={profileData ? profileData.about : ''}
            //onChangeText={txt => setUserData({...profileData, about: txt})}
            autoCorrect={true}
            style={[styles.input, {height: 40, color: '#555'}]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="clipboard-outline" color={'#222'} size={23} />
          <TextInput
            placeholder={'Major'}
            keyboardType="number-pad"
            placeholderTextColor={'#555'}
            autoCorrect={false}
            style={[styles.input, {color: ''}]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="calendar-outline" color={'#222'} size={23} />
          <TextInput
            placeholder="Starting year"
            placeholderTextColor={'#555'}
            keyboardType="email-address"
            //  value={userData ? userData.email : ''}
            onChangeText={txt => setUserData({...userData, email: txt})}
            autoCorrect={false}
            style={[styles.input, {height: 40, color: '#555'}]}
          />
        </View>

        <View style={{width: '40%', alignSelf: 'center'}}>
          <FormButton title={'Register'} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
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
  input: {
    color: '#333',
    paddingLeft: 10,
    fontSize: 15,
    flex: 1,
  },
});

export default RegisterTeacher;
