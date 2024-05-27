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
    Alert
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import AppStyle from '../theme'
  import socketServices from '../api/socketService';
  import DocumentPicker from 'react-native-document-picker';
  import Api from '../api/Api';
import axios from 'axios';
import uploadfile from '../api/uploadfile';
import FileCard from '../ComponentTeam/FileCard';
import FolderCard from '../ComponentTeam/FolderCard';
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const {width, height} = Dimensions.get('window');
  const OpenFolder = ({navigation, route}) => {
    const {folderInfo} = route.params
    const [fileandfolder, setFileandFolder] = useState([])
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

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
  useEffect(() => {
    socketServices.initializeSocket()
    getFiles()
  }, []);
  const getFiles = async()=>{
    socketServices.on('getFilesinFolder',(data) => {
      if(data.Id==folderInfo.idFolder){
        setFileandFolder(data.Files)
      }
    });
  }
  const sendFileToNodejs = async(dataFile, type)=>{
    let title = ''
    let url = uploadfile.upImage
    if(dataFile.sign == 'filePDF' )
      {
        title = 'pdf';
        url = uploadfile.upPdf
      }
      else if(dataFile.sign == 'fileWord' )
        {
          title = 'doc'
          url = uploadfile.updoc
        }
        else if(dataFile.sign == 'filePPT' )
          {
            title = 'ppt'
            url = uploadfile.upslide
          }
          else if(dataFile.sign == 'fileImage' )
            {
              title = 'image';
              url = uploadfile.upImage
            }
            else if(dataFile.sign == "fileMp4" )
              {
                title = 'video';
                url = uploadfile.upvideo2
              }
    const formData = new FormData();
          formData.append(title, {
            uri: dataFile.Link,
            name: dataFile.Name,
            type: type,
          });
          console.log(url)
          const config = {
            method: 'post',
            url: url,
            headers: { 
              'Content-Type': 'multipart/form-data'
            },
            data : formData
          };
          
          const response = await  axios(config)
          if(dataFile.sign == 'filePDF' )
            {
              return response.data.filepdf
            }
            else if(dataFile.sign == 'fileWord' )
              {
                return response.data.filedoc
              }
              else if(dataFile.sign == 'filePPT' )
                {
                  return response.data.fileppt
                }
                else if(dataFile.sign == 'fileImage' )
                  {
                    return response.data.photo
                  }
                  else if(dataFile.sign == "fileMp4" )
                    {
                      return response.data.video
                    }
  }
  const getTime=()=>{
    const currentDate = new Date()
    const currentDay = currentDate.getDate(); 
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 
    const currentHours = currentDate.getHours(); 
    const currentMinutes = currentDate.getMinutes();
    return currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
  }
  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf,DocumentPicker.types.doc,DocumentPicker.types.docx,DocumentPicker.types.video,DocumentPicker.types.images,DocumentPicker.types.ppt,DocumentPicker.types.pptx],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });
      console.log(res);
      let data = {
        User: folderInfo?.User,
        Time: getTime(),
        Name: res[0].name,
        sign: 'filePDF',
        Link:res[0].fileCopyUri
      };
      if(res[0].type=="application/pdf"){
        data.sign= 'filePDF'
      }
      else if(res[0].type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
         data.sign = 'fileWord'
      }
      else if(res[0].type=="application/vnd.openxmlformats-officedocument.presentationml.presentation"){
        data.sign = 'filePPT'
     }
     else if(res[0].type=="image/jpeg"){
      data.sign = 'fileImage'
     }
     else if(res[0].type=="video/mp4"){
      data.sign = "fileMp4" 
    }
   const newLink = await sendFileToNodejs(data,res[0].type)
   data.Link = newLink.substring(8);
   console.log(newLink)
   //gọi api gửi lên firestore
   await Api.updateFolder(data,folderInfo.idFolder); 
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.log('Something went wrong', err);
      }
    }
  };
 
    return (
      <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
             {folderInfo.Name}
          </Text>
          <View style={{flex:1}}/>
        <TouchableOpacity style={{marginRight: '5%'}} onPress={()=> {handleFilePicker()}}>
          <Icon name={'upload'} color="white" size={20} />
        </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
            <FlatList
            data={fileandfolder}
            renderItem={({item, index}) => {
              if (item.sign == 'fileImage' || item.sign == 'fileMp4' || item.sign == 'filePPT' || item.sign == 'fileWord' || item.sign == 'filePDF') {
                return <FileCard record={item} />;
              } else if (item.sign == 'folder') {
                return <FolderCard record={item} />;
              }
            }}
          />
            {/* {createFolder&&<CreateFolder close={()=>setCreateFolder(false)} teacherName={profileData?.name} classId={classId}/>} */}
          {/* </ScrollView> */}
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
        alignSelf:'center'
      },
  });
  export default OpenFolder;
  