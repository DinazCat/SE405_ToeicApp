import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import {AuthContext} from '../navigation/AuthProvider';

const CourseCard = ({navigation, item}) => {
  const {user} = useContext(AuthContext);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [isRegister, setIsRegister] = useState(() => {
    if (item?.Members?.some(e => e.id === user.uid)) return true;
    return false;
  });

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  return (
    <View style={[styles.container, {width: screenWidth * 0.9}]}>
      <Text style={[styles.mainText, styles.color]}>{item.ClassName}</Text>
      <Text style={[styles.text, {fontWeight: '600'}]}>{item.userName}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>
          {'Level: '}
          <Text style={[styles.bold, styles.color]}>{item.Level}+</Text>
        </Text>
        <Text style={[styles.bold, styles.italic]}>
          {item.Members?.length ? item.Members?.length : '0'}/
          {item.MaximumStudents} students
        </Text>
      </View>
      <Text style={styles.text}>
        {'Tuition: '}
        <Text style={[styles.bold]}>
          {item.Tuition?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      </Text>
      <Text style={styles.text}>
        {'Duration: '}
        <Text style={styles.bold}>{item.Start_Date}</Text>
        {' - '}
        <Text style={styles.bold}>{item.Finish_Date}</Text>
      </Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('DetailCourse', {course: item})}>
          <Text style={styles.buttonText}>View detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isRegister ? styles.disabledButton : styles.button}
          disabled={isRegister}
          onPress={() => navigation.push('RegisterCourse', {course: item})}>
          <Text style={isRegister ? styles.disabledText : styles.buttonText}>
            Register course
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: card_color,
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
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
    marginTop: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: card_color,
    fontWeight: '600',
  },
  disabledButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 4,
    borderRadius: 20,
  },
  disabledText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
});

export default CourseCard;
