import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const ChatRoom = ({route, navigation}) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  const chatData = [
    {
      from: route.params.user,
      to: 'me',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    {
      from: 'me',
      to: 'me',
      content:
        'Me: Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    {
      from: route.params.user,
      to: 'me',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri: route.params.imageUri,
          }}
        />
        <Text style={styles.header}>{route.params.user}</Text>
      </View>

      <View style={styles.chatFlow}>
        <FlatList
          data={chatData}
          renderItem={({item, index}) => {
            if (item.from === 'me')
              return (
                <View style={styles.myChatContainer}>
                  <Text
                    key={index}
                    style={[
                      styles.chatWrapper,
                      {
                        width: screenWidth * 0.6,
                        color: 'white',
                        backgroundColor: PRIMARY_COLOR,
                      },
                    ]}>
                    {item.content}
                  </Text>
                </View>
              );
            else
              return (
                <Text
                  key={index}
                  style={[
                    styles.chatWrapper,
                    {
                      width: screenWidth * 0.6,
                      backgroundColor: card_color,
                    },
                  ]}>
                  {item.content}
                </Text>
              );
          }}
        />
      </View>
      <View style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TextInput
          //   ref={textInputRef}
          //   value={comment}
          //   onChangeText={txt => {
          //     setComment(txt);
          //   }}
          placeholder={'Type here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.chatInput, {color: '#666'}]}
        />
        <Text style={styles.sendButton}>{'Send'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    display: 'flex',
  },
  image: {
    borderRadius: 25,
    width: 32,
    height: 32,
    marginLeft: 15,
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  chatFlow: {
    padding: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  myChatContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  chatWrapper: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    flex: 1,
  },
  sendButton: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  chatInput: {
    width: '80%',
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 6,
  },
  bottomViewContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default ChatRoom;
