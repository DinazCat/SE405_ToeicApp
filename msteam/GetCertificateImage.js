import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const GetCertificateImage = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [typeImage, setTypeImage] = useState('');
  const [toeicCert, setToeicCert] = useState();
  const [otherCert, setOtherCert] = useState([]);
  const {...profileData} = route.params;

  const openLibrary = async () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 150,
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
      width: 300,
      height: 150,
      cropping: true,
    }).then(img => {
      if (typeImage === 'toeicCert') setToeicCert(img.path);
      else if (typeImage === 'otherCert')
        setOtherCert([...otherCert, img.path]);
    });
  };

  const onNext = async () => {
    navigation.push('GetBankAccount', {
      ...profileData,
      toeicCertificateImage: toeicCert,
      otherCertificateImages: otherCert,
    });
  };

  //Render Modal to choose upload image by take photo now or upload from library
  function RenderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}>
            <FontAwesome5
              name={'times-circle'}
              style={{color: 'white', fontSize: 20}}
            />
          </TouchableOpacity>

          <View style={styles.popover}>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.popoverItem}>
                <FontAwesome5 name="camera" size={35} color={card_color} />
                <Text style={styles.popoverText}>Take photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openLibrary}>
              <View style={styles.popoverItem}>
                <FontAwesome5 name="photo-video" size={35} color={card_color} />
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
          <TouchableOpacity
            style={[styles.step]}
            onPress={() => navigation.goBack()}
          />
          <View style={[styles.step, {backgroundColor: PRIMARY_COLOR}]} />
          <View style={[styles.step]} />
        </View>

        {/*Display toeic certificate image*/}
        {toeicCert && (
          <View
            style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
            <Text style={styles.title}>Your Toeic Certificate:</Text>
            <View style={{position: 'relative', width: 300, height: 150}}>
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setToeicCert('')}>
                <Ionicons name="close" style={{color: 'white'}} size={20} />
              </TouchableOpacity>
              <Image source={{uri: toeicCert}} style={styles.image} />
            </View>
          </View>
        )}

        {/*Display other certificates image*/}
        {otherCert.length !== 0 && (
          <View
            style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
            <Text style={[styles.title, {}]}>Your Other Certificates: </Text>
            {otherCert.map((item, index) => (
              <View
                key={index}
                style={{
                  position: 'relative',
                  width: 300,
                  height: 150,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() =>
                    setOtherCert(otherCert.filter(i => i !== item))
                  }>
                  <Ionicons name="close" style={{color: 'white'}} size={20} />
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

export default GetCertificateImage;

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
    zIndex: 2,
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
    alignSelf: 'center',
    marginBottom: 20,
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
    fontStyle: 'italic',
    width: '100%',
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
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
  removeImage: {
    position: 'absolute',
    padding: 2,
    zIndex: 1,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
});
