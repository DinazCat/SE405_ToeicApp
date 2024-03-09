import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,ImageBackground } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';
import socketServices from '../api/socketService';

const PracticePlan=({navigation})=> {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [PracticePlan, setPracticePlan] = useState();
  const [progressBar, setProgressBar] = useState(0);
  const [currentPhaseIndex, setPhaseIndex]= useState();
  const [currentPhase, setCurrentPhase] = useState();
  const [currentContent, setCurrentContent] = useState();
  const [currentTarget, setCurrentTarget] = useState();
  useEffect(() => {
    socketServices.initializeSocket()
    socketServices.emit('UserId', user.uid)
  }, []);
  useEffect(() => {
    socketServices.on(user.uid+'PracticePlanChange',(data) => {
      setPracticePlan(data);

      setPhaseIndex(data.CurrentPhase.PhaseIndex);

      setCurrentPhase(data.PracticePhases[data.CurrentPhase.PhaseIndex].Phases)
      setCurrentContent(data.PracticePhases[data.CurrentPhase.PhaseIndex].Content);
      setCurrentTarget(data.PracticePhases[data.CurrentPhase.PhaseIndex].Target);

      const Days = data.PracticePhases[data.CurrentPhase.PhaseIndex].Days;
      if(Days){
      const totalCompleted = Days.reduce((acc, day) => acc + day.CompletedQuestion, 0);
      const totalQuestions = Days.reduce((acc, day) => acc + day.NumberofQuestions, 0);
      const completionPercentage = (totalCompleted / totalQuestions);
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

    setCurrentPhase(data.PracticePhases[data.CurrentPhase.PhaseIndex].Phases)
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
  const Card = ({item}) => {
      return(
          <View style={{flexDirection: 'row'}}>
              <View style={[styles.cardItem, { width:'27%', backgroundColor: item.Target ? '#fff' : '#E5AC3C'}]}>
                  <Text style={styles.TextStyle}>Day {item.Phases}</Text>
              </View>
              <View style={[styles.cardItem, {flex: 1, backgroundColor: item.Target ? '#fff' : PRIMARY_COLOR}]}>                 
                  {item.Target ? (
                  <>
                  <Text style={[styles.TextStyle]}>{item.Content}</Text>
                  <Text style={[styles.TextStyle, {fontSize: 16, color: 'black', fontWeight: '600'}]}>Target: {item.Target} point</Text>
                  </>
                  ) : (
                    <Text style={[styles.TextStyle, {fontWeight: '600',}]}>{item.Content}</Text>
                  )}
              </View>
          </View>
      );
  }
  if(loading){
    return (
      <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
    )   
  }
  return (
    <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity onPress={() => navigation.navigate('ChoosePracticePlan', {TargetLevel: PracticePlan.TargetLevel})}
          style={styles.GoalWrapper}>
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
        </View>
        <Text style={{color: '#333', fontSize: 18, marginLeft: '5%', marginTop: '1%'}}>#Current</Text>
        <View style={styles.ProcessContainer}>  
        <View style={styles.ProgressCard}>
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
          <Text style={{color: '#333', fontSize: 20, fontWeight: '600'}}>
            {currentContent}
          </Text>
          { currentTarget && 
          <Text style={{color: '#333', fontSize: 17,}}>
            Target: {currentTarget} point
          </Text>
          }
        </View>
      </View>
        <ScrollView style={{height: 3000}}>
        <View style={{width:'96%', alignSelf:'center', marginTop:10}}>
            <View style={{height: 30, justifyContent:'center', flexDirection: 'row'}}>
                <Text style={[styles.TextStyle, {width: '25%', marginHorizontal: '3%'}]}>Time</Text>
                <Text style={[styles.TextStyle, {width: '60%', marginHorizontal: '3%'}]}>Content</Text>
            </View>
            {PracticePlan.PracticePhases.map((item, index) => (
              <Card key={index} item={item} />
            ))}
        </View>
        </ScrollView>
        <View style={{flex: 1}}/>
        <TouchableOpacity style={[AppStyle.button.button2,{marginBottom:'8%', height: 40, width: '80%'}]} onPress={() => navigation.navigate('PartPracticePlan', {PracticePlan})}>
            <Text style={AppStyle.button.button2_Text}>Continue</Text>
        </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    cardItem: {
        height: 60, 
        borderRadius:10, 
        backgroundColor: 'white', 
        elevation: 5, 
        alignItems:'center', 
        justifyContent:'center', 
        marginVertical: 10,
        marginHorizontal: '3%'
    },
    GoalWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: '3%',
      },
    TextStyle:{
        fontSize:17, 
        color: '#333', 
        textAlign:'center', 
        fontWeight:'400', 
    },
    box:{
        width:'80%', 
        height:'25%', 
        borderRadius:10, 
        borderColor:'black', 
        borderWidth:2, 
        alignItems:'center', 
        justifyContent:'center'
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
      }
})
export default PracticePlan