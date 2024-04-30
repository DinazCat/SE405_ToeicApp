import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import CourseCard from '../ComponentTeam/CourseCard';
import Api from '../api/Api';

const CourseList = ({navigation}) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getAllClasses = async () => {
      const data = await Api.getAllClasses();
      setClasses(data);
    };

    getAllClasses();
    console.log(classes);
  }, []);
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

      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          style={{flex: 1}}
          data={classes}
          renderItem={({item, index}) => (
            <CourseCard key={index} item={item} navigation={navigation} />
          )}
        />
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

export default CourseList;
