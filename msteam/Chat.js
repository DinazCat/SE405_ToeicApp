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
import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import ChatCard from '../ComponentTeam/ChatCard';
import AppStyle from '../theme';
import Api from '../api/Api';
import auth from '@react-native-firebase/auth';

const Chat = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState();
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(auth().currentUser.uid);
      setCurrentUser(data);
    };

    const getUserChats = async () => {
      const result = await Api.getUserChatRooms();
      setUserChats(result);
      console.log(result)
    };

    getCurrentUser();
  }, []);
  const chatData = [
    {
      name: 'Nguyễn Quỳnh Hoa',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      messages: [
        {
          from: {
            userId: '',
            name: 'Lynh',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:01',
          type: 'text',
        },
        {
          from: {
            userId: 'DxL5c5T2XYZZE0ONGGPLpj0tOsK2',
            name: 'Cát',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:02',
          type: 'text',
        },
      ],
      status: 'on',
    },
    {
      name: 'Nguyễn Anh Thư',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      messages: [
        {
          from: {
            userId: '',
            name: 'Lynh',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:01',
          type: 'text',
        },
        {
          from: {
            userId: '',
            name: 'Cát tường',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:02',
          type: 'text',
        },
      ],
      status: 'off',
    },
    {
      name: 'Trần Mạnh Hùng',
      imageUri:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      messages: [
        {
          from: {
            userId: '',
            name: 'Lynh',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:01',
          type: 'text',
        },
        {
          from: {
            userId: '12',
            name: 'Trần Mạnh Hùng',
            avatar:
              'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
          },
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          timestamp: '13:02',
          type: 'text',
        },
      ],
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
        onPress={() =>
          navigation.push('NewChat', {
            userChats: chatData,
            currentUser: currentUser,
          })
        }>
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
