import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../assets/colors/color';

const DetailCourse = ({navigation, route}) => {
  const item = route.params.course;
  return (
    <View style={styles.container}>
      <View
        style={[
          AppStyle.viewstyle.component_upzone,
          {justifyContent: 'space-between'},
        ]}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        {/* <Text style={[styles.header, {flex: 1}]}>{item.ClassName}</Text> */}
        <Text style={[styles.header, {marginRight: '2%'}]}>Register</Text>
      </View>

      <ScrollView style={{flex: 1, padding: 10}}>
        <Text style={styles.title}>{item.ClassName}</Text>

        <View style={styles.textContainer}>
          <Text style={styles.normal}>{'Teacher: '}</Text>
          <Text style={styles.content}>{item.userName}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.normal}>{'Level: '}</Text>
          <Text style={styles.content}>{item.Level}+</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.normal}>{'Number: '}</Text>
          <Text style={styles.content}>
            {item.Participants?.length}/{item.MaximumStudents} students
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.normal}>{'Tuition: '}</Text>
          <Text style={styles.content}>
            {item.Tuition?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.normal}>{'Duration: '}</Text>
          <Text style={styles.content}>
            {item.Start_Date}
            {' - '}
            {item.Finish_Date}
          </Text>
        </View>

        <Text style={[styles.normal, {marginTop: 10}]}>Review:</Text>
      </ScrollView>
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
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 5,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  normal: {
    fontSize: 17,
    color: 'black',
    minWidth: '25%',
  },
  content: {
    fontWeight: '600',
    paddingBottom: 2,
    borderBottomWidth: 1,
    fontSize: 17,
    color: 'black',
  },
});

export default DetailCourse;
