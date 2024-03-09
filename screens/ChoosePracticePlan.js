import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { PRIMARY_COLOR } from '../assets/colors/color';
import Route from './Route';

const ChoosePracticePlan = ({navigation, route}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const {TargetLevel} = route.params? route.params : {};

  useEffect(()=>{
    if(TargetLevel){
      setSelectedOption(TargetLevel);
    }
  },[])  

  const onNext = () => {
    if(TargetLevel){
      if(TargetLevel == selectedOption){
        navigation.goBack();
      }
      else{
        Alert.alert(
          'Do you want to change practice plan?',
          'When you select a new target, the entire old plan will be deleted. \nDo you still want to continue?',
          [
            { text: 'Yes', onPress: () => {
              navigation.navigate('PracticePlanTest', {targetLevel: selectedOption});
            }},
            { text: 'No', onPress: () => {

            }},
          ],
          { cancelable: false }
        );
      }
    }
    else if(selectedOption !== ''){
      navigation.navigate('PracticePlanTest', {targetLevel: selectedOption});
    }
    else {
      Alert.alert('Invalid action!', 'Please select your apropriate target point first.' )
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/penguin.png')} style={styles.img} />
      <View style={styles.cont3}>
      <Text style={[styles.title, {marginTop: 20}]}>Choose your apropriate target point</Text>
      <View style={styles.cont1}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 3 ? PRIMARY_COLOR : '#fff'}]} onPress={()=>{setSelectedOption(3)}}>
            <Text style={[styles.btnText, {color: selectedOption == 3 ? '#fff' : '#333'}]}> 605+ TOEIC (Basic working proficiency) </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cont1}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 4 ? PRIMARY_COLOR : '#fff'}]} onPress={()=>{setSelectedOption(4)}}>
            <Text style={[styles.btnText, {color: selectedOption == 4 ? '#fff' : '#333'}]}> 785+ TOEIC (Working proficiency)</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cont1}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: selectedOption == 5 ? PRIMARY_COLOR : '#fff'}]} onPress={()=>{setSelectedOption(5)}}>
            <Text style={[styles.btnText, {color: selectedOption == 5 ? '#fff' : '#333'}]}> 905+ TOEIC (Professional proficiency)</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn2} onPress={onNext}>
          <Text style={styles.btnText}> Next </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn2, {marginTop: '5%', backgroundColor: '#EEE'}]} onPress={() => navigation.goBack()}>
          <Text style={[styles.btnText, {color: '#333'}]}> Cancel </Text>
        </TouchableOpacity>
        </View>
      </View>
  )
}

export default ChoosePracticePlan

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
        width: '100%',
        paddingLeft: 10,
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: '#AADC92',
        elevation: 5,
    },
    btnText: {
        fontSize: 17,
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