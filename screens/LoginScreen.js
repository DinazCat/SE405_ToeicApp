import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useContext} from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, googleLogin} = useContext(AuthContext);

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} resizeMode="cover" style={{flex:1}}>
      <View style={styles.container}>
          <Image style={styles.logo}
              source={require('../assets/penguin.png')}
          />
            
          <FormInput
              lbValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
          />

          <FormInput
              lbValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              secureTextEntry={true}
          />
          <TouchableOpacity style={{marginBottom: 10}}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          <FormButton
              title="Sign in"              
              onPress={() => login(email, password)}
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
              style={styles.textButton}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.navButtonText}>
              Don't have an acount? <Text style={{fontWeight: 'bold', color: '#000'}}>Create here</Text>
              </Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-end',
    padding: 20,
    //backgroundColor: '#fff'
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 10
  },
  textButton: {
      marginTop: 35,
      marginBottom: 85
  },
  forgotButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#555',
      textAlign: 'right',
    },
  navButtonText: {
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center',
      color: '#555',
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