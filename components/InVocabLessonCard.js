import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import firestore from '@react-native-firebase/firestore';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import VocabCard from './VocabCard';
import Api from '../api/Api'
const InVocabLessonCard = ({navigation,route}) => {
  const [vocabs, setvocabs] = useState(null);
  const [loading, setloading] = useState(false);
  const [soundL, setsoundL] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [i, seti] = useState(-1);
  const {Topicid, TopicName} = route.params
  const getVocab= async()=>{
      // try{
      //  await firestore()
      //   .collection('Vocabulary')
      //   .get()
      //   .then((querySnapshot)=>{
      //     const list = [];
      //     querySnapshot.forEach(doc =>{
      //       const {Example, ListenFile, Vocab, Translate, Type, Spelling, TopicId, Game} = doc.data();
      //       if(TopicId==Topicid){
      //       list.push({          
      //         Id: doc.id,
      //         Example:Example,
      //         ListenFile:ListenFile,
      //         Vocab:Vocab,
      //         Translate:Translate,
      //         Type:Type,
      //         Spelling:Spelling,
      //         Game:Game
      //       });
      //       createsound(ListenFile, list.length)
      //     }
      //     })
      //     setvocabs(list);
      //   })
       
      // } catch(e){
      //   console.log(e);
      // }
      console.log("tpid"+Topicid)
      const list = await Api.getVocabinLesson(Topicid)
      setvocabs(list)
      // console.log(list[0].ListenFile)
      for(let i = 0; i < list.length;i++){
        createsound(list[i].ListenFile, i+1,list.length)
      }
    }
    const list=[]
    const createsound = (url,j,L) => {
      //for (let i = 0; i < vocabs.length; i++) {
        //questionList[i].Audio, null
         // console.log(questionList[i].Audio)
        const sound = new Sound(url, null, error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          else{
            if(j==L) setloading(true);
          }
        });
        list.push(sound);
            setsoundL(list);
        
      //}
    };
    useEffect(() => {
  getVocab()

    }, []);
    function RenderModal() {
      return (
        <Modal visible={OpenModal} animationType="slide" transparent={true}>
          <View style={[styles.container,{backgroundColor:'rgba(0, 0, 0, 0.3)'}]}>
          <View style={{ height:200,width:"90%", borderRadius:15 ,backgroundColor:'white',borderColor:'black', borderWidth:2, alignSelf:'center', marginVertical:300,backgroundColor:'white', position:'absolute'}}>
            <View style={{flexDirection:'row', height:50, alignItems:'center', justifyContent:"space-between"}}>
            <Text style={{    fontSize: 20, marginLeft: 5, color: 'black',fontWeight: '500',}}>Example</Text>
            <TouchableOpacity
              style={{

              }}
              onPress={() => setOpenModal(false)}>
              <Icon
                name={'times-circle'}
                style={{color: 'black', fontSize: 20, marginRight:10}}
              />
            </TouchableOpacity>
            </View>
           {vocabs&&<Text style={{fontSize: 18, marginLeft: 5, color: 'black',fontWeight: '400',}}>{vocabs[i]?vocabs[i].Example:'i'}</Text>}
          </View>
          </View>
          </Modal>
      )
    }
    const saveAlarm=async()=>{
      let data= await Api.getAlarmVocab();
      let flag = false;
      if(data =='-1'){
        await Api.setAlarmVocab(auth().currentUser.uid,{vocabAlarms:[{Id:vocabs[0].Id, Time:new Date().toLocaleTimeString()}]} )
        flag = true;
      }
      const vocabAlarms = [...data];
      for(let i = flag?1:0; i < vocabs.length; i++){
        const foundItem = data.find(item => item.Id === vocabs[i].Id);
        if(!foundItem){
          vocabAlarms.push({Id:vocabs[i].Id, Time:new Date().toLocaleTimeString()});
        }
      }
      await Api.updateAlarmVocab({vocabAlarms:vocabAlarms})
    }
    const showAlert = () => {
      Alert.alert(
        'Hey!',
        'Do you want to set all vocab for reminder?',
        [
          { text: 'OK', onPress: () => {
           saveAlarm()
          } },
          { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        ],
        { cancelable: false }
      );
    }
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
            Topic: {TopicName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '3%',
            marginBottom:'5%'
          }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={()=>navigation.push('Game',{vocabList:vocabs})}>
            <FontAwesome name="gamepad" color="white" size={30} />
            <Text style={styles.TextFont}>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={showAlert}>
            <Icon name={'clock'} style={{color: 'white', fontSize: 30}} />
            <Text style={styles.TextFont}>Remind</Text>
          </TouchableOpacity>
        </View>
        {(!loading)?<LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>:
        <FlatList
              data={vocabs}
              renderItem={({item, index}) => (
            <VocabCard
                display={item} 
                soundItem = {soundL[index]}
                showExample = {()=>{seti(index),setOpenModal(true)}}
                 />
            )}/>}
            {RenderModal()}
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
    color: '#FFFFFF',
    fontWeight: '500',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR,
    width: 150,
    justifyContent: 'center',
    paddingVertical: 4
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
export default InVocabLessonCard;
