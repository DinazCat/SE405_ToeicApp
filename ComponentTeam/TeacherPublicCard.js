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

const TeacherPublicCard = ({item}) => {
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
    <View style={[styles.container, {width: screenWidth * 0.9}]}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
        }}
      />
      <Text style={styles.mainText}>{item.teacherName}</Text>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 5}}>
        <Text>{item.stars}</Text>
        <FontAwesome
          name="star"
          color="orange"
          size={20}
          style={{marginHorizontal: 4}}
        />
        <Text>/ 0 Review</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={item.writedReview}>
          <Text style={styles.buttonText}>Course list</Text>
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
    marginBottom: 40,
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
    marginTop: 10,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#D0E895',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default TeacherPublicCard;
