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
import RegisterTeacher from './RegisterTeacher';
import Feedback from './Feedback';

const TeacherScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>TeacherScreen</Text> */}
      {/* <RegisterTeacher /> */}
      <Feedback />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default TeacherScreen;
