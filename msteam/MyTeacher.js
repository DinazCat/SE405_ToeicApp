import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Rating} from 'react-native-ratings';
import AppStyle from '../theme';
import TeacherCard from '../ComponentTeam/TeacherCard';
import FormButton from '../components/FormButton';
import Api from '../api/Api';
import {AuthContext} from '../navigation/AuthProvider';

const MyTeacher = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [chosenTeacher, setChosenTeacher] = useState(null);

  const getTeachersOfClasses = async () => {
    const data = await Api.getTeachersOfClasses(user.uid);
    setTeachers(data);
  };

  useEffect(() => {
    getTeachersOfClasses();
  }, []);

  const onSave = () => {
    if (review === '') {
      Alert.alert('Input cannot be blank!', 'Please enter your review to save');
      return;
    } else if (chosenTeacher?.reviews?.some(e => (e.id = user.uid))) {
      Api.updateReview({
        id: chosenTeacher.id,
        review: {
          id: user.uid,
          name: user.displayName,
          userImg: user.photoURL,
          rating: rating,
          review: review,
        },
      }).then(async () => {
        setOpenModal(false);
        getTeachersOfClasses();
      });
    } else {
      Api.addReview({
        id: chosenTeacher.id,
        review: {
          id: user.uid,
          name: user.displayName,
          userImg: user.photoURL,
          rating: rating,
          review: review,
        },
      }).then(async () => {
        setOpenModal(false);
        getTeachersOfClasses();
      });
    }
  };

  const writeReview = item => {
    setOpenModal(true);
    setChosenTeacher(item);
    if (item?.reviews?.some(e => (e.id = user.uid))) {
      const temp = item?.reviews?.find(e => (e.id = user.uid));
      setReview(temp.review);
      setRating(temp.rating);
    } else {
      setReview('');
      setRating(5);
    }
  };

  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
                textAlign: 'center',
                flex: 1,
              }}>
              Write review
            </Text>
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
            <Rating
              ratingCount={5}
              startingValue={rating}
              imageSize={24}
              onFinishRating={value => setRating(value)}
            />
            <TextInput
              value={review}
              style={styles.input}
              onChangeText={value => setReview(value)}
              multiline
            />
          </View>
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              marginTop: -5,
            }}>
            <FormButton title={'Save'} onPress={onSave} />
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
    height: 250,
    width: 350,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: '70%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    paddingRight: 15,
    paddingTop: 7,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 5,
    marginBottom: 5,
  },
  main: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    width: '100%',
    gap: 10,
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
