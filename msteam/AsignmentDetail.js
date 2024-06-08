import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect, useContext} from 'react';
import FileCard from '../ComponentTeam/FileCard';
import {AuthContext} from '../navigation/AuthProvider';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import Api from '../api/Api';
import uploadfile from '../api/uploadfile';
import axios from 'axios';
import FileItem from '../ComponentTeam/FileItem';
import eventEmitter from '../utils/EventEmitter';

const AsignmentDetail = ({navigation, route}) => {
  const {user, isTeacher} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const {assignment} = route.params;
  const [submissionFiles, setSubmissionFiles] = useState(
    route.params.submissionFiles,
  );
  const [isPastDue, setPastDue] = useState(route.params?.isPastDue);
  const [isSubmitted, setSubmitted] = useState(route.params?.isSubmitted);
  const [submissions, setSubmissions] = useState([]);
  const [selectedReview, setSelectedReview] = useState();

  const getMemberSubmissions = () => {
    if (assignment.submissions) {
      const allSubmissions = assignment.submissions;

      allSubmissions.sort(
        (a, b) => new Date(b.submitedTime) - new Date(a.submitedTime),
      );

      setSubmissions(allSubmissions);
    }
  };

  const getCurrentUser = async () => {
    const data = await Api.getUserData(user.uid);
    setCurrentUser(data);
  };

  useEffect(() => {
    getCurrentUser();
    if (isTeacher) getMemberSubmissions();
  }, []);

  useEffect(() => {
    const listener = async ({review, score}) => {
      console.log(score);
      const submission = {
        ...selectedReview,
        review: review,
        score: score,
      };

      const submissions = assignment.submissions || [];
      const index = submissions.findIndex(
        sub => sub.userId === submission.userId,
      );

      if (index !== -1) {
        submissions[index] = submission;
      }

      setSubmissions(submissions);

      await Api.updateAsignment({submissions}, assignment.id);
    };
    eventEmitter.on('addReviewByTeacher2', listener);

    return () => {
      eventEmitter.removeListener('addReviewByTeacher2', listener);
    };
  }, []);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.video,
          DocumentPicker.types.images,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
        ],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      setSubmissionFiles([...submissionFiles, res[0]]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.log('Something went wrong', err);
      }
    }
  };

  const sendFileToNodejs = async (dataFile, type) => {
    let title = '';
    let url = uploadfile.upImage;
    if (dataFile.sign == 'filePDF') {
      title = 'pdf';
      url = uploadfile.upPdf;
    } else if (dataFile.sign == 'fileWord') {
      title = 'doc';
      url = uploadfile.updoc;
    } else if (dataFile.sign == 'filePPT') {
      title = 'ppt';
      url = uploadfile.upslide;
    } else if (dataFile.sign == 'fileImage') {
      title = 'image';
      url = uploadfile.upImage;
    } else if (dataFile.sign == 'fileMp4') {
      title = 'video';
      url = uploadfile.upVideo;
    }
    const formData = new FormData();
    formData.append(title, {
      uri: dataFile.Link,
      name: dataFile.Name,
      type: type,
    });

    const config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    const response = await axios(config);

    if (dataFile.sign == 'filePDF') {
      return response.data.filepdf;
    } else if (dataFile.sign == 'fileWord') {
      return response.data.filedoc;
    } else if (dataFile.sign == 'filePPT') {
      return response.data.fileppt;
    } else if (dataFile.sign == 'fileImage') {
      return response.data.photo;
    } else if (dataFile.sign == 'fileMp4') {
      return response.data.video;
    }
  };

  const getTime = string => {
    const date = new Date(string);
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const time = timeFormatter?.format(date);
    return time;
  };

  const getDate = string => {
    const date = new Date(string);
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const formattedDate = dateFormatter?.format(date);
    return formattedDate;
  };

  const onSubmit = async () => {
    console.log(submissionFiles);
    if (submissionFiles.length === 0) {
      Alert.alert(
        'File Missing',
        'You cannot submit your assignment because no files are attached. Please attach at least one file and try again.',
      );
      return;
    }

    let files = [];

    for (let file of submissionFiles) {
      let data = {
        Name: file.name,
        sign: 'filePDF',
        Link: file.fileCopyUri,
      };
      if (file.type == 'application/pdf') {
        data.sign = 'filePDF';
      } else if (
        file.type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        data.sign = 'fileWord';
      } else if (
        file.type ==
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ) {
        data.sign = 'filePPT';
      } else if (file.type == 'image/jpeg') {
        data.sign = 'fileImage';
      } else if (file.type == 'video/mp4') {
        data.sign = 'fileMp4';
      }

      const newLink = await sendFileToNodejs(data, file.type);
      data.Link = newLink.substring(8);
      console.log(newLink);
      files.push(data);
    }

    const submission = {
      userId: user.uid,
      userName: currentUser.name,
      userImg: currentUser.userImg,
      submitedTime: new Date(),
      submissionFiles: files,
    };

    const submissions = assignment.submissions || [];
    const index = submissions.findIndex(
      sub => sub.userId === submission.userId,
    );

    if (index !== -1) {
      submissions[index] = submission;
    } else {
      submissions.push(submission);
    }

    await Api.updateAsignment({submissions}, assignment.id);

    setSubmitted(true);
  };

  const TableRow = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image
            style={styles.UserImage}
            source={{
              uri: item.userImg
                ? item.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
          <Text style={{color: '#444', fontSize: 15}}>{item.userName}</Text>
        </View>
        <Text style={styles.cell}>
          {getTime(item.submitedTime)} {getDate(item.submitedTime)}
        </Text>
        <Text style={[styles.cell, {flex: 0.5}]}>
          {assignment.point
            ? item.score
              ? item.score + '/' + assignment.point
              : '_/' + assignment.point
            : 'None'}
        </Text>
        <Text
          onPress={() => {
            setSelectedReview(item);
            navigation.navigate('ReviewAsignment', {
              submission: item,
            });
          }}
          style={[
            styles.cell,
            {color: 'blue', textDecorationLine: 'underline', flex: 0.5},
          ]}>
          Review
        </Text>
      </View>
    );
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
          <Text style={styles.headerText}>{assignment.className}</Text>
          <Text style={styles.headerText2}>Asignment</Text>
        </View>
        <View style={{flex: 1}} />
        {!isTeacher && !isPastDue && (
          <Text style={styles.SubmitText} onPress={onSubmit}>
            {isSubmitted ? 'Update' : 'Submit'}
          </Text>
        )}
        <View style={{flex: 1}} />
        {isTeacher && (
          <Text
            onPress={() => navigation.navigate('CreateAsignment', {assignment})}
            style={[
              styles.SubmitText,
              {textDecorationLine: 'underline', marginRight: 10},
            ]}>
            Edit
          </Text>
        )}
      </View>
      <ScrollView style={styles.ContentContainer}>
        <Text style={styles.ATitleText}>{assignment.title}</Text>
        <Text style={styles.DueText}>
          Due at: {getTime(assignment.dueTime)} {getDate(assignment.dueDate)}
        </Text>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instructions: </Text>
        <Text style={styles.ContentText}>{assignment.instruction}</Text>
        <FlatList
          data={assignment.resourceFiles}
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
        {!isTeacher && (
          <>
            <View
              style={{
                backgroundColor: isSubmitted ? '#DCFFA7' : '#FFFBC4',
                marginVertical: 10,
                padding: 5,
              }}>
              <Text style={styles.KeyText}>Submisstion Status: </Text>
              <Text style={styles.ContentText}>
                {isSubmitted ? 'Already submitted' : `Haven't submitted`}
              </Text>
            </View>
            <Text style={styles.KeyText}>Your work: </Text>
            <TouchableOpacity onPress={pickFile}>
              <View style={{flexDirection: 'row'}}>
                <IonIcon name="attach-outline" color={'blue'} size={22} />
                <Text style={[styles.UnderlineText]}>Attach files</Text>
              </View>
            </TouchableOpacity>

            <FlatList
              data={submissionFiles}
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
                } else
                  return (
                    <FileItem
                      item={item}
                      onDelete={() => {
                        const updatedFiles = submissionFiles.filter(
                          file => file != item,
                        );
                        setSubmissionFiles(updatedFiles);
                      }}
                    />
                  );
              }}
            />
          </>
        )}

        <Text style={styles.KeyText}>Points: </Text>
        <Text style={styles.ContentText}>
          {assignment.point ? assignment.point : 'No'} points
        </Text>

        <Text style={[styles.KeyText, {marginTop: 10}]}>Comments: </Text>
        {isTeacher ? (
          <Text style={styles.UnderlineText} onPress={() => console.log(1)}>
            See and post your comment here.
          </Text>
        ) : (
          <Text
            style={styles.UnderlineText}
            onPress={() => {
              const submissions = assignment.submissions || [];
              const submission = submissions.find(
                sub => sub.userId === user.uid,
              );
              navigation.navigate('ReviewAsignment', {
                submission: submission,
              });
            }}>
            See teacher's review here.
          </Text>
        )}

        {isTeacher && (
          <View>
            <Text style={[styles.KeyText, {marginVertical: 10}]}>
              Submissions:
            </Text>
            <View style={styles.headerRow}>
              <Text style={[styles.cell, {fontWeight: 'bold'}]}>Member</Text>
              <Text style={[styles.cell, {fontWeight: 'bold'}]}>
                Submit Time
              </Text>
              <Text style={[styles.cell, {flex: 0.5, fontWeight: 'bold'}]}>
                Points
              </Text>
              <Text style={[styles.cell, {flex: 0.5, fontWeight: 'bold'}]}>
                Review
              </Text>
            </View>

            <FlatList
              data={submissions}
              renderItem={({item, index}) => <TableRow item={item} />}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AsignmentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContentContainer: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  headerText2: {
    color: 'white',
    fontSize: 15,
    marginLeft: 15,
  },
  ATitleText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 10,
  },
  DueText: {
    color: '#444',
    fontSize: 15,
    fontWeight: '500',
  },
  KeyText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  ContentText: {
    color: '#222',
    fontSize: 17,
    fontWeight: '400',
  },
  UnderlineText: {
    color: 'blue',
    fontSize: 17,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  SubmitText: {
    color: 'white',
    marginRight: 10,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },

  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    padding: 5,
    color: '#444',
    fontSize: 15,
  },
  UserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
