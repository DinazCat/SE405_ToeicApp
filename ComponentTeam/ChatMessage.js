import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const ChatMessage = ({item, isMine}) => {
  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }
  function truncateText(fileName, maxLength) {
    if (fileName.length <= maxLength) {
      return fileName;
    }

    const extension = fileName.split('.').pop();
    const nameWithoutExtension = fileName.substring(
      0,
      fileName.lastIndexOf('.'),
    );
    const truncatedName = nameWithoutExtension.substring(
      0,
      maxLength - extension.length - 4,
    );

    return `${truncatedName}... .${extension}`;
  }

  const downloadFile = async (fileUrl, fileName) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      console.log(fileUrl);
      const ret = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadDest,
      }).promise;
      console.log(2);
      if (ret.statusCode === 200) {
        openFile(downloadDest);
      } else {
        Alert.alert('Download failed', 'Failed to download file');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Download failed', 'Failed to download file');
    }
  };

  const openFile = async filePath => {
    try {
      await FileViewer.open(filePath);
    } catch (err) {
      console.error('Error opening file:', err);
      Alert.alert('Open failed', 'Failed to open file');
    }
  };

  return (
    <View
      style={[
        styles.messageContainer,
        isMine ? styles.mineMessage : styles.othersMessage,
      ]}>
      {!isMine && (
        <Image source={{uri: item.from?.avatar}} style={styles.avatar} />
      )}
      <View style={styles.messageContent}>
        {!isMine && <Text style={styles.senderName}>{item.from?.name}</Text>}
        {item.type == 'text' && (
          <View style={!isMine && styles.othersMessageContent}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timeText}>
              {moment(item.timestamp).format('HH:mm')}
            </Text>
          </View>
        )}
        {item.type == 'image' && (
          <View>
            <Image style={styles.image} source={{uri: item.imageUrl}} />
            <Text style={styles.timeText}>
              {moment(item.timestamp).format('HH:mm')}
            </Text>
          </View>
        )}
        {item.type == 'file' && (
          <TouchableOpacity
            style={!isMine && styles.othersMessageContent}
            onPress={() => downloadFile(item.file?.url, item.file?.name)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/page-black-icon.png',
                }}
                style={styles.fileImage}
              />
              <Text style={styles.fileName}>
                {isMine
                  ? truncateText(item.file?.name, 25)
                  : truncateText(item.file?.name, 20)}
              </Text>
            </View>
            <Text style={styles.timeText}>
              {formatFileSize(item.file?.size)} -{' '}
              {moment(item.timestamp).format('HH:mm')}
            </Text>
          </TouchableOpacity>
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
