import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,SafeAreaView, StatusBar,FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import SmallHistoryCard from '../components/SmallHistoryCard'
import HistoryTestCard from '../components/HistoryTestCard';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import { Header } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../components/CustomHeader'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import socketServices from '../api/socketService';
import Api from '../api/Api'


 const Home=({navigation})=> {
  const [savedVocab, setsavedVocab] = useState(0)
  const [savedQ, setsavedQ] = useState(0)
  const [pHistoryList, setPHistoryList] = useState(null);
  const [testHistories, setTestHistories] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1);
  useEffect(() => {
    socketServices.initializeSocket()
    socketServices.emit('UserId',auth().currentUser.uid)
    }, []);
  useEffect(() => {
    socketServices.on(auth().currentUser.uid+'PHistorychange',(data) => {
      setPHistoryList(data)
    })
    socketServices.on(auth().currentUser.uid+'TestHistoryChange',(data) => {
      setTestHistories(data)
    })
      }, []);
  const getSavedVocab= async()=>{
    try{
      firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(doc => {
        if(doc.exists){
        const list = doc.data().vocabIds;
        if(list)
        setsavedVocab(list);
        }
      });
     
    } catch(e){
      console.log(e);
    }
  }
  const getSavedQuestion = async()=>{
    // const list = await Api.getSavedQuestion();
    // setsavedQ(list)
    try{
      socketServices.on(auth().currentUser.uid+'savedQ',(data) => {
        setsavedQ(data)
      })
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    getSavedVocab()
    getSavedQuestion()
  }, []);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <CustomHeader Title={'Toeic App'} navigation={navigation} />
        <View style={{marginTop: '7%'}}>
          {/* Practice */}
          <Text style={AppStyle.textstyle.parttext}>Practice</Text>
          <View style={[AppStyle.viewstyle.row_evenly, {marginTop: '5%'}]}>
            <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => navigation.push('PartFormat', {skill: 'L'})}>
                <Image
                  source={require('../assets/headphones.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={AppStyle.textstyle.normaltext}>Listening</Text>
            </View>
            <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => navigation.push('PartFormat', {skill: 'R'})}>
                <Image
                  source={require('../assets/book.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={AppStyle.textstyle.normaltext}>Reading</Text>
            </View>
            <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => navigation.push('PartFormat', {skill: 'S'})}>
                <Image
                  source={require('../assets/microphone.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={AppStyle.textstyle.normaltext}>Speaking</Text>
            </View>

            <View style={styles.buttonzone}>
              <TouchableOpacity
                style={styles.buttonmain}
                onPress={() => navigation.push('PartFormat', {skill: 'W'})}>
                <Image
                  source={require('../assets/pen.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <Text style={AppStyle.textstyle.normaltext}>Writting</Text>
            </View>
          </View>
          {/* tests */}
          <Text style={AppStyle.textstyle.parttext}>Test</Text>
          <View
            style={[
              AppStyle.viewstyle.column_view,
              {height: 200, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View style={[styles.boxstyle2, {width: '90%', height: 180}]}>
              <Image
                style={{width: '45%', height: 150}}
                source={require('../assets/test1.png')}></Image>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    AppStyle.textstyle.normaltext,
                    {fontSize: 19, fontWeight: '500'},
                  ]}>
                  Test 1
                </Text>
                <Text style={AppStyle.textstyle.normaltext}>Time: 120m</Text>
                <Text style={AppStyle.textstyle.normaltext}>Question: 200</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Test')}
                  style={[AppStyle.button.button1, {marginTop: 5}]}>
                  <Text style={AppStyle.button.button1_Text}>Begin</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={{marginBottom: 10}}
            onPress={() => navigation.navigate('Test')}>
              <Text style={{color: '#0000FF', textDecorationLine: 'underline'}}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          {/* history */}
          <Text style={AppStyle.textstyle.parttext}>History</Text>
          <View
            style={[AppStyle.viewstyle.column_view, {alignItems: 'center'}]}>
            <View
              style={{
                width: '90%',
                height: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity style={styles.historyButton}
              onPress={() => {setSelectedTab(1)}}>
                <Text style={AppStyle.button.buttonText}>Practice</Text>
              </TouchableOpacity>
              <View style={{width: 1, height: 30, backgroundColor: 'black'}} />
              <TouchableOpacity style={styles.historyButton}
              onPress={() => {setSelectedTab(2)}}>
                <Text style={AppStyle.button.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>

            {selectedTab==1 && pHistoryList != null && (
              <FlatList
                data={pHistoryList.slice(0, 3)}
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
            )}

            {selectedTab==2 && testHistories != null && (
              <FlatList
              data={testHistories.slice(0, 3)}
              renderItem={({item, index}) => {
                return (
                  <HistoryTestCard
                    item={item}
                    click={() => {
                      navigation.push('TestResult', {
                        History: item.History,
                        questionList: item.Questions,
                        testHistory: item,
                      })
                    }}                     
                  />)
                }
              }
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '90%',
                marginTop: 10,
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
          {/* storage */}
          <Text style={AppStyle.textstyle.parttext}>Storage</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: '90%',
              marginTop: 10,
            }}>
            <View style={styles.boxStorage}>
              <Text style={AppStyle.button.buttonText}>Vocab</Text>
              <Text style={styles.StorageText}>
                {savedVocab ? savedVocab.length : '0'}
              </Text>
              <TouchableOpacity
                style={[
                  AppStyle.button.button1,
                  {marginTop: 5, marginBottom: 3},
                ]}
                onPress={() =>
                  navigation.push('SavedVocabScreen', {VocabIds: savedVocab})
                }>
                <Text style={AppStyle.button.button1_Text}>Review</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 1, height: 100, backgroundColor: 'black'}} />
            <View style={styles.boxStorage}>
              <Text style={AppStyle.button.buttonText}>Question</Text>
              <Text style={styles.StorageText}>{savedQ?savedQ.length:0}</Text>
              <TouchableOpacity
                style={[
                  AppStyle.button.button1,
                  {marginTop: 5, marginBottom: 3},
                ]}
                onPress={() =>
                  navigation.push('SavedQuestionScreen', {questionLId: savedQ})
                }>
                <Text style={AppStyle.button.button1_Text}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },
    buttonmain:{
        height:100,
        borderRadius:20,
        backgroundColor:card_color,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:PRIMARY_COLOR,
        borderBottomWidth:2
    },
    buttonzone:{
      flexDirection:'column', width:'22%', height:150,
    },
    boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:'5%'
    },
    boxstyle2:{
      flexDirection:'row',justifyContent:'center', alignItems:'center'
    },
    historyButton:{
      width:'43%',
      height:30,
      borderBottomColor:'#0000FF',
      borderBottomWidth:1
    },
    StorageText:{
      color:'black', fontWeight:'600', fontSize:28
    },
    boxStorage:{
      flexDirection:'column',
      width:'44%',   
      backgroundColor:card_color,
      height:110,
      justifyContent:'center',
      alignItems:'center'
    },
    BeginText:{
      color:'white', fontSize:14, fontWeight:'400', textAlign:'center'
    }
})
export default Home