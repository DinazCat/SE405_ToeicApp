import { View, Text, StyleSheet, FlatList,ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react';
import VocabLessonCard from '../components/VocabLessonCard'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import CustomHeader from '../components/CustomHeader'
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api'
const Vocab=({navigation})=>{
    const [vocabList, setvocabL] = useState(null);
    const getVocabLesson = async()=>{
        // try{
        //  await firestore()
        //   .collection('VocabLesson')
        //   .get()
        //   .then((querySnapshot)=>{
        //     const list = [];
        //     querySnapshot.forEach(doc =>{
        //       const {Image, Topic, VocabQuantity} = doc.data();
        //       list.push({          
        //         Id: doc.id,
        //         Image: Image,
        //         Topic: Topic,
        //         VocabQuantity:VocabQuantity,
        //       });
        //     })
        //     setvocabL(list);
        //   })
         
        // } catch(e){
        //   console.log(e);
        // }
        const list = await Api.getVocabLesson()
       // console.log( Api.getVocabLesson())
        setvocabL(list)
      }
      useEffect(() => {
    getVocabLesson()
      }, []);
    // const [ds, SetDs] = useState([
    //     {
    //         Name:'Lesson 1: Contracts',
    //         photo:'https://tse4.mm.bing.net/th?id=OIP.8l0KgSpnuq63JaZQw2kfvAHaHM&pid=Api&P=0&h=180'
    //     },
    //     {
    //         Name:'Lesson 2: Marketing',
    //         photo:'https://tse2.mm.bing.net/th?id=OIP.NwOQUOzNcsvZCr9zGodfIwHaE8&pid=Api&P=0&h=180'
    //     },
    //     {
    //         Name:'Lesson 3: Warranties',
    //         photo:'https://tse3.mm.bing.net/th?id=OIP.UMJBT3CQEe1QzYY_euRkhgHaF_&pid=Api&P=0&h=180',
    //     },
    //     {
    //         Name:'Lesson 4: Business planning',
    //         photo:'https://tse4.mm.bing.net/th?id=OIP.uo4LURmGxzDI8A3RmKFhCQHaFj&pid=Api&P=0&h=180',
    //     }])
  return (
    <View style={styles.container}>
       <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
       <CustomHeader Title={'Vocabulary'} navigation={navigation}/>
      <FlatList
              data={vocabList}
              renderItem={({item, index}) => (
            <VocabLessonCard
                display={item} 
                onpress={()=>navigation.push('InVocabLessonCard',{Topicid:item.Id, TopicName:item.Topic})}
                 />
            )}/>
            </ImageBackground>
      
      
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },
    upzone: {
        height:'8%',
        backgroundColor:'#990000',
        justifyContent: 'center',
        alignItems: 'center',
    },})
export default Vocab