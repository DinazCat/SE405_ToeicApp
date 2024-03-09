import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Modal,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  import firestore from '@react-native-firebase/firestore';
  import Sound from 'react-native-sound';
  import LottieView from 'lottie-react-native';
  import VocabCard from '../components/VocabCard';
  const SavedVocabScreen = ({navigation,route}) => {
    const [vocabs, setvocabs] = useState(null);
    const [loading, setloading] = useState(false);
    const [soundL, setsoundL] = useState(null);
    const [OpenModal, setOpenModal] = useState(false);
    const [i, seti] = useState(-1);
    const {VocabIds} = route.params

    const getVocab= async()=>{
        const list = [];
        for(let i = 0; i < VocabIds.length; i++){
            await firestore()
        .collection('Vocabulary')
        .doc(VocabIds[i])
        .get()
        .then(doc => {
            const {Example, ListenFile, Vocab, Translate, Type, Spelling, TopicId, Game} = doc.data();
            list.push({          
                Id: doc.id,
                Example:Example,
                ListenFile:ListenFile,
                Vocab:Vocab,
                Translate:Translate,
                Type:Type,
                Spelling:Spelling,
                Game:Game
              });
              createsound(ListenFile, list.length)
        });
        }
        setvocabs(list);
       
      }
      const list=[]
      const createsound = (url,j) => {
        //for (let i = 0; i < vocabs.length; i++) {
          //questionList[i].Audio, null
           // console.log(questionList[i].Audio)
          const sound = new Sound(url, null, error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            else{
              if(j==VocabIds.length) setloading(true);
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
            </Modal>
        )
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
              Saved Vocabulary
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
              <FontAwesome name="gamepad" color="black" size={30} />
              <Text style={styles.TextFont}>Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <Icon name={'clock'} style={{color: 'black', fontSize: 30}} />
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
  export default SavedVocabScreen;
  