import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Api from '../api/Api';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const GetImageTeacher = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [typeImage, setTypeImage] = useState('');
  const [toeicCert, setToeicCert] = useState();
  const [otherCert, setOtherCert] = useState([]);
  // const {profileData} = useState(null);

  const openLibrary = async () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    }).then(img => {
      if (typeImage === 'toeicCert') setToeicCert(img.path);
      else if (typeImage === 'otherCert')
        setOtherCert([...otherCert, img.path]);
    });
  };

  const openCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      width: 400,
      height: 200,
      cropping: true,
    }).then(img => {
      if (typeImage === 'toeicCert') setToeicCert(img.path);
      else if (typeImage === 'otherCert')
        setOtherCert([...otherCert, img.path]);
    });
  };

  const onNext = async () => {
    console.log(toeicCert, otherCert);
    navigation.push('GetBankAccount', {});
  };

  //Render Modal to choose upload image by take photo now or upload from library
  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}>
            <Icon
              name={'times-circle'}
              style={{color: 'white', fontSize: 20}}
            />
          </TouchableOpacity>

          <View style={styles.popover}>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.popoverItem}>
                <Icon name="camera" size={35} color={card_color} />
                <Text style={styles.popoverText}>Take photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openLibrary}>
              <View style={styles.popoverItem}>
                <Icon name="photo-video" size={35} color={card_color} />
                <Text style={styles.popoverText}>Libraries</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            backgroundColor="transparent"
            color={'green'}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Teacher</Text>
      </View>

      <ScrollView style={{width: '100%'}}>
        <View style={styles.stepContainer}>
          <View style={[styles.step]} onPress={() => navigation.goBack()} />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
        </View>

        {/*Display toeic certificate image*/}
        {toeicCert && (
          <View style={{marginVertical: 20}}>
            <Text style={styles.title}>Your Toeic Certificate: </Text>
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {position: 'absolute', zIndex: 1, right: 0, top: 10},
                ]}
                onPress={() => setToeicCert('')}>
                <Icon
                  name={'times-circle'}
                  style={{color: 'white', fontSize: 20}}
                />
              </TouchableOpacity>
              <Image source={{uri: toeicCert}} style={styles.image} />
            </View>
          </View>
        )}

        {/*Display other certificates image*/}
        {otherCert.length !== 0 && (
          <View style={{marginVertical: 20}}>
            <Text style={styles.title}>Your Other Certificates: </Text>
            {otherCert.map((item, index) => (
              <View key={index} style={{position: 'relative'}}>
                <TouchableOpacity
                  style={[
                    styles.closeButton,
                    {position: 'absolute', zIndex: 1, right: 0, top: 10},
                  ]}
                  onPress={() =>
                    setOtherCert(otherCert.filter(i => i !== item))
                  }>
                  <Icon
                    name={'times-circle'}
                    style={{color: 'white', fontSize: 20}}
                  />
                </TouchableOpacity>
                <Image source={{uri: item}} style={styles.image} />
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setOpenModal(true);
              setTypeImage('toeicCert');
            }}>
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Toeic Certificate</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setOpenModal(true);
              setTypeImage('otherCert');
            }}>
            <Text style={styles.buttonText}>
              Upload Your{'\n'}
              <Text style={{fontWeight: 600}}>Other Certificates</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onNext} disabled={!toeicCert ? true : false}>
          <Text
            style={[
              styles.button,
              {color: !toeicCert ? 'lightgray' : 'green'},
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {RenderModal()}
    </View>
  );
};

export default GetImageTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 24,
    color: 'green',
    width: '100%',
    textAlign: 'center',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  step: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  modal: {
    height: 160,
    width: 300,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    borderColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: 300,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    paddingRight: 15,
    paddingTop: 7,
  },
  popover: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  popoverItem: {
    alignItems: 'center',
    margin: 16,
  },
  popoverText: {
    fontSize: 16,
    marginTop: 8,
    color: 'white',
  },
  title: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
  image: {
    width: 380,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
    color: 'green',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
