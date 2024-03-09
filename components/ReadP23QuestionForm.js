import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  FlatList,
  Dimensions
} from 'react-native';
import React,{useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionCard from './QuestionCard';
const {width} = Dimensions.get('window');
const ReadP23QuestionForm = React.memo(({item, part,click,flag, check}) => {
  function isUrl(str) {
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  
    return urlRegex.test(str);
  }
  return (
    <Animated.View style={styles.container}>
      <View style={styles.box}>
        {part == 'R3' && (
          <ScrollView>
            {isUrl(item.Paragraph) ?
            <Image  source={{uri: item.Paragraph}} style={{minHeight: 250, width:"88%", alignSelf:'center', marginTop:'5%', resizeMode: 'contain'}}/>
            :
            <Text
              style={[styles.answerLong, {marginBottom: 15, marginTop: 10}]}>
              {item.Paragraph}
            </Text>
            }
            <FlatList
              data={item.Question}
              renderItem={({item, index}) => (
                <QuestionCard 
                question={item.Q} 
                answer={item.A} 
                click={(i)=>click(i,index)}
              Select = {check?.Select[index]}
              Default = {check?.Default[index]}
              flag={flag}
                />
              )}
            />
          </ScrollView>
        )}
        {part == 'R2' && (
          <FlatList
            data={item.Question}
            renderItem={({item, index}) => (
              <QuestionCard 
              question={item.Q} 
              answer={item.A} 
              click={(i)=>click(i,index)}
              Select = {check?.Select[index]}
              Default = {check?.Default[index]}
              flag={flag}
              />
            )}
          />
        )}
        {part == 'R1' && (
          <QuestionCard 
          question={item.Question} 
          answer={item.Answer}
          click={(i)=>click(i)}
              Select = {check?.Select}
              Default = {check?.Default}
              flag={flag}
               />
        )}
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width
  },
  TimeFont: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, marginTop:"5", height:300,borderRadius:15
  },
  box:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:'95%',borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center',marginLeft:"5%"
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  },
  answerLong:{
      color:'black', fontSize:18,marginLeft:"5%"   
  },
  answerZone:{
      flexDirection:'row', alignItems:'center', marginTop:'3%'
  }
});
export default ReadP23QuestionForm;
