import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import CourseCard from '../ComponentTeam/CourseCard';

const classData = [
  {
    className: 'Lớp ôn',
    maximumStudents: 20,
    joinedStudents: 18,
    level: 750,
    tuition: '2.000.000 đ',
    startDate: '12/04/2024',
    endDate: '19/07/2024',
    teacherName: 'Trần Mạnh Hùng',
  },
  {
    className: 'Lớp cơ bản cho người mất gốc',
    maximumStudents: 15,
    joinedStudents: 13,
    level: 400,
    tuition: '2.000.000 đ',
    startDate: '12/04/2024',
    endDate: '19/07/2024',
    teacherName: 'Nguyễn Quỳnh Hoa',
  },
  {
    className: 'Lớp đầu ra 550+',
    maximumStudents: 24,
    joinedStudents: 20,
    level: 550,
    tuition: '2.000.000 đ',
    startDate: '12/04/2024',
    endDate: '19/07/2024',
    teacherName: 'Trần Mạnh Hùng',
  },
  {
    className: 'Lớp ôn luyện nâng cao',
    maximumStudents: 12,
    joinedStudents: 12,
    level: 900,
    tuition: '2.000.000 đ',
    startDate: '12/04/2024',
    endDate: '19/07/2024',
    teacherName: 'Nguyễn Anh Thư',
  },
];

const CourseList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>List of all courses</Text>
      </View>

      <FlatList
        style={{padding: 10, flex: 1}}
        data={classData}
        renderItem={({item, index}) => (
          <CourseCard key={index} item={item} navigation={navigation} />
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

export default CourseList;
