import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  useMeeting,
  ReactNativeForegroundService,
} from '@videosdk.live/react-native-sdk';
import {useEffect, useState} from 'react';
import OneToOneMeetingViewer from './OneToOneMeetingViewer';
import LottieView from 'lottie-react-native';

const MeetingContainer = ({webcamEnabled}) => {
  const [isJoined, setJoined] = useState(false);

  const {join, changeWebcam, participants, leave} = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (!isJoined) {
        join();
        if (webcamEnabled) changeWebcam();
      }
    }, 1000);

    return () => {
      leave();
      ReactNativeForegroundService.stopAll();
    };
  }, []);

  return isJoined ? (
    <OneToOneMeetingViewer />
  ) : (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Text
        style={{
          fontSize: 18,
          color: '#333',
          marginTop: 28,
        }}>
        Wait a moment...
      </Text>
      <LottieView
        source={require('../assets/animation_lnu2onmv.json')}
        autoPlay
        loop
        style={{flex: 1, width: 100, height: 100, alignSelf: 'center'}}
      />
    </View>
  );
};

export default MeetingContainer;

const styles = StyleSheet.create({});
