import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import FileCard from '../ComponentTeam/FileCard';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '../assets/colors/color';
import eventEmitter from '../utils/EventEmitter';
import {AuthContext} from '../navigation/AuthProvider';

const ReviewAssignment = ({navigation, route}) => {
  const {user, isTeacher} = useContext(AuthContext);
  const {submission} = route.params;
  const [score, setScore] = useState(submission.score);
  const [review, setReview] = useState(submission.review);

  const onSave = () => {
    if (score.trim() || review.trim()) {
      eventEmitter.emit('addReviewByTeacher2', {review, score});
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
        <View>
          <Text style={styles.headerText}>Review Assignment</Text>
        </View>
        <View style={{flex: 1}} />
        {isTeacher && (
          <Text style={[styles.SubmitText]} onPress={onSave}>
            Save
          </Text>
        )}
      </View>
      <View style={{padding: 10}}>
        <Text style={[styles.textFont, {fontWeight: 'bold'}]}>Member:</Text>
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.UserImage}
            source={{
              uri: submission.userImg
                ? submission.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
          <Text style={styles.textFont}>{submission.userName}</Text>
        </View>
        <Text style={[styles.textFont, {fontWeight: 'bold'}]}>
          Submitted Files:
        </Text>
        <FlatList
          data={submission.submissionFiles}
          renderItem={({item, index}) => {
            if (
              item.sign == 'fileImage' ||
              item.sign == 'fileMp4' ||
              item.sign == 'filePPT' ||
              item.sign == 'fileWord' ||
              item.sign == 'filePDF'
            ) {
              return (
                <View style={{paddingBottom: 5}}>
                  <FileCard record={item} navigation={navigation} />
                </View>
              );
            }
          }}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={[styles.textFont, {fontWeight: 'bold'}]}>Points:</Text>
          <TextInput
            style={[styles.Input]}
            keyboardType="numeric"
            placeholderTextColor={'#555'}
            width={'15%'}
            value={score}
            onChangeText={txt => setScore(txt)}
            editable={isTeacher}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Write your review here..."
            placeholderTextColor={'#444'}
            value={review}
            onChangeText={text => {
              setReview(text);
            }}
            editable={isTeacher}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewAssignment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  UserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  ContentContainer: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFont: {
    color: '#222',
    fontSize: 17,
    margin: 2,
  },
  SubmitText: {
    color: 'white',
    marginRight: 10,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    marginTop: '5%',
    marginBottom: '10%',
    borderRadius: 15,
    height: '40%',
  },
  input: {
    fontSize: 16,
    marginLeft: 3,
    color: '#333',
    borderRadius: 15,
  },
  Input: {
    fontSize: 16,
    marginLeft: 3,
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
    borderWidth: 1.5,
    margin: 5,
    padding: 5,
    textAlignVertical: 'top',
    alignSelf: 'center',
    color: '#333',
  },
});
