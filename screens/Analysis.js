import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ImageBackground,FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader'
import HistoryTestCard from '../components/HistoryTestCard';
import Api from '../api/Api'
import auth from '@react-native-firebase/auth';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import SmallHistoryCard from '../components/SmallHistoryCard'
import socketServices from '../api/socketService';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import { subDays, format } from 'date-fns';
import {
    LineChart,
  } from "react-native-chart-kit";

const Analysis  = ({navigation, route}) => {
  // const {chartPr, chartPrData, UserData} = route.params;
    const [profileData, setProfileData] = useState(null);
    const [level, setLevel] = useState('0 (Basic Proficiency)');
    const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
    const [pHistoryList, setPHistoryList] = useState(null);
    const [testHistories, setTestHistories] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedTabTest, setSelectedTabTest] = useState(0);
    const [averageScore,setAverageScore] = useState(0)
    const [averageScore1,setAverageScore1] = useState(0)
    const [highestScore,setHighestScore] = useState(0)
    const [highestScore1,setHighestScore1] = useState(0)
    const [ListenQtyComplete, setListenQtyComplete] = useState(0);
    const [TestComplete, setTestComplete] = useState(0);
    const [ListenScorePr, setListenScorePr] = useState(0);
    const [ReadQtyComplete, setReadQtyComplete] = useState(0);
    const [ReadScorePr, setReadScorePr] = useState(0);
    const [chartPr, setchartPr]=useState(['','','','','','',''])
    const [chartPr1, setchartPr1]=useState(['','','','','','',''])
    const [chartPrData, setchartPrData]=useState([0,0,0,0,0,0,0])
    const [chartPrData1, setchartPrData1]=useState([0,0,0,0,0,0,0])
    const [chartTestData, setchartTestData]=useState([0,0,0,0,0,0,0])
    const [chartTestData1, setchartTestData1]=useState([0,0,0,0,0,0,0])
    const [overViewTest, SetOverViewTest] = useState (null)
    const [overViewTest2, SetOverViewTest2] = useState (null)
    const setLineChart2 = ()=>{
        const currentDate = new Date();
        let line = chartPr.slice();
        let line2 = chartPr.slice();
        const Day = currentDate.getDate(); 
        const Month = currentDate.getMonth() + 1; 
        const Year = currentDate.getFullYear();
        const sixDaysAgo = subDays(currentDate, 6);
        const FiveDaysAgo = subDays(currentDate, 5);
        const FourDaysAgo = subDays(currentDate, 4);
        const ThreeDaysAgo = subDays(currentDate,3);
        const TwoDaysAgo = subDays(currentDate, 2);
        const OneDaysAgo = subDays(currentDate, 1);
        line[6] = 'Today';
        line[5] = format(OneDaysAgo, 'dd/MM')
        line[4] = format(TwoDaysAgo, 'dd/MM')
        line[3] = format(ThreeDaysAgo, 'dd/MM')
        line[2] = format(FourDaysAgo, 'dd/MM')
        line[1] = format(FiveDaysAgo, 'dd/MM')
        line[0] = format(sixDaysAgo, 'dd/MM')
        line2[6] = Day+'/'+Month+'/'+Year
        line2[5] = format(OneDaysAgo, 'dd/MM/yyyy')
        line2[4] = format(TwoDaysAgo, 'dd/MM/yyyy')
        line2[3] = format(ThreeDaysAgo, 'dd/MM/yyyy')
        line2[2] = format(FourDaysAgo, 'dd/MM/yyyy')
        line2[1] = format(FiveDaysAgo, 'dd/MM/yyyy')
        line2[0] = format(sixDaysAgo, 'dd/MM/yyyy')
        setchartPr(line)
        getDataPrChart(line2)
        getDataPrChart1(line2)
        getDataTestChart(line2)
    }
    useEffect(() => {
      // socketServices.initializeSocket();
      getPrHistory()
      getTestHistory()
      setLineChart2()
      }, []);
    // useEffect(() => {
    //   setLineChart2()
    //   }, []);
      const getPrHistory = async()=>{
        let list = []
         firestore()
        .collection('PracticeHistory')
        .onSnapshot((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            const data = doc.data();
            if(data.userId==auth().currentUser.uid){
            list.push(data)
            }
          })
          setPHistoryList(list)
        })
      }
      const getRound = (num) =>{
        return Math.round(num * 10) / 10
      }
      const getTestHistory = async()=>{
        let list = []
        let everage = 0;
        let highest = 0;
        let everage1 = 0;
        let highest1 = 0;
        let count = 0;
        let list1 = [0,0,0,0,0,0,0];
        firestore()
        .collection('TestHistory')
        .onSnapshot((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            const data = doc.data();
            list.push(data)
            // if(data.userId==auth().currentUser.uid){

            // }
            count=count+1
            const score1 = (data.Corrects[0]+data.Corrects[1]+data.Corrects[2]+data.Corrects[3]) * 5
            const score2 = (data.Corrects[4]+data.Corrects[5]+data.Corrects[6]) * 5
            if(score1 > highest){
              highest = score1
            }
            if(score2 > highest1){
              highest1 = score2
            }
            everage = everage+score1
            everage1 = everage1+score2
            //overview
            for(let i = 0; i < 7; i++){
              list1[i] = list1[i] + data.Corrects[i]
            }
          })
          setTestHistories(list)
          setAverageScore(parseInt(everage/count))
          setAverageScore1(parseInt(everage1/count))
          setHighestScore(highest)
          setHighestScore1(highest1)
          setTestComplete(count)
          // 6,25,39,30,30,16,54
          SetOverViewTest([getRound(list1[0]/18),getRound(list1[1]/75),getRound(list1[2]/117),getRound(list1[3]/60)])
          SetOverViewTest2([getRound(list1[4]/60),getRound(list1[5]/48),getRound(list1[6]/162)])
        })
      }
    // useEffect(() => {
    //   socketServices.on(auth().currentUser.uid+'PHistorychange',(data) => {
    //     setPHistoryList(data)
    //   })
    //   socketServices.on(auth().currentUser.uid+'TestHistoryChange',(data) => {
    //     setTestHistories(data)
    //   })
    //     }, []);
    function convert(value) {
      return value !== undefined ? value : 0;
    }
    const getProfile = async () => {
      // const data = await Api.getUserData(auth().currentUser.uid)
      await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then((querySnapshot)=>{
        const data = querySnapshot.data()
      setProfileData(data)
      if(data.currentScore){
        if(data.currentScore>=0 && data.currentScore <= 250){
          setLevel('0 (Basic Proficiency)')
          setLevelSource(require('../assets/Lv0.png'))
        }
        else if(data.currentScore <= 400){
          setLevel('1 (Elementary Proficiency)')
          setLevelSource(require('../assets/Lv1.png'))
        }
        else if(data.currentScore <= 600){
          setLevel('2 (Elementary Proficiency Plus)')
          setLevelSource(require('../assets/Lv2.png'))
        }
        else if( data.currentScore <= 780){
          setLevel('3 (Limited Working Proficiency)')
          setLevelSource(require('../assets/Lv3.png'))
        }
        else if(data.currentScore <= 900){
          setLevel('4 (Working Proficiency Plus)')
          setLevelSource(require('../assets/Lv4.png'))
        }
        else if(data.currentScore <= 990){
          setLevel('5 (International Professional Proficiency)')
          setLevelSource(require('../assets/Lv5.png'))
        }
      }
      if(data.AnalysisPractice){
        const sumQty = convert(data?.AnalysisPractice?.L1?.Qty) + convert(data?.AnalysisPractice?.L2?.Qty)+convert(data?.AnalysisPractice?.L3?.Qty)+convert(data?.AnalysisPractice?.L4?.Qty) ;
        setListenQtyComplete(sumQty)
        const sumScore = convert(data?.AnalysisPractice?.L1?.Score) + convert(data?.AnalysisPractice?.L2?.Score)+convert(data?.AnalysisPractice?.L3?.Score)+convert(data?.AnalysisPractice?.L4?.Score);
        setListenScorePr(sumScore)
        // Reading

        const sumQty1 = convert(data?.AnalysisPractice?.R1?.Qty) + convert(data?.AnalysisPractice?.R2?.Qty)+convert(data?.AnalysisPractice?.R3?.Qty) ;
        setReadQtyComplete(sumQty1)
        const sumScore1 = (data?.AnalysisPractice?.R1?.Score||0) + (data?.AnalysisPractice?.R2?.Score||0)+(data?.AnalysisPractice?.R3?.Score||0) ;
        setReadScorePr(sumScore1)
      }
    })
    };
  
    useEffect(() => {
      getProfile();

    }, []);
    const getDataTestChart = async(line)=>{
      try{
        let list = [0,0,0,0,0,0,0]
        let listR = [0,0,0,0,0,0,0]
      let list2 = [0,0,0,0,0,0,0]
        await firestore()
        .collection('TestHistory')
        .get()
        .then((querySnapshot)=>{
              querySnapshot.forEach(doc =>{
                const data = doc.data();
                const time2 = data.Date.split(',')
                const scoreL = data.Corrects[0]+data.Corrects[1]+data.Corrects[2]+data.Corrects[3]
                const scoreR = listR[6] + data.Corrects[4]+data.Corrects[5]+data.Corrects[6]
                if(time2[0]==line[6]){
                  list[6] = list[6]+ scoreL
                  listR[6] = listR[6] + scoreR
                  list2[6] = list2[6]+1
                }
                else if(time2[0]==line[5]){
                  list[5] = list[5]+scoreL
                  listR[5] = listR[5] + scoreR
                  list2[5] = list2[5]+1
                }
                 else if(time2[0]==line[4]){
                  list[4] = list[4]+scoreL
                  listR[4] = listR[4] + scoreR
                  list2[4] = list2[4]+1
                }
                else if(time2[0]==line[3]){
                  list[3] = list[3]+scoreL
                  listR[3] = listR[3] + scoreR
                  list2[3] = list2[3]+1
                }
                 else if(time2[0]==line[2]){
                  list[2] = list[2]+scoreL
                  listR[2] = listR[2] + scoreR
                  list2[2] = list2[2]+1
                }
                else if(time2[0]==line[1]){
                  list[1] = list[1]+scoreL
                  listR[1] = listR[1] + scoreR
                  list2[1] = list2[1]+1
                }
                 else if(time2[0]==line[0]){
                  list[0] = list[0]+scoreL
                  listR[0] = listR[0] + scoreR
                  list2[0] = list2[0]+1
                }
              })
              for(let i = 0; i < list2.length;i++){
                if(list2[i]==0) list2[i] = 1
            }
            let list3 = [list[0]/list2[0],list[1]/list2[1],list[2]/list2[2],list[3]/list2[3],list[4]/list2[4],list[5]/list2[5],list[6]/list2[6]]
            let list3R = [listR[0]/list2[0],listR[1]/list2[1],listR[2]/list2[2],listR[3]/list2[3],listR[4]/list2[4],listR[5]/list2[5],listR[6]/list2[6]]
            setchartTestData(list3)
            setchartTestData1(list3R)
            console.log("TestC "+ list3 )
            })
      }catch(e){
        console.log(e);
      }
    }
    const getDataPrChart1 = async(line)=>{
      try{
      let list = [0,0,0,0,0,0,0]
      let list2 = [0,0,0,0,0,0,0]
       await firestore()
        .collection('PracticeHistory')
        .get()
        .then((querySnapshot)=>{
              querySnapshot.forEach(doc =>{
                const data = doc.data();
                if(data.userId==auth().currentUser.uid){
                if(data.Part=='R1'||data.Part=='R2'||data.Part=='R3')
                {
                  const time = data.Time.split('-')
                  const time2 =  [time[0], time[1], time[2]].join('/')
                if(time2==line[6]){
                  list[6] = list[6]+(data.Score*100/data.DetailQty)
                  list2[6] = list2[6]+1
                }
                else if(time2==line[5]){
                  list[5] = list[5]+(data.Score*100/data.DetailQty)
                  list2[5] = list2[5]+1
                }
                 else if(time2==line[4]){
                  list[4] = list[4]+(data.Score*100/data.DetailQty)
                  list2[4] = list2[4]+1
                }
                else if(time2==line[3]){
                  list[3] = list[3]+(data.Score*100/data.DetailQty)
                  list2[3] = list2[3]+1
                }
                 else if(time2==line[2]){
                  list[2] = list[2]+(data.Score*100/data.DetailQty)
                  list2[2] = list2[2]+1
                }
                else if(time2==line[1]){
                  list[1] = list[1]+(data.Score*100/data.DetailQty)
                  list2[1] = list2[1]+1
                }
                 else if(time2==line[0]){
                  list[0] = list[0]+(data.Score*100/data.DetailQty)
                  list2[0] = list2[0]+1
                }
              }

              }
              })
              for(let i = 0; i < list2.length;i++){
                  if(list2[i]==0) list2[i] = 1
              }
              let list3 = [list[0]/list2[0],list[1]/list2[1],list[2]/list2[2],list[3]/list2[3],list[4]/list2[4],list[5]/list2[5],list[6]/list2[6]]
              setchartPrData1(list3)
            })    
      } catch(e){
        console.log(e);
      }
    }

    const getDataPrChart= async(line)=>{
        try{
        let list = [0,0,0,0,0,0,0]
        let list2 = [0,0,0,0,0,0,0]
         await firestore()
          .collection('PracticeHistory')
          .get()
          .then((querySnapshot)=>{
                querySnapshot.forEach(doc =>{
                  const data = doc.data();
                  if(data.userId==auth().currentUser.uid){
                  if(data.Part=='L1'||data.Part=='L2'||data.Part=='L3'||data.Part=='L4')
                  {
                    const time = data.Time.split('-')
                    const time2 =  [time[0], time[1], time[2]].join('/')
                  if(time2==line[6]){
                    list[6] = list[6]+(data.Score*100/data.DetailQty)
                    list2[6] = list2[6]+1
                  }
                  else if(time2==line[5]){
                    list[5] = list[5]+(data.Score*100/data.DetailQty)
                    list2[5] = list2[5]+1
                  }
                   else if(time2==line[4]){
                    list[4] = list[4]+(data.Score*100/data.DetailQty)
                    list2[4] = list2[4]+1
                  }
                  else if(time2==line[3]){
                    list[3] = list[3]+(data.Score*100/data.DetailQty)
                    list2[3] = list2[3]+1
                  }
                   else if(time2==line[2]){
                    list[2] = list[2]+(data.Score*100/data.DetailQty)
                    list2[2] = list2[2]+1
                  }
                  else if(time2==line[1]){
                    list[1] = list[1]+(data.Score*100/data.DetailQty)
                    list2[1] = list2[1]+1
                  }
                   else if(time2==line[0]){
                    list[0] = list[0]+(data.Score*100/data.DetailQty)
                    list2[0] = list2[0]+1
                  }
                }

                }
                })
                for(let i = 0; i < list2.length;i++){
                    if(list2[i]==0) list2[i] = 1
                }
                let list3 = [list[0]/list2[0],list[1]/list2[1],list[2]/list2[2],list[3]/list2[3],list[4]/list2[4],list[5]/list2[5],list[6]/list2[6]]
                setchartPrData(list3)
                console.log(list3)

              })    
        } catch(e){
          console.log(e);
        }
      }
  const checkProgress = (Part)=>{
    if(Part=='L1'){

      const rate =  profileData?.AnalysisPractice?.L1.Score/ profileData?.AnalysisPractice?.L1.Qty
      if(rate < 0.5){
        return {m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate >= 0.5 && rate <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate > 0.7 && rate <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }
    if(Part=='L2'){
    
      const rate1 = profileData?(profileData?.AnalysisPractice?.L2?.Score/profileData?.AnalysisPractice?.L2?.Qty):0/1
      if(rate1 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate1 >= 0.5 && rate1 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate1 > 0.7 && rate1 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate1 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }

    if(Part=='L3'){
      const rate2 = profileData?(profileData?.AnalysisPractice?.L3?.Score/profileData?.AnalysisPractice?.L3?.Qty):0/1
      if(rate2 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate2 >= 0.5 && rate2 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate2 > 0.7 && rate2 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate2 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }

    if(Part=='L4'){
      const rate3 = profileData?(profileData?.AnalysisPractice?.L4?.Score/profileData?.AnalysisPractice?.L4?.Qty):0/1
      if(rate3 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate3 >= 0.5 && rate3 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate3 > 0.7 && rate3 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate3 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }
    if(Part=='R1'){
      const rate3 = profileData?(profileData?.AnalysisPractice?.R1?.Score/profileData?.AnalysisPractice?.R1?.Qty):0/1
      if(rate3 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate3 >= 0.5 && rate3 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate3 > 0.7 && rate3 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate3 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }
    if(Part=='R2'){
      const rate3 = profileData?(profileData?.AnalysisPractice?.R2?.Score/profileData?.AnalysisPractice?.R2?.Qty):0/1
      if(rate3 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate3 >= 0.5 && rate3 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate3 > 0.7 && rate3 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate3 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }
    if(Part=='R3'){
      const rate3 = profileData?(profileData?.AnalysisPractice?.R3?.Score/profileData?.AnalysisPractice?.R3?.Qty):0/1
      if(rate3 < 0.5){
        return{m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
      }
      else if(rate3 >= 0.5 && rate3 <= 0.7 ){
        return{m:'Your score is not very high in this part, please continue to practice more',c:'orange'}
      }
      else if(rate3 > 0.7 && rate3 <= 0.9 ){
        return{m:'Congratulations, you are about to become a master in this part, keep trying',c:'yellow'}
      }
      else if(rate3 > 0.9 ){
        return{m:'Congratulations, you are a master in this part, please maintain your current form',c:'green'}
      }
    }
      return {m:'In this part, your skills are still very poor, you need to put in more effort',c:'red'}
  }
  const checkOverView = (rate)=>{
    if(rate<0.6){
      return {
        image:require('../assets/sadness.png'),
        mess:'Bad'
      }
    }
    if(rate>=0.6 && rate <= 0.8){
      return {
        image:require('../assets/confused.png'),
        mess:'Normal'
      }
    }
    if(rate>0.8){
      return {
        image:require('../assets/smile.png'),
        mess:'Good'
      }
    }
    return {
      image:require('../assets/sadness.png'),
      mess:'Bad'
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <CustomHeader Title={'Analysis/Evaluate'} navigation={navigation} />
        <ImageBackground
          source={require('../assets/bg10.png')}
          resizeMode="stretch"
          style={{
            height: 190,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: '20%',
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.userImg}
              source={{
                uri: profileData
                  ? profileData.userImg
                    ? profileData.userImg
                    : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
              }}
            />
            <View
              style={{flexDirection: 'column', width: '80%', marginLeft: 10}}>
              <Text style={[styles.InputStyle]}>Name: {profileData?.name}</Text>
              <Text style={[styles.InputStyle]}>
                Current score: {profileData?.currentScore}
              </Text>
              <Text style={[styles.InputStyle]}>
                Target score: {profileData?.targetScore}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.InputStyle]}>Level: {level}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{flexDirection: 'row'}}>
          <Text style={AppStyle.textstyle.parttext}>Test Analysis:</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity style={[AppStyle.button.button1, {marginLeft: 5}]} onPress={()=>{setSelectedTabTest(0)}}>
            <Text style={AppStyle.button.button1_Text}>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyle.button.button1, {marginLeft: 5}]} onPress={()=>{setSelectedTabTest(1)}}>
            <Text style={AppStyle.button.button1_Text}>Reading</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Test complete
            </Text>
            <Text style={styles.StorageText}>{TestComplete}</Text>
          </View>
          <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Average score
            </Text>
            <Text style={styles.StorageText}>{selectedTabTest==0?averageScore+'/495':averageScore1+'/495'}</Text>
          </View>
          <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Highest score
            </Text>
            <Text style={styles.StorageText}>{selectedTabTest==0?highestScore+'/495':highestScore1+'/495'}</Text>
          </View>
        </View>
        {/* <View style={{height: 200}}> */}
        <View >
          <Text style={[styles.StorageText, {marginLeft: 5, marginTop:5}]}>Correct ratio Line Chart</Text>
          <LineChart
            data={{
              labels: chartPr,
              datasets: [
                {
                  data: selectedTabTest==0?chartTestData:chartTestData1,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        {/* </View> */}
        <View>
          <Text style={[styles.StorageText, {marginLeft: 5, marginTop:5}]}>Overview:</Text>
        {selectedTabTest==0&&<FlatList
            data={overViewTest}
            renderItem={({item, index}) => {
              return (
                <View style={styles.overviewBox}>
                  <Text style={[AppStyle.button.buttonText, {fontWeight: 500, width:100,}]}>Part {index+1}</Text>     
                  <Text style={[styles.StorageText,{width:100}]}>correct:{item*100}%</Text>
                  <View style={{width:100, flexDirection:'row'}}>
                  <Text style={styles.StorageText}>{checkOverView(item).mess}</Text>
                  <Image style={{width: 20, height: 20, marginLeft: 5}} source={checkOverView(item).image}/>
                  </View>
              </View>
              );
            }}
          />}
            {selectedTabTest==1&&<FlatList
            data={overViewTest2}
            renderItem={({item, index}) => {
              return (
                <View style={styles.overviewBox}>
                  <Text style={[AppStyle.button.buttonText, {fontWeight: 500, width:100}]}>Part {index+1}</Text>     
                  <Text style={[styles.StorageText,{width:100}]}>correct:{item*100}%</Text>
                  <View style={{width:100, flexDirection:'row'}}>
                  <Text style={styles.StorageText}>{checkOverView(item).mess}</Text>
                  <Image style={{width: 20, height: 20, marginLeft: 5}} source={checkOverView(item).image}/>
                  </View>
              </View>
              );
            }}
          />}
        </View>
        <View>
          <Text style={[styles.StorageText, {marginLeft: 5,marginTop:5}]}>
            List of tests you have taken
          </Text>
          <FlatList
            data={testHistories?.slice(0, 3)}
            renderItem={({item, index}) => {
              return (
                <HistoryTestCard
                  item={item}
                  click={() => {
                    navigation.push('TestResult', {
                      History: item.History,
                      questionList: item.Questions,
                      testHistory: item,
                    });
                  }}
                />
              );
            }}
          />
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '95%',
                marginTop: 10,
                marginBottom:15
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('HistoryScreen', {
                    list: pHistoryList ? pHistoryList : [],
                    listTest: testHistories ? testHistories : [],
                  });
                }}>
                <Text style={AppStyle.button.buttonText}>See more</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={AppStyle.textstyle.parttext}>Practice Analysis:</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity style={[AppStyle.button.button1, {marginLeft: 5}]} onPress={()=>setSelectedTab(0)}>
            <Text style={AppStyle.button.button1_Text}>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyle.button.button1, {marginLeft: 5}]} onPress={()=>setSelectedTab(1)}>
            <Text style={AppStyle.button.button1_Text}>Reading</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Qtn complete
            </Text>
            <Text style={styles.StorageText}>{selectedTab==0?ListenQtyComplete:ReadQtyComplete}</Text>
          </View>
          {/* <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Average Q/day
            </Text>
            <Text style={styles.StorageText}>10</Text>
          </View> */}
          <View style={styles.boxStorage}>
            <Text style={[AppStyle.button.buttonText, {fontWeight: 400}]}>
              Score
            </Text>
            <Text style={styles.StorageText}>
              {selectedTab==0?(ListenScorePr + '/' + ListenQtyComplete):(ReadScorePr+ '/' + ReadQtyComplete)}
            </Text>
          </View>
        </View>
        {/* vẽ biểu đồ đường tỉ lệ đúng trong 7 ngày */}
        {chartPrData!=[0,0,0,0,0,0,0]&&<View >
          <Text style={[styles.StorageText, {marginLeft: 5,marginTop:5}]}>Correct ratio Line Chart</Text>
          <LineChart
            data={{
              labels: chartPr,
              datasets: [
                {
                  data: selectedTab==0?chartPrData:chartPrData1,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>}
        {profileData&&selectedTab==0&&<View style={{marginLeft:10}}>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 1: Photographs
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.L1?.Score/profileData?.AnalysisPractice?.L1?.Qty|0.0):0.0} width={120} height={10} style={{height:10,}} color={checkProgress('L1').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.L1?.Score/profileData?.AnalysisPractice?.L1?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('L1').m}
              </Text>
            </View>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 2: Question & Response
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.L2?.Score/profileData?.AnalysisPractice?.L2?.Qty|0.0):0.0} width={120} height={10} style={{height:10,}} color={checkProgress('L2').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.L2?.Score/profileData?.AnalysisPractice?.L2?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('L2').m}
              </Text>
            </View>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 3: Short Conversations
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.L3?.Score/profileData?.AnalysisPractice?.L3?.Qty|0.0):0.0} width={120} height={10} style={{height:10,}} color={checkProgress('L3').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.L3?.Score/profileData?.AnalysisPractice?.L3?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('L3').m}
              </Text>
            </View>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 4: Short Talks
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.L4?.Score/profileData?.AnalysisPractice?.L4?.Qty|0.0):0.0} width={120} height={10} style={{height:10,}} color={checkProgress('L4').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.L4?.Score/profileData?.AnalysisPractice?.L4?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('L4').m}
              </Text>
            </View>

        </View>}
        {profileData&&selectedTab==1&&<View style={{marginLeft:10}}>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 1: Incomplete Sentences
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.R1?.Score/profileData?.AnalysisPractice?.R1?.Qty||0.1):0.1} width={120} height={10} style={{height:10,}} color={checkProgress('R1').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.R1?.Score/profileData?.AnalysisPractice?.R1?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('R1').m}
              </Text>
            </View>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 2: Text Completion
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.R2?.Score/profileData?.AnalysisPractice?.R2?.Qty||0.1):0.1} width={120} height={10} style={{height:10,}} color={checkProgress('R2').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.R2?.Score/profileData?.AnalysisPractice?.R2?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('R2').m}
              </Text>
            </View>
          <Text style={[AppStyle.button.buttonText, {textAlign:'left', marginTop:10}]}>
            Part 3: Reading Comprehension
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>Correct Rate:</Text>
              <Progress.Bar progress={profileData?(profileData?.AnalysisPractice?.R3?.Score/profileData?.AnalysisPractice?.R3?.Qty||0.1):0.1} width={120} height={10} style={{height:10,}} color={checkProgress('R3').c}/>
              <Text style={[styles.TextFont, {fontWeight: '500', marginRight:5}]}>   {profileData?(profileData?.AnalysisPractice?.R3?.Score/profileData?.AnalysisPractice?.R3?.Qty||0.1):0.1}</Text>
            </View>
            <View style={styles.MessBox}>
              <Text style={[styles.TextFont, {fontWeight: '400', marginLeft:5}]}>
                👉 {checkProgress('R3').m}
              </Text>
            </View>
        </View>}
        <View>
          <Text style={[styles.StorageText, {marginLeft: 5, marginTop:10}]}>
            List of exercise you have taken
          </Text>
          <FlatList
            data={pHistoryList?.slice(0, 3)}
            renderItem={({item, index}) => {
              if (item.History) {
                return (
                  <SmallHistoryCard
                    display={item}
                    click={() => {
                      navigation.push('CompleteCard', {
                        quantity: item.Quantity,
                        answer: item.History,
                        sign: 'Home',
                        part: item.Part,
                        questionL: item.History,
                        partName: item.PartName,
                        DetailQty: item.DetailQty,
                      });
                    }}
                  />
                );
              } else {
                return (
                  <SmallHistoryCard
                    display={item}
                    click={() => {
                      navigation.push('CompleteCard2', {
                        quantity: item.Quantity,
                        sign: 'Home',
                        part: item.Part,
                        questionL: item.result,
                        partName: item.PartName,
                      });
                    }}
                  />
                );
              }
            }}
          />
        </View>
        <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '95%',
                marginTop: 10,
                marginBottom:15
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('HistoryScreen', {
                    list: pHistoryList ? pHistoryList : [],
                    listTest: testHistories ? testHistories : [],
                  });
                }}>
                <Text style={AppStyle.button.buttonText}>See more</Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
    </View>
  );
}

