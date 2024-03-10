import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyle from '../theme';
const SmallHistoryCard = ({display, click}) => {
  // const [quantity1, setQuantity1] = useState(display.Quantity)
  const [showPercent, setShowPercent] = useState(false);
  const [datetime, setDatetime] = useState('');

  const getDateTime = () => {
    const time = display.Time.split('-');
    const time2 = [time[0], time[1], time[2]].join('/');
    const time3 = [time[3], [time[4]]].join(':');
    setDatetime(time2 + ' ' + time3);
  };
  useEffect(() => {
    getDateTime();
    if (
      display.Part == 'L3' ||
      display.Part == 'L4' ||
      display.Part == 'L1' ||
      display.Part == 'L2' ||
      display.Part == 'R1' ||
      display.Part == 'R2' ||
      display.Part == 'R3'
    ) {
      setShowPercent(true);
    } else setShowPercent(false);
  }, []);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        minHeight: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '97%',
        marginTop: 5,
        justifyContent: 'center',
      }}
      onPress={click}>
      {display.Part == 'L1' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/headphones.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'L2' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/headphones.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'L3' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/headphones.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'L4' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/headphones.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'R1' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/book.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'R2' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/book.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'R3' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/book.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'W1' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/pen.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'W2' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/pen.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'W3' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/pen.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'S1' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/microphone.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'S2' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/microphone.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'S3' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/microphone.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'S4' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/microphone.png')}
          resizeMode="contain"
        />
      )}
      {display.Part == 'S5' && (
        <Image
          style={{width: '15%', height: 40}}
          source={require('../assets/microphone.png')}
          resizeMode="contain"
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginLeft: 5,
              fontWeight: '500',
            }}>
            {display.PartName}
          </Text>
          <Text style={{fontSize: 14, color: '#555', marginLeft: 5}}>
            {datetime}
          </Text>
        </View>
        {showPercent && (
          <Text style={AppStyle.button.buttonText}>
            {display.Score + '/' + display.DetailQty}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default SmallHistoryCard;
