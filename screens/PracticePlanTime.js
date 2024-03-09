import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native'
import React, {useState} from 'react'
import { PRIMARY_COLOR } from '../assets/colors/color';
import Api from '../api/Api';

const PracticePlanTime = ({navigation, route}) => {
    const { targetLevel, currentLevel } = route.params;
    const [selectedOption, setSelectedOption] = useState(0);
    const [alert, setAlert] = useState('');
    const onStart = async () => {
      if(selectedOption !== 0 && alert === ''){
        console.log(currentLevel);
        console.log(targetLevel);
        const result = await Api.addPracticePlan(currentLevel, targetLevel, selectedOption)
        if(result == 'Success')
          navigation.navigate('PracticePlan');
      }
      else {
        Alert.alert('Invalid action!', 'Please select apropriate time for your practice plan first.' )
      }
    }
    return (
      <View style={styles.container}>
        <Image source={require('../assets/penguin.png')} style={styles.img} />
        <View style={styles.cont3}>
        <Text style={[styles.title, {marginTop: 20}]}>Choose appropriate completion time</Text>
        <View style={styles.cont1}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 30 ? PRIMARY_COLOR : '#fff'}]} 
            onPress={()=>{
              setSelectedOption(30);
              if(30 < (targetLevel - currentLevel) * 30) {
                setAlert('*This plan is not appropriate to you.')
              }
              else {setAlert('')};
              }}>
              <Text style={[styles.btnText, {color: selectedOption == 30 ? '#fff' : '#333'}]}> 30 Days </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cont1}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 60 ? PRIMARY_COLOR : '#fff'}]}
            onPress={()=>{
              setSelectedOption(60)
              if(60 < (targetLevel - currentLevel) * 30){
                setAlert('*This plan is not appropriate to you.')
              }
              else {setAlert('')};
              }}>
              <Text style={[styles.btnText, {color: selectedOption == 60 ? '#fff' : '#333'}]}> 60 Days </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cont1}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 90 ? PRIMARY_COLOR : '#fff'}]} 
            onPress={()=>{
              setSelectedOption(90)
              if(90 < (targetLevel - currentLevel) * 30){
                setAlert('*This plan is not appropriate to you.')
              }
              else {setAlert('')};
              }}>
              <Text style={[styles.btnText, {color: selectedOption == 90 ? '#fff' : '#333'}]}> 90 Days </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cont1}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 120 ? PRIMARY_COLOR : '#fff'}]} 
            onPress={()=>{
              setSelectedOption(120)
              if(120 < (targetLevel - currentLevel) * 23){
                setAlert('*This plan is not appropriate to you.')
              }
              else {setAlert('')};
              }}>
              <Text style={[styles.btnText, {color: selectedOption == 120 ? '#fff' : '#333'}]}> 120 Days </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: '#D82828', marginTop: 10}}>{alert}</Text>
          <TouchableOpacity style={styles.btn2} onPress={onStart}>
            <Text style={styles.btnText}> Start </Text>
          </TouchableOpacity>
          </View>
        </View>
    )
  }
  
  export default PracticePlanTime
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#C0DFA0",
      },
      title: {
          fontSize: 18,
          fontWeight: '500',
          color: 'black'
      },  
      btn: {
          width: '80%',
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          borderRadius: 30,
          backgroundColor: '#AADC92',
          elevation: 5,
      },
      btnText: {
          fontSize: 18,
          color: "#FFF",
      },
      cont1: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "center",
          marginTop: 20,
      },
      img: {
          height: "30%",
          width: "50%",
          marginVertical: '8%'
      },
      cont3: {
          flex: 1,
          backgroundColor: "#F8F8F8",
          width: "100%",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          alignItems: 'center',
      },
      btn2: {
        marginTop: '20%', 
        height: 40, 
        borderRadius: 20, 
        width: '40%', 
        backgroundColor: 'black', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: PRIMARY_COLOR,
      }
  })