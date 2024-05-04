import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import CourseCard from '../ComponentTeam/CourseCard';
import Api from '../api/Api';

const CourseList_tc = ({navigation, route}) => {
  const [classes, setClasses] = useState([]);
  const teacherId = route.params?.teacherId;

  const getClassesByUserTeacher = async () => {
    const data = await Api.getClassesByUser(teacherId);
    setClasses(data);
  };

  useEffect(() => {
     getClassesByUserTeacher();
  }, []);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Your courses</Text>
      </View>

      <View style={{flex: 1, paddingTop: 20}}>
        {classes?.length !== 0 ? (
          <FlatList
            style={{flex: 1}}
            data={classes}
            renderItem={({item, index}) => (
              <CourseCard key={index} item={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 15}}>
                You don't have any courses yet.
              </Text>
          </View>
        )}
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
});

export default CourseList_tc;
