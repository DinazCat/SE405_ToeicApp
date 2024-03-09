import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../assets/colors/color';
const button = StyleSheet.create({
  button1: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button2_Text:{
    color:'white', fontSize:20, fontWeight:'400', textAlign:'center'
  },
  button1_Text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonText: {
    color: PRIMARY_COLOR,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 18,
  },
});
export default button;
