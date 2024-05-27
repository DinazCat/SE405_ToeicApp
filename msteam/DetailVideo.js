import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import xmljs from 'xml-js';
import { authorize } from 'react-native-app-auth';
import uploadfile from '../api/uploadfile';
import LottieView from 'lottie-react-native';

const API_KEY = 'YOUR_YOUTUBE_API_KEY';
const CLIENT_ID = '235184996000-12isrfjqb4um757mrsgmduf0bh3nptc7.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: CLIENT_ID,
  redirectUrl: `com.toeicpracticeapp:/callback`,
  additionalParameters: {},
  flowName:'GeneralOAuthFlow',
  scopes: ['https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtube.force-ssl'],
};

const {width} = Dimensions.get('window');

const DetailVideo = ({navigation, route}) => {
  const [video] = useState(route.params.video);
  const [captions, setCaptions] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [subtitles, setSubtitles] = useState('');

  const getSubtitles = async () => {
    try {
      const response = await axios.get(`http://${uploadfile.ipAddress}/getSubtitle`, {
        params: { url: 'https://www.youtube.com/watch?v='+video.id.videoId},
      });
      setSubtitles(response.data);
    } catch (error) {
      console.error('Error fetching subtitles', error);
      setSubtitles('Error fetching subtitles');
    }
  }
  const convertDuration = (duration) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    duration = duration.replace("PT", "");

    if (duration.includes("H")) {
      [hours, duration] = duration.split("H");
      hours = parseInt(hours);
    }

    if (duration.includes("M")) {
      [minutes, duration] = duration.split("M");
      minutes = parseInt(minutes);
    }

    if (duration.includes("S")) {
      seconds = parseInt(duration.replace("S", ""));
    }

    return `${hours > 0 ? hours: ""}${minutes > 0 ? minutes : ""}${seconds}`;
  };
//video
const fetchCaptions = async () => {
  try {
    console.log(video.id.videoId)
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${video.id.videoId}&key=${'AIzaSyAor3Lt0QmIYuT30ZMp3S6PaVyxW65bdfU'}`);
    const englishCaption = response.data.items.find(item => item.snippet.language === 'en');
    const captionId = englishCaption?.id; // Lấy captionId đầu tiên
    console.log(captionId)
    if (captionId) {
      console.log('a1')
      // const captionResponse = await axios.get(`https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${'AIzaSyAor3Lt0QmIYuT30ZMp3S6PaVyxW65bdfU'}`).catch((e)=>console.log(e));
      const captionResponse = await axios.get(`https://www.googleapis.com/youtube/v3/captions/${captionId}`, {
        params: {
          tfmt: 'srv3',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch((e)=>console.log(e));
      console.log('a2')
      const xml = captionResponse.data;
      console.log(xml)
      const json = xmljs.xml2json(xml, { compact: true, spaces: 2 });
      setCaptions(JSON.parse(json));
    }
  } catch (error) {
    console.error('Error fetching captions', error);
  }
};
useEffect(() => {
  // const authorizeUser = async () => {
  //   try {
  //     const result = await authorize(config);
  //     setAccessToken(result.accessToken);
  //     fetchCaptions();
  //   } catch (error) {
  //     console.error('Error during authorization', error);
  //   }
  // };
  // authorizeUser()
  // fetchCaptions()
  getSubtitles()
}, []);
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
          <Image source={{uri: video.snippet.thumbnails.default.url}} style={styles.thumbnail} />
          <Text style={styles.time}>{"70:00"}</Text>
        </View>
        <Text style={styles.title}>{video.snippet.title}</Text>
        <View style={styles.channel}>
          {/* <Image
            source={{uri: video?.snippet?.channelImage}}
            style={{height: 28, width: 28, borderRadius: 50}}
          /> */}
          <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
            {video.snippet.channelTitle}
          </Text>
        </View>
        {subtitles!=''?<TouchableOpacity style={styles.button} onPress={()=>{
          navigation.navigate('PlayVideo',{idvideo:video.id.videoId, subtitles:subtitles, name:video.snippet.title})
        }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Play with subtitle mode
          </Text>
          <Ionicons name="play-circle" color="white" size={40} />
        </TouchableOpacity>:<LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>}
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
