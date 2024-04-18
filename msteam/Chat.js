import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import ChatCard from '../ComponentTeam/ChatCard';
import AppStyle from '../theme';

const Chat = ({navigation}) => {
  const chatData = [
    {
      roomName: 'Nguyễn Quỳnh Hoa',
      time: '20/03/2024',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      lastText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'on',
    },
    {
      roomName: 'Nguyễn Anh Thư',
      time: '20/03/2024',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      lastText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'off',
    },
    {
      roomName: 'Trần Mạnh Hùng',
      time: '20/03/2024',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      lastText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'on',
    },
  ];

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={chatData}
        renderItem={({item, index}) => (
          <ChatCard key={index} item={item} navigation={navigation} />
        )}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginLeft: screenWidth - 80,
          marginTop: screenHeight - 120,
          borderRadius: 25,
          width: 50,
          height: 50,
          backgroundColor: PRIMARY_COLOR,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.push('NewChat', chatData)}>
        <Icon name={'pen'} color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default Chat;
