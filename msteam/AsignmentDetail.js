import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
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

const AsignmentDetail = ({navigation, route}) => {
  const {user, isTeacher} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const {assignment} = route.params;
  const [submissionFiles, setSubmissionFiles] = useState(
    route.params.submissionFiles,
  );
  const [isPastDue, setPastDue] = useState(route.params?.isPastDue);
  const [isSubmitted, setSubmitted] = useState(route.params?.isSubmitted);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await Api.getUserData(user.uid);
      setCurrentUser(data);
    };

    getCurrentUser();
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

    await Api.updateAsignment(submissions, assignment.id);

    setSubmitted(true);
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
        <Text style={styles.UnderlineText} onPress={() => console.log(1)}>
          See and post your comment here.
        </Text>
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
});
