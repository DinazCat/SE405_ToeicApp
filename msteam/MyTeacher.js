import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import TeacherCard from '../ComponentTeam/TeacherCard';
import FormButton from '../components/FormButton';
import Api from '../api/Api';

const MyTeacher = ({navigation}) => {
  const [teachers, setTeachers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [review, setReview] = useState('');

  const writeReview = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getAllTeachers = async () => {
      const data = await Api.getAllTeachers();
      setTeachers(data);
    };

    getAllTeachers();
  }, []);

  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={{fontSize: 16, color: 'black'}}>Write review</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenModal(false)}>
              <FontAwesome5
                name={'times-circle'}
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.main}>
            <TextInput
              value={review}
              style={styles.input}
              onChangeText={value => setReview(value)}
            />
          </View>
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              marginTop: -5,
            }}>
            <FormButton title={'Save'} />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>My Teachers</Text>
      </View>

      <FlatList
        style={{padding: 10, flex: 1}}
        data={teachers}
        renderItem={({item, index}) => (
          <TeacherCard
            key={index}
            item={item}
            navigation={navigation}
            viewCourse={false}
            writeReview={writeReview}
          />
        )}
      />
      {RenderModal()}
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
  modal: {
    height: 210,
    width: 350,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 200,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    paddingRight: 15,
    paddingTop: 7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 15,
  },
  main: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    fontSize: 16,
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    alignSelf: 'center',
    color: '#333',
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default MyTeacher;
