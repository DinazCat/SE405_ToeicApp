/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {register} from '@videosdk.live/react-native-sdk';
import messaging from '@react-native-firebase/messaging';
import Incomingvideocall from './utils/incoming-video-call';
import Api from './api/Api';

import { LogBox } from 'react-native';

// Ignore specific log warning
LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);
register();

console.disableYellowBox = true;
console.warn = () => {};
console.error = () => {};

const firebaseListener = async remoteMessage => {
  const {callerInfo, videoSDKInfo, type} = JSON.parse(remoteMessage.data.info);

  if (type === 'CALL_INITIATED') {
    const incomingCallAnswer = ({callUUID}) => {
      Incomingvideocall.backToForeground();
      Api.updateCallStatus({
        callerInfo,
        type: 'ACCEPTED',
      });
      Incomingvideocall.endIncomingcallAnswer(callUUID);
      Linking.openURL(
        `videocalling://meetingscreen/${videoSDKInfo.token}/${videoSDKInfo.meetingId}`,
      ).catch(err => {
        console.log(`Error`, err);
      });
    };

    const endIncomingCall = () => {
      Incomingvideocall.endIncomingcallAnswer();
      Api.updateCallStatus({callerInfo, type: 'REJECTED'});
    };

    Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
    Incomingvideocall.displayIncomingCall(callerInfo.name);
    Incomingvideocall.backToForeground();
  }
};

// Register background handler
messaging().setBackgroundMessageHandler(firebaseListener);

AppRegistry.registerComponent(appName, () => App);
