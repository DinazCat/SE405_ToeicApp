import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../api/Api';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {PRIMARY_COLOR} from '../assets/colors/color';

const GetBankAccount = ({navigation, route}) => {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [branch, setBranch] = useState('');
  const {...profileData} = route.params;

  const onSave = async () => {
    if (
      bank === '' ||
      accountNumber === '' ||
      accountName === '' ||
      branch === ''
    ) {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    }
    const teacherData = {
      bankInformation: {
        ...profileData,
        bank: bank,
        accountNumber: accountNumber,
        accountName: accountName,
        branch: branch,
      },
    };
    console.log(profileData);
    await Api.updateUserPrivate(teacherData)
      .then(() => {
        navigation.navigate('Homeinstack');
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'green'}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Teacher</Text>
      </View>

      <ScrollView style={{width: '100%'}}>
        <View style={styles.stepContainer}>
          <View style={[styles.step]} />
          <TouchableOpacity
            style={[styles.step]}
            onPress={() => navigation.goBack()}
          />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
        </View>

        <Text style={styles.title}>Enter Bank Name</Text>
        <FormInput
          onChangeText={value => setBank(value)}
          iconType="hotel"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Account Number</Text>
        <FormInput
          onChangeText={value => setAccountNumber(value)}
          iconType="money-check"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Enter Account Name</Text>
        <FormInput
          onChangeText={value => setAccountName(value)}
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Bank Branch</Text>
        <FormInput
          onChangeText={value => setBranch(value)}
          iconType="hotel"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{width: '40%', alignSelf: 'center'}}>
          <FormButton title={'Complete'} onPress={onSave} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 24,
    color: 'green',
    width: '100%',
    textAlign: 'center',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  step: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
});

export default GetBankAccount;
