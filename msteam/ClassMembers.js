import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserItem from '../ComponentTeam/UserItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ClassMembers = ({navigation}) => {
  const [teacher, setTeacher] = useState({
    name: 'Mai Hoàng Bảo',
    avatar:
      'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
  });
  const [students, setStudents] = useState([
    {
      name: 'Mai Hoàng Bảo',
      avatar:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
    },
    {
      name: 'Mai Hoàng Bảo',
      avatar:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
    },
    {
      name: 'Mai Hoàng Bảo',
      avatar:
        'https://tse4.mm.bing.net/th?id=OIP.0W2heCtOqQ7YgOhGPnYdEwHaFL&pid=Api&P=0&h=220',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Class Members</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter name..."
            placeholderTextColor={'#555'}
            // onChangeText={text => {
            //   setContent(text)
            // }}
          />
          <TouchableOpacity>
            <Ionicons name={'search-outline'} style={styles.IconButton} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textstyle}>--- Teacher ---</Text>
        <UserItem item={teacher} />
        <Text style={styles.textstyle}>--- {students.length} Students ---</Text>
        {students.map((item, index) => {
          return <UserItem item={item} />;
        })}
      </View>
    </View>
  );
};

export default ClassMembers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    display: 'flex',
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
    maxWidth: '50%',
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textstyle: {
    color: '#666',
    fontSize: 16,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#DDD',
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    alignSelf: 'center',
  },
  input: {
    fontSize: 16,
    width: '88%',
  },
  IconButton: {
    color: '#999',
    fontSize: 25,
    padding: 5,
    marginTop: 4,

  },
});
