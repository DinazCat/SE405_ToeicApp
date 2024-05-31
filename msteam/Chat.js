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
import socketServices from '../api/socketService';

const Chat = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState();
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    socketServices.initializeSocket();
    socketServices.on('new chat', users => {
      if (users.find(user => user.userId === auth().currentUser.uid)) {
        getUserChats();
      }
    });
  }, []);
  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(auth().currentUser.uid);
      setCurrentUser(data);
    };

    getCurrentUser();
    getUserChats();
  }, []);

  const getUserChats = async () => {
    const result = await Api.getUserChatRooms(auth().currentUser.uid);
    setUserChats(result);
  };

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
        data={userChats}
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
            userChats: userChats,
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
