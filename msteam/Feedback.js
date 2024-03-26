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
import {Rating} from 'react-native-ratings';

const Feedback = ({navigation, route}) => {
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
        <Text style={styles.title}>Feedback</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.action}>
          <TextInput
            placeholder={'Class'}
            placeholderTextColor={'#555'}
            //onChangeText={txt => setUserData({...profileData, name: txt})}
            autoCorrect={false}
            style={[styles.input, {marginTop: 10}]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder={'Name'}
            placeholderTextColor={'#555'}
            //onChangeText={txt => setUserData({...profileData, name: txt})}
            autoCorrect={false}
            style={[styles.input, {marginTop: 10}]}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: '#333', fontSize: 15}}>Review of lectures</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Rating
              ratingCount={5}
              imageSize={24}
              onFinishRating={this.ratingCompleted}
              selectedColor={PRIMARY_COLOR}
            />
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: '#333', fontSize: 15}}>Review of teacher</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Rating
              ratingCount={5}
              imageSize={24}
              onFinishRating={this.ratingCompleted}
              selectedColor={PRIMARY_COLOR}
            />
          </View>
        </View>

        <View style={{width: '40%', alignSelf: 'center'}}>
          <FormButton title={'Submit'} />
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
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
    alignItems: 'center',
    marginBottom: 10,
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
    paddingVertical: 2,
  },
});

export default Feedback;
