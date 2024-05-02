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
import React, {useState, useEffect, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import ChatCard from '../ComponentTeam/ChatCard';
import Api from '../api/Api';

const NewChat = ({route, navigation}) => {
  const {userChats, currentUser} = route.params;
  const [searchInput, setSearchInput] = useState('');
  const [filterUsers, setFilterUsers] = useState([]);
  const users = useRef();

  useEffect(() => {
    const getAllUsers = async () => {
      users.current = await Api.getAllUsers();
    };

    getAllUsers();
  }, []);

  const onTextChange = txt => {
    setSearchInput(txt);
    if (txt.trim()) {
      const searchResult = users.current.filter(
        user =>
          user.name.toLowerCase().includes(txt.toLowerCase()) ||
          user.email.toLowerCase().includes(txt.toLowerCase()),
      );
      setFilterUsers(searchResult);
    } else setFilterUsers([]);
  };

  const onNewChatCardPress = item => {
    const chatExisted = userChats.find(chatroom => {
      if (chatroom.users?.length === 2) {
        const haveUser = chatroom.users.some(user => user.userId === item.id);
        return haveUser;
      }
      return false;
    });

    if (chatExisted) {
      navigation.push('ChatRoom', {
        chatRoomData: {
          ...chatExisted,
          imageUri: chatExisted.imageUri ? chatExisted.imageUri : item.userImg,
          name: chatExisted.name ? chatExisted.name : item.name,
        },
      });
    } else {
      navigation.push('ChatRoom', {
        chatRoomData: {
          isNewChat: true,
          imageUri: item.userImg,
          name: item.name,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>New chat</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{color: '#666'}}>To:</Text>
        <TextInput
          value={searchInput}
          onChangeText={txt => onTextChange(txt)}
          placeholder={'Enter name or email address'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={styles.input}
        />
      </View>
      <View>
        {filterUsers.length != 0 ? (
          <FlatList
            data={filterUsers}
            renderItem={({item, index}) => (
              <NewChatCard
                key={index}
                item={item}
                navigation={navigation}
                onPress={() => onNewChatCardPress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            {searchInput.trim() && (
              <Text style={styles.title}>No result found</Text>
            )}
            <Text style={styles.title}>Suggest</Text>
            <FlatList
              data={userChats}
              renderItem={({item, index}) => (
                <ChatCard key={index} item={item} navigation={navigation} />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const NewChatCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={{marginTop: 10}} onPress={onPress}>
      <View style={[styles.cardContainer]}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.image}
            source={{
              uri: item.userImg
                ? item.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
        </View>

        <View style={{display: 'flex', flex: 1}}>
          <View style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 600,
              }}>
              {item.name}
            </Text>
          </View>
          <Text numberOfLines={1} style={{color: 'gray', fontSize: 16}}>
            {item.email}
          </Text>
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
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    gap: 10,
  },
  input: {
    color: '#666',
    padding: 0,
    flex: 1,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  cardContainer: {
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
    width: '90%',
  },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
export default NewChat;
