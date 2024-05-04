import {View, Text, SafeAreaView, Image, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {DrawerItemList, createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/SettingScreen';
import ForumStack from './ForumStack';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import BottomTab from './BottomTab';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const SideMenu = () => {
  <SafeAreaView style={{flex: 1}}>
    <View></View>
  </SafeAreaView>;
};
function DrawerNavigator_teacher({}) {
    const navigation = useNavigation();
    const [ profileData, setProfileData] = useState(null)
    const {logout} = useContext(AuthContext);
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
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          fontWeight: '500',
          color: 'black',
          fontSize: 18,
        },
        drawerActiveTintColor: PRIMARY_COLOR,
      }}
      drawerContent={props => {
        return (
              <ImageBackground source={require('../assets/bg8.png')} resizeMode='cover' style={{flex:1}}>
                          {/* <View style={{flex:1}}> */}
            <View style={{justifyContent:'center', alignItems:'center', marginTop:10, marginBottom:10}}>
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

      <Text style={[styles.userName]}>
        {profileData
          ? profileData.name
            ? profileData.name
            : profileData.email
          : 'Your name'}
      </Text>
      <TouchableOpacity  onPress={() => {navigation.navigate('ProfileOfTeacher')}}>
         <Text style={{color:'blue', fontStyle:'italic'}}>Go to profile!</Text>
      </TouchableOpacity>
       {/* <DrawerItem
        label="Go to profile"
        onPress={() => navigation.navigate('ProfileOfTeacher')}
        labelStyle={{color:'blue', fontStyle:'italic'}}
      /> */}
            </View>
            <DrawerItemList {...props}/>
            <View style={{flex:1}}/>
            <TouchableOpacity style={styles.btnContainer} onPress={() => logout()}>
          <Ionicons name='log-out-outline' size={27} color={'#222'}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Log Out'}</Text>
        </TouchableOpacity>
        {/* </View> */}
        </ImageBackground>
        );
      }}>
      <Drawer.Screen
        name="Learning"
        component={BottomTab}
        options={{
          drawerLabel: 'Courses',
          drawerIcon: () => (
            <Image source={require('../assets/classroom.png')} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Forum"
        component={ForumStack}
        options={{
          drawerLabel: 'Forum',
          drawerIcon: () => (
            <Image source={require('../assets/Socialicon.png')} />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerLabel: 'Setting',
          drawerIcon: () => (
            <Image source={require('../assets/cogwheel.png')} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator_teacher;
const styles = StyleSheet.create({
    userImg: {
        height: 80,
        width: 80,
        borderRadius: 65,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        height:50,
        borderColor: '#DDD',
        borderBottomWidth: 1.5,
        paddingVertical: 10,  
        paddingHorizontal: 12,
        alignItems: 'center',
      },
      btnText: {
        fontSize:18,
        marginLeft: 10,
        fontWeight: '500',
        color: '#222'
      },
})
