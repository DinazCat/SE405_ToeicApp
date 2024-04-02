import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

const CreateAsignment = ({navigation}) => {
  const [title, setTitle] = useState();
  const [instruction, setInstruction] = useState();
  const [point, setPoint] = useState();
  const [resourceFiles, setResourceFiles] = useState();
  const [assignTo, setAsignTo] = useState();
  const [dueDate, setDueDate] = useState();
  const [dueTime, setDueTime] = useState();
  const [checked, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Create New Asignment</Text>
        </View>
        <View style={{flex: 1}} />
        <Text style={styles.SaveText}>Save</Text>
      </View>
      <View style={{paddingHorizontal: 5}}>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Title: </Text>
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
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <IonIcon name="attach-outline" color={'#555'} size={22} />
            <Text style={[styles.SecondaryText, {color: '#555'}]}>
              Attach files
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.KeyText, {marginTop: 10}]}>Points: </Text>
        <TextInput
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={point}
          onChangeText={txt => setPoint(txt)}
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Assign To: </Text>
        <TextInput
          style={[styles.Input]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={assignTo}
          onChangeText={txt => setAsignTo(txt)}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '55%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Date: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text>{dueDate}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity>
                <IonIcon name="calendar-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '44%'}}>
            <Text style={[styles.KeyText, {marginTop: 10}]}>Due Time: </Text>
            <View
              style={[styles.Input, styles.IconInput]}
              placeholderTextColor={'#555'}
              width={'96%'}>
              <Text>{dueTime}</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity>
                <IonIcon name="time-outline" color={'#555'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
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
  },
});
