import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const AsignmentDetail = ({navigation, route}) => {
  const {asignment} = route.params;
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>{asignment.Class}</Text>
          <Text style={styles.headerText2}>Asignment</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
        <Text style={styles.ATitleText}>{asignment.Title}</Text>
        <Text style={styles.DueText}>Due at: {asignment.Due}</Text>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instruction: </Text>
        <Text style={styles.ContentText}>
          Học viên làm bài tập trong file bài tập 1 cô gửi và nộp đúng hạn
        </Text>
        <View
          style={{backgroundColor: '#FFFBC4', marginVertical: 10, padding: 5}}>
          <Text style={styles.KeyText}>Submisstion Status: </Text>
          <Text style={styles.ContentText}>Haven't submitted</Text>
        </View>

        <Text style={styles.KeyText}>Points: </Text>
        <Text style={styles.ContentText}>No points</Text>

        <Text style={[styles.KeyText, {marginTop: 10}]}>Comments: </Text>
        <Text style={styles.UnderlineText} onPress={() => console.log(1)}>
          See and post your comment here.
        </Text>

        <TouchableOpacity
          style={[AppStyle.button.button2, {borderRadius: 7, marginTop: 50}]}>
          <Text style={[AppStyle.button.button1_Text, {fontWeight: '500'}]}>
            {' '}
            Add Submission
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AsignmentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContentContainer: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  headerText2: {
    color: 'white',
    fontSize: 15,
    marginLeft: 15,
  },
  ATitleText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 10,
  },
  DueText: {
    color: '#444',
    fontSize: 15,
    fontWeight: '500',
  },
  KeyText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  ContentText: {
    color: '#222',
    fontSize: 17,
    fontWeight: '400',
  },
  UnderlineText: {
    color: 'blue',
    fontSize: 17,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
