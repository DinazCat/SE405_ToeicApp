import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  Animated,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';
import ListenP1QuestionForm from '../components/ListenP1QuestionForm';
import ListenP2QuestionForm from '../components/ListenP2QuestionForm';
import ListenP34QuestionForm from '../components/ListenP34QuestionForm';
import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
import LottieView from 'lottie-react-native';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';

Sound.setCategory('Playback');
const {width} = Dimensions.get('window');

const TestQuestions = ({navigation, route}) => {
const {user} = useContext(AuthContext);
const scrollX = useRef(new Animated.Value(0)).current;
const {questionList, isFromPL, isMiniTest, testName} = route.params;
const [soundL, setsoundL] = useState(null);
const [ItemIndex, setItemIndex] = useState(0);
const [OpenModal, setOpenModal] = useState(false);
const [ExplainButton, setExplainButton] = useState('1');
const [loading, setloading] = useState(false);
const [buttonTitle, setButtonTitle] = useState('Submit');
const [history, setHistory] = useState([]);
const [timeRemaining, setTimeRemaining] = useState(7200); 


const list = [];
const createsound = () => {
  for (let i = 0; i < questionList.length; i++) {
    if(questionList[i].Audio != undefined) {
      const sound = new Sound(questionList[i].Audio, null, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        else{
          if(isMiniTest) {
            if(i==4) {setloading(true)}
          }
          else{
            if(i==53) {setloading(true)}
          }
        }
      });
      list.push(sound);  
    } 
    // else {
    //   setloading(true);
    //   break;
    // } 
  }
  setsoundL(list);
};

const getDate = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); 
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear(); 
  const currentHours = currentDate.getHours(); 
  const currentMinutes = currentDate.getMinutes();
  const date = currentDay+'/'+currentMonth+'/'+currentYear+', '+currentHours+':'+currentMinutes
  return date 
}

