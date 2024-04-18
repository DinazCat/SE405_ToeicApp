import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const UserItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.userContent}>
        <Text style={styles.username}>{item.name}</Text>
      </View>
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
});
