import React, {useState, useContext, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {View, Image, ActivityIndicator, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigator_teacher from './DrawerNavigator_teacher';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';

const Routes = () => {
    const { user, setUser, isTeacher, setIsTeacher } = useContext(AuthContext);
    const [isTeacher1, setIsTeacher1] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const checkTeacher = async (user1) => {
      try {
        // const documentRef = firestore().collection('Users').doc(user1.uid);
        // const doc = await documentRef.get();
        // if (doc.exists) {
        //   if(doc.data().type=='Teacher'){
        //     setIsTeacher1(true);
        //     setIsTeacher(true)
        //   } else{
        //     setIsTeacher1(false)
        //     setIsTeacher(false)
        //   }
        // } 
        const userData = await Api.getUserData(user1.uid).catch(error =>
          console.error(error),
        );
        if(userData?.type=='Teacher'){
              setIsTeacher1(true);
              setIsTeacher(true)
              setLoading(false);
            } else{
              setIsTeacher1(false)
              setIsTeacher(false)
              setLoading(false);
            }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };
    const onAuthStateChanged = (user) => {
        setUser(user);
        checkTeacher(user);
        if (initializing) 
          setInitializing(false);
      };
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    if (initializing) return null;
    if (isLoading) {
      return (
        <View
          style={{
            backgroundColor: '#F3FFE7',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            paddingTop: 150,
          }}>
          <Text
            style={{
              fontSize: 28,
              color: '#0E7C00',
              fontWeight: '600',
              marginBottom: 15,
            }}>
            TOEIC with Coco
          </Text>
          <Image
            source={require('../assets/penguin.png')}
            style={{height: 250, width: 200, resizeMode: 'cover'}}
          />
          <ActivityIndicator
            size="large"
            color="#0E7C00"
            style={{marginTop: 20}}
          />
        </View>
      );
    }
    return (
      <NavigationContainer>
        {user ?(isTeacher1?<DrawerNavigator_teacher/>:<DrawerNavigator/>) : <AuthStack/>}
       
      </NavigationContainer>
    );
}

export default Routes