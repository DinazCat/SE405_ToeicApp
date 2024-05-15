import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import FormInput from '../components/FormInput';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import DropDownPicker from 'react-native-dropdown-picker';
const bankList = [
  {
    label: `BIDV`,
    value: `BIDV`,
  },
  {
    label: 'Vietcombank',
    value: 'Vietcombank',
  },
  {
    label: 'VietinBank',
    value: 'VietinBank',
  },
  {
    label: 'ACB',
    value: 'ACB',
  },
  {
    label: 'Techcombank',
    value: 'Techcombank',
  },
  {
    label: 'Agribank',
    value: 'Agribank',
  },
  {
    label: 'Sacombank',
    value: 'Sacombank',
  },
  {
    label: 'DongA Bank',
    value: 'DongA Bank',
  },
  {
    label: 'Vietbank',
    value: 'Vietbank',
  },
];
const RegisterTeacher2 = ({navigation, route}) => {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);



  const onNext = async () => {
    if (bank === '' || accountNumber === '' || accountName === '') {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter complete information',
      );
      return;
    } 

    navigation.push('RegisterTeacher3', {
      ...route.params,
      bankInformation: {
        bankName: bank,
        accountNumber: accountNumber,
        accountName: accountName,
      },
    });
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
        <TouchableOpacity style={styles.cancelButton} onPress={() => {navigation.navigate("Login")}}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: '100%', padding: 20, paddingTop: 0}}>
        <View style={styles.stepContainer}>
          <TouchableOpacity
            style={[styles.step]}
            onPress={() => navigation.goBack()}
          />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
        </View>

        <View
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{flex: 1, height: 1, backgroundColor: '#000', marginTop: 16}}
          />
          <Text style={[styles.title, {fontWeight: '600'}]}>
            Upload Your Bank Information
          </Text>
          <View
            style={{flex: 1, height: 1, backgroundColor: '#000', marginTop: 16}}
          />
        </View>

        <Text style={[styles.title, {marginTop: 10}]}>Enter Bank Name</Text>
        {/* <FormInput
          onChangeText={value => setBank(value)}
          iconType="hotel"
          autoCapitalize="none"
          autoCorrect={false}
        /> */}
        <DropDownPicker
          placeholder="Select Bank"
          items={bankList}
          open={openDropdown}
          setOpen={() => setOpenDropdown(!openDropdown)}
          value={bank}
          setValue={item => setBank(item)}
          maxHeight={160}
          dropDownMaxHeight={160}
          style={[styles.inputContainer, {zIndex: 1}]}
          placeholderStyle={{fontSize: 16, color: '#555'}}
          labelStyle={{fontSize: 16, color: '#333'}}
          listItemContainer={{height: 40}}
          listItemLabelStyle={{fontSize: 16, color: '#333'}}
          dropDownContainerStyle={{backgroundColor: '#fafafa', borderColor:'#ccc'}}
        />

        <Text style={styles.title}>Enter Account Number</Text>
        <FormInput
          onChangeText={value => setAccountNumber(value)}
          iconType="money-check"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.title}>Enter Account Name</Text>
        <FormInput
          onChangeText={value => setAccountName(value)}
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />



        <TouchableOpacity
          onPress={onNext}
          //  disabled={!frontImage ? true : false}
        >
          <Text style={[styles.button]}>Next</Text>
        </TouchableOpacity>
        <View style={{height: 20}} />
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
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    padding: 20,
  },
  cancelButton: {
    position: 'absolute',
    right: 10,
    zIndex: 2,
    bottom: 0,
    marginBottom: 26,
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
    alignSelf: 'center',
    marginBottom: 20,
  },
  step: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    marginVertical: 20,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  modal: {
    height: 160,
    width: 300,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    borderColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: 300,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    paddingRight: 15,
    paddingTop: 7,
  },
  popover: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  popoverItem: {
    alignItems: 'center',
    margin: 16,
  },
  popoverText: {
    fontSize: 16,
    marginTop: 8,
    color: 'white',
  },
  titleImage: {
    fontSize: 17,
    color: '#555',
    fontStyle: 'italic',
    width: '100%',
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
  },
  button: {
    textAlign: 'center',
    fontSize: 17,
    color: 'green',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  removeImage: {
    position: 'absolute',
    padding: 2,
    zIndex: 3,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
});

export default RegisterTeacher2;
