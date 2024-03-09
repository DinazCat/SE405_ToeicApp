import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, } from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api'
const Game=({navigation,route})=>{
const {vocabList} = route.params;
const [Vocabs, setVocabs] = useState(null);
const getVocab= async()=>{
  // try{
  //  await firestore()
  //   .collection('Vocabulary')
  //   .get()
  //   .then((querySnapshot)=>{
  //     const list = [];
  //     querySnapshot.forEach(doc =>{
  //       const {Example, ListenFile, Vocab, Translate, Type, Spelling, TopicId, Game} = doc.data();
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
  //     })
  //     setVocabs(list);
  //   })
   
  // } catch(e){
  //   console.log(e);
  // }
  const list = await Api.getVocabs()
  setVocabs(list)
}
  useEffect(() => {
getVocab()
  }, []);
return (
  <View style={styles.container}>
       <ImageBackground
      source={require('../assets/bg7.png')}
      style={{flex: 1, resizeMode: 'cover'}}>
    <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity style={{marginLeft: '2%'}} onPress={()=> navigation.goBack()}>
        <FontAwesome name="chevron-left" color="white" size={20} />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'left',
          color: 'white',
          fontSize: 20,
          marginLeft: 15,
        }}>
        Game
      </Text>
    </View>
    {Vocabs&&<>
      <TouchableOpacity style={styles.buttonstyle} onPress={()=> navigation.push('GameScreen', {vocabList:vocabList,game:'1',vocabs:Vocabs})}>
      <Text style={styles.buttonText}>Select word</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonstyle} onPress={()=> navigation.push('GameScreen', {vocabList:vocabList,game:'2',vocabs:Vocabs})}>
      <Text style={styles.buttonText}>Match words with meanings</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonstyle} onPress={()=> navigation.push('GameScreen', {vocabList:vocabList,game:'3',vocabs:Vocabs})}>
      <Text style={styles.buttonText}>Listen to select</Text>
    </TouchableOpacity>
    </>}
    
    </ImageBackground>
  </View>
)
}
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    buttonstyle:{
      width:'80%', height:50, alignSelf:'center', backgroundColor:'#00CC66', borderRadius:20,justifyContent:'center', marginTop:15
  },
  buttonText:{
      color:'white', fontSize:22, fontWeight:'600', textAlign:'center'
  }
})
export default Game