// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React, {useState} from 'react';
// import FormInput from '../components/FormInput';
// import FormButton from '../components/FormButton';
// import Api from '../api/Api';

// const GetBankAccount = ({navigation, route}) => {
//   const [bank, setBank] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [accountName, setAccountName] = useState('');
//   const [branch, setBranch] = useState('');

//   //   const getProfile = async () => {
//   //     const data = await Api.getUserData(auth().currentUser.uid);
//   //     setProfileData(data);
//   //     setName(data.name);
//   //   };

//   //   useEffect(() => {
//   //     getProfile();
//   //   }, []);

//   const onSave = async () => {
//     if (
//       bank === '' ||
//       accountNumber === '' ||
//       accountName === '' ||
//       branch === ''
//     ) {
//       Alert.alert(
//         'Input cannot be blank!',
//         'Please enter complete information',
//       );
//       return;
//     }

//     const teacherData = {
//       ...route.params,
//       bankInformation: {
//         bank: bank,
//         accountNumber: accountNumber,
//         accountName: accountName,
//         branch: branch,
//       },
//     };
//     console.log(teacherData);

//     await Api.updateUser(teacherData)
//       .then(() => {
//         navigation.navigate('Teams');
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/bg1.jpg')}
//       resizeMode="cover"
//       style={{flex: 1}}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Register Teacher</Text>

//         <ScrollView style={{width: '100%'}}>
//           <FormInput
//             lbValue={bank}
//             onChangeText={value => setBank(value)}
//             placeholderText="Bank name"
//             iconType="hotel"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />

//           <FormInput
//             lbValue={accountNumber}
//             onChangeText={value => setAccountNumber(value)}
//             placeholderText="Account number"
//             iconType="money-check"
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType="numeric"
//           />

//           <FormInput
//             lbValue={accountName}
//             onChangeText={value => setAccountName(value)}
//             placeholderText="Account name"
//             iconType="user"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />

//           <FormInput
//             lbValue={branch}
//             onChangeText={value => setBranch(value)}
//             placeholderText="Branch"
//             iconType="hotel"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />

//           <View style={{width: '40%', alignSelf: 'center'}}>
//             <FormButton title={'Register'} onPress={onSave} />
//           </View>
//         </ScrollView>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontFamily: 'Kufam-SemiBoldItalic',
//     fontSize: 32,
//     marginBottom: 10,
//     marginTop: 30,
//     color: '#000',
//   },
// });

// export default GetBankAccount;
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';
import Api from '../api/Api';
  
const GetBankAccount = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [target, setTarget] = useState('');
  const [currentScore, setCurrentScore] = useState('');
  const [shown, setShown] = useState(false);

  const onSave = async () => {
    if (selectedDate == '' || target == '' || currentScore == '') {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter some information to begin',
      );
      return;
    }
    if (parseInt(target) > 990) {
      Alert.alert(
        'Score cannot be more than 990!',
        'Please re-enter your target score',
      );
      setTarget('990');
      return;
    }
    if (parseInt(currentScore) > 990) {
      Alert.alert(
        'Score cannot be more than 990!',
        'Please re-enter current score',
      );
      setTarget('990');
      return;
    }
    const userData = {
      expectedExamDate: selectedDate,
      targetScore: target,
      currentScore: currentScore,
      id: user.uid,
    };
    if (parseInt(currentScore) >= parseInt(target)) {
      Alert.alert(
        'Invalid input',
        'Are you sure that your current score is over your target score. It may cause some confusion in the learning curve',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: async () => {
              await Api.updateUser(userData)
                .then(() => {
                  navigation.navigate('Homeinstack');
                })
                .catch(error => console.error(error));
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      await Api.updateUser(userData)
        .then(() => {
          navigation.navigate('Homeinstack');
        })
        .catch(error => console.error(error));
    }
  };
  const onDateChange = (event, selectedDate) => {
    setShown(false);
    let value = selectedDate || date;
    let currentDate = new Date();
    if (value < currentDate) value = currentDate;
    setDate(value);
    setSelectedDate(
      `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`,
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to our app</Text>
        <Image source={require('../assets/penguin.png')} style={styles.img} />
        <View style={styles.cont3}>
          <Text style={styles.text}>
            To achieve better training results, please let us know some
            information below.
          </Text>
          {shown && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display="default"
              onChange={onDateChange}
            />
          )}
          <Text style={styles.title}>Enter Your Expected Exam Date</Text>
          <TouchableOpacity
            onPress={() => {
              setShown(true);
            }}>
            <FormInput
              value={selectedDate}
              iconType="calendar"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Enter Your Target Score</Text>
          <FormInput
            lbValue={target}
            onChangeText={input => {
              if (parseInt(input) > 0 || input == '')
                setTarget(input.replace(/[^0-9]/, ''));
            }}
            iconType="bullseye"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.title}>Enter Your Current Score</Text>
          <FormInput
            lbValue={currentScore}
            onChangeText={input => {
              if (parseInt(input) > 0 || input == '')
                setCurrentScore(input.replace(/[^0-9]/, ''));
            }}
            iconType="clipboard"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.text}>
            If you don't know your current level, take a mini test to estimate
            your current score
            <Text style={{fontWeight: 'bold', color: '#000'}}> here!</Text>
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Homeinstack')}>
              <Text
                style={[
                  styles.text,
                  {fontStyle: 'italic', textDecorationLine: 'underline'},
                ]}>
                Later
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <Text
                style={[
                  styles.text,
                  {fontStyle: 'italic', textDecorationLine: 'underline'},
                ]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GetBankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 60,
  },
  headerText: {
    fontSize: 24,
    color: 'green',
  },
  title: {
    fontSize: 17,
    marginTop: 10,
    color: '#555',
  },
  textinput: {
    fontSize: 17,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  btn: {
    backgroundColor: '#ECD352',
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 18,
    color: '#FFF',
  },
  cont1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  img: {
    height: 200,
    width: 200,
    marginTop: 20,
    marginBottom: 10,
  },
  cont3: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    color: '#666',
  },
});
