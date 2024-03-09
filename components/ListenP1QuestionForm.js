import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Sound from 'react-native-sound';
import dings from '../assets/Part1No1.mp3'
const {width} = Dimensions.get('window');
const ListenP1QuestionForm = React.memo(({item,list,click,flag, check}) => {
  const [sign, setsign] = useState('1');
  const [duration, setduration] = useState('00:00')
  const [position, setPosition] = useState('00:00');
  const [duration1, setduration1] = useState(0)
  const [position1, setPosition1] = useState(0);
  const [playState, setPlayState] = useState('playing')
  const [isPlay, setisPlay] = useState(false);

  const [SliderEditing, setSliderEditing] = useState(false)
 
   const onSliderEditing = (value) => {
    if(list.isLoaded()){
    const formattedNumber = value.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      });      
      console.log(formattedNumber);
      const u =  parseFloat(formattedNumber);
        list.setCurrentTime(u);
        const P = getAudioTimeString(value)
          setPosition(P);
          //setPosition1(value);
    }
  }

 
  const jumpPrev15Seconds = () => {jumpSeconds(-3);}
  const jumpNext15Seconds = () => {jumpSeconds(3);}
  const jumpSeconds = (secsDelta) => {
      if(list.isLoaded()){
         list.getCurrentTime((secs, isPlaying) => {
              let nextSecs = secs + secsDelta;
              if(nextSecs < 0) nextSecs = 0;
              else if(nextSecs > duration1) nextSecs = 14;
              const t = getAudioTimeString(nextSecs);
              list.setCurrentTime(nextSecs);
              setPosition(t);
              setPosition1(nextSecs);
          })
      }
  }

  const getAudioTimeString=(seconds)=>{
      const m = parseInt(seconds%(60*60)/60);
      const s = parseInt(seconds%60);

      return ( (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }

    useEffect(() => {
      if(list!=null &&list.isLoaded()){
      setduration(getAudioTimeString(list.getDuration()))
      setduration1(list.getDuration())
      }
      if(list!=null &&list.isLoaded()){
        const interval = setInterval(() => {

          
            // setPosition1(list._duration)
            list.getCurrentTime((seconds) => {
              
              setPosition1(seconds)
              
              setPosition(getAudioTimeString(seconds))
 
            })
          
        
        }, 1000)
        return () => clearInterval(interval); 
      } 
      }, []);
      useEffect(() => {
        if(list.isPlaying()){
          setPlayState('playing')
        }
        else{
          setPlayState('paused')
        }
        }, [list.isPlaying()]);
    const playPause = () => {
      if (list.isPlaying()) {
        list.pause(()=>{
          console.log('successfully pause');
        });
       // sound.setCurrentTime(position1)
        setPlayState('paused')
      } else {
        // sound.play(playComplete);
        setPlayState('playing')
        list.play(success => {
          if (success) {
            console.log('successfully finished playing');
            setPlayState('paused')
            list.stop()
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    };
    
  return (
    <Animated.View style={styles.container}>    
      <View style={styles.boxstyle}>
        <Text style={{color:PRIMARY_COLOR, fontSize:20,textAlign:'left', fontWeight:'600',marginTop:'5%', marginLeft:"5%"}}>Select the answer</Text>
        <Image  source={{uri: item.Image}} style={{height:200, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
        {flag=='QuestionScreen'?
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'7%'}}>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='A'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('A'),click(0)}}>
                <Text style={styles.answertext}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='B'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('B'),click(1)}}>
                <Text style={styles.answertext}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='C'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('C'),click(2)}}>
                <Text style={styles.answertext}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='D'&&(styles.answerboxStyleTrue)]} onPress={()=>{setsign('D'),click(3)}}>
                <Text style={styles.answertext}>D</Text>
            </TouchableOpacity>
        </View>
        :
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'7%'}}>
        <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(check.Default==0)?PRIMARY_COLOR:(check.Select==0)?'red':'white'}]}>
            <Text style={styles.answertext}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(check.Default==1)?PRIMARY_COLOR:(check.Select==1)?'red':'white'}]}>
            <Text style={styles.answertext}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(check.Default==2)?PRIMARY_COLOR:(check.Select==2)?'red':'white'}]}>
            <Text style={styles.answertext}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answerboxStyle,{ backgroundColor:(check.Default==3)?PRIMARY_COLOR:(check.Select==3)?'red':'white'}]}>
            <Text style={styles.answertext}>D</Text>
        </TouchableOpacity>
        </View>
        }
      </View>
      <View style={{flex:1}}/>
      <View
        style={{
          height: 70,
          backgroundColor: card_color,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={jumpPrev15Seconds}>
          <FontAwesome name="backward" color="black" size={20} />
        </TouchableOpacity>
       <TouchableOpacity onPress={playPause}>
       {playState == 'playing'?<FontAwesome name="pause-circle" color="black" size={20} />:
       <FontAwesome name="play-circle" color="black" size={20} />
       }
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpNext15Seconds}>
          <FontAwesome name="forward" color="black" size={20} />
        </TouchableOpacity>
        <Text style={styles.TimeFont}>{position}</Text>
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
       {duration&&<Text style={styles.TimeFont}>{ duration}</Text>}
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  flex:1,
  width:width,
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:390, backgroundColor:card_color, alignSelf:'center', marginTop:10, height:400,borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleTrue:{
    width:40, height:40,backgroundColor:PRIMARY_COLOR, borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleFalse:{
    width:40, height:40,backgroundColor:'red', borderRadius:25,borderColor:'red', borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  }
});
export default ListenP1QuestionForm;
