import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import AppStyle from '../theme';
import {PRIMARY_COLOR} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState, useContext, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import ClassCard from '../ComponentTeam/ClassCard';
import {AuthContext} from '../navigation/AuthProvider';
import Api from '../api/Api';

const BeforeNewAsignment = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [ATypeItems, setATypeItems] = useState([
    {label: 'Upload Asignment', value: 'upload'},
    {label: 'Online Asignment', value: 'online'},
  ]);
  const [asignmentType, setAsignmentType] = useState(
    ATypeItems.length > 0 ? ATypeItems[0].value : null,
  );
  const [classes, setClasses] = useState([]);
  const {user, isTeacher} = useContext(AuthContext);

  useEffect(() => {
    getClassesByUserTeacher().then(() => setIsLoading(true));
  }, []);

  const getClassesByUserTeacher = async () => {
    const data = await Api.getClassesByUser(user.uid);
    setClasses(data);
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
          <Text style={styles.headerText}>Create New Asignment</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 5}}>
        <Text style={[styles.KeyText, {marginTop: 10}]}>
          Choose type of asignment:{' '}
        </Text>
        <DropDownPicker
          open={open}
          value={asignmentType}
          items={ATypeItems}
          setOpen={setOpen}
          setValue={setAsignmentType}
          setItems={setATypeItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.label}
          selectedItemLabelStyle={styles.selectedLabel}
          listItemLabelStyle={styles.listItemLabel}
          arrowIconStyle={styles.arrowIcon}
          tickIconStyle={styles.tickIcon}
        />
        <Text style={[styles.KeyText, {marginTop: 10}]}>Asign to class: </Text>
        {classes.length !== 0 && (
          <FlatList
            data={classes}
            renderItem={({item, index}) => (
              <ClassCard
                key={index}
                item={item}
                navigation={navigation}
                fromAsignment={asignmentType}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BeforeNewAsignment;

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
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginVertical: 10,
  },
  dropdownContainer: {
    borderColor: 'gray',
  },
  label: {
    color: '#444',
    fontSize: 16,
  },
  selectedLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItemLabel: {
    color: 'black',
    fontSize: 16,
  },
  arrowIcon: {
    tintColor: PRIMARY_COLOR,
  },
  tickIcon: {
    tintColor: PRIMARY_COLOR,
  },
});
