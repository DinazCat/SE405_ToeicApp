import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormButton from '../components/FormButton';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
import ChatCard from '../ComponentTeam/ChatCard';

const NewTeam = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>New team</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.action}>
          <TextInput
            placeholder={'Team name'}
            placeholderTextColor={'#555'}
            // value={profileData ? profileData.name : ''}
            //onChangeText={txt => setUserData({...profileData, name: txt})}
            autoCorrect={false}
            style={[styles.input, {height: 40}]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder={'Description'}
            placeholderTextColor={'#555'}
            // value={profileData ? profileData.name : ''}
            //onChangeText={txt => setUserData({...profileData, name: txt})}
            autoCorrect={false}
            numberOfLines={3}
            multiline
            style={[styles.input]}
          />
        </View>
      </View>
      <View style={{width: '40%', alignSelf: 'center'}}>
        <FormButton title={'Create team'} onPress={() => navigation.push('AddMember')} />
      </View>
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
    margin: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
    alignItems: 'center',
  },
  input: {
    color: '#333',
    paddingLeft: 10,
    fontSize: 15,
    flex: 1,
    color: '#555',
  },
  title: {
    marginHorizontal: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
});
export default NewTeam;
