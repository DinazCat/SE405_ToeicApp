import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Api from '../api/Api';

const CompleteCard = ({navigation, route}) => {
  const {
    quantity,
    answer,
    sign,
    part,
    questionL,
    partName,
    isFromPL,
    DetailQty,
  } = route.params;
  const [questionList, setQuestionList] = useState(null);
  const [reviewList, setReviewList] = useState(null);
  const [skill, setSkill] = useState();
  const [skillText, setSkillText] = useState('');
  const [score, setScore] = useState(0);
  const [quantity1, setQuantity1] = useState(route.params.quantity);
  const SetScore = () => {
    let score = 0;
    if (part == 'L1' || part == 'L2' || part == 'R1') {
      for (let i = 0; i < questionL.length; i++) {
        if (answer[i].Select == answer[i].Default) {
          score = score + 1;
        }
      }
      setScore(score);
    } else {
      for (let i = 0; i < questionL.length; i++) {
        for (let j = 0; j < answer[i].Default.length; j++) {
          if (answer[i].Select[j] == answer[i].Default[j]) {
            score = score + 1;
          }
        }
      }
      setScore(score);
    }
  };
  const setReview = async () => {
    const listId = [];
    let changePart = '';
    console.log(questionL.length);
    for (let i = 0; i < questionL.length; i++) {
      listId.push(questionL[i].Qid);
    }
    if (part == 'L1') {
      changePart = 'ListenPart1';
      setSkillText('Listening');
    } else if (part == 'L2') {
      changePart = 'ListenPart2';
      setSkillText('Listening');
    } else if (part == 'L3') {
      changePart = 'ListenPart3';
      setSkillText('Listening');
    } else if (part == 'L4') {
      changePart = 'ListenPart4';
      setSkillText('Listening');
    } else if (part == 'R1') {
      changePart = 'ReadPart1';
      setSkillText('Reading');
    } else if (part == 'R2') {
      changePart = 'ReadPart2';
      setSkillText('Reading');
    } else if (part == 'R3') {
      changePart = 'ReadPart3';
      setSkillText('Reading');
    }

    const data = await Api.getReviewQuestion({Part: changePart, listQ: listId});
    setReviewList(data);
  };
  const continuePractice = async () => {
    if (part == 'L1') {
      const list = await Api.getQuestion(quantity, 'ListenPart1');
      setQuestionList(list);
      setSkill('L1');
      return list;
    } else if (part == 'L2') {
      const list = await Api.getQuestion(quantity, 'ListenPart2');
      setQuestionList(list);
      setSkill('L2');
      return list;
    } else if (part == 'L3') {
      const list = await Api.getQuestion(quantity, 'ListenPart3');
      setQuestionList(list);
      setSkill('L3');
      return list;
    } else if (part == 'L4') {
      const list = await Api.getQuestion(quantity, 'ListenPart4');
      setQuestionList(list);
      setSkill('L4');
      return list;
    } else if (part == 'R1') {
      const list = await Api.getQuestion(quantity, 'ReadPart1');
      setQuestionList(list);
      setSkill('R1');
      return list;
    } else if (part == 'R2') {
      const list = await Api.getQuestion(quantity, 'ReadPart2');
      setQuestionList(list);
      setSkill('R2');
      return list;
    } else if (part == 'R3') {
      const list = await Api.getQuestion(quantity, 'ReadPart3');
      setQuestionList(list);
      setSkill('R3');
      return list;
    }
    return [];
  };

  useEffect(() => {
    // if(sign!='Home'){
    //   continuePractice()
    //   console.log('haha')
    // }
    setReview();
    SetScore();
  }, []);
  useEffect(() => {
    if (part == 'L3' || part == 'L4') {
      setQuantity1(quantity * 3);
    }
    if (part == 'R2' || part == 'R3') {
      setQuantity1(DetailQty);
    }
  }, []);
  const checkMess = () => {
    const rate = parseInt((score * 100) / quantity1);
    if (rate < 50) {
      return 'Your skills are still very poor, you need to put in more effort';
    } else if (rate >= 50 && rate <= 70) {
      return 'Your score is not very high, please continue to practice more';
    } else if (rate > 70 && rate <= 90) {
      return 'Congratulations, you are about to become a master, keep trying';
    } else if (rate > 90) {
      return 'Congratulations, you are a master, please maintain your current form';
    }
    return 'Your skills are still very poor, you need to put in more effort';
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg3.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <TouchableOpacity
          style={{marginLeft: '2%', marginTop: 10}}
          onPress={() => {
            if (isFromPL) {
              navigation.navigate('PartPracticePlan');
            } else if (skill != null)
              navigation.navigate('PartFormat', {skill: skill});
            else {
              navigation.goBack();
            }
          }}>
          <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={27} />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '50%',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 20,
              marginLeft: 5,
            }}>
            You have complete the practice section!
          </Text>
          <Text style={[styles.TextFont, {fontWeight: '500'}]}>
            {skillText + ': '}
            <Text style={[styles.TextFont, {fontWeight: '500'}]}>
              {partName}
            </Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              backgroundColor: '#FF8400',
              borderRadius: 10,
              padding: 10,
              color: 'white',
              fontWeight: '500',
              fontSize: 19,
            }}>
            {checkMess()}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: '6%',
            marginTop: 40,
            fontSize: 25,
            fontWeight: '500',
            color: 'black',
          }}>
          Result: {score}/{quantity1}
        </Text>
        <View style={styles.boxstyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              Correct rate:
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              {parseInt((score * 100) / quantity1)}%
            </Text>
          </View>
          <Progress.Bar
            progress={score / quantity1 || 0.0}
            width={250}
            height={10}
            style={{height: 10}}
            color={PRIMARY_COLOR}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '10%',
          }}>
          {reviewList != null && (
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={() =>
                navigation.push('ResultTable', {
                  History: answer,
                  questionList: reviewList,
                  part: part,
                  score: score,
                  quantity: quantity1,
                })
              }>
              <Text style={AppStyle.button.button2_Text}>Show answer</Text>
            </TouchableOpacity>
          )}
          {sign == 'Home' ? (
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={() =>
                navigation.push('QuestionScreen', {
                  questionList: reviewList,
                  part: part,
                  partName: partName,
                  sign: 'noMax',
                })
              }>
              <Text style={AppStyle.button.button2_Text}>Do again</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={async () => {
                await continuePractice().then(list => {
                  navigation.push('QuestionScreen', {
                    questionList: list,
                    part: part,
                    partName: partName,
                    sign: 'Max',
                  });
                });
              }}>
              <Text style={AppStyle.button.button2_Text}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
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
    fontSize: 22,
    marginLeft: 5,
    color: 'black',
  },

  boxstyle: {
    flexDirection: 'column',
    width: '90%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: 5,
    height: 120,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
    alignItems: 'center',
  },
});
export default CompleteCard;
