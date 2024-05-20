import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const FileItem = ({item}) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };
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
