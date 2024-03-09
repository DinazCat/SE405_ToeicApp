import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, ImageBackground, Image} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {register, googleLogin} = useContext(AuthContext);

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} resizeMode="cover" style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="envelope"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={name}
        onChangeText={(userName) => setName(userName)}
        placeholderText="Username"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        title="Sign up"
        onPress={() => {
          if(password == confirmPassword){
            register(email, password, name)
          }
          else{
            alert('Password confirmation does not match!')
          }
        }}
      />
      <Text style={styles.orText}>_or_</Text>

      {Platform.OS === 'android' ? (
        <TouchableOpacity style={styles.googleButton}
        onPress={() => googleLogin()}>
                <Image style={styles.iconWrapper}
                source={require('../assets/google.png')}/>
          <View style={styles.btnTxtWrapper}>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Have an account? <Text style={{fontWeight: 'bold', color: '#000'}}>Sign in</Text></Text>
      </TouchableOpacity>
    </View>
        </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    //backgroundColor:'#fff',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 32,
    marginBottom: 10,
    marginTop: 30,
    color: '#000',
  },
  navButton: {
    marginTop: 20,
    marginBottom: 100,
  },
  navButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#555',
    marginTop: 10
  },
  googleButton: {
    marginTop: 10,
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#fff'
  },
  iconWrapper: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  orText: {
    color: '#555',
    textAlign: 'center',
    fontSize: 17,
    marginVertical: 20,
    fontWeight: '500'
  }
});