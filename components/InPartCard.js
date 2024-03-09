import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionScreen from '../screens/QuestionScreen';
import Api from '../api/Api'
const InPartCard = ({route, navigation}) => {
  const [number, setnumber] = useState(2);
  const [isopen, setopen] = useState(false);
  const [questionList, setquestionL] = useState([]);
 // const [screen, setscreen] = useState('');
  const [partname, setpartname]= useState('');
  const [directions, setDirections] = useState('');
  const [sum, setSum]= useState(0);
  const { part, Analysis, MaxQ} = route.params;
  const getSum = async(Part)=>{
    try{
      const collectionRef = firestore().collection(Part);
      const snapshot = await collectionRef.get();
      const count = snapshot.size;
      if(count>0)
      setSum(count)
    else setSum(1)   
    } catch(e){
      console.log(e);
    }
  }
   const fetchQuestion = async (part) => {
    getSum(part)
     if (!isopen) {
       const list = await Api.getQuestion(number, part);
       setquestionL(list);
     }
   };
 

  useEffect(() => {
    if(part=='L1'){
      setpartname('Photographs');
      setDirections('In this part, you will look at photographs. For each photograph you will hear four statements. You will have to choose which statement has the best description of the picture.')
      fetchQuestion('ListenPart1');
    }
    else if(part=='L2'){
      setpartname('Question & Response');
      setDirections('In this part, you will be tested on your ability to respond to a question. It is very important that you can understand and identify wh-questions. You will listen to three possible responses. Only one of the responses is correct.')
      fetchQuestion('ListenPart2');
    }
    else if(part=='L3'){
      setpartname('Short Conversations');
      setDirections('In this part, you will listen to a short conversation. After the conversation, you will answer three questions about the dialogue. There will be four possible answers for each question. Typical questions include, who, what, where, when, why, and how. You may also be asked to make an inference.')
      fetchQuestion('ListenPart3');
    }
    else if(part=='L4'){
      setpartname('Short Talks');
      setDirections('In this part, you will listen to a short talk. It might be an announcement, a radio advertisement, or a telephone recording. You will listen to the talk and read a few questions about it.')
      fetchQuestion('ListenPart4');
    }
    else if(part=='R1'){
      setpartname('Incomplete Sentences');
      setDirections('In this part, you will read a sentence that has one blank spot. There will be four choices of words or phrases to choose from. You will have to choose the one that you think completes the sentence.')
      fetchQuestion('ReadPart1');
    }
    else if(part=='R2'){
      setpartname('Text Completion');
      setDirections('In this part, you will read four passages of text, such as an article, a letter, a form and an e-mail. In each reading passage there will be three blanks to fill in. You will read four possible choices for each blank. You should read the entire passage to make sure you choose the correct choice in context.')
      fetchQuestion('ReadPart2');
    }
    else if(part=='R3'){
      setpartname('Reading Comprehension');
      setDirections('In this part, you will read passages in the form of letters, ads, memos, faxes, schedules, etc. The reading section has a number of single passages and 4 double passages. You will be asked 2-4 questions about each single passage, and 5 questions for each double passage. Sometimes you will be asked for specific details. Other times you will be asked about what the passage implies. In the paired passages you will also be asked to make connections between the two related texts. On the real test you will not have time to read every word. You need to practice scanning and reading quickly for details.')
      fetchQuestion('ReadPart3');
    }
    else if(part=='S1'){
    setpartname('Read a text aloud');
    setDirections('In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.')
    fetchQuestion('SpeakPart1');
    }
    else if(part=='S2'){
      setpartname('Describe a picture');
      setDirections('In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture.')
      fetchQuestion('SpeakPart2');
    }
    else if(part=='S3'){
      setpartname(' Respond to questions');
      setDirections('In this part of the test, you will answer three questions. You will have three seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 5 and 6, and 30 seconds to respond to Question 7.')
      fetchQuestion('SpeakPart3');
    }
    else if(part=='S4'){
      setpartname('Respond to questions using information provided');
      setDirections(' In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have three seconds to prepare and 15 seconds to respond to Questions 8 and 9. You will hear Question 10 two times. You will have three seconds to prepare and 30 seconds to respond to Question 10.')
      fetchQuestion('SpeakPart4');
    }
    else if(part=='S5'){
      setpartname('Express an opinion');
      setDirections(' In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak.')
      fetchQuestion('SpeakPart5');
    }
    else if(part=='W1'){
      setpartname('Write a sentence based on a picture');
      setDirections(' In this part of the test, you will write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence.\n\nYou can change the forms of the words and you can use the words in any order.\n\nYour sentence will be scored on the appropriate use of grammar, and the relevance of the sentence to the picture.\n\nYou will have eight minutes to complete this part of the test.')
      fetchQuestion('WritePart1');
    }
    else if(part=='W2'){
      setpartname('Respond to a written request');
      setDirections(' In this part of the test, you will show how well you can write a response to an e-mail. \n\n Your response will be scored on the quality and variety of your sentences, vocabulary, and organization. \n\n You will have 10 minutes to read and answer each e-mail.')
      fetchQuestion('WritePart2');
    }
    else if(part=='W3'){
      setpartname('Write an opinion essay');
      setDirections('Respond to the e-mail. Respond as if you have recently moved to a new city. \n\n In your e-mail to the committee, make at least TWO requests for information.')
      fetchQuestion('WritePart3');
    }
  }, [isopen]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg8.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            {partname}
          </Text>
        </View>

        <View
          style={{
            height: 100,
            width: '96%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: card_color,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#E8E8E8',
          }}>
          <FontAwesome name="image"  size={50} style={{color:PRIMARY_COLOR}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Sentences completed:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>{Analysis?.Qty||MaxQ||0}</Text>
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Correct:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>{Analysis?.Score||0}</Text>
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '300', marginRight:5}]}>Progress:</Text>
              <Progress.Bar progress={MaxQ>0?MaxQ / sum:1/sum} width={120} height={10} style={{height:10,}} color={PRIMARY_COLOR}/>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 260,
            width: '90%',
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: card_color,
            alignSelf: 'center',
          }}>
          <ScrollView>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                color: PRIMARY_COLOR,
                fontWeight: '600',
                marginLeft: 10,
                marginTop: 10,
              }}>
              Directions:
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '400',
                marginLeft: 10,
              }}>
              {directions}
            </Text>
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            height: 80,
          }}>
          <Text style={{color: 'black', fontSize: 20, marginTop: 33}}>
            Number of questions:
          </Text>
          <DropDownPicker
            items={[
              {label: '2', value: 2},
              {label: '5', value: 5},
              {label: '10', value: 10},
              {label: '15', value: 15},
              {label: '20', value: 20},
            ]}
            open={isopen}
            setOpen={() => setopen(!isopen)}
            value={number}
            containerStyle={{
              height: 10,
              width: 100,
              marginLeft: 10,
              alignSelf: 'center',
            }}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setnumber(item)}
            maxHeight={100}
            zIndex={1}
          />
        </View>
        {/* {questionList&& */}
        <TouchableOpacity style={[AppStyle.button.button2,{marginTop:70, zIndex:0}]} onPress={() => navigation.push('QuestionScreen',{questionList:questionList, part:part, partName: partname,sign:'Max', numberofQuestion: number, isFromPL: route.params.isFromPL})}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
        </TouchableOpacity>
        {/* } */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  TextFont: {
    fontSize: 18,
    marginLeft: 5,
    color: 'black',
  },

});
export default InPartCard;
