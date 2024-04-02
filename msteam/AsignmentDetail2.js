import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const tableRow = item => {
  <View style={styles.row}>
    <Text style={styles.cell}>{item.State}</Text>
    <Text style={[styles.cell, {flex: 0.5}]}>{item.Points}</Text>
    <Text
      style={[
        styles.cell,
        {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
      ]}>
      Review
    </Text>
  </View>;
};
const AsignmentDetail2 = ({navigation, route}) => {
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
      <ScrollView style={styles.ContentContainer}>
        <Text style={styles.ATitleText}>{asignment.Title}</Text>
        <Text style={styles.DueText}>Start at: {asignment.Due}</Text>
        <Text style={styles.DueText}>Due at: {asignment.Due}</Text>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instruction: </Text>
        <Text style={styles.ContentText}>
          Học viên làm bài tập trong file bài tập 1 cô gửi và nộp đúng hạn
        </Text>
        <View
          style={{backgroundColor: '#9CD8FF', marginVertical: 10, padding: 5}}>
          <Text style={styles.KeyText}>Submisstion Status: </Text>
          <Text style={styles.ContentText}>Submitted</Text>
        </View>

        <View style={styles.TestInfoContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.KeyText}>Points: </Text>
            <Text style={styles.ContentText}>_/150</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Attempts Allowed: </Text>
            <Text style={styles.ContentText}>3</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Number of Questions: </Text>
            <Text style={styles.ContentText}>20</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Duration: </Text>
            <Text style={styles.ContentText}>40m</Text>
          </View>
        </View>

        <Text style={[styles.KeyText, {marginTop: 10}]}>Comments: </Text>
        <Text style={styles.UnderlineText} onPress={() => console.log(1)}>
          See and post your comment here.
        </Text>

        <Text style={[styles.KeyText, {marginVertical: 10}]}>
          Submission History:{' '}
        </Text>

        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, {fontWeight: 'bold'}]}>State</Text>
            <Text style={[styles.cell, {flex: 0.5, fontWeight: 'bold'}]}>
              Points
            </Text>
            <Text style={[styles.cell, {flex: 0.5, fontWeight: 'bold'}]}>
              Review
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Done, 12:00 21 March 2024</Text>
            <Text style={[styles.cell, {flex: 0.5}]}>60/120</Text>
            <Text
              style={[
                styles.cell,
                {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
              ]}>
              Review
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Done, 12:31 21 March 2024</Text>
            <Text style={[styles.cell, {flex: 0.5}]}>100/120</Text>
            <Text
              style={[
                styles.cell,
                {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
              ]}>
              Review
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Done, 12:31 21 March 2024</Text>
            <Text style={[styles.cell, {flex: 0.5}]}>100/120</Text>
            <Text
              style={[
                styles.cell,
                {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
              ]}>
              Review
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Done, 12:31 21 March 2024</Text>
            <Text style={[styles.cell, {flex: 0.5}]}>100/120</Text>
            <Text
              style={[
                styles.cell,
                {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
              ]}>
              Review
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            AppStyle.button.button2,
            {borderRadius: 7, marginVertical: 20},
          ]}>
          <Text style={[AppStyle.button.button1_Text, {fontWeight: '500'}]}>
            Do Again
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AsignmentDetail2;

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
  TestInfoContainer: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },

  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    padding: 5,
    color: '#444',
    fontSize: 15,
  },
});