export default Analysis 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#DDD',
    borderBottomWidth: 1.5,
    paddingVertical: 10,  
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  btnText: {
    fontSize:18,
    marginLeft: 10,
    fontWeight: '500',
    color: '#222'
  },
  btnsContainer:{
    padding: 10,
    
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginLeft:20
},
InputStyle:{
    fontSize: 16, 
    marginLeft: 17, 
    color:'black',
    borderBottomWidth:1, 
    width:"70%", 
    paddingBottom: 0,
    paddingTop: 0,
    textAlign:'center'
},
boxStorage:{
    flexDirection:'column',
    width:'30%',   
    backgroundColor:card_color,
    height:90,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5
  },
  StorageText:{
    color:'black', fontWeight:'500', fontSize:14
  },
  TextFont: {
    fontSize: 18,
    color: 'black',
  },
  MessBox:{
    width:'90%',alignSelf:'center', alignItems:'center', backgroundColor:card_color, marginTop:5, 
    elevation: 5, // Độ nâng của shadow (chỉ áp dụng cho Android)
    shadowColor: 'black', // Màu của shadow (chỉ áp dụng cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của shadow (chỉ áp dụng cho iOS)
    shadowOpacity: 0.3, // Độ mờ của shadow (chỉ áp dụng cho iOS)
    shadowRadius: 3, 
    textAlign:'left',
  },
  overviewBox:{
    flexDirection:'row', alignItems:'center', backgroundColor:card_color, height:50, width:'90%', alignSelf:'center', marginTop:5, justifyContent:'space-evenly',
    elevation: 5, // Độ nâng của shadow (chỉ áp dụng cho Android)
    shadowColor: 'black', // Màu của shadow (chỉ áp dụng cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của shadow (chỉ áp dụng cho iOS)
    shadowOpacity: 0.3, // Độ mờ của shadow (chỉ áp dụng cho iOS)
    shadowRadius: 3, 
  }
})