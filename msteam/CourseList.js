import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import CourseCard from '../ComponentTeam/CourseCard';
import Api from '../api/Api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {card_color} from '../assets/colors/color';
import {AuthContext} from '../navigation/AuthProvider';
const sortList = [
  {
    label: `Cheap`,
    value: 'Cheap',
  },
  {
    label: 'Quality',
    value: 'Quality',
  },
  {
    label: 'Many students',
    value: 'Many students',
  },
];

const CourseList = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const teacherId = route.params?.teacherId;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sort, setSort] = useState('');
  const [recommendClasses, setRecommendClasses] = useState([]);
  const [otherClasses, setOtherClasses] = useState([]);

  const getAllClasses = async () => {
    const currentUser = await Api.getUserData(user.uid);
    const data = await Api.getAllClasses();
    setClasses(data);

    const recommendItems = [];
    const othersItems = [];

    data.forEach(classItem => {
      if (
        classItem.Level < currentUser.targetScore + 100 &&
        classItem.Level > currentUser.targetScore - 100 &&
        classItem.baseLevel < currentUser.currentScore + 100
      ) {
        recommendItems.push(classItem);
      } else othersItems.push(classItem);
    });

    setRecommendClasses(recommendItems);
    setOtherClasses(othersItems);
  };
  const getClassesByUserTeacher = async () => {
    const data = await Api.getClassesByUser(teacherId);
    setClasses(data);
  };

  useEffect(() => {
    if (teacherId) getClassesByUserTeacher();
    else getAllClasses();
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
      <View style={{flex: 1, paddingTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter content..."
              placeholderTextColor={'#555'}
              // onChangeText={text => {
              //   setContent(text)
              // }}
            />
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name={'search-outline'} style={styles.IconButton} />
            </TouchableOpacity>
          </View>
          <DropDownPicker
            items={sortList}
            placeholder="Sort"
            open={openDropdown}
            setOpen={() => setOpenDropdown(!openDropdown)}
            value={sort}
            containerStyle={{
              height: 40,
              width: 80,
            }}
            style={{borderRadius: 25}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setSort(item)}
            maxHeight={100}
          />
        </View>

        <ScrollView style={{marginTop: 10, flex: 1}}>
          <Text style={styles.textFont}>Recommend for you</Text>
          {recommendClasses?.length !== 0 && (
            <FlatList
              style={{flex: 1}}
              data={recommendClasses}
              renderItem={({item, index}) => (
                <CourseCard key={index} item={item} navigation={navigation} />
              )}
            />
          )}
          <Text style={styles.textFont}>Others</Text>
          {otherClasses?.length !== 0 && (
            <FlatList
              style={{flex: 1}}
              data={otherClasses}
              renderItem={({item, index}) => (
                <CourseCard key={index} item={item} navigation={navigation} />
              )}
            />
          )}
          {classes?.length === 0 && (
            <View style={{marginHorizontal: 10}}>
              {teacherId && (
                <Text style={{fontSize: 15}}>
                  Teacher doesn't have any courses yet.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
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
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#555',
    borderRadius: 25,
    borderWidth: 1,
    width: '70%',
    height: 45,
    marginLeft: 20,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    width: '88%',
  },
  IconButton: {
    color: '#555',
    fontSize: 25,
    padding: 5,
    marginTop: 4,
    //marginLeft: 5
  },
  input1: {
    fontSize: 16,
    borderColor: card_color,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    paddingLeft: 10,
    color: '#333',
    width: 100,
  },
  textFont: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default CourseList;
