import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatRoomOptions = ({navigation, route}) => {
  const {chatRoomData} = route.params;
  useEffect(() => {
    console.log(chatRoomData);
  });
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.roomImg} source={{uri: chatRoomData.imageUri}} />
          <Text style={styles.roomName}>{chatRoomData.name}</Text>
        </View>

        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              navigation.navigate('AddChatMember', {chatRoomData})
            }>
            <Ionicons name="person-add-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Add people</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('ChatMembers', {chatRoomData})}>
            <Ionicons name="people-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>See all members</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="pricetag-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Pin message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="search-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Search in the chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="notifications-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="aperture-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Change picture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="close-outline" size={27} color={'#555'} />
            <Text style={styles.btnText}>Delete the chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <Ionicons name="log-out-outline" size={27} color={'red'} />
            <Text style={[styles.btnText, {color: 'red'}]}>Leave the chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChatRoomOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 10,
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
  btnsContainer: {
    marginTop: 15,
    paddingTop: 10,
    marginHorizontal: 10,
    width: '100%',
    borderColor: '#DDD',
    borderTopWidth: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
    color: '#222',
  },
});
