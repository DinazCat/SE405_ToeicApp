import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import AsignmentCard from '../ComponentTeam/AsignmentCard';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../navigation/AuthProvider';
import Api from '../api/Api';
import socketServices from '../api/socketService';

const AsignmentScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const [upcomingAssignments, setUpcoming] = useState([]);
  const [pastDueAssignments, setPastDue] = useState([]);
  const [completedAssignments, setCompleted] = useState([]);

  const assignments = useRef();
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  useEffect(async () => {
    await getAsignments();
    categorizeAssignments();
  }, []);

  useEffect(() => {
    socketServices.initializeSocket();
    socketServices.on('assignment change', async () => {
      await getAsignments();
      categorizeAssignments();
    });
  }, []);

  const getAsignments = async () => {
    const res = await Api.getClassesByUser(user.uid);
    let userClassIds = res.map(classItem => classItem.classId);

    const userAsignments = await Api.getClassAsignments(userClassIds);
    assignments.current = userAsignments;
  };

  function compareDateTime(date, time) {
    const currentDate = new Date();
    const dueDate = new Date(date);
    const dueTime = new Date(time);

    const dueDateTime = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
      dueTime.getHours(),
      dueTime.getMinutes(),
      dueTime.getSeconds(),
    );
    return currentDate < dueDateTime;
  }

  const categorizeAssignments = () => {
    const now = new Date();
    const upcomingAssignments = [];
    const pastDueAssignments = [];
    const completedAssignments = [];

    assignments.current.forEach(assignment => {
      if (compareDateTime(assignment.dueDate, assignment.dueTime)) {
        upcomingAssignments.push(assignment);
      }
      if (!compareDateTime(assignment.dueDate, assignment.dueTime)) {
        console.log(assignment.submissions);
        const foundUserSubmission = assignment.submissions?.find(
          submission => submission.userId === user.uid,
        );
        if (foundUserSubmission) {
          completedAssignments.push(assignment);
        } else pastDueAssignments.push(assignment);
      }
    });

    setUpcoming(upcomingAssignments);
    setPastDue(pastDueAssignments);
    setCompleted(completedAssignments);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      categorizeAssignments();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [assignments]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    return formattedDate;
  };

  const onAssignmentPress = item => {
    if (item.type === 1) {
      const userSubmission = item.submissions?.find(
        submission => submission.userId === user.uid,
      );
      navigation.navigate('AsignmentDetail', {
        assignment: item,
        isPastDue: !compareDateTime(item.dueDate, item.dueTime),
        isSubmitted: userSubmission ? true : false,
        submissionFiles: userSubmission ? userSubmission.submissionFiles : [],
      });
    } else if (item.type === 2) {
      const userSubmission = item.submissions?.find(
        submission => submission.userId === user.uid,
      );
      navigation.navigate('AsignmentDetail2', {
        assignment: item,
        isPastDue: !compareDateTime(item.dueDate, item.dueTime),
        isSubmitted: userSubmission ? true : false,
        submissions: userSubmission ? userSubmission.submissions : [],
      });
    }
  };

  const previousUpcommingDates = {};
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
          }}>
          Asignment
        </Text>
      </View>
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 0 ? '#FFFBC4' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(0)}>
          <Text style={styles.tabFont}>Upcomming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 1 ? '#F1A3A2' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(1)}>
          <Text style={styles.tabFont}>Past due</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 2 ? '#9CD8FF' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(2)}>
          <Text style={styles.tabFont}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.devider} />
      {selectedTab == 0 && (
        <>
          {upcomingAssignments.map((item, key) => {
            const showDate = !previousUpcommingDates[formatDate(item.dueDate)];
            if (showDate) {
              previousUpcommingDates[formatDate(item.dueDate)] = true;
            }

            return (
              <>
                {showDate && (
                  <Text style={styles.DateText}>
                    {formatDate(item.dueDate)}
                  </Text>
                )}
                <AsignmentCard
                  key={key}
                  item={item}
                  onPress={() => onAssignmentPress(item)}
                />
              </>
            );
          })}
        </>
      )}
      {selectedTab == 1 && (
        <>
          {pastDueAssignments.map((item, key) => (
            <>
              <Text style={styles.DateText}>{item.Date}</Text>
              <AsignmentCard key={key} item={item} />
            </>
          ))}
        </>
      )}
      {selectedTab == 2 && (
        <>
          {completedAssignments.map((item, key) => (
            <>
              <Text style={styles.DateText}>{item.Date}</Text>
              <AsignmentCard key={key} item={item} />
            </>
          ))}
        </>
      )}
      {true && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            marginLeft: screenWidth - 80,
            marginTop: screenHeight - 120,
            borderRadius: 25,
            width: 50,
            height: 50,
            backgroundColor: PRIMARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('BeforeNewAsignment')}>
          <Icon name={'plus'} size={20} color={'white'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AsignmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  tabItem: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 7,
  },
  tabFont: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  devider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DDD',
    marginVertical: 2,
  },
  DateText: {
    marginLeft: 15,
    marginVertical: 5,
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
});
