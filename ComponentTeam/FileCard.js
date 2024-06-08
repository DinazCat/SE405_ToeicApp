import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {useNavigation} from '@react-navigation/native';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
import Api from '../api/Api';
const FileCard = ({record, classId}) => {
  const navigation = useNavigation();
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);

  const PopupMenu = () => {
    const [visible, setvisible] = useState(false);
    const options = [
      {
        title: 'Delete',
        action: async () => {
          setvisible(false);
          await Api.deleteFile(record, classId);
        },
      },
      // {
      //   title: 'Edit',
      //   action: () => {
      //     setvisible(false);
      //   },
      // },
    ];

    return (
      <View style={{flexDirection: 'column'}}>
        {visible && (
          <View style={styles.popup}>
            {options.map((op, i) => (
              <TouchableOpacity
                style={[styles.popupitem]}
                key={i}
                onPress={op.action}>
                <Text>{op.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.MenuButton}
          onPress={() => setvisible(!visible)}>
          <Icon name={'ellipsis-h'} color={'#555'} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{paddingBottom: 5}}>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: card_color,
          width: screenWidth * 0.9,
          alignSelf: 'center',
          elevation: 5,
          marginTop: 10,
        }}>
        <View style={styles.UserInfoContainer}>
          <TouchableOpacity>
            {record.sign == 'fileImage' && (
              <Image
                style={styles.UserImage}
                source={require('../assets/image.png')}
              />
            )}
            {record.sign == 'fileMp4' && (
              <Image
                style={styles.UserImage}
                source={require('../assets/video.png')}
              />
            )}
            {record.sign == 'filePPT' && (
              <Image
                style={styles.UserImage}
                source={require('../assets/ppt.png')}
              />
            )}
            {record.sign == 'fileWord' && (
              <Image
                style={styles.UserImage}
                source={require('../assets/word.png')}
              />
            )}
            {record.sign == 'filePDF' && (
              <Image
                style={styles.UserImage}
                source={require('../assets/pdf.webp')}
              />
            )}
          </TouchableOpacity>
          <View style={styles.UserInfoTextContainer}>
            <TouchableOpacity
              onPress={() => {
                if (record.sign == 'filePPT') {
                  Linking.openURL('https://' + record.Link);
                } else {
                  navigation.navigate('FileViewScreen', {
                    link: record.Link,
                    sign: record.sign,
                    name: record.Name,
                  });
                }
              }}>
              <Text style={[styles.UsernameText]}>{record?.Name}</Text>
            </TouchableOpacity>
            {record?.Time && (
              <Text style={styles.PostTime}>{record?.Time}</Text>
            )}
            {record?.User && (
              <Text style={styles.PostTime}>By {record?.User}</Text>
            )}
          </View>
          <View style={{flex: 1}} />
          <PopupMenu />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 5,
  },
  UserInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  UserImage: {
    width: 46,
    height: 46,
  },
  UserInfoTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    width: '75%',
  },
  UsernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  PostTime: {
    fontSize: 13,
    color: 'white',
    color: '#888',
  },
  MenuButton: {
    color: 'black',
    fontSize: 30,
    padding: 10,
    alignSelf: 'center',
  },
  popup: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 62,
    height: 45,
    textAlign: 'center',
  },
  popupitem: {
    borderBottomColor: 'black',
    alignItems: 'center',
    width: 60,
    alignSelf: 'center',
    paddingVertical: 5,
  },
});
export default FileCard;
