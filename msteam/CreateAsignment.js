import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import FileItem from '../ComponentTeam/FileItem';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {create} from 'react-test-renderer';
import Api from '../api/Api';
import uploadfile from '../api/uploadfile';
import axios from 'axios';

const CreateAsignment = ({navigation, route}) => {
  const {assignment} = route.params;
  const [title, setTitle] = useState(assignment && assignment.title);
  const [instruction, setInstruction] = useState(
    assignment && assignment.instruction,
  );
  const [point, setPoint] = useState(assignment && assignment.point);
  const [resourceFiles, setResourceFiles] = useState(
    (assignment && assignment.resourceFiles) || [],
  );
  const [dueDate, setDueDate] = useState(
    assignment && formatDate(assignment.dueDate),
  );
  const [dueTime, setDueTime] = useState(
    assignment && formatTime(assignment.dueTime),
  );
  const [checked, setCheck] = useState(
    (assignment && assignment.lateAllow) || false,
  );
  const [date, setDate] = useState(
    (assignment && assignment.dueDate) || new Date(),
  );
  const [time, setTime] = useState(
    (assignment && assignment.dueTime) || new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [assignToItems, setAsignToItems] = useState([
    {label: 'All members', value: 'all'},
  ]);
  const [assignTo, setAsignTo] = useState(
    assignToItems.length > 0 ? assignToItems[0].value : null,
  );

  const [openAssignPicker, setOpenAssignPicker] = useState(false);

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
      setResourceFiles([...resourceFiles, res[0]]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.log('Something went wrong', err);
      }
    }
  };

  const onDatePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDueDate(formatDate(currentDate));
  };

  const onTimePickerChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    setDueTime(formatTime(currentTime));
  };

  function formatDate(date) {
    if (!date) return;
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  function formatTime(time) {
    if (!time) return;
    const dateObject = new Date(time);
    const formattedTime = `${dateObject.getHours()}:${String(
      dateObject.getMinutes(),
    ).padStart(2, '0')}`;
    return formattedTime;
  }

  const onSaveAsignment = async () => {
    if (assignment) return;

    let files = [];

    for (let file of resourceFiles) {
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

      console.log(1);

      const newLink = await sendFileToNodejs(data, file.type);
      console.log(2);
      data.Link = newLink.substring(8);
      console.log(newLink);
      files.push(data);
    }

    const asignment = {
      classId: route.params.classId,
      className: route.params.className,
      title: title,
      instruction: instruction,
      point: point,
      dueDate: date,
      dueTime: time,
      lateAllow: checked,
      createdAt: new Date(),
      resourceFiles: files,
      type: 1,
    };
    console.log(asignment);

    const res = await Api.addAsignment(asignment);
    if (res) {
      navigation.replace('Asignment');
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
    console.log(url);
    const config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    const response = await axios(config);
    console.log(response);
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

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>
            {assignment ? 'Update Assignment' : 'Create New Assignment'}
          </Text>
        </View>
        <View style={{flex: 1}} />
        <Text style={styles.SaveText} onPress={onSaveAsignment}>
          Save
        </Text>
      </View>
      <View style={{paddingHorizontal: 5}}>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Title*: </Text>
        <TextInput
          multiline={true}
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={title}
          onChangeText={txt => setTitle(txt)}
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Instructions: </Text>
        <TextInput
          multiline={true}
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={instruction}
          onChangeText={txt => setInstruction(txt)}
        />
        <TouchableOpacity onPress={pickFile}>
          <View style={{flexDirection: 'row'}}>
            <IonIcon name="attach-outline" color={'#555'} size={22} />
            <Text style={[styles.SecondaryText, {color: '#555'}]}>
              Attach files
            </Text>
          </View>
        </TouchableOpacity>
        {resourceFiles.length !== 0 &&
          resourceFiles.map(file => (
            <FileItem
              item={file}
              onDelete={() => {
                const updatedFiles = resourceFiles.filter(item => item != file);
                setResourceFiles(updatedFiles);
              }}
            />
          ))}
        <Text style={[styles.KeyText, {marginTop: 10}]}>Points: </Text>
        <TextInput
          style={[styles.Input]}
          keyboardType="numeric"
          placeholderTextColor={'#555'}
          width={'96%'}
          value={point}
          onChangeText={txt => setPoint(txt)}
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Assign To: </Text>
        <DropDownPicker
          open={openAssignPicker}
          value={assignTo}
          items={assignToItems}
          setOpen={setOpenAssignPicker}
          setValue={setAsignTo}
          setItems={setAsignToItems}
          style={styles.Input}
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.label}
          selectedItemLabelStyle={styles.selectedLabel}
          listItemLabelStyle={styles.listItemLabel}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '55%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Date*: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{dueDate}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <IonIcon name="calendar-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '44%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Time*: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text style={{color: '#555'}}>{dueTime}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <IonIcon name="time-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onDatePickerChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onTimePickerChange}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={[styles.KeyText, {marginTop: 10}]}>
            Allow late submission:{' '}
          </Text>
          <CheckBox
            style={{backgroundColor: '#f0f0f0', marginTop: 5}}
            value={checked}
            onValueChange={checked => setCheck(checked)}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateAsignment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  KeyText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
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
    color: '#333',
  },
  RowDirectionContainer: {
    flexDirection: 'row',
  },
  SecondaryText: {
    color: '#000',
    fontSize: 15,
  },
  IconWrapper: {
    marginHorizontal: 5,
    color: '#154D00',
    fontSize: 17,
    alignSelf: 'center',
  },
  IconInput: {
    fontWeight: '700',
    marginLeft: 10,
    padding: 10,
    flexDirection: 'row',
  },
  SaveText: {
    color: 'white',
    marginRight: 10,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
});
