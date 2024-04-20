import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import FormButton from '../components/FormButton';
import AppStyle from '../theme';
import moment from 'moment';

const NewTeam = ({route, navigation}) => {
  const [className, setClassName] = useState('');
  const [maximumStudents, setMaximumStudents] = useState('');
  const [level, setLevel] = useState('');
  const [tuition, setTuition] = useState('');
  const [tuitionList, setTuitionList] = useState([
    {
      label: 'Tuition: 2.000.000 đ',
      value: 2000000,
    },
    {
      label: 'Tuition: 2.500.000 đ',
      value: 2500000,
    },
    {
      label: 'Tuition: 3.000.000 đ',
      value: 3000000,
    },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  const handleStartDate = date => {
    hideDatePicker();
    setStartDate(date);
  };

  const handleEndDate = date => {
    hideDatePicker();
    setEndDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Create a new class</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.action}>
          <TextInput
            placeholder={'Class name'}
            placeholderTextColor={'#555'}
            value={className}
            onChangeText={value => setClassName(value)}
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder={'Maximum students of the class'}
            placeholderTextColor={'#555'}
            value={maximumStudents}
            onChangeText={value => setMaximumStudents(value)}
            autoCorrect={false}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder={'Level (Ex: 550)'}
            placeholderTextColor={'#555'}
            value={level}
            onChangeText={value => setLevel(value)}
            autoCorrect={false}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.action, {zIndex: 1}]}>
          <DropDownPicker
            placeholder="Select a tuition"
            items={tuitionList}
            open={openDropdown}
            setOpen={() => setOpenDropdown(!openDropdown)}
            value={tuition}
            containerStyle={{
              width: '95%',
            }}
            style={{
              borderWidth: 0,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setTuition(item)}
            maxHeight={100}
          />
        </View>

        <TouchableOpacity style={styles.action} onPress={showDatePicker}>
          <Text style={[styles.input, {paddingTop: 8}]}>
            {moment(startDate).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          date={startDate}
          onConfirm={handleStartDate}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity style={styles.action} onPress={showDatePicker}>
          <Text style={[styles.input, {paddingTop: 8}]}>
            {moment(endDate).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          date={endDate}
          onConfirm={handleEndDate}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={{width: '40%', alignSelf: 'center'}}>
        <FormButton title={'Create'} onPress={() => navigation.push('Teams')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  action: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  input: {
    color: '#333',
    paddingLeft: 10,
    fontSize: 15,
    color: '#555',
    height: 40,
  },
});

export default NewTeam;
