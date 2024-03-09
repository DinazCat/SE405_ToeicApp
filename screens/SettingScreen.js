import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader'
import { AuthContext } from '../navigation/AuthProvider';

const SettingScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  return (  
      <View style={styles.container}>
        <CustomHeader Title={'Toeic App'} navigation={navigation} />
        <View style={styles.btnsContainer} >
        <TouchableOpacity style={styles.btnContainer}
          onPress={() => navigation.navigate('ChangeProfile')}>
          <Ionicons name='person-outline' size={27} color={'#222'}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Edit Profile'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}
          onPress={() => navigation.navigate('ChangeGoal')}>
          <Image source={require('../assets/target.png')} style={{width: 25, height: 25, resizeMode: "cover"}}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Change goal'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Ionicons name='language-outline' size={27} color={'#222'}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Language'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} 
          onPress={() => navigation.navigate('settingNoti')}>
          <Ionicons name="notifications-circle-outline" size={27} color={'#222'}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Notifications'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} onPress={() => logout()}>
          <Ionicons name='log-out-outline' size={27} color={'#222'}/>
          <Text style={[styles.btnText, {color: '#222'}]}>{'Log Out'}</Text>
        </TouchableOpacity>
        </View>        
      </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#DDD',
    borderBottomWidth: 1.5,
    paddingVertical: 10,  
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  btnText: {
    fontSize:18,
    marginLeft: 10,
    fontWeight: '500',
    color: '#222'
  },
  btnsContainer:{
    padding: 10,
    
  }
})