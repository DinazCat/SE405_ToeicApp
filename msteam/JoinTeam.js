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

const JoinTeam = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Join team</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          //   ref={textInputRef}
          //   value={comment}
          //   onChangeText={txt => {
          //     setComment(txt);
          //   }}
          placeholder={'Enter team code'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={styles.input}
        />
      </View>
      <View style={{width: '40%', alignSelf: 'center'}}>
        <FormButton title={'Join'} />
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
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    gap: 10,
  },
  input: {
    color: '#666',
    padding: 0,
    flex: 1,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
});
export default JoinTeam;
