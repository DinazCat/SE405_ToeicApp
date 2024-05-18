import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useMeeting,
  useParticipant,
  RTCView,
  MediaStream,
} from '@videosdk.live/react-native-sdk';
import Toast from 'react-native-simple-toast';
import IonIcon from 'react-native-vector-icons/Ionicons';

const OneToOneMeetingViewer = () => {
  const {
    participants,
    localWebcamOn,
    localMicOn,
    leave,
    changeWebcam,
    toggleWebcam,
    toggleMic,
    meetingId,
  } = useMeeting({
    onError: data => {
      const {code, message} = data;
      Toast.show(`Error: ${code}: ${message}`);
    },
  });

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#050A0E',
              }}>
              {/* {meetingId ? meetingId : 'xxx - xxx - xxx'} */}
              Tường Nguyễn Cát
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              changeWebcam();
            }}>
            <IonIcon name="camera-reverse-outline" size={26} color={'#333'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Center */}
      <View style={{flex: 1, marginTop: 8, marginBottom: 12}}>
        {participantCount > 1 ? (
          <>
            <LargeView participantId={participantIds[1]} />
            <MiniView participantId={participantIds[0]} />
          </>
        ) : participantCount === 1 ? (
          <LargeView participantId={participantIds[0]} />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </View>
      {/* Bottom */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={styles.callendBtn}
          onPress={() => {
            leave();
          }}>
          <IonIcon name="call" size={26} color={'#fff'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.micBtn}
          backgroundColor={!localMicOn ? '#AAA' : 'transparent'}
          onPress={() => {
            toggleMic();
          }}>
          {localMicOn ? (
            <IonIcon name="mic" size={26} color={'#000'} />
          ) : (
            <IonIcon name="mic-off" size={26} color={'#000'} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.micBtn}
          backgroundColor={!localWebcamOn ? '#AAA' : 'transparent'}
          onPress={() => {
            toggleWebcam();
          }}>
          {localWebcamOn ? (
            <IonIcon name="videocam" size={26} color={'#000'} />
          ) : (
            <IonIcon name="videocam-off" size={26} color={'#000'} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const LargeView = ({participantId}) => {
  const {webcamOn, webcamStream, displayName, setQuality, isLocal} =
    useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A1C22',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      {webcamOn && webcamStream ? (
        <RTCView
          objectFit={'cover'}
          mirror={isLocal ? true : false}
          style={{flex: 1, backgroundColor: '#424242'}}
          streamURL={new MediaStream([webcamStream.track]).toURL()}
        />
      ) : (
        <Avatar
          containerBackgroundColor={'#1A1C22'}
          fullName={displayName}
          fontSize={26}
          style={{
            backgroundColor: '#232830',
            height: 70,
            aspectRatio: 1,
            borderRadius: 40,
          }}
        />
      )}
    </View>
  );
};

const MiniView = ({participantId}) => {
  const {webcamOn, webcamStream, displayName, setQuality, isLocal} =
    useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 160,
        aspectRatio: 0.7,
        borderRadius: 8,
        borderColor: '#ff0000',
        overflow: 'hidden',
      }}>
      {webcamOn && webcamStream ? (
        <RTCView
          objectFit="cover"
          zOrder={1}
          mirror={isLocal ? true : false}
          style={{flex: 1, backgroundColor: '#424242'}}
          streamURL={new MediaStream([webcamStream.track]).toURL()}
        />
      ) : (
        <Avatar
          fullName={displayName}
          containerBackgroundColor={'#404B53'}
          fontSize={24}
          style={{
            backgroundColor: '#6F767E',
            height: 60,
            aspectRatio: 1,
            borderRadius: 40,
          }}
        />
      )}
    </View>
  );
};

function Avatar({fullName, style, fontSize, containerBackgroundColor}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: containerBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      <View
        style={{
          ...style,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
        <Text
          style={{
            fontSize: fontSize,
            color: '#333',
          }}>
          {fullName && fullName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
export default OneToOneMeetingViewer;

const styles = StyleSheet.create({
  callendBtn: {
    backgroundColor: '#CD1111',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micBtn: {
    borderWidth: 1.5,
    borderColor: '#2B3034',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
