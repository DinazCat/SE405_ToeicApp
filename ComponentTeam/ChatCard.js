import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
const ChatCard = ({item, navigation}) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  return (
    <TouchableOpacity
      style={{marginTop: 10}}
      onPress={() => navigation.push('ChatRoom', item)}>
      <View style={[styles.container, {width: screenWidth * 0.9}]}>
        <ImageBackground style={{position: 'relative'}}>
          <Image style={styles.image} source={{uri: item.imageUri}} />
          <View
            style={[
              styles.status,
              {backgroundColor: item.status === 'on' ? 'green' : 'red'},
            ]}
          />
        </ImageBackground>

        <View
          style={{
            display: 'flex',
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 600,
              }}>
              {item.user}
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 14,
                marginStart: 'auto',
              }}>
              {item.time}
            </Text>
          </View>
          <Text numberOfLines={1} style={{color: 'gray', fontSize: 16}}>
            {item.lastText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: card_color,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  status: {
    width: 12,
    height: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 10,
    borderColor: card_color,
    borderWidth: 1.5,
  },
});

export default ChatCard;
