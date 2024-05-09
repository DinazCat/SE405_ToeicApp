import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import FormButton from '../components/FormButton';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Api from '../api/Api';

const skills = ['Listening', 'Reading', 'Communication', 'Teaching'];

const DetailCourse = ({navigation, route}) => {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const item = route.params.course;

  useEffect(() => {
    const getProfile = async () => {
      const data = await Api.getUserData(item.userId);
      setTeacherProfile(data);
    };

    getProfile();
  }, []);

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
        <Text style={[styles.header, {flex: 1}]}>{item.ClassName}</Text>
        {/* <Text
          style={[styles.header, {marginRight: '2%'}]}
          onPress={() => navigation.push('RegisterCourse', {course: item})}>
          Register
        </Text> */}
      </View>

      <ScrollView style={{flex: 1, padding: 10}}>
        <Text style={styles.title}>{item.ClassName}</Text>

        {/*Teacher information*/}
        <View style={styles.inforContainer}>
          <View style={{gap: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.userImg}
              source={{
                uri: teacherProfile?.userImg
                  ? teacherProfile.userImg
                    ? teacherProfile.userImg
                    : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
              }}
            />
            <View style={{gap: 5}}>
              <Text style={styles.inforTitle}>Teacher's course</Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={styles.normalTeacher}>{'Name: '}</Text>
                <Text style={styles.normalTeacher}>{item.userName}</Text>
              </View>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={styles.normalTeacher}>{'Toeic score: '}</Text>
                <Text style={styles.normalTeacher}>
                  {teacherProfile?.score}
                </Text>
              </View>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text>{item.Stars ? item.Stars : '0'}</Text>
                <FontAwesome name="star" color="orange" size={20} />
                <Text>
                  / {item.Reviews?.lengths ? item.Reviews.lengths : '0'} Reviews
                </Text>
              </View>
            </View>
          </View>
          {item?.skills?.length !== 0 && (
            <View
              style={{
                flexDirection: 'row',
                gap: 7,
                flexWrap: 'wrap',
              }}>
              {item.skills?.map((item, index) => (
                <Text key={index} style={styles.skills}>
                  {item}
                </Text>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: 'lightgray',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              width: '40%',
              alignSelf: 'flex-end',
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.push('ProfileTeacher', {profile: teacherProfile})
            }>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'black'}}>
              Detail
            </Text>
            <FontAwesome name="chevron-right" color="black" size={12} />
          </TouchableOpacity>
        </View>

        <View style={[styles.inforContainer, {paddingVertical: 15}]}>
          <Text style={[styles.inforTitle, {textAlign: 'center'}]}>
            Course Information
          </Text>
          <View style={[styles.textContainer]}>
            <Text style={styles.normal}>{'Level: '}</Text>
            <Text style={styles.content}>{item.Level}+</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.normal}>{'Number: '}</Text>
            <Text style={styles.content}>
              {item.Members?.length ? item.Members?.length : '0'}/
              {item.MaximumStudents} students
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

          {item.description && (
            <View style={styles.textContainer}>
              <Text style={styles.normal}>{'Description: '}</Text>
              <Text style={styles.content}>{item.Description}</Text>
            </View>
          )}
        </View>
        <View style={{width: '40%', alignSelf: 'center'}}>
          <FormButton
            title={'Register'}
            onPress={() => navigation.push('RegisterCourse', {course: item})}
          />
        </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  normal: {
    fontSize: 15,
    color: '#333',
    minWidth: '25%',
  },
  content: {
    fontWeight: '600',
    paddingBottom: 2,
    borderBottomWidth: 1,
    fontSize: 15,
    color: '#333',
  },
  userImg: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  inforContainer: {
    backgroundColor: card_color,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    gap: 10,
    flexDirection: 'column',
  },
  inforTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  skills: {
    backgroundColor: '#D0E895',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  normalTeacher: {
    fontSize: 15,
    color: '#333',
  },
});

export default DetailCourse;
