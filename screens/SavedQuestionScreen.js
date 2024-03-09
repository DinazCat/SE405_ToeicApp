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
  import Api from '../api/Api';

  const SavedQuestionScreen = ({navigation,route}) => {
    const {questionLId} = route.params
    const [listQ, setListQ] = useState([])
    const unSave = async (id)=>{
      let list = listQ.slice()
      const filteredData = list.filter(i => i.Id!== id);
      setListQ(filteredData)
    }
    const getListQuestion= async()=>{
       const list = [];
    //    console.log(questionLId[0].Part)
       for(let i = 0; i < questionLId.length; i++){
    if(questionLId[i].Part=='L1'||questionLId[i].Part=='L2'||questionLId[i].Part=='L3'||questionLId[i].Part=='L4'){
      const changePart = await questionLId[i].Part.replace('L','ListenPart');
      const data = await Api.getOneQuestion(changePart,questionLId[i].Id)
      list.push({...data,part:changePart})
    }
    else if(questionLId[i].Part=='R1'||questionLId[i].Part=='R2'||questionLId[i].Part=='R3'){
        const changePart = questionLId[i].Part.replace('R','ReadPart');
        console.log(changePart)
        const data = await Api.getOneQuestion(changePart,questionLId[i].Id)
        list.push({...data,part:changePart})
    }
    else if(questionLId[i].Part=='W1'||questionLId[i].Part=='W2'||questionLId[i].Part=='W3'){
        const changePart = await questionLId[i].Part.replace('W','WritePart');
        const data = await Api.getOneQuestion(changePart,questionLId[i].Id)
        list.push({...data,part:changePart})
    }
    else if(questionLId[i].Part=='S1'||questionLId[i].Part=='S2'||questionLId[i].Part=='S3'||questionLId[i].Part=='S4'||questionLId[i].Part=='S5'){
        const changePart = await questionLId[i].Part.replace('S', 'SpeakPart');
        const data = await Api.getOneQuestion(changePart,questionLId[i].Id)
         list.push({...data,part:changePart})
       }
    }
 
       setListQ(list)
      }
      useEffect(() => {
        
    getListQuestion()
  
      }, []);
    return(
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
              Saved Question
            </Text>
          </View>
            {(listQ.length>0)&&<FlatList
                data={listQ}
                renderItem={({item, index}) => (
                    <TouchableOpacity style={{width:'90%',height:60,marginTop:5, alignSelf:'center', justifyContent:'space-between', flexDirection:'row', borderBottomWidth:1, borderBottomColor:'black', alignItems:'center'}}
                    onPress={()=>{navigation.navigate('QuestionScreen',{questionList:[item],part:questionLId[index].Part, isExplain:'Explain',RemoveQinSavedQ:(id)=>unSave(id)})}}>
                        <View style={{flexDirection:'column'}}>
                        <Text style={[styles.TextFont,{fontSize:20}]}>{'Question '+item.Order}</Text>
                        <Text style={[styles.TextFont,{color:PRIMARY_COLOR}]}>{'Part: '+item.part}</Text>
                        </View>
                        <FontAwesome
          name="heart"
          color='red'
          size={20}
          style={{marginRight:5}}
        />
                    </TouchableOpacity>
              )}/>}
              </ImageBackground>
        </View>
    )
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    TextFont: {
      fontSize: 18,
      marginLeft: 5,
      color: 'black',
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
export default SavedQuestionScreen