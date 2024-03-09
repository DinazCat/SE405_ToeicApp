import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ResultCard from '../components/ResultCard';
import { ScrollView } from 'react-native-gesture-handler';

const TestResultScreen = ({navigation, route}) => {
  const {History, questionList, testHistory} = route.params
  const [excellentL, setExcellentL] = useState([]);
  const [fairL, setFairL] = useState([]);
  const [needImproveL, setNeedImproveL] = useState([]);
  useEffect(() => {
    const numberofQeach = [6,25,39,30,30,16,54];
    let listE = [];
    let listF = [];
    let listN = []; 
    for(let i = 0; i < 7; i++){
      let percent = testHistory.Corrects[i] / numberofQeach[i];
      if(percent > 0.8){
        
        listE.push({
          Part: 'Part ' + (i+1),
          Correct: testHistory.Corrects[i],
          NumberofQuestion: numberofQeach[i],
        });
      }
      else if(percent >= 0.6){
        listF.push({
          Part: 'Part ' + (i+1),
          Correct: testHistory.Corrects[i],
          NumberofQuestion: numberofQeach[i],
        })
      }
      else{
        listN.push({
          Part: 'Part ' + (i+1),
          Correct: testHistory.Corrects[i],
          NumberofQuestion: numberofQeach[i],
        })
      }
    }
    setExcellentL(listE);
    setFairL(listF);
    setNeedImproveL(listN);
    
    let number = 0;
    for(let i = 0 ; i < History.length; i++){
      if(History[i].part=='L1'||History[i].part=='L2'||History[i].part=='R1'){
        History[i].Number = number;
        number++;
        if(History[i].Default == -2){
          let correct = 3;
            for(let j = 0;j < 3; j++){
              if(questionList[i].Answer[j]) correct=j
            }
            History[i].Default = correct;
        }
      }
      else{
        History[i].Number = [];
        for(let j = 0; j < History[i].Default.length; j++){
          History[i].Number[j] = number;
          number++;
        }            
      }
    }


  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} style={styles.IconButton}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Result</Text>
      </View>

      <ScrollView>
      <View style={styles.ResultStatsWrapper}>
          <View
            style={[
              styles.ResultStatsItem,{backgroundColor: '#D5FFDA', width: 110},
            ]}>
            <Image style={{width: 28, height: 28}} source={require('../assets/accept.png')}/>
            <Text style={styles.ResultStatsTitle}>{testHistory.Correct}</Text>
            <Text style={styles.ResultStatsSubTitle}>
              {'Correct'}
            </Text>
          </View>
        <View
          style={[
            styles.ResultStatsItem,{backgroundColor: '#FFE2E2', width: 110},
          ]}>
          <Image style={{width: 29, height: 29}} source={require('../assets/incorrect.png')}/>
          <Text style={styles.ResultStatsTitle}>{testHistory.Incorrect}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Incorrect'}
          </Text>
        </View>
        <View
          style={[
            styles.ResultStatsItem,{backgroundColor: '#DCDBFF', width: 110},
          ]}>
          <Image style={{width: 30, height: 30}} source={require('../assets/forbidden.png')}/>
          <Text style={styles.ResultStatsTitle}>{testHistory.Unanswer}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Unanswered'}
          </Text>
        </View>
      </View>

      <View style={styles.ResultStatsWrapper}>
        <View
          style={[styles.ResultStatsItem,{backgroundColor: '#FFFCC2', width: 150}, ]}>
          <Text style={styles.ResultStatsTitle2}>Listening</Text>
          <Text style={styles.ResultStatsTitle}>{(testHistory.Corrects[0]+testHistory.Corrects[1]+testHistory.Corrects[2]+testHistory.Corrects[3]) * 5}/495</Text>
          <Text style={styles.ResultStatsSubTitle}>
            Correct Answers: {testHistory.Corrects[0]+testHistory.Corrects[1]+testHistory.Corrects[2]+testHistory.Corrects[3]}/100
          </Text>
        </View>
        <View
          style={[styles.ResultStatsItem,{backgroundColor: '#FFFCC2', width: 150},]}>
          <Text style={styles.ResultStatsTitle2}>Reading</Text>
          <Text style={styles.ResultStatsTitle}>{(testHistory.Corrects[4]+testHistory.Corrects[5]+testHistory.Corrects[6]) * 5}/495</Text>
          <Text style={styles.ResultStatsSubTitle}>
            Correct Answers: {testHistory.Corrects[4]+testHistory.Corrects[5]+testHistory.Corrects[6]}/100
          </Text>
        </View>
      </View>

      <View style={styles.StatisticsContainer}>
        <View style={{marginRight: 80}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'checkmark-outline'} style={styles.iconStyle}/>
            <Text style={styles.StatisticsText}>Test Result: {testHistory.Correct}/200</Text>
          </View>    
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../assets/target.png')} style={{width: 23, height: 23, margin: 5}}/>
            <Text style={styles.StatisticsText}>Accuracy: {testHistory.Correct/2}%</Text>
          </View> 
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'time-outline'} style={styles.iconStyle}/>
            <Text style={styles.StatisticsText}>Time: {testHistory.CompletionTime} / 2:00:00</Text>
          </View>      
        </View>

        <View style={styles.ResultStatsItem}>
          <Image style={{width: 30, height: 30}} source={require('../assets/flag.png')}/>
          <Text style={styles.ResultStatsTitle}>{testHistory.Correct*5}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Points'}
          </Text>
        </View>
      </View>

      <View style={[styles.StatisticsContainer, {justifyContent: 'space-around', marginTop: 10}]}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.StatisticsText, {color: '#10B400'}]}>Excellent</Text>
            <Image style={{width: 20, height: 20, marginLeft: 5}} source={require('../assets/smile.png')}/>
          </View>
          {excellentL.length==0 && <Text style={[styles.StatisticsText, {fontWeight: '0'}]}>None</Text>}
          {
            excellentL.map((each, key) => {
              return (
                <Text style={styles.StatisticsText}>{each.Part}: {each.Correct}/{each.NumberofQuestion}</Text>
              );
            })
          }
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.StatisticsText, {color: '#FFD93B'}]}>Fair</Text>
            <Image style={{width: 20, height: 20, marginLeft: 5}} source={require('../assets/confused.png')}/>
          </View>
          {fairL.length==0 && <Text style={[styles.StatisticsText, {fontWeight: '0'}]}>None</Text>}
          { 
            fairL.map((each, key) => {
              return (
                <Text style={styles.StatisticsText}>{each.Part}: {each.Correct}/{each.NumberofQuestion}</Text>
              );
            })
          }
        </View>
        <View>        
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.StatisticsText, {color: '#FB0E0C'}]}>Need Improve</Text>
            <Image style={{width: 20, height: 20, marginLeft: 5}} source={require('../assets/sadness.png')}/>
          </View>
          <View>
          {needImproveL.length==0 && <Text style={[styles.StatisticsText, {fontWeight: '0'}]}>None</Text>}
          {
            needImproveL.map((each, key) => {
              return (
                <Text style={[styles.StatisticsText, {fontWeight: '0'}]}>{each.Part}: <Text style={{fontWeight: 'bold'}}>{each.Correct}/{each.NumberofQuestion}</Text></Text>
              );
            })
          }
          </View>
        </View>
      </View>
      
      <FlatList
      data={History}
      windowSize={10} 
      initialNumToRender={5} 
      renderItem={({item, index}) => {
        if (item.part != 'L3' && item.part != 'L4' && item.part != 'R2' && item.part != 'R3') {
          return (
            <ResultCard
              defaultanswer={item.Default}
              useranswer={item.Select}
              question={item.Number}
              id={item.Qid}
              click={() => {
                const listQ = questionList.slice(index, index + 1);
                const listH = History.slice(index, index + 1);
                navigation.push('ReviewQuestion', {
                  // questionList: questionList,
                  // indication: index,
                  // History: History,
                  questionList: listQ,
                  indication: 0,
                  History: listH,
                  part: null,
                  isTest: true,
                });
              }}
            />
          );
        } else {
            return (
              item.Default.map((each,key)=>{
                return( 
              <ResultCard
                defaultanswer={each}
                useranswer={item.Select[key]}
                question={item.Number[key]}
                id={item.Qid}
                click={() => {
                  const listQ = questionList.slice(index, index + 1);
                  const listH = History.slice(index, index + 1);
                  navigation.push('ReviewQuestion', {
                    // questionList: questionList,
                    // indication: index,
                    // History: History,
                    questionList: listQ,
                    indication: 0,
                    History: listH,
                    part: null,
                    isTest: true,
                  });
                }}
              />
                )})
            );
          }
      }}
    />
    </ScrollView>

    </View>
  )
}

export default TestResultScreen
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  header:{
    flexDirection:'row', 
    backgroundColor: '#9ACC1C', 
    alignItems: 'center', 
    padding: 8
  },
  headerText:{
    marginLeft: 120,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  IconButton:{
    color: '#fff', 
    fontSize: 30, 
    padding: 5,
  },
  ResultStatsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  ResultStatsItem: {
    justifyContent: 'center',
    //width: 110,
    borderRadius: 5,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 5

  },
  ResultStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  ResultStatsSubTitle: {
    fontSize: 12,
    color: '#666',
  },
  StatisticsContainer:{
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row'
  },
  StatisticsText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '700'
  },
  iconStyle:{
    color: '#000',
    fontSize: 25, 
    padding: 5
  },
  ResultStatsTitle2:{
    fontSize: 16,
    fontWeight: '500',
    color: '#9ACC1C'
  },
  AnswersContainer:{
    margin: 10,
  },
  AnswersWrapper: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 10,  
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  QuestionText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
    color: '#222',
    marginRight: 10
  },
  PartText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '700',
    fontStyle: 'italic',
    marginTop: 10
  },
  CircleAnswer:{
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#555',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  CircleAnswerText:{
    fontSize: 17,
    fontWeight: '500',
    color: '#000'
  }
})