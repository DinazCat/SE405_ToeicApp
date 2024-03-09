import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions, PermissionsAndroid, Alert, Platform} from 'react-native';
import React, {useState, useContext,useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import { AuthContext } from '../navigation/AuthProvider';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');
const audioRecorderPlayer = new AudioRecorderPlayer();
const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

const SpeakP5QuestionForm = ({item, onRecordComplete,flag, check}) => {
  const {user} = useContext(AuthContext);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isRecording, setIsRecording] = useState([false, false, false]);
  const [isPlaying, setIsPlaying] = useState([false, false, false]);
  const [recordings, setRecordings] = useState([null, null, null]);
  const [durations, setDurations] = useState(['00:00', '00:00', '00:00']);
  const [positions, setPositions] = useState([0, 0, 0]);
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(false);

  const getPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';

    const externalStorageWriteGranted =
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
      'granted';
    const externalStorageReadGranted =
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
      'granted';

    if (
      !(
        recordAudioGranted ||
        externalStorageWriteGranted ||
        externalStorageReadGranted
      )
    ) {
      Alert.alert('Permissions not granted');
    } else {
      setPermissionGranted(true);
      console.log('permission granted')
    }
  };
  const getAudioTimeString=(seconds)=>{
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    return ( (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }
  const getDuration = async(list)=>{
    const x = durations.slice();
    for(let i = 0; i < 3; i++){
      const sound = new Sound(list[i], null, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        else{
          x[i]=getAudioTimeString(sound.getDuration())
          sound.release();
          console.log(i+'...'+x[i])
          if(i==2){
            setDurations(x)
          setLoading(true)
        }
        }
      });
    }

  }
  useEffect(()=>{
    if(flag != 'QuestionScreen'){
      const list = [check.record0, check.record1, check.record2];
      setRecordings(list)
      getDuration(list)
    }
  },[])

  const QuestionForm = ({question, index}) => {

    function formatTime(miliseconds) {
      const minutes = Math.floor(miliseconds/ 1000 / 60);
      const remainingSeconds = Math.floor((miliseconds / 1000) % 60);
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    const onStartRecord = async () => {
      await getPermissions().then(() => {
        if(!permissionGranted) return;
      })

      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
        android: `${dirs.CacheDir}/recordP3-${index}-${user.uid}-${new Date().getTime()}.mp3`,
      });

      console.log('start recording');

      const result = await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
        const newDurations = [...durations];
        newDurations[index] = formatTime(e.currentPosition);
        setDurations(newDurations);
        
      });
      
      const newIsRecording = [...isRecording];
      newIsRecording[index] = true;
      setIsRecording(newIsRecording);

      const newRecordings = [...recordings];
      newRecordings[index] = path;
      setRecordings(newRecordings);

    };
  
    const onStopRecord = async () => {
      console.log('stop recording');
      try {

        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        //console.log(result);

        const newIsRecording = [...isRecording];
        newIsRecording[index] = false;
        setIsRecording(newIsRecording);

        onRecordComplete(recordings, item.Id);
      } catch (err) {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Unxpected Error',
          text2: 'Please try again.',
        });
      }
    };

    const onStartPlay = async () => {
      try{
        if(recordings[index] === null) {return;}
        for (const value of isRecording) {
          if (value) return;
        }
        for (const value of isPlaying) {
          if (value) return;
        }
        // isPlaying.forEach((value, index) => {
        //   if(value == 'true') return;
        // });
        if(index !== audio){
          await audioRecorderPlayer.stopPlayer();
        }
        console.log('onStartPlay'); 
        const msg = await audioRecorderPlayer.startPlayer(recordings[index]);
        
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
          let currentPosition = e.currentPosition / e.duration;

          const newPositions = [...positions];
          newPositions[index] = currentPosition;
          setPositions(newPositions);

          const newDurations = [...durations];
          newDurations[index] = formatTime(e.duration);
          setDurations(newDurations);

          if(e.currentPosition == e.duration){
            const newIsPlaying = [...isPlaying];
            newIsPlaying[index] = false;
            setIsPlaying(newIsPlaying);
          }
        });

        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = true;
        setIsPlaying(newIsPlaying);

        setAudio(index);
      } catch (error) {
        console.error('Error starting player:', error);
      }  
    };
    const onPausePlay = async () => {
      await audioRecorderPlayer.pausePlayer();
      const newIsPlaying = [...isPlaying];
      newIsPlaying[index] = false;
      setIsPlaying(newIsPlaying);
    };
    
    return(
      <View style={{backgroundColor:card_color, width:'98%', alignSelf:'center', marginTop:'3%', paddingTop: 5}}>
      <View style={styles.questionzone}>
        <Text style={styles.questionstyle}>{question}</Text>
        {flag == 'QuestionScreen' ? (
              <>
                      {!isRecording[index] ? (
          <TouchableOpacity style={{ borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:30, width:30, alignItems:'center', justifyContent:'center',}}
          onPress={onStartRecord}>
          <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 20}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:30, width:30, alignItems:'center', justifyContent:'center', backgroundColor: '#CFF393'}}
          onPress={onStopRecord}>
          <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 20}} />
          </TouchableOpacity>
        )}
              </>
            ):null}

      </View>
      <View style={{ height: 50, flexDirection: 'row', marginTop:'1%', alignItems: 'center',}}>
      <Text style={[styles.TimeFont, {marginLeft: '5%'}]}>Your answer:</Text>
      {!isPlaying[index] ? (
        <TouchableOpacity style={{marginLeft:"5%"}}
        onPress={onStartPlay}>
          <FontAwesome name="play-circle" color="black" size={22} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{marginLeft:"5%"}}
      onPress={onPausePlay}>
        <FontAwesome name="pause-circle" color="black" size={22} />
      </TouchableOpacity>
      )}
      <View style={{width: 140, marginLeft: '3%'}}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#3EA200"
          maximumTrackTintColor="#555"
          value={positions[index]}
          onValueChange={(newValue) => setPosition(newValue)}/>
        {
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 40,
            backgroundColor: "transparent",
          }}
        />
        }
        </View>
        <Text style={styles.TimeFont}>{durations[index]}</Text>
      </View>
    </View>
    )}
  return (
    <Animated.View style={styles.container}>
       { (!loading) ? 
            <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
            :
      <ScrollView>     
        <Text style={{color:'black', fontWeight:'500',fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Respond to Questions</Text>
        <Image source={{uri: item.AvailableInfo}} style={{height:200, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
        <QuestionForm question={item.Question[0]} index={0}/>
        <QuestionForm question={item.Question[1]} index={1}/>
        <QuestionForm question={item.Question[2]} index={2}/>
        <View style={{height:50}}/>
      </ScrollView>}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: width,
  },

  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
  },
  questionzone:{
    flexDirection:'row', width:'98%', alignSelf:'center', justifyContent:'space-evenly', alignItems:'center'
  },
  questionstyle:{
    fontSize:18,color:'black', fontWeight:'400', width:'80%'
  },
});
export default SpeakP5QuestionForm;
