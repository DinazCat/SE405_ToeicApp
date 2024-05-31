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
import Api from '../api/Api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const ChatMembers = ({navigation, route}) => {
  const {chatRoomData} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'#555'}
            style={styles.backBtn}
          />
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 500}}>
          All members
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.roomImg} source={{uri: chatRoomData.imageUri}} />
          <Text style={styles.roomName}>{chatRoomData.name}</Text>
        </View>

        <FlatList
          data={chatRoomData.users}
          renderItem={({item, index}) => <UserCard key={index} item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const UserCard = ({item}) => {
  return (
    <TouchableOpacity style={{marginTop: 10}}>
      <View style={[styles.cardContainer]}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.image}
            source={{
              uri: item.avatar
                ? item.avatar
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
        </View>

        <View style={{display: 'flex', flex: 1}}>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 500,
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatMembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  backBtn: {
    margin: 10,
  },
  roomImg: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  roomName: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
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
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});