const timeFormat = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let time = `${hours}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
  return time;
}

const onSubmit = async() =>{
  console.log('onsubmit');
  if (questionList[ItemIndex].Audio && soundL[ItemIndex].isPlaying()) {
    soundL[ItemIndex].stop();
  }
  const answers = history.map((history, index) => ({
    ...history,
    part: questionList[index].part,
  }));

  // console.log(answers);

  if(isMiniTest)
    navigation.navigate('CompleteTestCard', {quantity:questionList.length,answer:answers,sign:'QuestionScreen', isFromPL: route.params.isFromPL, isMiniTest: route.params.isMiniTest, questionL:questionList, targetLevel: route.params.targetLevel})
  else {
    const date = getDate();
    let completiontime = timeFormat(7200-timeRemaining);
    let unAnswers = 0;
    const corrects = Array.from({ length: 7 }, () => 0);
    for(let i = 0 ; i < questionList.length; i++){
      if(questionList[i].part=='L1'||questionList[i].part=='L2'||questionList[i].part=='R1'){
        if(answers[i].Select==answers[i].Default){
          if(questionList[i].part=='L1') corrects[0] += 1;
          else if(questionList[i].part=='L2') corrects[1] += 1;
          else corrects[4] += 1;
        }
        else if (answers[i].Select == -1){
          unAnswers= unAnswers + 1;
        }
      }
      else{
        for(let j = 0; j < answers[i].Default.length; j++){
          if(answers[i].Select[j]==answers[i].Default[j]){
            if(questionList[i].part=='L3') corrects[2] += 1;
            else if(questionList[i].part=='L4') corrects[3] += 1;
            else if(questionList[i].part=='R2') corrects[5] += 1;
            else corrects[6] += 1;
          }
          else if (answers[i].Select[j] == -1){
            unAnswers = unAnswers + 1;
          }
        }            
      }
    }
    
    const sum = corrects.reduce((total, current) => total + current, 0);
    const data = {
      Quantity: 200,
      History: answers,
      Questions: questionList,
      Date: date,
      TestName: testName,
      CompletionTime: completiontime,
      Corrects: corrects,
      Correct: sum,
      Incorrect: 200 - sum - unAnswers,
      Unanswer: unAnswers,
    }
    Api.uploadTestHistory(data);
    navigation.navigate('CompleteTestCard', {answer:answers, sign:'QuestionScreen', questionL:questionList, testHistory: data})
    //navigation.navigate('CompleteTestCard');
  }


}

useEffect(() => {
  createsound();
  if(isMiniTest) {setTimeRemaining(720)}
}, []);

useEffect(() => {
  scrollX.addListener(({value}) => {
    const index = Math.round(value / width);
    setItemIndex(index);
    if(loading){  
      for(let i = 0; i < soundL.length; i++)
        {
          if(i != index &&soundL[i].isPlaying()){
            soundL[i].stop();
          }       
        }
      if(index < soundL.length){
        soundL[index].play(success => {
          if (success) {
            console.log('successfully finished playing');
            soundL[index].stop()
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
   
  }
  });
}, [loading]);

useEffect(()=>{
  const list = []; 
  for(let i = 0; i < questionList.length;i++){
    if(questionList[i].part=="L1"||questionList[i].part=="L2"||questionList[i].part=="R1"){
      list.push({
        Qid:questionList[i].Id,
        Select:-1,
        Default:-2
      })
    }
    else if(questionList[i].part=="L3"||questionList[i].part=="L4"||questionList[i].part=="R2"||questionList[i].part=="R3"){
      list.push({
        Qid:questionList[i].Id,
        Select:Array(questionList[i].Question.length).fill(-1),
        Default:questionList[i].Correct
      })
    
    }
  }
  setHistory(list)
},[])

useEffect(() => {
  let intervalId;

  if (loading) {
    intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);        
          onSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1500);
  } else {
    clearInterval(intervalId);
  }

  return () => clearInterval(intervalId);
}, [loading]);


const showAlert = () => {
  Alert.alert(
    'Hey!',
    'If you leave, your test will not be saved.',
    [
      { text: 'OK', onPress: () => {
        if(soundL!=-1)
        for(let i = 0; i < soundL?.length; i++)
        {
          if(soundL[i].isPlaying()){
            soundL[i].stop();
          }
          
        }
       navigation.goBack()
       } },
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
    ],
    { cancelable: false }
  );
}
const showAlert2 = () => {
  Alert.alert(
    'Hey!',
    'Are you sure to submit?',
    [
      { text: 'Yes', onPress: () => {
        onSubmit()
       } },
      { text: 'No', onPress: () => {
      }},
    ],
    { cancelable: false }
  );
}

return (
  <View style={styles.container}>
    <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity
        style={{marginLeft: '2%'}}
        onPress={showAlert}>
        <FontAwesome name="chevron-left" color="white" size={20} />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'left',
          color: 'white',
          fontSize: 20,
          marginLeft: 15,
        }}>
        Question {ItemIndex + 1}
      </Text>
      <FontAwesome
        name="heart"
        color="white"
        size={20}
        style={{marginLeft: '3%'}}
      />

      <View style={{flex: 1}} />
      <Text style={{color: 'white', fontSize: 20, marginRight: '5%',}}>
        {timeFormat(timeRemaining)}
      </Text>
      { buttonTitle == 'Explain' ? (
      <TouchableOpacity onPress={() => setOpenModal(true)}>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginRight: '5%',
            textDecorationLine: 'underline',
          }}>
          Explain
        </Text>
      </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={showAlert2}>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginRight: '5%',
            textDecorationLine: 'underline',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
      )}
    </View>
    <View style={{flex: 1}}>
    {
      (!loading) ? 
      <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
      : <Animated.FlatList
      data={questionList}
      contentContainerStyle={styles.listContent}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      windowSize={10} 
      initialNumToRender={5} 
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {x: scrollX},
            },
          },
        ],
        {useNativeDriver: true},
      )}
      renderItem={({item, index}) => {         
        if(item.part=='L1'){
          return(
            <ListenP1QuestionForm item={item} list={soundL[index]} flag={'QuestionScreen'}
            click={(i)=>{
              const History = [...history];
              let correct = 0;
              for(let j = 0;j < 4; j++){
                if(questionList[index].Answer[j]) correct=j
              }
              History[index].Select = i
              History[index].Default = correct
            
          }}/>
          )}
        else if(item.part=='L2'){
        return(
          <ListenP2QuestionForm item={item} list={soundL[index]} flag={'QuestionScreen'}
          click={(i)=>{
            const History = [...history];
            let correct = 0;
            for(let j = 0;j < 3; j++){
              if(questionList[index].Answer[j]) correct=j
            }
            History[index].Select = i
            History[index].Default = correct
          
        }}/>
        )}
        else if(item.part=='L3'||item.part=='L4'){
        return(
          <ListenP34QuestionForm item={item} list={soundL[index]} flag={'QuestionScreen'}
          click={(i,j)=>{
            const History = [...history];
            History[index].Select[j] = i
        }}/>
        )}  
        else if (item.part == 'R1') {
          return <ReadP23QuestionForm item={item} part={item.part} flag={'QuestionScreen'} 
          click={(i)=>{
           const History = [...history];
           let correct = 0;
           for(let j = 0;j < 3; j++){
             if(questionList[index].Answer[j].status) correct=j
           }
           History[index].Select = i
           History[index].Default = correct
         
       }}
           />;
        } 
        else if (item.part == 'R2' || item.part == 'R3') {
         return <ReadP23QuestionForm item={item} part={item.part} flag={'QuestionScreen'} 
         click={(i,j)=>{
           const History = [...history];
           History[index].Select[j] = i
       }}
          />;
       }              
      }}/>                    
    }
    </View>
   
    {/* {RenderModal()} */}
  </View>
);
};


export default TestQuestions

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    //width: Dimensions.get('window')
  },
  listContent: {
    justifyContent: 'center',
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle: {
    flexDirection: 'column',
    width: '90%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: '5%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
  answerboxStyle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerboxStyleTrue: {
    width: 40,
    height: 40,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerboxStyleFalse: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 25,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answertext: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
  },
  ExplainbuttonTrue: {
    height: '100%',
    width: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ExplainbuttonFalse: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ExplainFontTrue: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500'
  },
  ExplainFontFalse: {
    color: 'white',
    fontSize: 18,
  },
});