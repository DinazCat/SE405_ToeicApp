import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

const otherCertificate = ['VSTEP 1005', 'VNU-EPT 210 - 2024'];

const ProfileTeacher = ({navigation, route}) => {
  const profile = route.params.profile;

  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Teacher Profile</Text>
      </View>

      <ScrollView style={{padding: 20}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            style={styles.userImg}
            source={{
              uri: profile.userImg
                ? profile.userImg
                  ? profile.userImg
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
          <Text style={styles.nameTeacher}>{profile.name}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center', gap: 2}}>
            <Text>{profile.rating ? profile.rating : '0'}</Text>
            <FontAwesome name="star" color="orange" size={20} />
            <Text>
              / {profile.reviews?.length ? profile.reviews.length : '0'}
              {' Reviews'}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>
            {'Email: '}
            <Text style={[styles.text, {fontWeight: '600'}]}>
              {profile.email}
            </Text>
          </Text>

          <Text style={styles.text}>
            {'Phone: '}
            <Text style={[styles.text, {fontWeight: '600'}]}>
              {profile.phone}
            </Text>
          </Text>

          <Text style={styles.text}>{'University: '}</Text>
          <Text style={[styles.text, {fontWeight: '600'}]}>
            {profile.university}
          </Text>

          <Text style={styles.text}>{'Skill proficiency: '}</Text>
          <View style={{flexDirection: 'row', gap: 5, flexWrap: 'wrap'}}>
            {profile.skills?.map((item, index) => (
              <Text key={index} style={styles.skills}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {/* <View style={[styles.infoContainer, {alignItems: 'center'}]}>
          <Text style={styles.title}>Bank Account</Text>
          <Text style={[styles.text, {color: '#555'}]}>
            {profile.bankInformation.bankName}
            {' - '}
            {profile.bankInformation.accountNumber}
            {' - '}
            {profile.bankInformation.accountName}
          </Text>
        </View> */}

        <View style={[styles.infoContainer, {alignItems: 'center'}]}>
          {profile?.toeicCertificateImage && (
            <View style={{marginBottom: 10}}>
              <Text style={styles.title}>TOEIC Certificate</Text>
              <Image
                source={{uri: profile?.toeicCertificateImage}}
                style={styles.image}
              />
            </View>
          )}
        </View>

        {(profile?.otherCertificate?.length !== 0 ||
          profile?.otherCertificateImages?.length !== 0) && (
          <View style={[styles.infoContainer, {alignItems: 'center'}]}>
            {profile?.otherCertificate?.length !== 0 && (
              <View style={{marginBottom: 5, width: '100%', gap: 5}}>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  Other Certificates
                </Text>
                {profile?.otherCertificate?.map((item, index) => {
                  return <Text key={index}>- {item}</Text>;
                })}
              </View>
            )}

            {profile?.otherCertificateImages?.length !== 0 && (
              <View style={{marginBottom: 10}}>
                <Text style={styles.title}>Other Certificate Images</Text>
                {profile?.otherCertificateImages?.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: item}}
                      style={styles.image}
                    />
                  );
                })}
              </View>
            )}
          </View>
        )}

        <View
          style={[
            styles.infoContainer,
            {
              alignItems: 'center',
              paddingHorizontal: 0,
            },
          ]}>
          <Text style={styles.title}>Reviews:</Text>
          {profile?.reviews?.length !== 0 ? (
            <View style={{width: '100%', gap: 10}}>
              {profile?.reviews?.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={{
                        uri: item.userImg
                          ? item.userImg
                            ? item.userImg
                            : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                          : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
                      }}
                      style={{height: 32, width: 32, borderRadius: 30}}
                    />
                    <View>
                      <Text style={{color: '#555'}}>{item.name}</Text>
                      <Text style={{color: '#555', fontWeight: '600'}}>
                        {item.review}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text>The teacher doesn't have any review.</Text>
          )}
        </View>
        <View style={{height: 50}} />
      </ScrollView>
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
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  infoContainer: {
    backgroundColor: card_color,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
    padding: 20,
    gap: 8,
  },
  right: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 27,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  skills: {
    backgroundColor: '#D0E895',
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  image: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginTop: 5,
  },
  nameTeacher: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 10,
  },
});
export default ProfileTeacher;
