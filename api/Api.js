import client from './client';
import auth from '@react-native-firebase/auth';

const getVocabLesson = async () => {
  try {
    const response = await client.get('/VocabLessons');
    if (response.data.success) {
      return response.data.vocablesson;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const getVocabinLesson = async TopicId => {
  const endpoint = '/VocabinLesson/' + TopicId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.vocabs;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const getVocabs = async () => {
  try {
    const response = await client.get('/Vocabs');
    if (response.data.success) {
      return response.data.vocabs;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const setAlarmVocab = async (userId, vocabAlarms) => {
  const endpoint = '/alarmVocab/' + userId;
  try {
    const response = await client.post(endpoint, vocabAlarms);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getAlarmVocab = async () => {
  const endpoint = '/getAlarmVocab/' + auth().currentUser.uid;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.vocabAlarm;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const updateAlarmVocab = async vocabAlarms => {
  const endpoint = '/updateAlarmVocab/' + auth().currentUser.uid;
  try {
    const response = await client.put(endpoint, vocabAlarms);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const setUserInfo = async userData => {
  const endpoint = '/setUserInfo/' + userData.id;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const setTeacherInfo = async userData => {
  console.log('setteacherinfoId' + userData.id);
  const endpoint = '/setTeacherInfo/' + userData.id;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updateUser = async userData => {
  const endpoint = '/updateUser/' + userData.id;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updateUserPrivate = async userData => {
  const endpoint = '/updateUserPrivate/' + auth().currentUser.uid;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getAllUsers = async () => {
  try {
    const response = await client.get('/Users');
    if (response.data.success) {
      return response.data.users;
    } else {
      console.log('not get users');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const getUserData = async userId => {
  const endpoint = '/UserData/' + userId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.userData;
    } else {
      console.log('not get user data');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return 0;
  }
};
const uploadAudio = async audioData => {
  const userId = auth().currentUser.uid;
  try {
    const response = await client.post('/uploadAudio', {userId, audioData});
    if (response.data.success) {
      return response.data.downloadUrl;
    } else {
      console.log('upload audio failed');
    }
  } catch (error) {
    console.error('Error uploading audio:', error);
    console.log('error: ', error.message);
  }
};
const uploadPracticeHistory = async data => {
  try {
    const response = await client.post('/uploadPracticeHistory', data);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getQuestion = async (number, part) => {
  const endpoint =
    '/Question/' + part + '/' + auth().currentUser.uid + '/' + number;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.Questions;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const pushPracticeHistory = async (data, sign) => {
  try {
    const response = await client.post(
      '/PracticeHistory/' + auth().currentUser.uid + '/' + sign,
      data,
    );
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getOneQuestion = async (part, id) => {
  const endpoint = '/oneQuestion/' + part + '/' + id;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.question;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return {};
  }
};

const addPracticePlan = async (currentLevel, targetLevel, practiceDays) => {
  try {
    const endpoint = '/PracticePlan/' + auth().currentUser.uid + '/add';
    const response = await client.post(endpoint, {
      currentLevel,
      targetLevel,
      practiceDays,
    });
    if (response.data.success) {
      return 'Success';
    } else return 'Failed';
  } catch (error) {
    console.log('error: ', error.message);
    return 'Error';
  }
};

const getPracticePlan = async userId => {
  const endpoint = '/PracticePlan/' + userId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.PracticePlan;
    } else {
      console.log(response.data.message);
      return null;
    }
  } catch (error) {
    console.log('error: ', error.message);
    return null;
  }
};

const updatePracticePlan = async data => {
  const endpoint = '/PracticePlan/' + auth().currentUser.uid + '/update';
  try {
    const response = await client.put(endpoint, data);
    console.log(response.data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const addPost = async data => {
  try {
    const response = await client.post('/addPost', data);
    return response.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updatePost = async (id, data) => {
  const endpoint = '/updatePost/' + id;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error('error: ', error.message);
  }
};
const addComment = async (data, sign, momId) => {
  try {
    const response = await client.post(
      '/addComment/' + sign + '/' + momId,
      data,
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getOneComment = async commentId => {
  const endpoint = '/getoneComment/' + commentId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.comment;
    } else {
      console.log('not get comment');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return {};
  }
};
const addNotification = async data => {
  try {
    const response = await client.post('/addNotification', data);
    return response.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const deleteNotification = async id => {
  try {
    await client.delete('/deleteNoti/' + id);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updateNotification = async (id, data) => {
  const endpoint = '/updateNoti/' + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error('error: ', error.message);
  }
};
// router.get('/filterOnlyhashtag/:hashtag',filterOnlyhashtag)
// router.get('/filterOnlyPost/:userId/:type',filterOnlyPost)
// router.get('/filterBoth/:userId/:type/:hashtag',filterBoth)
const filterOnlyhashtag = async hashtag => {
  const endpoint = '/filterOnlyhashtag/' + hashtag;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.posts;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const filterOnlyPost = async (userId, type) => {
  const endpoint = '/filterOnlyPost/' + userId + '/' + type;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.posts;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const filterBoth = async (userId, type, hashtag) => {
  const endpoint = '/filterBoth/' + userId + '/' + type + '/' + hashtag;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.posts;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
// router.put('/savePost/:userId/:postId', pushSavedPost)
// router.get('/getsavePost/:userId',getSavedPost)
// router.delete('/deletePost/:postId',deletePost)
const savePost = async postId => {
  try {
    await client.put('/savePost/' + auth().currentUser.uid + '/' + postId);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getsavePost = async () => {
  const endpoint = '/getsavePost/' + auth().currentUser.uid;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.SavedPost;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const deletePost = async id => {
  try {
    await client.delete('/deletePost/' + id);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getAllTest = async () => {
  try {
    const response = await client.get('/Tests');
    if (response.data.success) {
      return response.data.tests;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const uploadTestHistory = async data => {
  data.UserId = auth().currentUser.uid;
  const endpoint = '/Test/TestHistory/' + auth().currentUser.uid + '/upload';
  try {
    const response = await client.post(endpoint, data);
    console.log(response.data.message);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getReviewQuestion = async data => {
  try {
    const response = await client.post('/ReviewQuestion', data);
    return response.data.questionL;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getSavedQuestion = async () => {
  const endpoint = '/getSavedQuestion/' + auth().currentUser.uid;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.savedQuestion;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const updateSavedQuestion = async data => {
  const endpoint = '/updateSavedQuestion/' + auth().currentUser.uid;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const getRecordings = async classId => {
  const endpoint = '/Meeting/getRecordings/' + classId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.recordings;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};

const initiateCall = async ({callerInfo, calleeInfo, videoSDKInfo}) => {
  try {
    const response = await client.post('/Chat/initiateCall', {
      callerInfo,
      calleeInfo,
      videoSDKInfo,
    });

    console.log('RESP', response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

const updateCallStatus = async ({callerInfo, type}) => {
  try {
    const response = await client.post('/Chat/updateCall', {
      callerInfo,
      type,
    });
    console.log('##RESP', response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

const getUserChatRooms = async userId => {
  const endpoint = '/ChatRoom/getUserChatRoom/' + userId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.list;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return {};
  }
};

const addNewChat = async data => {
  try {
    const response = await client.post('/ChatRoom/add', data);
    return response.data.id;
  } catch (error) {
    console.log('error: ', error.message);
    return null;
  }
};

const getChatRoomData = async id => {
  try {
    const response = await client.get(`/ChatRoom/${id}`);
    return response.data.chatData;
  } catch (error) {
    console.log('error: ', error.message);
    return null;
  }
};

const updateChatRoom = async (data, id) => {
  try {
    await client.put('/ChatRoom/update/' + id, data);
  } catch (error) {
    console.error('Error', error);
  }
};

const addClass = async data => {
  try {
    await client.post('/Class/add', data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};

const getAllClasses = async () => {
  try {
    const response = await client.get('/Classes');
    if (response.data.success) {
      return response.data.classes;
    } else {
      console.log('not get classes');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};

const getClassesByUser = async userId => {
  try {
    const response = await client.get('/Classes/' + userId);
    if (response.data.success) {
      return response.data.classes;
    } else {
      console.log('not get classes');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};

const registerCourse = async data => {
  try {
    await client.post('/Class/register', data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};

const getAllTeachers = async () => {
  try {
    const response = await client.get('/Teachers');
    if (response.data.success) {
      return response.data.teachers;
    } else {
      console.log('not get classes');
    }
  } catch (error) {
    console.log('error: ', error.message);
  }
};

const getTeachersOfClasses = async userId => {
  try {
    const response = await client.get('/Teachers/' + userId);
    if (response.data.success) {
      return response.data.teachers;
    } else {
      console.log('not get teachers');
    }
  } catch (error) {
    console.log('error: ', error.message);
  }
};

// router.get('/Agenda/getAgendaOfUser/:userId',getAgendaOfUser)
const getAgendaOfUser = async userId => {
  const endpoint = '/Agenda/getAgendaOfUser/' + userId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.list;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
// router.get('/Meeting/getRangeDate/:classId',getRangeDate)
const getRangeDate = async classId => {
  const endpoint = '/Meeting/getRangeDate/' + classId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.RangeDate;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const addReview = async data => {
  try {
    await client.put('/addReview/' + data.id, data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updateReview = async data => {
  try {
    await client.put('/updateReview/' + data.id, data);
  } catch (error) {
    console.log('error: ', error.message);
  }
};
const updateFile = async (data, classId) => {
  try {
    await client.put('/updateFile/' + classId, data);
  } catch (error) {
    console.error('Error', error);
  }
};
const addFolder = async data => {
  try {
    const response = await client.post('/CreateFolder/add', data);
    return response.data.Id;
  } catch (error) {
    console.log('error: ', error.message);
  }
};

const updateFolder = async (data, folderId) => {
  try {
    await client.put('/updateFolder/' + folderId, data);
  } catch (error) {
    console.error('Error', error);
  }
};

const addAsignment = async data => {
  try {
    const response = await client.post('/Asignment/add', data);
    return response.data.id;
  } catch (error) {
    console.log('error: ', error.message);
    return null;
  }
};

const getClassAsignments = async classIds => {
  try {
    const response = await client.get('/getClassAsignment', {
      params: {classIds},
    });
    if (response.data.success) {
      return response.data.list;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};

// router.get("/getTestTeacher", getTestTeacher);
const getTestTeacher = async () => {
  const endpoint = '/getTestTeacher';
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.tests;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
const getAsignmentData = async id => {
  try {
    const response = await client.get(`/Asignment/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('error: ', error.message);
    return null;
  }
};

const updateAsignment = async (data, id) => {
  try {
    await client.put('/Asignment/update/' + id, data);
  } catch (error) {
    console.error('Error', error);
  }
};
const getAllQuestion = async part => {
  try {
    const response = await client.get('/getAllQuestion/' + part);
    if (response.data.success) {
      return response.data.Questions;
    } else {
      console.log('not get');
    }
  } catch (error) {
    console.log('error: ', error.message);
    return [];
  }
};
// router.get("/Transaction/:userId/:classId", checkTransaction);
const checkTransaction = async (userId, classId) => {
  const endpoint = '/Transaction/' + userId + '/' + classId;
  try {
    const response = await client.get(endpoint);
    return response.data.pay;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
export default {
  getVocabLesson,
  getVocabinLesson,
  getVocabs,
  getAlarmVocab,
  setAlarmVocab,
  updateAlarmVocab,
  setUserInfo,
  updateUser,
  getAllUsers,
  getUserData,
  uploadAudio,
  uploadPracticeHistory,
  getQuestion,
  pushPracticeHistory,
  getOneQuestion,
  addPracticePlan,
  getPracticePlan,
  updatePracticePlan,
  addPost,
  updatePost,
  addComment,
  getOneComment,
  addNotification,
  deleteNotification,
  updateNotification,
  filterBoth,
  filterOnlyPost,
  filterOnlyhashtag,
  updateUserPrivate,
  savePost,
  getsavePost,
  deletePost,
  getAllTest,
  uploadTestHistory,
  getReviewQuestion,
  getSavedQuestion,
  updateSavedQuestion,
  getRecordings,
  initiateCall,
  updateCallStatus,
  getUserChatRooms,
  getChatRoomData,
  updateChatRoom,
  addNewChat,
  addClass,
  getAllClasses,
  getClassesByUser,
  registerCourse,
  getAllTeachers,
  getTeachersOfClasses,
  getAgendaOfUser,
  getRangeDate,
  addReview,
  updateReview,
  setTeacherInfo,
  updateFile,
  addFolder,
  updateFolder,
  getClassAsignments,
  getAsignmentData,
  updateAsignment,
  addAsignment,
  getAllQuestion,
  getTestTeacher,
  checkTransaction,
};
