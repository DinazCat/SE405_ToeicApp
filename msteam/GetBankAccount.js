import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Api from '../api/Api';

const GetBankAccount = ({navigation, route}) => {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [branch, setBranch] = useState('');

  //   const getProfile = async () => {
  //     const data = await Api.getUserData(auth().currentUser.uid);
  //     setProfileData(data);
  //     setName(data.name);
  //   };

  //   useEffect(() => {
  //     getProfile();
  //   }, []);

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
      ...route.params,
      bankInformation: {
        bank: bank,
        accountNumber: accountNumber,
        accountName: accountName,
        branch: branch,
      },
    };
    console.log(teacherData);

    await Api.updateUser(teacherData)
      .then(() => {
        navigation.navigate('Teams');
      })
      .catch(error => console.error(error));
  };

  return (
    <ImageBackground
      source={require('../assets/bg1.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Register Teacher</Text>

        <ScrollView style={{width: '100%'}}>
          <FormInput
            lbValue={bank}
            onChangeText={value => setBank(value)}
            placeholderText="Bank name"
            iconType="hotel"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            lbValue={accountNumber}
            onChangeText={value => setAccountNumber(value)}
            placeholderText="Account number"
            iconType="money-check"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
          />

          <FormInput
            lbValue={accountName}
            onChangeText={value => setAccountName(value)}
            placeholderText="Account name"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            lbValue={branch}
            onChangeText={value => setBranch(value)}
            placeholderText="Branch"
            iconType="hotel"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={{width: '40%', alignSelf: 'center'}}>
            <FormButton title={'Register'} onPress={onSave} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 32,
    marginBottom: 10,
    marginTop: 30,
    color: '#000',
  },
});

export default GetBankAccount;
