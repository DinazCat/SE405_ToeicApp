import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import TeacherCard from '../ComponentTeam/TeacherCard';

const classData = [
  {
    teacherName: 'Nguyễn Quỳnh Hoa',
    stars: 4,
    writedReview: false,
  },
  {
    teacherName: 'Nguyễn Anh Thư',
    stars: 4.5,
    writedReview: true,
  },
  {
    teacherName: 'Trần Mạnh Hùng',
    stars: 5,
    writedReview: false,
  },
  {
    teacherName: 'Trần Mạnh Hùng',
    stars: 5,
    writedReview: true,
  },
];

const MyTeacher = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>My Teachers</Text>
      </View>

      <FlatList
        style={{padding: 10, flex: 1}}
        data={classData}
        renderItem={({item, index}) => (
          <TeacherCard key={index} item={item} navigation={navigation} />
        )}
      />
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
});

export default MyTeacher;
