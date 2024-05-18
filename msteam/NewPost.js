import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
const NewPost = ({navigation, route}) => {
  const {classId, userInfo} = route.params;
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [post, setPost] = useState('');
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    // return () => {
    //   Dimensions.removeEventListener('change', updateScreenWidth);
    // };
  }, []);
  const allowSend = () => {
    if (post == '') return false;
    else return true;
  };
  const handlePostComment = async () => {
    if (allowSend() == false) {
      Alert.alert(
        'Input cannot be blank!',
        'Please enter your opinion to send',
      );
      return;
    } else {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();
      const time =
        currentDay +
        '/' +
        currentMonth +
        '/' +
        currentYear +
        ' at ' +
        currentHours +
        ':' +
        currentMinutes;
      const date = 13 + '/' + currentMonth + '/' + currentYear;
      const data = {
        userName: userInfo.name,
        userImg: userInfo.userImg,
        text: post,
        time: time,
        Date: date,
        replies: [],
        likes: 0,
      };
      try {
        const postRef = await firestore().collection('PostInTeam').add(data);
        const postId = postRef.id;

        await firestore().collection('PostInTeam').doc(postId).update({
          id: postId,
        });

        await firestore()
          .collection('Class')
          .doc(classId)
          .update({
            Posts: firestore.FieldValue.arrayUnion({id: postId, Date: date}),
          });
        navigation.goBack();
        console.log('Document pushed successfully.');
      } catch (error) {
        console.error('Error pushing document:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          New post
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={{marginRight: '5%'}}
          onPress={() => {
            handlePostComment();
          }}>
          <Icon name={'paper-plane'} color="white" size={20} />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Write something here..."
        multiline={true}
        style={styles.Input}
        placeholderTextColor="#555"
        height={screenHeight * 0.5}
        width={'96%'}
        autoFocus={true}
        value={post}
        onChangeText={txt => {
          setPost(txt);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  Input: {
    fontSize: 16,
    marginLeft: 3,
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    textAlignVertical: 'top',
    alignSelf: 'center',
  },
});
export default NewPost;
