import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FormInput from '../components/FormInput';

const ChangeGoal = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/penguin.png')} style={styles.img} />
        <View style={styles.cont3}>
            <Text style={styles.title}>Expected Exam Date</Text> 
            <FormInput
                //lbValue={email}
                //onChangeText={(userEmail) => setEmail(userEmail)}
                iconType="calendar"
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
                placeholderText={'12/03/2024'}
            /> 
            <Text style={styles.title}>Target Score</Text>
            <FormInput
                //lbValue={email}
                //onChangeText={(userEmail) => setEmail(userEmail)}
                iconType="bullseye"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderText={'900'}
            /> 
        
            <Text style={styles.title}>Current Estimated Score</Text>
            <FormInput
                //lbValue={email}
                //onChangeText={(userEmail) => setEmail(userEmail)}
                iconType="clipboard"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderText={'800'}
            /> 
            <Text style={styles.text}>
                You have 120 days left until your exam date. {'\n'}
                The current estimated score is 100 points away from the target score. 
                <Text style={{fontWeight: 'bold', color: '#000'}}> Let's try our best!</Text>       
            </Text>
        </View>
    </View>
  )
}

export default ChangeGoal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
      },
      title: {
        fontSize: 17,
        marginTop: 10,
        color: '#555'
      },
      textinput: {
        fontSize: 17,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#ccc'
      },
      btn: {
        backgroundColor: "#ECD352",
        paddingHorizontal: 60,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 30,
      },
      btnText: {
        fontSize: 18,
        color: "#FFF",
      },
      cont1: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 30,
  
      },
      img: {
        height: 200,
        width: 200,
        marginTop: 50,
        marginBottom: 40      
      },
      cont3: {
        flex: 1,
        backgroundColor: "#FFF",
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      },
      text:{
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15
      }
})