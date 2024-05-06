import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AppStyle from '../theme';
import ClassCard from '../ComponentTeam/ClassCard';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';
import Api from '../api/Api';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';

const Teams = ({navigation}) => {
  const [classes, setClasses] = useState([]);
  const {user, isTeacher} = useContext(AuthContext);

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const getClassesByUserTeacher = async () => {
    const data = await Api.getClassesByUser(user.uid);
    setClasses(data);
  };

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateScreenWidth);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getClassesByUserTeacher();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            flex: 1,
          }}>
          Teams
        </Text>
      </View>
      <Text style={AppStyle.textstyle.parttext}>Your class</Text>
      <FlatList
        data={classes}
        renderItem={({item, index}) => (
          <ClassCard key={index} item={item} navigation={navigation} />
        )}
      />
      {isTeacher&&<TouchableOpacity
        style={[
          styles.addButton,
          {marginLeft: screenWidth - 80, marginTop: screenHeight - 120},
        ]}
        onPress={() => navigation.push('NewTeam')}>
        <Icon name={'plus'} color="white" size={20} />
      </TouchableOpacity>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 30,
    left: -20,
    flex: 1,
    backgroundColor: card_color,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    padding: 10,
    flex: 1,
  },
  textStyle: {
    color: 'black',
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',

    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Teams;
