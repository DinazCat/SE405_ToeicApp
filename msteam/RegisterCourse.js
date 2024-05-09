import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {card_color} from '../assets/colors/color';
import FormButton from '../components/FormButton';
import Api from '../api/Api';
import {AuthContext} from '../navigation/AuthProvider';

const paymentInfo = {
  bankName: 'bankName',
  accountNumber: 'accountNumber',
  accountName: 'accountName',
};

const RegisterCourse = ({navigation, route}) => {
  const item = route.params.course;
  const {user} = useContext(AuthContext);

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
          <Text style={styles.title}>Payment Information</Text>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Bank name: </Text>
            <Text style={styles.content}>{paymentInfo.bankName}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Account Number: </Text>
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
