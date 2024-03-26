import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AppStyle from '../theme';
import ClassCard from '../ComponentTeam/ClassCard';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');

const Teams = ({navigation}) => {
  const classData = [
    {
      className: 'Lớp luyện SW Toeic 150+',
      teacherName: 'Nguyễn Quỳnh Hoa',
    },
    {
      className: 'Lớp luyện LR Toeic 800+',
      teacherName: 'Nguyễn Anh Thư',
    },
    {
      className: 'Lớp luyện giao tiếp',
      teacherName: 'Trần Mạnh Hùng',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            flex: 1,
          }}>
          Teams
        </Text>
        <TouchableOpacity
          style={{paddingRight: '5%'}}
          onPress={() => navigation.push('NewTeam')}>
          <Feather name={'plus'} color="white" size={28} />
        </TouchableOpacity>
      </View>
      <Text style={AppStyle.textstyle.parttext}>Your class</Text>
      <FlatList
        data={classData}
        renderItem={({item, index}) => (
          <ClassCard key={index} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
export default Teams;
