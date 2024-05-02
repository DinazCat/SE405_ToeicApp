import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import TeacherCard from '../ComponentTeam/TeacherCard';
import Api from '../api/Api';

const TeacherList = ({navigation}) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getAllTeachers = async () => {
      const data = await Api.getAllTeachers();
      setTeachers(data);
    };

    getAllTeachers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>List of all teachers</Text>
      </View>

      <FlatList
        style={{padding: 10, flex: 1}}
        data={teachers}
        renderItem={({item, index}) => (
          <TeacherCard
            key={index}
            item={item}
            navigation={navigation}
            viewCourse={true}
          />
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

export default TeacherList;
