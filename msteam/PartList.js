import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api';
import eventEmitter from '../utils/EventEmitter';

const PartList = ({navigation, route}) => {
  const [ds, SetDs] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const {skill} = route.params;
  const [header, setHeader] = useState('');
  const [tab, setTab] = useState(1);
  const [selectedPart, setSelctedPart] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const getData = async () => {
    try {
      let PartList = [];

      if (skill == 'L') {
        const [questionsL1, questionsL2, questionsL3, questionsL4] =
          await Promise.all([
            Api.getAllQuestion('ListenPart1'),
            Api.getAllQuestion('ListenPart2'),
            Api.getAllQuestion('ListenPart3'),
            Api.getAllQuestion('ListenPart4'),
          ]);

        PartList = [
          {
            PartName: 'Part 1: Photographs',
            part: 'L1',
            Quantity: questionsL1.length,
            QuestionList: questionsL1,
          },
          {
            PartName: 'Part 2: Question & Response',
            part: 'L2',
            Quantity: questionsL2.length,
            QuestionList: questionsL2,
          },
          {
            PartName: 'Part 3: Short Conversations',
            part: 'L3',
            Quantity: questionsL3.length,
            QuestionList: questionsL3,
          },
          {
            PartName: 'Part 4: Short Talks',
            part: 'L4',
            Quantity: questionsL4.length,
            QuestionList: questionsL4,
          },
        ];

        setHeader('Listening');
      } else if (skill == 'R') {
        const [questionsR1, questionsR2, questionsR3] = await Promise.all([
          Api.getAllQuestion('ReadPart1'),
          Api.getAllQuestion('ReadPart2'),
          Api.getAllQuestion('ReadPart3'),
        ]);

        PartList = [
          {
            PartName: 'Part 1: Incomplete Sentences',
            part: 'R1',
            Quantity: questionsR1.length,
            QuestionList: questionsR1,
          },
          {
            PartName: 'Part 2: Text Completion',
            part: 'R2',
            Quantity: questionsR2.length,
            QuestionList: questionsR2,
          },
          {
            PartName: 'Part 3: Reading Comprehension',
            part: 'R3',
            Quantity: questionsR3.length,
            QuestionList: questionsR3,
          },
        ];

        setHeader('Reading');
      } else if (skill == 'S') {
        const [
          questionsS1,
          questionsS2,
          questionsS3,
          questionsS4,
          questionsS5,
        ] = await Promise.all([
          Api.getAllQuestion('SpeakPart1'),
          Api.getAllQuestion('SpeakPart2'),
          Api.getAllQuestion('SpeakPart3'),
          Api.getAllQuestion('SpeakPart4'),
          Api.getAllQuestion('SpeakPart5'),
        ]);

        PartList = [
          {
            PartName: 'Part 1: Read a text aloud',
            part: 'S1',
            Quantity: questionsS1.length,
            QuestionList: questionsS1,
          },
          {
            PartName: 'Part 2: Describe a picture',
            part: 'S2',
            Quantity: questionsS2.length,
            QuestionList: questionsS2,
          },
          {
            PartName: 'Part 3: Respond to questions',
            part: 'S3',
            Quantity: questionsS3.length,
            QuestionList: questionsS3,
          },
          {
            PartName: 'Part 4: Respond to questions using information provided',
            part: 'S4',
            Quantity: questionsS4.length,
            QuestionList: questionsS4,
          },
          {
            PartName: 'Part 5: Express an opinion',
            part: 'S5',
            Quantity: questionsS5.length,
            QuestionList: questionsS5,
          },
        ];

        setHeader('Speaking');
      } else if (skill == 'W') {
        const [questionsW1, questionsW2, questionsW3] = await Promise.all([
          Api.getAllQuestion('WritePart1'),
          Api.getAllQuestion('WritePart2'),
          Api.getAllQuestion('WritePart3'),
        ]);

        PartList = [
          {
            PartName: 'Part 1: Write a sentence based on a picture',
            part: 'W1',
            Quantity: questionsW1.length,
            QuestionList: questionsW1,
          },
          {
            PartName: 'Part 2: Respond to a written request',
            part: 'W2',
            Quantity: questionsW2.length,
            QuestionList: questionsW2,
          },
          {
            PartName: 'Part 3: Write an opinion essay',
            part: 'W3',
            Quantity: questionsW3.length,
            QuestionList: questionsW3,
          },
        ];

        setHeader('Writing');
      }

      SetDs(PartList);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onQuestionTap = item => {
    console.log(selectedPart);
    navigation.push('QuestionScreen', {
      questionList: [item],
      part: selectedPart.part,
      partName: selectedPart.Partname,
      // sign: 'Max',
      // numberofQuestion: number,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg8.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome
              name="chevron-left"
              color="white"
              size={20}
              onPress={() => {
                if (tab === 1) navigation.goBack();
                else setTab(1);
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            {header}
          </Text>
          <View style={{flex: 1}} />
          {tab === 2 && (
            <Text
              onPress={() => {
                eventEmitter.emit('updateSelectedQList', {
                  selectedQuestions,
                  part: selectedPart.part,
                });
                navigation.goBack();
              }}
              style={{
                color: 'white',
                fontSize: 20,
                textDecorationLine: 'underline',
                marginRight: 10,
              }}>
              Done
            </Text>
          )}
        </View>
        {tab === 1 && ds != null && (
          <FlatList
            data={ds}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  style={AppStyle.viewstyle.column_card}
                  onPress={() => {
                    setQuestionList(item.QuestionList);
                    setSelctedPart(item);
                    setTab(2);
                  }}>
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontWeight: '500',
                      fontSize: 17,
                      marginLeft: 5,
                    }}>
                    {item.PartName}
                  </Text>
                  <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                    Number of questions:{' '}
                    <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                      {item.Quantity}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        {tab === 2 && questionList.length !== 0 && (
          <>
            <Text style={[styles.itemText, {margin: 10}]}>
              Selected Quantity: {selectedQuestions.length}
            </Text>
            <FlatList
              data={questionList}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.elevatedBox}
                  onPress={() => onQuestionTap(item)}>
                  <Image
                    source={{
                      uri: item.Image
                        ? item.Image
                        : item.Picture
                        ? item.Picture
                        : 'https://cdn3.emoji.gg/emojis/8014_green_question.png',
                    }}
                    style={styles.itemImg}
                  />
                  <Text style={[styles.itemText, {fontWeight: '400'}]}>
                    Question {item.Order}
                  </Text>
                  <View style={{flex: 1}} />
                  <TouchableOpacity
                    style={{marginRight: 25}}
                    onPress={() => {
                      if (selectedQuestions.includes(item)) {
                        setSelectedQuestions(
                          selectedQuestions.filter(i => i !== item),
                        );
                      } else {
                        setSelectedQuestions([...selectedQuestions, item]);
                      }
                    }}>
                    <IonIcon
                      name={
                        selectedQuestions.includes(item)
                          ? 'remove-outline'
                          : 'add-outline'
                      }
                      color={'#444'}
                      size={25}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </>
        )}
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
    fontSize: 15,
    marginLeft: 5,
    color: 'black',
  },
  itemImg: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 10,
  },
  elevatedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderRadius: 1,
    // Elevation for Android
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
});
export default PartList;
