import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../components/CustomHeader';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';
import socketServices from '../api/socketService';

const PartPracticePlan = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [PracticePlan, setPracticePlan] = useState(route.params);
  const [currentPhase, setCurrentPhase] = useState();
  const [currentPhaseIndex, setPhaseIndex]= useState();
  const [currentDay, setCurrentDay] = useState();
  const [currentDays, setCurrentDays] = useState();
  const [currentTest, setCurrentTest] = useState();
  const [currentContent, setCurrentContent] = useState();
  const [currentTarget, setCurrentTarget] = useState();
  const [progressBar, setProgressBar] = useState(0);
  let part;

  useEffect(() => {
    socketServices.initializeSocket()
    socketServices.emit('UserId', user.uid)
  }, []);
  useEffect(() => {
    socketServices.on(user.uid+'PracticePlanChange',(data) => {
      setPracticePlan(data);

      setPhaseIndex(data.CurrentPhase.PhaseIndex);

      setCurrentPhase(data.PracticePhases[data.CurrentPhase.PhaseIndex].Phases)
      setCurrentDay(data.CurrentPhase.CurrentDay);
      setCurrentDay(data.CurrentPhase.CurrentDay);
      if(data.PracticePhases[data.CurrentPhase.PhaseIndex].Test != undefined)
        setCurrentTest(data.PracticePhases[data.CurrentPhase.PhaseIndex].Test);
      else setCurrentDays(data.PracticePhases[data.CurrentPhase.PhaseIndex].Days);
      setCurrentContent(data.PracticePhases[data.CurrentPhase.PhaseIndex].Content);
      setCurrentTarget(data.PracticePhases[data.CurrentPhase.PhaseIndex].Target);

      const Days = data.PracticePhases[data.CurrentPhase.PhaseIndex].Days;
      if(Days){
      const totalCompleted = Days.reduce((acc, day) => acc + day.CompletedQuestion, 0);
      const totalQuestions = Days.reduce((acc, day) => acc + day.NumberofQuestions, 0);
      const completionPercentage = (totalCompleted / totalQuestions);
      //console.log(totalCompleted, totalQuestions);
      setProgressBar(completionPercentage);
      }
      else setProgressBar(0);
    })
  }, []);

  useEffect(() => {
    fetchPracticePlan();

  }, []);
  const fetchPracticePlan = async () => {
    const data = await Api.getPracticePlan(user.uid);
    setPracticePlan(data);
    setLoading(false)

    setPhaseIndex(data.CurrentPhase.PhaseIndex);
    setCurrentPhase(data.PracticePhases[data.CurrentPhase.PhaseIndex].Phases);
    setCurrentDay(data.CurrentPhase.CurrentDay);
    if(data.PracticePhases[data.CurrentPhase.PhaseIndex].Test != undefined)
      setCurrentTest(data.PracticePhases[data.CurrentPhase.PhaseIndex].Test);
    else setCurrentDays(data.PracticePhases[data.CurrentPhase.PhaseIndex].Days);
    setCurrentContent(data.PracticePhases[data.CurrentPhase.PhaseIndex].Content);
    setCurrentTarget(data.PracticePhases[data.CurrentPhase.PhaseIndex].Target);
    
    const Days = data.PracticePhases[data.CurrentPhase.PhaseIndex].Days;
    if(Days){
    const totalCompleted = Days.reduce((acc, day) => acc + day.CompletedQuestion, 0);
    const totalQuestions = Days.reduce((acc, day) => acc + day.NumberofQuestions, 0);
    const completionPercentage = (totalCompleted / totalQuestions);
    setProgressBar(completionPercentage);
    }
  }

  if(loading){
    return (
      <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
    )   
  }

  const onBegin = () => {
    switch (currentPhaseIndex) {
      case 0: part = 'L1'; break;        
      case 1: part = 'L2'; break;
      case 2: part = null; break;
      case 3: part = 'R1'; break; 
      case 4: part = 'L3'; break; 
      case 5: part = null; break; 
      case 6: part = 'L4'; break; 
      case 7: part = 'R2'; break;
      case 8: part = null; break;
      case 9: part = 'R3'; break; 
      case 10: part = null; break;               
      default: break;
    }
    if(part != null)
      navigation.navigate('InPartCard', {part: part, isFromPL: true})
  }

  function PracticeCard({item}) {
    if(item.Day != currentDay)
    return (
      <View style={[AppStyle.viewstyle.row_start, {height: 60, marginTop:10}]}>
        <View
          style={styles.DayWrapper}>
          <Text style={styles.DayText}>
            Day {item.Day}
          </Text>
        </View>
        <View
          style={styles.PracticeWrapper}>
          <Text style={[styles.TextStyle, {textAlign: 'left', fontWeight:'600'}]}>Practice</Text>
          <Text style={[styles.TextStyle, {textAlign: 'left', fontSize: 16}]}>
            {item.NumberofQuestions} questions
          </Text>
        </View>
      </View>
    );
    else return ( 
      <>
        <View style={[styles.DayWrapper,{backgroundColor: PRIMARY_COLOR, marginLeft: '5%', marginTop: 10}]}>
            <Text
              style={styles.DayText}>
              Day {item.Day}
            </Text>
        </View>
        <View style={{height: 200, width:'82%', marginTop:'5%', alignSelf:'center', borderColor:PRIMARY_COLOR, borderWidth:2}}>
          <ImageBackground source={require('../assets/bg6.png')} resizeMode='stretch' style={{height:'100%', width:'100%'}}>
            <View style={{marginTop:10, marginLeft:15}}>
              <Text style={{color: PRIMARY_COLOR, fontSize: 30, fontWeight: '600'}}>{item.CompletedQuestion}/{item.NumberofQuestions}</Text>
            </View>
            <View style={{marginTop: 75, marginLeft:15, flexDirection:'row'}}>
            <View >
              <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                Practice
              </Text>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
                {item.NumberofQuestions} questions
              </Text>
            </View>
            <TouchableOpacity style={{ width:60, height:60, alignItems:'center', justifyContent:'center', marginLeft:108}}
            onPress={onBegin}>
              <Text style={{color:'white', fontSize:18}}>Begin</Text>
            </TouchableOpacity>
            </View>      
          </ImageBackground>
        </View>
      </>
    );
  }
  function TestCard({item}) {
    return ( 
      <>
      <View style={[styles.DayWrapper,{backgroundColor: PRIMARY_COLOR, marginLeft: '5%', marginTop: 10}]}>
          <Text
            style={styles.DayText}>
            Day {currentDay}
          </Text>
      </View>
      <View style={{height: 200, width:'82%', marginTop:'5%', alignSelf:'center', borderColor:PRIMARY_COLOR, borderWidth:2}}>
        <ImageBackground source={require('../assets/bg6.png')} resizeMode='stretch' style={{height:'100%', width:'100%'}}>
          <View style={{marginTop: 125, marginLeft:15, flexDirection:'row'}}>
          <View>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
              {/* {PracticePlan.PracticePhases[PhaseIndex].Content} */}
              Test 1
            </Text>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
              100 questions
            </Text>
          </View>
          <TouchableOpacity style={{ width:60, height:60, alignItems:'center', justifyContent:'center', marginLeft:108}}>
            <Text style={{color:'white', fontSize:18}}>Begin</Text>
          </TouchableOpacity>
          </View>      
        </ImageBackground>
      </View>
    </>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity style={styles.GoalWrapper}
        onPress={() => navigation.navigate('ChoosePracticePlan', {TargetLevel: PracticePlan.TargetLevel})}>
          <Icon
            name={'angle-double-up'}
            style={{color: 'white', fontSize: 19, color: PRIMARY_COLOR}}
          />
          <Text style={{color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 19}}>
            {PracticePlan.TargetLevel == 3 ? '605' :
            PracticePlan.TargetLevel == 4 ? '785' : '905' }
          </Text>
        </TouchableOpacity>
        <Text style={{textAlign:'center', color:'white', fontSize:20, marginLeft:'22%', fontWeight: '500'}}>Practice Plan</Text>     
        <TouchableOpacity style={{marginLeft: '20%'}} onPress={() => navigation.navigate('PracticePlan')}>
          <Image style={styles.routeIcon} source={require("../assets/route.png")}/>
        </TouchableOpacity>   
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View
        style={styles.ProcessContainer}>
        <View
          style={styles.ProgressCard}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
            Day {currentPhase}
          </Text>
          <Progress.Bar
            progress={progressBar}
            width={100}
            height={10}
            style={{height: 8}}
            color="white"
          />
        </View>
        <View>
          { currentTarget &&
          <Text style={{color: '#333', fontSize: 17,}}>
            Target: {currentTarget} point
          </Text>
          }
          <Text style={{color: '#333', fontSize: 17,}}>
            Point: <Text style={{fontWeight: 'bold'}}>0/0</Text>
          </Text>
        </View>
      </View>
      <View>
      <Text style={{color: '#333', fontSize: 20, fontWeight: '600', marginLeft: '5%', marginVertical: '3%'}}>
        {currentContent}
      </Text>
      {currentDays ? (
        <>
        {currentDays.map((item, index) => (
          <PracticeCard key={index} item={item}/>
        ))} 
      </>
      ) : currentTest ? ( 
        <TestCard item={currentTest}/>
      ) : null}
      </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  GoalWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: '3%',
  },
  TextStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
  },
  box: {
    width: '80%',
    height: '25%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'cover'
  },
  DayWrapper:{
    backgroundColor:'#DDDDDD',
    borderRadius: 25,
    width: 90,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  PracticeWrapper:{
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    width: '70%',
    height: '98%',
  },
  ProcessContainer:{
    height: '13%',
    width: '100%',
    borderColor: card_color,
    borderBottomWidth: 2,
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ProgressCard:{
    width: '40%',
    height: '80%',
    marginHorizontal: '10%',
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    elevation: 5
  },
  DayText:{
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default PartPracticePlan;
