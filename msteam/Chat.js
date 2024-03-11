import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    TextInput
  } from 'react-native';
  import React, { useState, useEffect } from 'react';

  const Chat = () => {
  
    return (
      <View style={styles.container}>
        <Text>Chat</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
})

  export default Chat;
  