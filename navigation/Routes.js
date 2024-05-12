import React, {useState, useContext, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigator_teacher from './DrawerNavigator_teacher';
import firestore from '@react-native-firebase/firestore';

const Routes = () => {
    const { user, setUser, isTeacher, setIsTeacher } = useContext(AuthContext);
    const [isTeacher1, setIsTeacher1] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const checkTeacher = async (user1) => {
      try {
        const documentRef = firestore().collection('Users').doc(user1.uid);
        const doc = await documentRef.get();
        if (doc.exists) {
          if(doc.data().type=='Teacher'){
            setIsTeacher1(true);
            setIsTeacher(true)
          } else{
            setIsTeacher1(false)
            setIsTeacher(false)
          }
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
    
    return (
      <NavigationContainer>
        {user ?(isTeacher1?<DrawerNavigator_teacher/>:<DrawerNavigator/>) : <AuthStack/>}
       
      </NavigationContainer>
    );
}

export default Routes