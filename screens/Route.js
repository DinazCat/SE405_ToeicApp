import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../components/CustomHeader';
import * as Progress from 'react-native-progress';
const Route = () => {
  function PracticeCard({Day}) {
    return (
      <View style={[AppStyle.viewstyle.row_start, {height: 60, marginTop:10}]}>
        <View
          style={{
            backgroundColor:'#DDDDDD',
            borderRadius: 25,
            width: 90,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Day {Day}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 30,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            width: '70%',
            height: '98%',
          }}>
          <Text style={[styles.TextStyle, {textAlign: 'left', fontWeight:'600'}]}>Practice</Text>
          <Text style={[styles.TextStyle, {textAlign: 'left', fontSize: 16}]}>
            30 questions
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#33CC33',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '3%',
          }}>
          <Icon
            name={'angle-double-up'}
            style={{color: 'white', fontSize: 20}}
          />
          <Text style={{color: 'white', fontWeight: '500', fontSize: 20}}>
            500
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            marginLeft: '20%',
          }}>
          Practice Route
        </Text>
        <Icon
          name={'route'}
          style={{color: 'white', fontSize: 20, marginLeft: '20%'}}
        />
      </View>
      <View
        style={{
          height: '13%',
          width: '100%',
          borderColor: card_color,
          borderBottomWidth: 2,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '40%',
            height: '80%',
            backgroundColor: PRIMARY_COLOR,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
            {' '}
            Day 1 -{'>'} 3
          </Text>
          <Progress.Bar
            progress={0.3}
            width={100}
            height={10}
            style={{height: 8}}
            color="white"
          />
        </View>
        <View>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '400'}}>
            Photo Describe
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
            Target: 5 point
          </Text>
        </View>
      </View>
      <View>
      <View
          style={{
            backgroundColor:PRIMARY_COLOR,
            borderRadius: 25,
            width: 90,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:'5%',
            marginTop:15
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Day 1
          </Text>
        </View>
        <View style={{height:'40%', width:'82%', marginTop:'5%', alignSelf:'center', borderColor:PRIMARY_COLOR, borderWidth:2}}>
          <ImageBackground source={require('../assets/bg6.png')} resizeMode='stretch' style={{height:'100%', width:'100%'}}>
            <View style={{marginTop:10, marginLeft:15}}>
              <Text style={{color: PRIMARY_COLOR, fontSize: 30, fontWeight: '600'}}>0/30</Text>
            </View>
            <View style={{marginTop:75, marginLeft:15, flexDirection:'row'}}>
            <View >
          <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
            Practice
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
            30 questions
          </Text>
        </View>
        <TouchableOpacity style={{ width:60, height:60, alignItems:'center', justifyContent:'center', marginLeft:106}}>
          <Text style={{color:'white', fontSize:18}}>Begin</Text>
        </TouchableOpacity>
            </View>
          
          </ImageBackground>

        </View>
      <PracticeCard Day={2} />
          <PracticeCard Day={3} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  TextStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
  },
  box: {
    width: '80%',
    height: '25%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Route;
