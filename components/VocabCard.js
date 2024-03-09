import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
const VocabCard =({display, soundItem, showExample})=> {
const [Save, setSave] = useState(false);
const [alarm, setAlarm] = useState(false);
const checkSave= async()=>{
  try{
   await firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get()
    .then(doc => {
      if(doc.exists){
      const list = doc.data().vocabIds||[];
      if(list)
      for(let i = 0; i < list.length; i++){
        if(list[i] == display.Id) setSave(true);
      }
    }
    });    
  } catch(e){
    console.log(e);
  }
}

useEffect(() => {
  checkSave()
  checkAlarm()
}, []);
const checkAlarm = async()=>{
  // try{
  //   const data = await Api.getAlarmVocab()
  //   const foundItem = data.find(item => item.Id === display.Id);
  //   if(foundItem) setAlarm(true);
  // }
  // catch(e){
  //   console.log(e);
  // }
  try{
    await firestore()
     .collection('Users')
     .doc(auth().currentUser.uid)
     .onSnapshot(doc => {
       if(doc.exists){
       const list = doc.data().vocabAlarms||[];
       if(list)
       for(let i = 0; i < list.length; i++){
         if(list[i].Id == display.Id) setAlarm(true);
       }
     }
     });    
   } catch(e){
     console.log(e);
   }
}


// const removeVocabSaved=()=>{
//   const filteredData = savedVocab.filter(
//     i => i !== display.Id,
//   );
//   setsavedVocab(filteredData);
//   const collectionRef =
//     firestore().collection('Users');
//   const documentRef = collectionRef.doc(
//     auth().currentUser.uid,
//   );
//   documentRef.set({vocabIds: savedVocab});
//  
// }
  const play = () => {
      if(soundItem){
      if(!soundItem.isPlaying())
        soundItem.play(success => {
          if (success) {
            console.log('successfully finished playing');
            soundItem.stop()
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
      
    };
    const save = async () => {
      const collectionRef = firestore().collection('Users');
      const documentRef = collectionRef.doc(auth().currentUser.uid);
  
      const documentSnapshot = await documentRef.get();
      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();
        const vocabIds = userData.vocabIds || [];
  
        if (!vocabIds.includes(display.Id)) {
          vocabIds.push(display.Id);
          await documentRef.update({vocabIds});
        } else {
          const filteredData = vocabIds.filter(i => i !== display.Id);
          const list = [...filteredData];
          const collectionRef = firestore().collection('Users');
          const documentRef = collectionRef.doc(auth().currentUser.uid);
          documentRef.update({vocabIds: list});
          //Alert.alert('Note', 'Post already exist in your wall');
        }
      } else {
         // console.log("bbbb")
          await documentRef.set({ vocabIds: [display.Id] });
        //Alert.alert('Success', 'Post is saved successfully in your wall');
      }
    };
    const saveAlarmVocab = async()=>{
      const data= await Api.getAlarmVocab();
      if(data!='-1'){
        const foundItem = data.find(item => item.Id === display.Id);
        if(!foundItem){
          const vocabAlarms = [...data];
          vocabAlarms.push({Id:display.Id, Time:new Date().toLocaleTimeString()});
          await Api.updateAlarmVocab({vocabAlarms:vocabAlarms})
        }
        else{
          const filteredData = data.filter(i => i.Id !== display.Id);
          const list = [...filteredData];
          await Api.updateAlarmVocab({vocabAlarms:list} )
        }
      }
      else{
        await Api.setAlarmVocab(auth().currentUser.uid,{vocabAlarms:[{Id:display.Id, Time:new Date().toLocaleTimeString()}]} )
      }
    }
return (
  <TouchableOpacity style={styles.boxstyle} onPress={showExample}>
    <TouchableOpacity style={{marginLeft: '5%'}} onPress={play}>
      <Icon name={'volume-down'} style={{color: 'black', fontSize: 30}} />
    </TouchableOpacity>
    <View style={{flexDirection: 'column', marginLeft: '10%'}}>
      <Text
        style={[styles.TextFont, {fontWeight: '700', color: PRIMARY_COLOR}]}>
        {display.Vocab}
      </Text>
      <Text style={[styles.TextFont, {fontWeight: '400', color: 'black'}]}>
        {display.Spelling + ' ' + display.Type}
      </Text>
      <Text style={[styles.TextFont, {fontWeight: '400', color: 'black'}]}>
        {display.Translate}
      </Text>
    </View>
    <View style={{flex: 1}} />
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        style={{marginRight: '3%'}}
        onPress={() => {
          save(), setSave(!Save);
        }}>
        <Icon
          name={'star'}
          style={{color: Save ? '#FFCC00' : 'black', fontSize: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: '3%', marginTop: 10}}
        onPress={() => {
          saveAlarmVocab(),
          setAlarm(!alarm);
        }}>
        <Image
          source={alarm?require('../assets/clocktrue.png'):require('../assets/clockfalse.png')}
          resizeMode="contain"></Image>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  TextFont: {
    fontSize: 18,
    marginLeft: 5,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: PRIMARY_COLOR,
    width: 150,
    justifyContent: 'center',
  },
  boxstyle: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: 5,
    height: 90,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
});
export default VocabCard