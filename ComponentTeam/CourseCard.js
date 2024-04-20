import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const CourseCard = ({item}) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {width: screenWidth * 0.9, backgroundColor: card_color},
      ]}>
      <Text style={[styles.mainText, styles.color]}>{item.className}</Text>
      <Text style={[styles.text, styles.italic]}>{item.teacherName}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>
          {'Level: '}
          <Text style={[styles.bold, styles.italic, styles.color]}>
            {item.level}
          </Text>
        </Text>
        <Text style={[styles.bold, styles.italic]}>
          {item.joinedStudents}/{item.maximumStudents} students
        </Text>
      </View>
      <Text style={styles.text}>
        {'Tuition: '}
        <Text style={[styles.bold]}>{item.tuition}</Text>
      </Text>
      <Text style={styles.text}>
        {'Duration: '}
        <Text style={styles.bold}>{item.startDate}</Text>
        {' - '}
        <Text style={styles.bold}>{item.endDate}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    alignItems: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingBottom: 12,
    gap: 4,
  },
  row: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    color: '#222',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  color: {
    color: '#9ACC1C',
  },
});

export default CourseCard;
