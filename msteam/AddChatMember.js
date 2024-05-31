import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import ChatCard from '../ComponentTeam/ChatCard';
import Api from '../api/Api';

const AddChatMember = ({navigation, route}) => {
  const {chatRoomData} = route.params;
  const [searchInput, setSearchInput] = useState('');
  const [filterUsers, setFilterUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = useRef();

  useEffect(() => {
    const getAllUsers = async () => {
      users.current = await Api.getAllUsers();

      const chatroomUserIds = chatRoomData.users.map(user => user.userId);

      users.current = users.current.filter(
        user => !chatroomUserIds.includes(user.id),
      );
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

  const onUserCardPress = item => {
    if (selectedUsers.includes(item)) {
      setSelectedUsers(selectedUsers.filter(user => user !== item));
    } else setSelectedUsers([...selectedUsers, item]);
  };

  const onDone = async () => {
    const selectedusers = selectedUsers.map(user => ({
      userId: user.id,
      name: user.name,
      avatar: user.userImg,
    }));
    const users = [...chatRoomData.users, ...selectedusers];

    await Api.updateChatRoom({users}, chatRoomData.Id);
    navigation.goBack();
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
              <View style={{flex: 1}} />
              {selectedUsers.includes(item) && (
                <IonIcon name="checkmark-outline" color={'#000'} size={20} />
              )}
            </View>
            <Text numberOfLines={1} style={{color: 'gray', fontSize: 16}}>
              {item.email}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'#555'}
            style={styles.backBtn}
          />
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 500}}>
          Add member
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={onDone}>
          <IonIcon name="checkmark-outline" color={'#000'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <IonIcon name="search-outline" color={'#666'} size={20} />
        <TextInput
          value={searchInput}
          onChangeText={txt => onTextChange(txt)}
          placeholder={'Enter name or email address'}
          placeholderTextColor={'#666'}
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
                onPress={() => onUserCardPress(item)}
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
              data={users.current}
              renderItem={({item, index}) => (
                <NewChatCard
                  key={index}
                  item={item}
                  navigation={navigation}
                  onPress={() => onUserCardPress(item)}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default AddChatMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backBtn: {
    margin: 10,
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
