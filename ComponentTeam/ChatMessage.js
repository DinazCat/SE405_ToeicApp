import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const ChatMessage = ({item}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        item.isMine ? styles.mineMessage : styles.othersMessage,
      ]}>
      {!item.isMine && (
        <Image source={{uri: item.user?.avatar}} style={styles.avatar} />
      )}
      <View style={styles.messageContent}>
        {!item.isMine && (
          <Text style={styles.senderName}>{item.user?.name}</Text>
        )}
        {item.type == 'text' && (
          <View style={!item.isMine && styles.othersMessageContent}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
        {item.type == 'image' && (
          <View>
            <Image style={styles.image} source={{uri: item.image}} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
        {item.type == 'file' && (
          <View style={!item.isMine && styles.othersMessageContent}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/page-black-icon.png',
                }}
                style={styles.fileImage}
              />
              <Text style={styles.fileName}>hocvnvnvv.txt</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    marginBottom: 20,
    borderRadius: 10,
  },
  mineMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
  },
  othersMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 25,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    alignSelf: 'flex-end',
  },
  othersMessageContent: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    resizeMode: 'stretch',
    minHeight: 150,
    minWidth: 150,
    borderRadius: 5,
  },
  fileImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
});
