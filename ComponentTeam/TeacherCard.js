import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import {AuthContext} from '../navigation/AuthProvider';

const TeacherCard = ({item, navigation, writeReview, viewCourse}) => {
  const {user} = useContext(AuthContext);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [writedReview, setWritedReview] = useState(() =>
    item?.reviews?.some(e => (e.id = user.uid)),
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);
  useEffect(() => {
    setWritedReview(item?.reviews?.some(e => (e.id = user.uid)));
  }, [item?.reviews?.length]);

  return (
    <View style={[styles.container, {width: screenWidth * 0.9}]}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
        }}
      />
      <Text style={styles.mainText}>{item.name}</Text>
      <View style={{flexDirection: 'row', alignSelf: 'center', gap: 2}}>
        <Text style={{color: '#444'}}>{item.rating}</Text>
        <FontAwesome name="star" color="orange" size={20} />
        <Text style={{color: '#444'}}>
          / {item.reviews?.length ? item.reviews.length : '0'} Reviews
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ProfileTeacher', {profile: item})
          }>
          <Text style={styles.buttonText}>View profile</Text>
        </TouchableOpacity>

        {viewCourse ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('CourseList', {teacherId: item.id})
            }>
            <Text style={styles.buttonText}>Course list</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => writeReview(item)}>
            <Text style={styles.buttonText}>
              {writedReview ? 'Edit review' : 'Write review'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: card_color,
    padding: 20,
    gap: 5,
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  mainText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
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
});

export default TeacherCard;
