import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyle from '../theme';

const AsignmentCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.ClassImage}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/12700/12700091.png',
        }}
      />
      <View style={{flex: 1}}>
        <Text style={[styles.AsignmentText]}>{item.Title}</Text>
        <Text style={[styles.ClassText, {color: '#E13737'}]}>
          Due at {item.Due}
        </Text>
        <Text style={[styles.ClassText]}>{item.Class}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    // elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    marginHorizontal: '3%',
    borderColor: '#999',
    borderWidth: 1,
    paddingVertical: 5,
    paddingRight: 5,
  },
  ClassImage: {
    width: 50,
    height: 50,
    borderRadius: 7,
    marginHorizontal: 10,
    marginTop: 2,
  },
  AsignmentText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  ClassText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
export default AsignmentCard;
