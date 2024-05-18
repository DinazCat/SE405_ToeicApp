import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {
  MeetingConsumer,
  MeetingProvider,
} from '@videosdk.live/react-native-sdk';
import Incomingvideocall from '../utils/incoming-video-call';
import MeetingContainer from '../ComponentTeam/MeetingContainer';

const CallRoom = ({navigation, route}) => {
  const token = route.params?.token || 1;
  const meetingId = route.params?.meetingId || 1;
  const micEnabled = route.params?.micEnabled || true;
  const webcamEnabled = route.params?.webcamEnabled || true;
  const name = route.params?.name || '';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f0f0', padding: 12}}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name: name,
          // notification: {
          //   title: 'Video SDK Meeting',
          //   message: 'Meeting is running.',
          // },
        }}
        token={token}>
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.goBack();
            },
          }}>
          {() => {
            return <MeetingContainer webcamEnabled={webcamEnabled} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
};

export default CallRoom;

const styles = StyleSheet.create({});
