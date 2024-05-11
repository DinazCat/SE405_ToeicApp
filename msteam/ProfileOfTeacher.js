import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  import firestore from '@react-native-firebase/firestore';
  import Sound from 'react-native-sound';
  import LottieView from 'lottie-react-native';
  import Api from '../api/Api'
  import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
  const ProfileOfTeacher = ({navigation,route}) => {
    const [ profileData, setProfileData] = useState(null)
    const toeicCertificate=["https://clc.hust.edu.vn/xmedia/2013/12/toeic-certificate.jpg","https://anhnguthienan.edu.vn/wp-content/uploads/2022/03/DiepThuanKhang-TOEICSW310_optimized-e1594735682795.jpeg"]
    const otherCertificate=[{name:"Chứng chỉ IELTS",image:null},{name:"Chứng chỉ tiếng Anh Cambridge",image:null}]
    const reviews = ["cô dạy hay lắm","cô nói giọng nghe rất hay", " co dạy rất có tâm"]
    const getInfo = async () => {
        try {
          const documentRef = firestore().collection('Users').doc(auth().currentUser.uid);
          const doc = await documentRef.get();
          if (doc.exists) {
            setProfileData(doc.data())
          } 
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      };
      useEffect(() => {
        getInfo()
      }, []);
      const renderImageItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
      );
      const generateSkillListString = (list) => {
  return list.join(', ');
}
    return (
      <View style={styles.container}>
        <ScrollView>
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
              My profile
            </Text>
          </View>
          <View style={{flexDirection:'row', width:'95%', alignSelf:'center', alignItems:'center', marginTop:10}}>
            <View>
            <Image
          style={styles.userImg}
          source={{
            uri: profileData
              ? profileData.userImg
                ? profileData.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
          }}
        />
        <View style={{flexDirection:'row', alignSelf:'center', marginTop:5}}>
            <Text>0</Text>
            <FontAwesome name="star" color="orange" size={20} />
            <Text>/ 0 Review</Text>
            </View>
            </View>
           
                <View
                  style={{
                    flexDirection: 'column',
                    width: '80%',
                    marginLeft: 10,
                  }}>
                  <Text style={[styles.InputStyle]}>
                    <Text style={{fontWeight:'500'}}>Name:</Text>
                    {profileData?.name}
                  </Text>
                  <Text style={[styles.InputStyle]}>
                  <Text style={{fontWeight:'500'}}>Email:</Text>
                    {profileData?.email}
                  </Text>
                  <Text style={[styles.InputStyle]}>
                  <Text style={{fontWeight:'500'}}>Phone:</Text>
                     {profileData?.phone}
                  </Text>
                  <Text style={[styles.InputStyle]}>
                  <Text style={{fontWeight:'500'}}>Graduated from:</Text>
                  {profileData?.university}
                  </Text>
                  <Text style={[styles.InputStyle]}>
                  <Text style={{fontWeight:'500'}}>Skill proficiency:</Text>
                  {generateSkillListString(profileData?.skills)}
                  </Text>
                </View>
            </View>

            <View style={{width:'95%', alignSelf:'center', marginTop:15}}>
              <Text style={{fontSize:15, fontWeight:'600'}}>Bank account</Text>
              <Text style={{color:'black'}}>{profileData?.bankInformation.bankName}</Text>
              <Text style={{color:'black'}}>{profileData?.bankInformation.accountNumber}</Text>
              <Text style={{color:'black'}}>{profileData?.bankInformation.accountName}</Text>
            </View>
            <View style={{width:'95%', alignSelf:'center', marginTop:15}}>
                <Text style={{fontSize:15, fontWeight:'600'}}>TOEIC certificate</Text>
        
     {/* <FlatList
     style={{marginVertical:10}}
        data={profileData?.toeicCertificateImage}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
      /> */}
       <Image source={{ uri: profileData?.toeicCertificateImage}} style={styles.image} />
       <Text style={{fontSize:15, fontWeight:'600'}}>Other certificates</Text>
           <ScrollView horizontal={false} style={{marginVertical:10}}>
      {profileData?.otherCertificate?.map((item, index) => {return(
        <Text>{item}</Text>
      )
  })}
    </ScrollView>
    <Text style={{fontSize:15, fontWeight:'600'}}>Reviews about you:</Text>
    <ScrollView horizontal={false} style={{marginVertical:10}}>
      {profileData?.reviews?.map((item, index) => {return(
        <Text style={{marginBottom:5}}>{item.review}</Text>
      )
  })}
    </ScrollView>
            </View>
            <View style={{height:50}}/>
            </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    userImg: {
        height:90,
        width:90,
        borderRadius:10,
    },
    InputStyle: {
        fontSize: 16,
        marginLeft: 17,
        color: 'black',
        borderBottomWidth: 1,
        width: '80%',
        paddingBottom: 0,
        paddingTop: 0,
        textAlign:'left',
      },
      image: {
        width: 390,
        height: 150,
        alignSelf:'center'
      },
   
  });
  export default ProfileOfTeacher;
  