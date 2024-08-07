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
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import moment from 'moment';

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

  const getFirstName = str => {
    if (str) {
      const words = str.split(' ');
      return words[0];
    }
  };

  const getImageUri = () => {
    const toUser = item.users?.find(
      user => user.userId !== auth().currentUser.uid,
    );
    item.imageUri = toUser?.avatar;
    return toUser?.avatar;
  };

  const getChatName = () => {
    const toUser = item.users?.find(
      user => user.userId !== auth().currentUser.uid,
    );
    item.name = toUser?.name;
    item.calleeId = toUser?.userId;
    return toUser?.name;
  };

  return (
    <TouchableOpacity
      style={{marginTop: 10}}
      onPress={() => navigation.push('ChatRoom', {chatRoomData: item})}>
      <View style={[styles.container, {width: screenWidth * 0.9}]}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.image}
            source={{uri: item.imageUri || getImageUri()}}
          />
          <View
            style={[
              styles.status,
              {backgroundColor: item.status === 'on' ? 'green' : 'red'},
            ]}
          />
        </View>

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
              {item.name || getChatName()}
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 14,
                marginStart: 'auto',
              }}>
              {moment(
                item.messages[item.messages.length - 1]?.timestamp,
              ).format('HH:mm')}
            </Text>
          </View>
          <Text numberOfLines={1} style={{color: 'gray', fontSize: 16}}>
            {item.messages[item.messages.length - 1]?.from.userId ===
            auth().currentUser.uid
              ? 'You: '
              : item.messages[item.messages.length - 1]?.from.name ===
                getChatName()
              ? ''
              : getFirstName(
                  item.messages[item.messages.length - 1]?.from.name,
                ) + ': '}
            {item.messages[item.messages.length - 1]?.type === 'text'
              ? item.messages[item.messages.length - 1]?.content
              : '[' + item.messages[item.messages.length - 1]?.type + ']'}
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
