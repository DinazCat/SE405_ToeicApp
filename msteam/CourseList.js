import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import CourseCard from '../ComponentTeam/CourseCard';
import Api from '../api/Api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { card_color } from '../assets/colors/color';
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
  const [classes, setClasses] = useState([]);
  const teacherId = route.params?.teacherId;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sort, setSort] = useState('');
  const getAllClasses = async () => {
    const data = await Api.getAllClasses();
    setClasses(data);
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
      <View style={{flex: 1, paddingTop: 10, zIndex:0}}>
      
      <View style={{flexDirection:'row', justifyContent:'center', zIndex:0}} >
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            placeholder="Enter content..."
            placeholderTextColor={'#555'}
            // onChangeText={text => {
            //   setContent(text)
            // }}
            />
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name={'search-outline'} style={styles.IconButton}/>        
          </TouchableOpacity>
        </View>    
      </View>
      <DropDownPicker
            items={sortList}
            placeholder="Sort"
            open={openDropdown}
          setOpen={() => setOpenDropdown(!openDropdown)}
            value={sort}
            containerStyle={{
              height: 10,
              width: 100,
              margin: 10,
              alignSelf:'flex-end',
            }}
      
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setSort(item)}
            maxHeight={100}
            zIndex={1}
          />
          <View style={{marginTop:10, flex:1}}>
          {classes?.length !== 0 ? (
          <FlatList
            style={{flex: 1}}
            data={classes}
            renderItem={({item, index}) => (
              <CourseCard key={index} item={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={{marginHorizontal: 10}}>
            {teacherId && (
              <Text style={{fontSize: 15}}>
                Teacher doesn't have any courses yet.
              </Text>
            )}
          </View>
        )}
          </View>
       
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
    width: '90%',
    height: 45,
  },
  input:{
    fontSize: 16,
    width: '88%'
  },
  IconButton:{
    color: '#555', 
    fontSize: 25, 
    padding: 5,
    marginTop: 4
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
});

export default CourseList;
