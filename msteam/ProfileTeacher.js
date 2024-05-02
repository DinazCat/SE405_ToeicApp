import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileTeacher = ({navigation, route}) => {
  const profile = route.params.profile;

  const reviews = [
    'cô dạy hay lắm',
    'cô nói giọng nghe rất hay',
    ' co dạy rất có tâm',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity
            style={{marginLeft: '2%'}}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text style={styles.header}>My profile</Text>
        </View>

        <View style={styles.infoContainer}>
          <View>
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
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 5,
              }}>
              <Text>0</Text>
              <FontAwesome name="star" color="orange" size={20} />
              <Text>/ 0 Review</Text>
            </View>
          </View>

          <View style={styles.right}>
            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Text style={styles.label}>{'Name: '}</Text>
              <Text style={styles.text}>{profile.name}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Text style={styles.label}>{'Email: '}</Text>
              <Text style={styles.text}>{profile.email}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Text style={styles.label}>{'Phone: '}</Text>
              <Text style={styles.text}>{profile.phone}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Text style={styles.label}>{'University: '}</Text>
              <Text style={styles.text}>{profile.university}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{'Skill proficiency: '}</Text>
          <View style={{flexDirection: 'row', gap: 5}}>
            {profile.skills.map((item, index) => (
              <Text key={index} style={styles.skills}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.title}>Bank account</Text>
          <Text style={[styles.text, {borderBottomWidth: 0}]}>
            {profile.bankInformation.bankName}
            {' - '}
            {profile.bankInformation.accountNumber}
            {' - '}
            {profile.bankInformation.accountName}
          </Text>
        </View>

        <View style={styles.itemContainer}>
          {profile?.toeicCertificateImage && (
            <View style={{marginBottom: 10}}>
              <Text style={styles.title}>TOEIC certificate</Text>
              <Image
                source={{uri: profile?.toeicCertificateImage}}
                style={styles.image}
              />
            </View>
          )}

          {profile?.otherCertificate?.length !== 0 ||
            (profile?.otherCertificate && (
              <View style={{marginBottom: 10}}>
                <Text style={styles.title}>Other certificates</Text>
                {profile?.otherCertificate?.map((item, index) => {
                  return <Text key={index}>- {item.name}</Text>;
                })}
              </View>
            ))}

          {profile?.otherCertificateImages?.length !== 0 ||
            (profile?.otherCertificateImages && (
              <View style={{marginBottom: 10}}>
                <Text style={styles.title}>Other certificate Images</Text>
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
            ))}

          <Text style={styles.title}>Reviews:</Text>
          {!profile?.reviews ? (
            <View>
              {reviews?.map((item, index) => {
                return (
                  <Text key={index} style={{marginBottom: 5}}>
                    - {item}
                  </Text>
                );
              })}
            </View>
          ) : (
            <Text>You don't have any review.</Text>
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
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
    marginTop: 10,
  },
  right: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 27,
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  text: {
    fontSize: 15,
    color: 'black',
    borderBottomWidth: 1,
    flex: 1,
  },
  skills: {
    backgroundColor: '#D0E895',
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  itemContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginTop: 5,
  },
});
export default ProfileTeacher;
