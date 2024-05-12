import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import axios from 'axios';
import VideoPlayer from 'react-native-video-player';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import SpeakP1QuestionForm from '../components/SpeakP1QuestionForm';
import SpeakP2QuestionForm from '../components/SpeakP2QuestionForm';
import SpeakP34QuestionForm from '../components/SpeakP34QuestionForm';
import SpeakP5QuestionForm from '../components/SpeakP5QuestionForm';
import SpeakP6QuestionForm from '../components/SpeakP6QuestionForm';
import WriteP1QuestionForm from '../components/WriteP1QuestionForm';
import WriteP23QuestionForm from '../components/WriteP23QuestionForm';

const AddPostScreen = ({navigation, route}) => {
  const {sign, Answer, part, item} = route.params;
  const [profileData, setProfileData] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenModal2, setOpenModal2] = useState(false);
  const [image, setimage] = useState([]);
  const [hashtag, sethashtag] = useState(null);
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'));
  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid);
    setProfileData(data);
    if (data.currentScore) {
      if (data.currentScore >= 0 && data.currentScore <= 250) {
        setLevel('0 (Basic Proficiency)');
        require('../assets/Lv0.png');
      } else if (data.currentScore <= 400) {
        setLevel('1 (Elementary Proficiency)');
        require('../assets/Lv1.png');
      } else if (data.currentScore <= 600) {
        setLevel('2 (Elementary Proficiency Plus)');
        setLevelSource(require('../assets/Lv2.png'));
      } else if (data.currentScore <= 780) {
        setLevel('3 (Limited Working Proficiency)');
        require('../assets/Lv3.png');
      } else if (data.currentScore <= 900) {
        setLevel('4 (Working Proficiency Plus)');
        require('../assets/Lv4.png');
      } else if (data.currentScore <= 990) {
        setLevel('5 (International Professional Proficiency)');
        require('../assets/Lv5.png');
      }
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const pickImageAsync = async () => {
    setOpenModal(false);
    setOpenModal2(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(img => {
      let image2 = image.slice();
      image2.push({
        uri: img.path,
        type: 'img',
      });
      setimage(image2);
    });
  };
  const takePhotoFromCamera = () => {
    setOpenModal(false);
    setOpenModal2(false);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      let image2 = image.slice();
      image2.push({
        uri: img.path,
        type: 'img',
      });
      setimage(image2);
    });
  };
  const videoFromCamera = () => {
    setOpenModal(false);
    setOpenModal2(false);
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(img => {
      let image2 = image.slice();
      image2.push({
        uri: img.path,
        type: 'video',
      });
      setimage(image2);
    });
  };
  handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });
      console.log(res);
      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res[0].type);
      // console.log('File Name : ' + res[0].name);
      // console.log('File Size : ' + res[0].size);
      let image2 = image.slice();
      image2.push({
        uri: res[0].fileCopyUri,
        type: 'pdf',
        filename: res[0].name,
      });
      setimage(image2);
      console.log(image2);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.log('Something went wrong', err);
      }
    }
  };
  const allowPost = () => {
    if (sign == 'ReviewQuestion') {
      if (topic != '' && text != '' && hashtag != null) return true;
      return false;
    } else {
      if (
        (topic != '' && text != '' && hashtag != null) ||
        (image.length > 0 && topic != '' && hashtag != null)
      )
        return true;
      return false;
    }
  };

  const uploadImage = async () => {
    const list = [];
    try {
      for (let i = 0; i < image.length; i++) {
        if (image[i].type == 'img') {
          const formData = new FormData();
          formData.append('image', {
            uri: image[i].uri,
            name: 'image.jpg',
            type: 'image/jpg',
          });
          console.log('hah')
          // const response = await axios.post(
          //   'http://192.168.1.7:3000/upload',
          //   formData,
          // ).catch((e)=>{console.log(e)})
          const config = {
            method: 'post',
            url: 'http://192.168.1.7:3000/upload',
            headers: { 
              'Content-Type': 'multipart/form-data'
            },
            data : formData
          };
          
          
          const response = await  axios(config)
          console.log('hah1')

          list.push({uri: response.data.photo, type: 'img'});
        } else if (image[i].type == 'video') {
          const formData = new FormData();
          formData.append('video', {
            uri: image[i].uri,
            name: 'video.mp4',
            type: 'video/mp4',
          });
          const response = await axios.post(
            'http://192.168.1.107:3000/uploadvideo',
            formData,
          );
          list.push({uri: response.data.video, type: 'video'});
        } else if (image[i].type == 'pdf') {
          const formData = new FormData();
          formData.append('pdf', {
            uri: image[i].uri,
            name: 'file.pdf',
            type: 'application/pdf',
          });
          const response = await axios.post(
            'http://192.168.1.107:3000/uploadpdf',
            formData,
          );
          list.push({
            uri: response.data.filepdf,
            type: 'pdf',
            name: image[i].filename,
          });
        }
        if (i == image.length - 1) {
          const data = {
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            likes: [],
            comments: [],
            topic: topic,
            text: text,
            postImg: list,
            userId: auth().currentUser.uid,
            userImg: profileData.userImg,
            userName: profileData.name || profileData.email,
            hashtag: hashtag,
            Allow: false,
          };
          Alert.alert('Success!', 'Your post has been sent for moderation');
          await Api.addPost(data);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const submitPost = async () => {
    if (allowPost()) {
      if (sign == 'ReviewQuestion') {
        // post question
        const data = {
          postTime: firebase.firestore.Timestamp.fromDate(new Date()),
          likes: [],
          comments: [],
          topic: topic,
          text: text,
          postImg: [
            {
              item: item,
              part: part,
              flag: 'ReviewQuestion',
              check: Answer,
              type: 'question',
            },
          ],
          userId: auth().currentUser.uid,
          userImg: profileData.userImg,
          userName: profileData.name || profileData.email,
          hashtag: hashtag,
          Allow: false,
        };
        Alert.alert('Success!', 'Your post has been sent for moderation');
        await Api.addPost(data);
        navigation.goBack();
      } else {
        if (image.length > 0) {
          uploadImage();
        } else {
          const data = {
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            likes: [],
            comments: [],
            topic: topic,
            text: text,
            postImg: null,
            userId: auth().currentUser.uid,
            userImg: profileData.userImg,
            userName: profileData.name || profileData.email,
            hashtag: hashtag,
            Allow: false,
          };
          Alert.alert('Success!', 'Your post has been sent for moderation.');
          await Api.addPost(data);
          navigation.goBack();
        }
      }
    } else {
      if (topic == '') {
        Alert.alert('Notice!', "Please enter this port's topic");
      } else if (text == '' && image.length == 0) {
        Alert.alert('Notice!', "Please enter this port's content");
      } else if (hashtag == null) {
        Alert.alert('Notice!', "Please enter this port's hastag");
      }
    }
  };
  function RenderModal() {
    return (
      <Modal visible={OpenModal} animationType="slide" transparent={true}>
        <View
          style={{
            height: 160,
            width: 300,
            borderRadius: 15,
            backgroundColor: PRIMARY_COLOR,
            borderColor: 'white',
            borderWidth: 2,
            alignSelf: 'center',
            marginVertical: 300,
            position: 'absolute',
          }}>
          <TouchableOpacity
            style={{marginLeft: 255, padding: 5}}
            onPress={() => setOpenModal(false)}>
            <Icon
              name={'times-circle'}
              style={{color: 'white', fontSize: 20, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={styles.popover}>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <View style={styles.popoverItem}>
                <Icon name="camera" size={35} color={card_color} />
                <Text style={{fontSize: 16, marginTop: 8, color: 'white'}}>
                  Take photo
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={videoFromCamera}>
              <View style={styles.popoverItem}>
                <Icon name="video" size={35} color={card_color} />
                <Text style={{fontSize: 16, marginTop: 8, color: 'white'}}>
                  Video
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function RenderCategory() {
    return (
      <Modal visible={OpenModal2} animationType="slide" transparent={true}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1}} />
          <View style={{height: 300}}>
            <View style={styles.IconContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  setOpenModal2(false);
                }}>
                <Icon name={'caret-up'} style={styles.IconWrapper} />
                <Text style={{color: '#222', fontSize: 15}}>Post Category</Text>
              </TouchableOpacity>
              {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}
              <View style={{flex: 1}} />
              {sign == 'Forum' && (
                <>
                  <TouchableOpacity onPress={pickImageAsync}>
                    <Icon name={'images'} style={styles.IconWrapper} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenModal(true);
                    }}>
                    <Icon name={'camera'} style={styles.IconWrapper} light />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name={'paperclip'} style={styles.IconWrapper} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            {/* <FlatList
            data={hashtagList}
            renderItem={({item, index}) => (
              <Hashtags
                  each={item} 
                   />
              )}
            numColumns={2}
          /> */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {backgroundColor: hashtag != 'Q&A' ? '#EAABAB' : 'white'},
                ]}
                onPress={() => {
                  if (hashtag == 'Q&A') sethashtag('');
                  else sethashtag('Q&A');
                }}>
                <Text style={[styles.panelButtonTitle]}>Q&A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {backgroundColor: hashtag != 'Help?' ? '#74A8C5' : 'white'},
                ]}
                onPress={() => {
                  if (hashtag == 'Help?') sethashtag('');
                  else sethashtag('Help?');
                }}>
                <Text style={[styles.panelButtonTitle]}>Help?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Study Resources' ? '#FA9D68' : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Study Resources') sethashtag('');
                  else sethashtag('Study Resources');
                }}>
                <Text style={[styles.panelButtonTitle]}>Study Resources</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Exam Analysis' ? '#CF87DF' : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Exam Analysis') sethashtag('');
                  else sethashtag('Exam Analysis');
                }}>
                <Text style={[styles.panelButtonTitle]}>Exam Analysis</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Preparation Experiences'
                        ? '#F6F069'
                        : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Preparation Experiences') sethashtag('');
                  else sethashtag('Preparation Experiences');
                }}>
                <Text style={[styles.panelButtonTitle]}>
                  Preparation Experiences
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Share Your Results' ? '#51D855' : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Share Your Results') sethashtag('');
                  else sethashtag('Share Your Results');
                }}>
                <Text style={[styles.panelButtonTitle]}>
                  Share Your Results
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Events/News' ? '#70DECE' : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Events/News') sethashtag('');
                  else sethashtag('Events/News');
                }}>
                <Text style={[styles.panelButtonTitle]}>Events/News</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {
                    backgroundColor:
                      hashtag != 'Review Exam Experiences'
                        ? '#E55858'
                        : 'white',
                  },
                ]}
                onPress={() => {
                  if (hashtag == 'Review Exam Experiences') sethashtag('');
                  else sethashtag('Review Exam Experiences');
                }}>
                <Text style={[styles.panelButtonTitle]}>
                  Review Exam Experiences
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.panelButton,
                  {backgroundColor: hashtag != 'Others' ? '#BCE37A' : 'white'},
                ]}
                onPress={() => {
                  if (hashtag == 'Others') sethashtag('');
                  else sethashtag('Others');
                }}>
                <Text style={[styles.panelButtonTitle]}>Others</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name={'arrow-left'}
            style={{
              color: '#222',
              fontSize: 25,
              padding: 5,
              marginHorizontal: 5,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            flex: 1,
            marginLeft: 5,
            color: '#222',
            fontWeight: 'bold',
          }}>
          Create a post
        </Text>
        {/* {uploading ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>{transferred} % completed! </Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : ( */}
        <Button
          title={'Post'}
          // color={'#333'}
          color={allowPost() == true ? '#006400' : '#333'}
          onPress={submitPost}
        />

        {/* )} */}

        <View style={{marginRight: 5}} />
      </View>

      <View
        style={{
          height: 60,
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: profileData
              ? profileData.userImg
                ? profileData.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
          }}
          style={styles.UserImage}
        />
        <Image
          source={levelsource}
          resizeMode="contain"
          style={{
            position: 'absolute',
            marginLeft: 37,
            marginTop: 37,
            width: 15,
            height: 15,
          }}></Image>
        <Text style={styles.UserName}>
          {profileData
            ? profileData.name
              ? profileData.name
              : profileData.email
            : 'Your name'}
        </Text>
      </View>

      <TextInput
        placeholder="Topic here..."
        multiline={true}
        style={[styles.Input, {fontWeight: '700'}]}
        placeholderTextColor={'#555'}
        width={'96%'}
        value={topic}
        onChangeText={txt => setTopic(txt)}
      />
      <View>
        <TextInput
          placeholder="Write something here..."
          multiline={true}
          style={styles.Input}
          placeholderTextColor="#555"
          height={180}
          width={'96%'}
          value={text}
          onChangeText={txt => setText(txt)}
        />
        {/* {image == null ? ( */}
        {/* <View>
                <Image
                  source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
                  style={{
                    width: 300,
                    height: 200,
                    borderRadius: 15,
                    alignSelf: 'center',
                    marginTop: 150,
                  }}
                />
                <Text style={{alignSelf: 'center'}}>
                  Thêm hình ảnh mà bạn thích
                </Text>
              </View> */}
        {/* ) : null} */}
        {/* {image!=null? <Image
              source={{uri: image}}
              style={{height: 300, width: 400, marginTop: 70}}
              resizeMode="contain"
            />:null} */}
      </View>
      <View style={{flex: 1}}>
        {sign == 'Forum' && (
          <ScrollView style={{flexDirection: 'column'}}>
            {image.map((each, key) => {
              return (
                <View key={key}>
                  {each.type == 'img' ? (
                    <Image
                      source={{uri: each.uri}}
                      style={{height: 200, width: 400, marginTop: 5}}
                      resizeMode="cover"
                    />
                  ) : each.type == 'video' ? (
                    <VideoPlayer
                      video={{uri: each.uri}}
                      videoWidth={400}
                      videoHeight={200}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200,
                        width: 400,
                      }}>
                      <Image
                        source={{
                          uri: 'https://tse3.mm.bing.net/th?id=OIP.gh9hvhaRiqOVr8zU54fm-AHaEK&pid=Api&P=0&h=220',
                        }}
                        style={{height: 160, width: 360, marginTop: 5}}
                        resizeMode="cover"
                      />
                      <Text style={{color: 'black', fontSize: 14}}>
                        {each.filename}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={{marginTop: 3, position: 'absolute'}}
                    onPress={() => {
                      let filterRssult = image.filter(function (element) {
                        return element !== each;
                      });
                      setimage(filterRssult);
                    }}>
                    <Icon
                      name={'backspace'}
                      style={{color: '#FFCC00', fontSize: 25}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        )}
        {sign == 'ReviewQuestion' && (
          <ScrollView style={{flexDirection: 'column'}}>
            {part == 'W1' && (
              <WriteP1QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {(part == 'W2' || part == 'W3') && (
              <WriteP23QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {part == 'S1' && (
              <SpeakP1QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {part == 'S2' && (
              <SpeakP2QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {part == 'S3' && (
              <SpeakP34QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {part == 'S4' && (
              <SpeakP5QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
            {part == 'S5' && (
              <SpeakP6QuestionForm
                item={item}
                part={part}
                flag={'ReviewQuestion'}
                check={Answer}
              />
            )}
          </ScrollView>
        )}
      </View>

      {!OpenModal2 && (
        <View style={styles.IconContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setOpenModal2(true);
            }}>
            <Icon name={'caret-down'} style={styles.IconWrapper} />
            <Text style={{color: '#222', fontSize: 15}}>Post Category</Text>
          </TouchableOpacity>
          {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}
          <View style={{flex: 1}} />
          {sign == 'Forum' && (
            <>
              <TouchableOpacity onPress={pickImageAsync}>
                <Icon name={'images'} style={styles.IconWrapper} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(true);
                }}>
                <Icon name={'camera'} style={styles.IconWrapper} light />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFilePicker}>
                <Icon name={'paperclip'} style={styles.IconWrapper} />
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      {RenderCategory()}
      {RenderModal()}
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9ACC1C',
  },
  UserImage: {
    width: 46,
    height: 46,
    borderRadius: 30,
    marginLeft: 5,
    alignSelf: 'center',
  },
  UserName: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#444',
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
  IconContainer: {
    height: 40,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#9ACC1C',
  },
  IconWrapper: {
    marginHorizontal: 5,
    color: '#222',
    fontSize: 28,
    alignSelf: 'center',
  },
  devider: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    margin: 5,
  },
  popover: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popoverItem: {
    alignItems: 'center',
    margin: 16,
  },
  panel: {
    height: 300,
    width: '100%',
    backgroundColor: '#E8E8E8',
    position: 'absolute',
    borderColor: 'black',
  },
  panelButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  panelButtonTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
  },
});
