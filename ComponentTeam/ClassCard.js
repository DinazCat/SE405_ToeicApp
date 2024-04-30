import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
const ClassCard = ({item, navigation}) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
  return (
    <TouchableOpacity
      style={{marginTop: 10}}
      onPress={() => navigation.push('TeamRoom')}>
      <View
        style={{
          width: screenWidth * 0.9,
          height: height * 0.1,
          justifyContent: 'flex-start',
          alignSelf: 'center',
          backgroundColor: card_color,
          borderRadius: 15,
          borderColor: 'gray',
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{borderRadius: 15, width: 50, height: 50, marginLeft: 5}}
          source={{
            uri: 'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          }}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{color: 'black', fontSize: 20}}>{item.ClassName}</Text>
          <Text style={{color: 'gray', fontSize: 18}}>{item.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
export default ClassCard;
