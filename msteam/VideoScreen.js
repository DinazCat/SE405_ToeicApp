import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const videos = [
  {
    title: 'Freak robot made in China can learn, think, work like humans',
    category: 'Video',
    channel: 'Oxford',
    time: '20:05',
    channelImage:
      'https://yt3.googleusercontent.com/ytc/AIdro_l9vxewHnT2_r54mnV8MBnSzn-aNfxt84V4XtytUZNzqw=s176-c-k-c0x00ffffff-no-rj-mo',
    thumbnail:
      'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-The-S1-AI-powered-robot-is-outpacing-humans-big-time.jpg?ve=1&tl=1',
  },
  {
    title:
      'They were pretty much everywhere: This Cambridge couple pulled more than a dozen ticks off their dog',
    category: 'Video',
    channel: 'Oxford',
    time: '20:05',
    channelImage:
      'https://yt3.googleusercontent.com/ytc/AIdro_l9vxewHnT2_r54mnV8MBnSzn-aNfxt84V4XtytUZNzqw=s176-c-k-c0x00ffffff-no-rj-mo',
    thumbnail:
      'https://s.yimg.com/ny/api/res/1.2/VYlhqR4uSjs7fLACw.dyNQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNjA0O2NmPXdlYnA-/https://media.zenfs.com/en/cbc.ca/a1b99925f20ac93d5fc54417a20f7606',
  },
  {
    title: 'How to change camera zoom levels on your iPhone',
    category: 'Video',
    channel: 'Oxford',
    time: '20:05',
    channelImage:
      'https://yt3.googleusercontent.com/ytc/AIdro_l9vxewHnT2_r54mnV8MBnSzn-aNfxt84V4XtytUZNzqw=s176-c-k-c0x00ffffff-no-rj-mo',
    thumbnail:
      'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-How-to-change-camera-zoom-levels-on-your-iPhone.jpg?ve=1&tl=1',
  },
  {
    title:
      '20 Office Expressions to Describe Your Workplace - Visual Vocabulary',
    category: 'Video',
    time: '20:05',
    channelImage:
      'https://yt3.googleusercontent.com/ytc/AIdro_l9vxewHnT2_r54mnV8MBnSzn-aNfxt84V4XtytUZNzqw=s176-c-k-c0x00ffffff-no-rj-mo',
    channel: 'Oxford',
    thumbnail: 'https://i.ytimg.com/vi/_B2OYMuaXD4/maxresdefault.jpg',
  },
];

const VideoScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Videos</Text>
      </View>

      <ScrollView style={{padding: 10, paddingTop: 0}}>
        <FlatList
          data={videos}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.push('DetailVideo', {video: item})}>
              <View style={styles.imageContainer}>
                <View style={styles.playIcon}>
                  <Ionicons name="play" size={24} color="gray" />
                </View>
                <Image source={{uri: item.thumbnail}} style={styles.image} />
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.title}>{item.title}</Text>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Image
                    source={{uri: item.channelImage}}
                    style={{height: 28, width: 28, borderRadius: 50}}
                  />
                  <Text style={{fontSize: 15, color: '#555'}}>
                    {item.channel}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    zIndex: -1,
  },
  card: {
    marginTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 20,
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginRight: 10,
    width: width - 160,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  playIcon: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
    padding: 0,
    top: 44,
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoScreen;
