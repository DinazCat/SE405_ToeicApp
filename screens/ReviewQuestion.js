import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    Animated,
    Alert,
    Modal,
  } from 'react-native';
  import React, {useState, useEffect, useRef} from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import AppStyle from '../theme';
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Sound from 'react-native-sound';
  import ListenP1QuestionForm from '../components/ListenP1QuestionForm';
  import ListenP2QuestionForm from '../components/ListenP2QuestionForm';
  import ListenP34QuestionForm from '../components/ListenP34QuestionForm';
  import ReadP1QuestionForm from '../components/ReadP1QuestionForm';
  import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
  import SpeakP1QuestionForm from '../components/SpeakP1QuestionForm';
  import SpeakP2QuestionForm from '../components/SpeakP2QuestionForm';
  import SpeakP34QuestionForm from '../components/SpeakP34QuestionForm';
  import SpeakP5QuestionForm from '../components/SpeakP5QuestionForm';
  import SpeakP6QuestionForm from '../components/SpeakP6QuestionForm';
  import WriteP1QuestionForm from '../components/WriteP1QuestionForm';
  import WriteP23QuestionForm from '../components/WriteP23QuestionForm';
  import dings from '../assets/Part1No1.mp3'
  import LottieView from 'lottie-react-native';
  import { useNavigation, StackActions } from '@react-navigation/native';
  import Api from '../api/Api'
  
  Sound.setCategory('Playback');
  const {width} = Dimensions.get('window');
  const ReviewQuestion = ({navigation, route}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const {questionList,indication,History,part,isMiniTest, isTest} = route.params;
    const [soundL, setsoundL] = useState(null);
    const [ItemIndex, setItemIndex] = useState(0);
    // const [oldIndex, setoldIndex] = useState(0);
    const [OpenModal, setOpenModal] = useState(false);
    const [ExplainButton, setExplainButton] = useState('1');
    const [loading, setloading] = useState(false);
    const flatListRef = useRef();
    const [isSaved, setIsSaved] = useState(false);
    const [SavedQ, setSavedQ] = useState([]);
    // const [Click, setClick] = useState(false);
    // const navigation1 = useNavigation();
    // const [Score, setScore] = useState(0);
    // const [history, setHistory] = useState([]);
    const saveQuestion=async(id)=>{

      const data= await Api.getSavedQuestion()
        if(data!='-1'){
          const foundItem = data.find(item => item.Id === id);
          if(!foundItem){
            const list = [...data];
            list.push({Id:id,Part:part});
            setSavedQ(list)
            setIsSaved(true)
            await Api.updateSavedQuestion({SavedQuestion:list})
          }
          else{
            const filteredData = data.filter(i => i.Id!== id);
            const list = [...filteredData];
            setSavedQ(list)
            setIsSaved(false)
            await Api.updateSavedQuestion({SavedQuestion:list})
          }
        }
        else{
          setSavedQ([id])
          await Api.setUserInfo({SavedQuestion:[{Id:id,Part:part}]})
        }
    }
    const list = [];
    const createsound = () => {
      for (let i = 0; i < questionList.length; i++) {
        if(questionList[i].Audio != undefined) {
          const sound = new Sound(questionList[i].Audio,null, error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            else{
              if(isMiniTest){
                if(i==4) {setloading(true);}
              }
              else if (isTest){
                setloading(true);
              }
              else{
                if(i==questionList.length-1) {setloading(true);}
              }     
            }
          });
          list.push(sound);
        }
        else {setloading(true);}     
      }
      setsoundL(list); 
    };
  
    useEffect(() => {
      if(isMiniTest || isTest || part=='L1'||part=='L2'||part=='L3'||part=='L4')
        createsound();
      else setsoundL('-1')
    }, []);
    useEffect(() => {
      scrollX.addListener(async ({value}) => {
        const index = Math.round(value / width);
        setItemIndex(index);
        const data= await Api.getSavedQuestion()
        const foundItem = data.find(item => item.Id === questionList[index].Id);
        if(foundItem){
          setIsSaved(true)
        }
        else {
          setIsSaved(false)
        }
        if(loading && (isMiniTest || part=='L1'||part=='L2'||part=='L3'||part=='L4')){
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
    if(loading && (isMiniTest || part=='L1'||part=='L2'||part=='L3'||part=='L4')){
      flatListRef.current.scrollToIndex({ index: indication, animated: true });
    }
    },[loading])
    useEffect( ()=>{
      if(soundL=='-1')
        flatListRef.current.scrollToIndex({ index: indication, animated: true });
      },[])
    function RenderModal() {
      return (
        <Modal visible={OpenModal} animationType="slide" transparent={true}>
 <View
            style={{
              height: '60%',
              width: '100%',
              borderRadius: 15,
              backgroundColor: card_color,
              position: 'absolute',
              marginTop: 350,
              borderColor: 'black',
              //borderWidth: 1,
            }}>
            <View
              style={{
                height: '12%',
                backgroundColor: PRIMARY_COLOR,
                width: '100%',
                borderTopStartRadius: 15,
                borderTopEndRadius: 15,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={
                  ExplainButton == '1'
                    ? styles.ExplainbuttonTrue
                    : styles.ExplainbuttonFalse
                }
                onPress={() => setExplainButton('1')}>
                <Text
                  style={
                    ExplainButton == '1'
                      ? styles.ExplainFontTrue
                      : styles.ExplainFontFalse
                  }>
                  {questionList[ItemIndex]&&questionList[ItemIndex].Explain.SampleAnswer ? 'Sample Answer' : 'Script'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  ExplainButton == '2'
                    ? styles.ExplainbuttonTrue
                    : styles.ExplainbuttonFalse
                }
                onPress={() => setExplainButton('2')}>
                <Text
                  style={
                    ExplainButton == '2'
                      ? styles.ExplainFontTrue
                      : styles.ExplainFontFalse
                  }>
                  Translation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  ExplainButton == '3'
                    ? styles.ExplainbuttonTrue
                    : styles.ExplainbuttonFalse
                }
                onPress={() => setExplainButton('3')}>
                <Text
                  style={
                    ExplainButton == '3'
                      ? styles.ExplainFontTrue
                      : styles.ExplainFontFalse
                  }>
                  Tips
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                marginLeft: '93%',
                marginTop: 3,
              }}
              onPress={() => setOpenModal(false)}>
              <Icon
                name={'times-circle'}
                style={{color: 'white', fontSize: 20}}
              />
            </TouchableOpacity>
            {ExplainButton == '1' && 
            <View style={{marginLeft: 5, marginTop: 10}}>
               <Text style={styles.answertext2}>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.script}
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.SampleAnswer}
               </Text>
            </View>
          }
          {ExplainButton == '2' && (
            <View style={{marginLeft: 5, marginTop: 10}}>
             <Text style={styles.answertext2}>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.translate}
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.Translation}
               </Text>
            </View>
          )}
             {ExplainButton == '3' && (
              <View style={{marginLeft: 5, marginTop: 10}}>
               <Text style={styles.answertext2}>
                  {questionList[ItemIndex]&&questionList[ItemIndex].Explain.tip}
                  {questionList[ItemIndex]&&questionList[ItemIndex].Explain.Tips}
                 </Text>
                
              </View>
            )}
          </View>
        </Modal>
      );
    }
    return (
      <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity
            style={{marginLeft: '2%'}}
            onPress={()=>{
              navigation.goBack(),
              (soundL!='-1')&&(ItemIndex<soundL.length)&&soundL[ItemIndex].stop()
            }}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            Question {History[0].Number ? 
            !Array.isArray(History[0].Number) ? History[0].Number + 1
            : `${History[0].Number[0] + 1}-${History[0].Number[History[0].Number.length - 1] + 1}`
            : ItemIndex + 1}
          </Text>
          <TouchableOpacity style={{marginLeft: '3%'}} onPress={()=>{saveQuestion(questionList[ItemIndex].Id)}}>
        <FontAwesome
          name="heart"
          color={(isSaved)?'red':"white"}
          size={20}
        />
        </TouchableOpacity>
          <View style={{flex: 1}} />
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
        {(part!='L1'&&'L2'&&'L3'&&'L4'&&'R1'&&'R2'&&'R3')&&<TouchableOpacity
        style={{padding:5}} onPress={() => navigation.push('AddPost',{sign:'ReviewQuestion', Answer:History[ItemIndex],part:part,item:questionList[ItemIndex]})}>
        <Icon name={"share"} style={{color: 'white', fontSize: 20, alignSelf:'center',marginLeft:2, marginRight:5}}  />
      </TouchableOpacity>}
        </View>
       <View style={{flex: 1}}>
        {
              (soundL=='-1')? <Animated.FlatList
              data={questionList}
              contentContainerStyle={styles.listContent}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              ref={flatListRef}
              windowSize={10} 
              initialNumToRender={5} 
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 700));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ index: info.index, animated: true/false });
                });
              }}
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
                
                 if (part == 'R2' || part == 'R3' || part == 'R1') {
                   return <ReadP23QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'S1') {
                   return <SpeakP1QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'S2') {
                   return <SpeakP2QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'S3') {
                   return <SpeakP34QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'S4') {
                   return <SpeakP5QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'S5') {
                   return <SpeakP6QuestionForm item={item} part={part} flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'W1') {
                   return <WriteP1QuestionForm item={item} part={part}  flag={'ReviewQuestion'} check={History[index]}/>;
                 } else if (part == 'W2' || 'W3') {
                   return <WriteP23QuestionForm item={item} part={part}  flag={'ReviewQuestion'} check={History[index]}/>;
                 }       
              }}
            />
              : (!loading)? <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
              : <Animated.FlatList
              data={questionList}
              contentContainerStyle={styles.listContent}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              ref={flatListRef}
              windowSize={10} 
              initialNumToRender={5} 
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 700));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ index: info.index, animated: true/false });
                });
              }}
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
                if(part=='L1' || item.part == 'L1'){
                  return(
                  <ListenP1QuestionForm item={item} list={soundL[index]} flag={'ReviewQuestion'} check={History[index]}/>
                  )}
                else if(part=='L2' || item.part == 'L2'){
                  return(
                  <ListenP2QuestionForm item={item} list={soundL[index]}  flag={'ReviewQuestion'} check={History[index]} />
                  )}
                else if(part=='L3'||part=='L4' || item.part == 'L3'|| item.part == 'L4'){
                  return(
                  <ListenP34QuestionForm item={item} list={soundL[index]}  flag={'ReviewQuestion'} check={History[index]}/>
                  )}                  
                else if(item.part == 'R2' || item.part == 'R3' || item.part == 'R1') {
                  return <ReadP23QuestionForm item={item} part={item.part} flag={'ReviewQuestion'} check={History[index]}/>;
                }              
              }}
            />
                         
            }
  
        </View>
       
        {RenderModal()}
      </View>
    );
  };
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
    answertext2: {
      color: 'black',
      fontSize: 17,
    },
  });
  export default ReviewQuestion;
  