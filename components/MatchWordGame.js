import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions
} from 'react-native';
import React, {useState, memo} from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
const MatchWordGame=({rootCol,tempCol, transfer, navigation})=> {
const [flag,setFlag] = useState('-1')
const [flag1,setFlag1] = useState('-1')

const [sign1,setSign1] = useState('-1')
const [sign2,setSign2] = useState('-1')
const [sign3,setSign3] = useState('-1')
const [sign4,setSign4] = useState('-1')
const [sign5,setSign5] = useState('-1')
const [sign6,setSign6] = useState('-1')

const [complete, setComplete] = useState(0)
  // function MatchCard({word, meaning, click}){
  //     return(
  //         <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
  //         <TouchableOpacity style={(tempCol&&sign1===word.Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setSign(word.Vocab)}}>
  //             <Text style={styles.buttonText}>{word.Vocab}</Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity style={(tempCol&&sign1===meaning.Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setSign(meaning.Vocab),click()}}>
  //             <Text style={styles.buttonText}>{meaning.Translate}</Text>
  //         </TouchableOpacity>
  //     </View>
  //     )
  // }
  // if(complete==3){transfer()}
 
  const check1 = ()=>{
    let x = false;
    let s1 = sign1
    let s2 = sign2
    let s4 = sign4
    let s6 = sign6
    if(s1!='-1'&& (s1==s2 || s1==s4 || s1==s6)){
      x = true
      // setComplete(prev=>prev+1)
    }
    else{
      if(sign1 == flag&&sign2==flag1&&flag1!='-1'){
        setSign1('-1')
        setSign2('-1')
      }
      if(sign1 == flag&&sign4==flag1&&flag1!='-1'){
        setSign1('-1')
        setSign4('-1')
      }
      if(sign1 == flag&&sign6==flag1&&flag1!='-1'){
        setSign1('-1')
        setSign6('-1')
      }
    }
    if(flag!='-1'&&flag1!='-1'){
      setFlag('-1')
      setFlag1('-1')
      }
    return x
  }
  const check2 = ()=>{
    let x = false;
    let s1 = sign1
    let s3 = sign3
    let s5 = sign5
    let s2 = sign2
    if(s2!='-1'&& (s2==s1 || s2==s3 || s2==s5)){
      x = true
    }
    else{
      if(sign1 == flag&&sign2==flag1&&flag!='-1'){
        setSign1('-1')
        setSign2('-1')
      }
      if(sign3 == flag&&sign2==flag1&&flag!='-1'){
        setSign3('-1')
        setSign2('-1')
      }
      if(sign5 == flag&&sign2==flag1&&flag!='-1'){
        setSign5('-1')
        setSign2('-1')
      }
    }
    if(flag!='-1'&&flag1!='-1'){
      setFlag('-1')
      setFlag1('-1')
      }
    return x
  }
  const check3 = ()=>{
    let x = false;
    let s3 = sign3
    let s2 = sign2
    let s4 = sign4
    let s6 = sign6
    if(s3!='-1'&& (s3==s2 || s3==s4 || s3==s6)){
      x = true
      // setComplete(prev=>prev+1)
    }
    else{
      if(sign3 == flag&&sign2==flag1&&flag1!='-1'){
        setSign3('-1')
        setSign2('-1')
      }
      if(sign3 == flag&&sign4==flag1&&flag1!='-1'){
        setSign3('-1')
        setSign4('-1')
      }
      if(sign3 == flag&&sign6==flag1&&flag1!='-1'){
        setSign3('-1')
        setSign6('-1')
      }
    }
    if(flag!='-1'&&flag1!='-1'){
      setFlag('-1')
      setFlag1('-1')
      }
    return x
  }
  const check4 = ()=>{
    let x = false;
    let s1 = sign1
    let s3 = sign3
    let s5 = sign5
    let s4 = sign4
    if(s4!='-1'&& (s4==s1 || s4==s3 || s4==s5)){
      x = true
     
    }
    else{
      if(sign3 == flag&&sign4==flag1&&flag!='-1'){
        setSign4('-1')
        setSign3('-1')
      }
      if(sign1 == flag&&sign4==flag1&&flag!='-1'){
        setSign4('-1')
        setSign1('-1')
      }
      if(sign5 == flag&&sign4==flag1&&flag!='-1'){
        setSign4('-1')
        setSign5('-1')
      }
    }
    if(flag!='-1'&&flag1!='-1'){
      setFlag('-1')
      setFlag1('-1')
      }
    return x
  }
  const check5 = ()=>{
    let s5 = sign5
    let s2 = sign2
    let s4 = sign4
    let s6 = sign6
    let x = false;
    if(s5!='-1'&& (s5==s2 || s5==s4 || s5==s6)){
      x = true
      // setComplete(prev=>prev+1)
    }
    else{
      if(sign5 == flag&&sign2==flag1&&flag1!='-1'){
        setSign5('-1')
        setSign2('-1')
      }
      if(sign5 == flag&&sign4==flag1&&flag1!='-1'){
        setSign5('-1')
        setSign4('-1')
      }
      if(sign5 == flag&&sign6==flag1&&flag1!='-1'){
        setSign5('-1')
        setSign6('-1')
      }
    }
    if(flag!='-1'&&flag1!='-1'){
      setFlag('-1')
      setFlag1('-1')
      }
     
    return x
  }
  const check6 = ()=>{
    let x = false;
    let s1 = sign1
    let s3 = sign3
    let s5 = sign5
    let s6 = sign6
    if(s6!='-1'&& (s6==s1 || s6==s3 || s6==s5)){
      x = true
  
    }
    else{
      if(sign1 == flag&&sign6==flag1&&flag!='-1'){
        setSign1('-1')
        setSign6('-1')
      }
      if(sign3 == flag&&sign6==flag1&&flag!='-1'){
        setSign3('-1')
        setSign6('-1')
      }
      if(sign5 == flag&&sign6==flag1&&flag!='-1'){
        setSign5('-1')
        setSign6('-1')
      }

    }
       if(flag!='-1'&&flag1!='-1'){
    setFlag('-1')
    setFlag1('-1')
    }
   
    return x
  }
  // if(check1()&&check3()&&check5()){transfer()}
  // const check = ()=>{
  //   let x = false;
  //   if(flag==flag1){
  //     x = true
  //   }
  //   else{
  //     x = false
  //   }
  //   if(flag!='-1'&&flag1!='-1'){
  //   setFlag('-1')
  //   setFlag1('-1')
  //   }
   
  //   return x
  // }
return (
  <Animated.View style={styles.container}> 
  
    <Text style={[AppStyle.textstyle.parttext,{marginTop:15}]}> Match words:</Text>
    <View style={{marginTop:'10%'}}>
      {/* <MatchCard word={rootCol[0].Vocab} meaning={tempCol[0].Translate}/>
      <MatchCard word={rootCol[1].Vocab} meaning={tempCol[1].Translate}/>
      <MatchCard word={rootCol[2].Vocab} meaning={tempCol[2].Translate}/> */}
      <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
          {(rootCol&&sign1==rootCol[0].Vocab&& check1())?
          <View style={{ height:70, width:'40%'}}/>
          :<TouchableOpacity style={(rootCol&&flag===rootCol[0].Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setFlag(rootCol[0].Vocab); setSign1(rootCol[0].Vocab)}}>
          {rootCol&& <Text style={styles.buttonText}>{rootCol[0].Vocab}</Text>}
          </TouchableOpacity>}

          {(tempCol&&sign2==tempCol[0].Vocab&& check2())?null:<TouchableOpacity style={(tempCol&&flag1===tempCol[0].Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setFlag1(tempCol[0].Vocab); setSign2(tempCol[0].Vocab)}}>
          {tempCol&& <Text style={styles.buttonText}>{tempCol[0].Translate}</Text>}
          </TouchableOpacity>}
      </View>
      <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
      {(rootCol&&sign3==rootCol[1].Vocab&& check3())?
       <View style={{ height:70, width:'40%'}}/>:<TouchableOpacity style={(rootCol&&flag===rootCol[1].Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setFlag(rootCol[1].Vocab); setSign3(rootCol[1].Vocab)}}>
      {rootCol&& <Text style={styles.buttonText}>{rootCol[1].Vocab}</Text>}
          </TouchableOpacity>}

          {(tempCol&&sign4==tempCol[1].Vocab&&check4())?
           <View style={{ height:70, width:'40%'}}/>:<TouchableOpacity  style={(tempCol&&flag1===tempCol[1].Vocab)?styles.buttonstyleTrue:styles.buttonstyle}  onPress={()=>{setFlag1(tempCol[1].Vocab); setSign4(tempCol[1].Vocab)}}>
          {tempCol&& <Text style={styles.buttonText}>{tempCol[1].Translate}</Text>}
          </TouchableOpacity>}
      </View>
      <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
      {(rootCol&&sign5==rootCol[2].Vocab&& check5())?
       <View style={{ height:70, width:'40%'}}/>:<TouchableOpacity style={(rootCol&&flag===rootCol[2].Vocab)?styles.buttonstyleTrue:styles.buttonstyle} onPress={()=>{setFlag(rootCol[2].Vocab); setSign5(rootCol[2].Vocab)}}>
      {rootCol&& <Text style={styles.buttonText}>{rootCol[2].Vocab}</Text>}
          </TouchableOpacity>}

          {(tempCol&&sign6==tempCol[2].Vocab&& check6())?
           <View style={{ height:70, width:'40%'}}/>:<TouchableOpacity  style={(tempCol&&flag1===tempCol[2].Vocab)?styles.buttonstyleTrue:styles.buttonstyle}  onPress={()=>{setFlag1(tempCol[2].Vocab); setSign6(tempCol[2].Vocab)}}>
          {tempCol&& <Text style={styles.buttonText}>{tempCol[2].Translate}</Text>}
          </TouchableOpacity>}
      </View>
       {/* <FlatList
              data={rootCol}
              renderItem={({item, index}) => {
                  return (
                    <MatchCard
                    word={item}
                    meaning={tempCol[index]}
                    click={()=>{
                      if(check()){
                        let list = rootCol
                      }
                    }}
                    />
                  );
              }}
            /> */}
    </View>
    <TouchableOpacity style={[AppStyle.button.button2,{backgroundColor:PRIMARY_COLOR, height:40, marginTop:60}]} onPress={()=> navigation.goBack()}>
           <Text style={[AppStyle.button.button2_Text, {color:'black'}]}>Exit</Text>
         </TouchableOpacity>
  </Animated.View>
)
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width,
  },
  buttonstyle:{
      height:70, width:'40%', borderRadius:15, backgroundColor:card_color, justifyContent:'center', alignItems:'center'
  },
  buttonstyleTrue:{
    height:70, width:'40%', borderRadius:15, backgroundColor:PRIMARY_COLOR, justifyContent:'center', alignItems:'center'
},

  buttonText:{
      color:'black', fontSize:22, fontWeight:'400', marginLeft:10
  }})
export default  MatchWordGame