import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions, PermissionsAndroid, Alert, Platform, Toast} from 'react-native';
import React, {useState, useContext,useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';
import Sound from 'react-native-sound';

const {width} = Dimensions.get('window');
const audioRecorderPlayer = new AudioRecorderPlayer();
const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

const SpeakP2QuestionForm = ({item, onRecordComplete,flag, check}) => {
  const {user} = useContext(AuthContext);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('');
  const [duration, setDuration] = useState('00:00');
  const [position, setPosition] = useState();
  const [uri, setUri] = useState(null);

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
      android: `${dirs.CacheDir}/recordP2-${user.uid}-${new Date().getTime()}.mp3`,
    });
    console.log('start recording');
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      // console.log('record time: ' + audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      setRecordTime(formatTime(e.currentPosition));

    });
    setIsRecording(true);
    setUri(path);
    console.log(result);
  };

  const onStopRecord = async () => {
    console.log('stop recording');
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      console.log(result);

      setIsRecording(false);
      setDuration(recordTime);
      setRecordTime('');

      onRecordComplete(result, item.Id);
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Unxpected Error',
        text2: 'Please try again.',
      });
    }
  };
  const getAudioTimeString=(seconds)=>{
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    return ( (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }
  const getDuration = async()=>{
    const sound = new Sound(check.record, null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      else{
        setDuration(getAudioTimeString(sound.getDuration()))
      }
    });
  }
  useEffect(()=>{
    if(flag != 'QuestionScreen'){
      setUri(check.record)
      getDuration()
    }
    
  },[])
  const onStartPlay = async () => {
    try {
      console.log('onStartPlay');
      if(uri === null) return;
      const msg = await audioRecorderPlayer.startPlayer(uri);
      console.log(msg);     
      audioRecorderPlayer.addPlayBackListener((e) => {
        let currentPosition = e.currentPosition / e.duration;
        setPosition(currentPosition);
        setDuration(formatTime(e.duration));
        if(e.currentPosition == e.duration){
          setIsPlaying(false);
        }
      });
      setIsPlaying(true); 
    } catch (error) {
      console.error('Error starting player:', error);
    }   
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false);
  };

  return (
    <Animated.View style={styles.container}>
      <Text style={{color:PRIMARY_COLOR, width: '90%', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Describe a Picture</Text>
      <Image source={{uri: item.Picture}} style={{height:200, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
          
      <View
      style={{
        height: 50,
        flexDirection: 'row',
        marginTop:'10%',
        alignItems: 'center',
      }}>
      <Text style={styles.TimeFont}>Your answer:</Text>
      {!isPlaying ? (
        <TouchableOpacity style={{marginLeft:"5%"}}
        onPress={onStartPlay}>
          <FontAwesome name="play-circle" color="black" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{marginLeft:"5%"}}
      onPress={onPausePlay}>
        <FontAwesome name="pause-circle" color="black" size={20} />
      </TouchableOpacity>
      )} 
      <View style={{width: 140}}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#3EA200"
          maximumTrackTintColor="#555"
          value={position}
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
      <Text style={styles.TimeFont}>{duration}</Text>
    </View>
    {flag == 'QuestionScreen' ? (
      <>
      {!isRecording ? (
      <TouchableOpacity style={{marginTop:'45%', alignSelf:'center', borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center'}}
      onPress={onStartRecord}>
      <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={{marginTop:'45%', alignSelf:'center', borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center', backgroundColor: '#CFF393'}}
      onPress={onStopRecord}>
      <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
      </TouchableOpacity>
    )}
      <Text style={[styles.TimeFont, {fontSize: 20, marginTop: 5}]}>{recordTime}</Text>
      </>):null
    }
    
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: width,
    alignItems: 'center'
  },

  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"60%",borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:"#990000", borderWidth:1, alignItems:'center', justifyContent:'center'
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  }
});
export default SpeakP2QuestionForm;
  