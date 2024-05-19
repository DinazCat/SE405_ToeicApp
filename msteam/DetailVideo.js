import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const {width} = Dimensions.get('window');

const DetailVideo = ({navigation, route}) => {
  const [video] = useState(route.params.video);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.thumbnailContainer}>
          <Image source={{uri: video.thumbnail}} style={styles.thumbnail} />
          <Text style={styles.time}>{video.time}</Text>
        </View>
        <Text style={styles.title}>{video.title}</Text>
        <View style={styles.channel}>
          <Image
            source={{uri: video.channelImage}}
            style={{height: 28, width: 28, borderRadius: 50}}
          />
          <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
            {video.channel}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Play with subtitle mode
          </Text>
          <Ionicons name="play-circle" color="white" size={40} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    width: width,
    height: 220,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: card_color,
  },
  time: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'black',
    color: card_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channel: {flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10},
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DetailVideo;
