import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList
  } from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Api from '../api/Api'
import SmallHistoryCard from '../components/SmallHistoryCard';
import HistoryTestCard from '../components/HistoryTestCard';
const HistoryScreen = ({navigation,route}) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const {list, listTest} = route.params
  return (
      <View style={styles.container}>
          <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
          <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          Practice History
        </Text>
      </View>
      <View style={{width: '90%', height: 40, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity style={[styles.historyButton, {marginLeft: '5%'}]}
        onPress={() => {setSelectedTab(1)}}>
          <Text style={[AppStyle.button.buttonText, {color: selectedTab == 1 ? PRIMARY_COLOR : '#333'}]}>Practice</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 30, backgroundColor: 'black', marginHorizontal: 15}} />
        <TouchableOpacity style={styles.historyButton}
        onPress={() => {setSelectedTab(2)}}>
          <Text style={[AppStyle.button.buttonText, {color: selectedTab == 2 ? PRIMARY_COLOR : 'black'}]}>Test</Text>
        </TouchableOpacity>
      </View>
      {selectedTab == 1 &&
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            if (item.History) {
              return (
                <SmallHistoryCard
                  display={item}
                  click={() => {
                    navigation.push('CompleteCard', {
                      quantity: item.Quantity,
                      answer: item.History,
                      sign: 'Home',
                      part: item.Part,
                      questionL: item.History,
                      partName: item.PartName,
                      DetailQty: item.DetailQty,
                    });
                  }}
                />
              );
            } else {
              return (
                <SmallHistoryCard
                  display={item}
                  click={() => {
                    navigation.push('CompleteCard2', {
                      quantity: item.Quantity,
                      sign: 'Home',
                      part: item.Part,
                      questionL: item.result,
                      partName: item.PartName,
                    });
                  }}
                />
              );
            }
          }}/>
        }  

        {selectedTab==2 && (
              <FlatList
              data={listTest}
              renderItem={({item, index}) => {
                return (
                  <HistoryTestCard
                    item={item}
                    click={() => {
                      navigation.push('TestResult', {
                        History: item.History,
                        questionList: item.Questions,
                        testHistory: item,
                      })
                    }}                     
                  />)
                }
              }
              />
            )}

        </ImageBackground>            
      </View>
    )
  }
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },
    upzone: {
        height:'8%',
        backgroundColor:'#990000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyButton:{
      height:30,
      width: '45%',
      borderBottomColor:'#000',
      borderBottomWidth:1
    },
})
export default HistoryScreen