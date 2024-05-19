import {useState} from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {card_color} from '../assets/colors/color';

const DetailExplore = ({navigation, route}) => {
  const [news] = useState(route.params.news);
  const [duration, setduration] = useState('00:00');
  const [duration1, setduration1] = useState(0);
  const [position, setPosition] = useState('00:00');
  const [position1, setPosition1] = useState(0);
  const [playState, setPlayState] = useState('playing');

  const onSliderEditing = () => {};

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="black" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.title}>{news.title}</Text>

        {/* Slider if needed*/}
        {news.category === 'Story' && (
          <View style={styles.slider}>
            <TouchableOpacity style={{marginRight: 20}}>
              {playState === 'playing' ? (
                <FontAwesome name="pause" color="black" size={20} />
              ) : (
                <FontAwesome name="play" color="black" size={20} />
              )}
            </TouchableOpacity>

            <Text style={styles.time}>{position}</Text>
            <Slider
              style={{width: 100, height: 40}}
              minimumValue={0}
              maximumValue={duration1}
              step={1}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#990000"
              onValueChange={onSliderEditing}
              value={position1}
            />
            {duration && <Text style={styles.time}>{duration}</Text>}
          </View>
        )}

        <View style={styles.imageContainer}>
          <Image source={{uri: news.image}} style={styles.image} />
        </View>
        <Text style={styles.content}>{news.content}</Text>
        <View style={{height: 40}} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '6%',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    margin: 5,
  },
  imageContainer: {
    backgroundColor: 'red',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    fontSize: 18,
    color: '#222',
    marginHorizontal: 10,
    lineHeight: 30,
  },
  slider: {
    backgroundColor: card_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    marginVertical: 10,
    borderRadius: 50,
  },
  time: {
    color: 'black',
    fontSize: 15,
  },
});

export default DetailExplore;
