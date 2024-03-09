import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Slider from '@react-native-community/slider';
  import AppStyle from '../theme'
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const Explain = () => {
    return (
      <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            Question 1
          </Text>
          <FontAwesome
            name="heart"
            color="white"
            size={20}
            style={{marginLeft: '3%'}}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 20,
                marginRight: '5%',
                textDecorationLine: 'underline',
              }}>
              Explain
            </Text>
            </TouchableOpacity>
        </View>
  
        <View style={styles.boxstyle}>
          <Text style={{color:PRIMARY_COLOR, fontSize:20,textAlign:'left', fontWeight:'600',marginTop:'5%', marginLeft:"5%"}}>Select the answer</Text>
          <Image source={require("../assets/toeic_office.jpg")} style={{height:200, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'10%'}}>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>D</Text>
              </TouchableOpacity>
          </View>
        </View>
       <View style={{height:'60%', width:'100%', borderRadius:15, backgroundColor:card_color, position:'absolute', marginTop:350, borderColor:'black', borderWidth:1}}>
        <View style={{height:'12%', backgroundColor:PRIMARY_COLOR, width:'100%',borderTopStartRadius:15, borderTopEndRadius:15, justifyContent:'space-evenly', alignItems:'center', flexDirection:'row'}}>
           
            <Text style={{ color: 'white',
              fontSize: 20,}}>
                Script
            </Text >
            <TouchableOpacity style={{height:'100%', width:90, borderBottomColor:'black', borderBottomWidth:2, alignItems:'center', justifyContent:'center'}}>
            <Text style={{ color: 'black',
              fontSize: 20,}}>
                Translate
            </Text>
            </TouchableOpacity>
            <Text style={{ color: 'white',
              fontSize: 20,}}>
            Explain/Tips
            </Text>
        </View>
        <TouchableOpacity style={{ alignItems:'center', justifyContent:'center', position:'absolute', marginLeft:'93%', marginTop:3}}>
        <Icon name={'times-circle'} style={{color: 'white', fontSize: 20}} />
        </TouchableOpacity>
        <View style={{marginLeft:5, marginTop:10}}>
        <Text style={styles.TimeFont}>A. Người phụ nữ đang nghe điện thoại</Text>
        <Text style={styles.TimeFont}>B. Người phụ nữ đang nói chuyện với bạn</Text>
        <Text style={styles.TimeFont}>C. Người phụ nữ đang mở cửa sổ</Text>
        <Text style={styles.TimeFont}>D. Người phụ nữ đang làm việc với máy tính</Text>
        </View>
        
       </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: 1000,
    },
    TimeFont: {
      textAlign: 'left',
      color: 'black',
      fontSize: 20,
    },
    boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"50%",borderWidth: 1,
      borderColor: '#CFCFCF', borderRadius:15,
    },
    answerboxStyle:{
      width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
    },
    answertext:{
      color:'black',fontWeight:'500', fontSize:20
    }
  });
  export default Explain;
  