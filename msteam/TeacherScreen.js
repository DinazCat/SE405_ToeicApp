import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {PRIMARY_COLOR} from '../assets/colors/color';

const TeacherScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text style={styles.title}>Teacher</Text>
      </View>

      <View style={styles.buttonList}>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#CBE577'}]}
          onPress={() => navigation.navigate('MyTeacher')}>
          <Text style={styles.text}>My Teachers</Text>
          <FontAwesome5 name="chevron-right" size={20} color={'#222'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#F0F0F0'}]}
          onPress={() => navigation.navigate('TeacherList')}>
          <Text style={styles.text}>Teacher List</Text>
          <FontAwesome5 name="chevron-right" size={20} color={'#222'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#99B852'}]}
          onPress={() => navigation.navigate('CourseList')}>
          <Text style={styles.text}>Course List</Text>
          <FontAwesome5 name="chevron-right" size={20} color={'#222'} />
        </TouchableOpacity>
      </View>
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
  buttonList: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    display: 'flex',
    flex: 1,
    gap: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
  },
});

export default TeacherScreen;
