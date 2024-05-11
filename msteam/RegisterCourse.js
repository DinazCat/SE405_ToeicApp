import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import FormButton from '../components/FormButton';
import Api from '../api/Api';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

const paymentInfo = {
  accountNumber: 'Admin Number',
  accountName: 'Admin accountName',
};

const RegisterCourse = ({navigation, route}) => {
  const item = route.params.course;
  const {user} = useContext(AuthContext);
  const [verify, setVerify] = useState(false)

  const onSave = async () => {
    Alert.alert('Registered successfully');

    await Api.registerCourse({
      classId: item.classId,
      user: {
        id: user.uid,
        name: user.displayName,
      },
    })
      .then(() => {
        navigation.navigate('Teams');
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Register course</Text>
      </View>

      <View style={{flex: 1, padding: 10}}>
        <View style={styles.paymentContainer}>
          <Text style={styles.title}>Payment Information:</Text>

          {/* <View style={styles.textContainer}>
            <Text style={styles.text}>Bank name: </Text>
            <Text style={styles.content}>{paymentInfo.bankName}</Text>
          </View> */}
          <Text style={styles.text}>Pay via MoMo!</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Phone Number: </Text>
            <Text style={styles.content}>{paymentInfo.accountNumber}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Account Name: </Text>
            <Text style={styles.content}>{paymentInfo.accountName}</Text>
          </View>
        </View>

        <View style={{width: '60%', alignSelf: 'center'}}>
          <FormButton title={'I have already paid'} onPress={onSave} />
        </View>
       {/* {verify&&<View style={{width:"96%", justifyContent:'space-evenly', alignItems:'center', alignSelf:'center'}}>
          <Text style={styles.title}>Please fill in your account information for us to verify!</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Phone Number: </Text>
            <FormInput
          // onChangeText={value => setPhone(value)}
          // iconType="phone-alt"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Account Name: </Text>
            <FormInput
          // onChangeText={value => setPhone(value)}
          // iconType="phone-alt"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />
          </View>
          <TouchableOpacity
          style={{
            backgroundColor: PRIMARY_COLOR,
            padding:5,
            borderRadius: 15,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onSave}>
          <Text>Send</Text>
        </TouchableOpacity>
        </View>} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  paymentContainer: {
    backgroundColor: card_color,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
});

export default RegisterCourse;
