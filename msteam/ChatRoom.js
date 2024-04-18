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
import ChatMessage from '../ComponentTeam/ChatMessage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

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
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:01',
      isMine: false,
    },
    {
      user: {
        name: 'Cát',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:02',
      isMine: true,
    },
    {
      user: {
        name: 'Lynh',
        avatar:
          'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
      },
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      time: '13:03',
      isMine: false,
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
        <Text style={styles.header} numberOfLines={1}>
          {route.params.user}
        </Text>
        <View style={{flex: 1}}></View>
        <TouchableOpacity>
          <IonIcon name="call" style={styles.iconButton2} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon
            name="videocam"
            style={[styles.iconButton2, {marginRight: 10}]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chatFlow}>
        <FlatList
          data={chatData}
          renderItem={({item, index}) => {
            return <ChatMessage item={item} />;
          }}
        />
      </View>
      <View style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TouchableOpacity>
          <IonIcon name="image-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon name="camera-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon name="document-attach-outline" style={styles.iconButton} />
        </TouchableOpacity>
        <TextInput
          //   ref={textInputRef}
          //   value={comment}
          //   onChangeText={txt => {
          //     setComment(txt);
          //   }}
          placeholder={'Text here...'}
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
    maxWidth: '50%',
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
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
    marginLeft: 5,
  },
  chatInput: {
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 6,
    flex: 1,
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
  iconButton: {
    fontSize: 25,
    color: '#555',
    padding: 2,
    margin: 2,
  },
  iconButton2: {
    fontSize: 25,
    color: 'white',
    padding: 2,
    marginHorizontal: 7,
  },
});
export default ChatRoom;
