import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import Api from '../api/Api';
import eventEmitter from '../utils/EventEmitter';

const tableRow = item => {
  <View style={styles.row}>
    <Text style={styles.cell}>{item.state}</Text>
    <Text style={[styles.cell, {flex: 0.5}]}>{item.points}</Text>
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
  const {user, isTeacher} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const {assignment} = route.params;
  const [isPastDue, setPastDue] = useState(route.params?.isPastDue);
  const [isSubmitted, setSubmitted] = useState(route.params?.isSubmitted);
  const [submissions, setSubmissions] = useState(route.params.submissions);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(user.uid);
      setCurrentUser(data);
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      console.log(data);

      const submissions = assignment.submissions || [];
      const index = submissions.findIndex(sub => sub.userId === user.uid);

      if (index !== -1) {
        submissions[index].submissions = [
          ...submissions[index].submissions,
          data,
        ];
      } else {
        const submission = {
          userId: user.uid,
          userName: currentUser.name,
          userImg: currentUser.userImg,
          submissions: [data],
        };
        submissions.push(submission);
      }

      Api.updateAsignment(submissions, assignment.id);

      setSubmitted(true);
    };

    eventEmitter.on('completeAsignment', listener);

    return () => {
      eventEmitter.removeListener('completeAsignment', listener);
    };
  }, []);

  const getTime = string => {
    const date = new Date(string);
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const time = timeFormatter?.format(date);
    return time;
  };

  const getDate = string => {
    const date = new Date(string);
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const formattedDate = dateFormatter?.format(date);
    return formattedDate;
  };

  const onStartTest = () => {
    navigation.push('QuestionScreen', {
      questionList: assignment.test.questions,
      part: assignment.test.part,
      //partName: partname,
      numberofQuestion: assignment.test.questions.length,
      from: 'assignment',
      assignmentInfo: {
        assignmentId: assignment.id,
        userSubmissions: submissions,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>{assignment.className}</Text>
          <Text style={styles.headerText2}>Asignment</Text>
        </View>
      </View>
      <ScrollView style={styles.ContentContainer}>
        <Text style={styles.ATitleText}>{assignment.title}</Text>
        <Text style={styles.DueText}>
          Start at: {getTime(assignment.startTime)}{' '}
          {getDate(assignment.startDate)}
        </Text>
        <Text style={styles.DueText}>
          Due at: {getTime(assignment.dueTime)} {getDate(assignment.dueDate)}
        </Text>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instructions: </Text>
        <Text style={styles.ContentText}>{assignment.instruction}</Text>
        <View
          style={{
            backgroundColor: isSubmitted ? '#DCFFA7' : '#FFFBC4',
            marginVertical: 10,
            padding: 5,
          }}>
          <Text style={styles.KeyText}>Submisstion Status: </Text>
          <Text style={styles.ContentText}>
            {isSubmitted ? 'Already submitted' : `Haven't submitted`}
          </Text>
        </View>

        <View style={styles.TestInfoContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.KeyText}>Points: </Text>
            <Text style={styles.ContentText}>_/150</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Attempts Allowed: </Text>
            <Text style={styles.ContentText}>{assignment.attemptsAllow}</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Number of Questions: </Text>
            <Text style={styles.ContentText}>
              {assignment.test.questions.length}
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.KeyText}>Duration: </Text>
            <Text style={styles.ContentText}>{assignment.test.time}m</Text>
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

        {!isPastDue && submissions.length < assignment.attemptsAllow && (
          <TouchableOpacity
            onPress={onStartTest}
            style={[
              AppStyle.button.button2,
              {borderRadius: 7, marginVertical: 20},
            ]}>
            <Text style={[AppStyle.button.button1_Text, {fontWeight: '500'}]}>
              {submissions.length === 0 ? 'Do test' : 'Do again'}
            </Text>
          </TouchableOpacity>
        )}
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
