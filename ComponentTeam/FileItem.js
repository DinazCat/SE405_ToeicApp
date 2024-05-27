import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FileItem = ({item, onDelete}) => {
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

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/page-black-icon.png',
          }}
          style={styles.fileImage}
        />
        <Text style={styles.fileName}>{truncateText(item.name, 30)}</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={onDelete}>
          <IonIcon name="close-outline" color={'#444'} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
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
