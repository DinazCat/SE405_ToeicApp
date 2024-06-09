import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Api from '../api/Api';
const {width, height} = Dimensions.get('window');
const CreateFolder = ({close, teacherName, classId, navigation}) => {
  const [text, setText] = useState('');
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
  const getTime = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    return (
      currentDay +
      '/' +
      currentMonth +
      '/' +
      currentYear +
      ' at ' +
      currentHours +
      ':' +
      currentMinutes
    );
  };
  const pushFolder = async () => {
    let data = {
      User: teacherName,
      Time: getTime(),
      Name: text,
      sign: 'folder',
    };
    const res = await Api.addFolder(data).then(async m => {
      console.log(m);
      await Api.updateFile({...data, idFolder: m}, classId);
    });
    close();
  };
  return (
    <View
      style={{
        height: 200,
        width: 350,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        alignSelf: 'center',
        marginVertical: 200,
        backgroundColor: 'white',
        position: 'absolute',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 5,
            color: 'black',
            fontWeight: '500',
          }}>
          Create folder
        </Text>
        <TouchableOpacity style={{}} onPress={close}>
          <Icon
            name={'times-circle'}
            style={{color: 'black', fontSize: 20, marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Folder's name:</Text>
      <TextInput
        style={styles.input}
        value={text}
        // placeholder={placeholderText}
        placeholderTextColor="#666"
        onChangeText={value => setText(value)}
      />

      <TouchableOpacity
        style={{
          backgroundColor: PRIMARY_COLOR,
          width: 90,
          borderRadius: 20,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}
        onPress={() => {
          pushFolder();
        }}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  input: {
    padding: 10,
    width: 200,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginLeft: 10,
  },
});
export default CreateFolder;
