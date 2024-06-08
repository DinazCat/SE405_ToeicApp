import {View, Text, StyleSheet, TouchableOpacity, Alert, Linking} from 'react-native';
import React, {useCallback, useContext, useEffect, useState, } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import FormButton from '../components/FormButton';
import Api from '../api/Api';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import crypto from 'crypto-js'; 
import 'react-native-url-polyfill/auto'; 
import moment from 'moment';
import axios from 'axios';
import socketServices from '../api/socketService';
import socketServices_onl from '../api/socketService_onl';
import { useFocusEffect } from '@react-navigation/native';
const paymentInfo = {
  accountNumber: 'Admin Number',
  accountName: 'Admin accountName',
};

const RegisterCourse = ({navigation, route}) => {
  const item = route.params.course;
  const from = route.params.from;
  const {user} = useContext(AuthContext);
  const [verify, setVerify] = useState(false)
  const [verify1, setVerify1] = useState(false)
  useFocusEffect(
    React.useCallback(() => {
      socketServices_onl.initializeSocket();
      getState()
    }, []),
  );
  // useEffect(() => {
  //   socketServices.initializeSocket();
  //   getState()
  // }, []);
  const getState= ()=>{
    socketServices_onl.on('transactionresult', async data => {
      if(data.message=="success"&&data.userId==user.uid){
        console.log("đăng ký thành công")
        setVerify(true)
        setVerify1(false)
        // Alert.alert(
        //   'Hey!',
        //   "You have successfully registered for this course. Let's see your classes!!!",
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         navigation.navigate('Teams');
        //       },
        //     },
        //     // {text: 'Cancel', onPress: () => console.log('Cancel pressed')},
        //   ],
        //   {cancelable: false},
        // );
        if(from!='Teamroom'){
        await Api.registerCourse({
          classId: item.classId,
          user: {
            id: user.uid,
            name: user.displayName,
          },
        })
          .then(() => {
          })
          .catch(error => console.error(error));
        }
      }
      else if(data.message=="fail"&&data.userId==user.uid){
        setVerify1(true)
        setVerify(false)
        Alert.alert(
          'Hey!',
          "You have failed to register for this course. It is possible that the payment process has not been completed. Please wait a while!!!",)
      }
    });
  }
  // const showAlert = () => {
  //     Alert.alert(
  //       'Hey!',
  //       "You have successfully registered for this course. Let's see your classes!!!",
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             navigation.navigate('Teams');
  //           },
  //         },
  //         // {text: 'Cancel', onPress: () => console.log('Cancel pressed')},
  //       ],
  //       {cancelable: false},
  //     );

  // };

  const paymentviazalo = async()=>{
    const config = {
      app_id: "2554",
      key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
      key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create"
  };
  
  const embed_data = {
    redirectUrl: "./CourseList.js"
  };
  
  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: "",
  };
  
  // appid|app_trans_id|appuser|amount|apptime|embeddata|item zalopayapp
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = crypto.HmacSHA256(data, config.key1).toString();
  try{
    const result = await axios.post(config.endpoint, null, { params: order });
    console.log(result.data)
    Linking.openURL(result.data.order_url);
  }
  catch(e){
    console.log(e)
  }
  
  }
  const handlePayment = async () => {
    try {
      const partnerCode = "MOMO";
      const accessKey = "F8BBA842ECF85";
      const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const requestId = partnerCode + new Date().getTime();
      const orderId = requestId;
      const orderInfo = "Pay for "+item.ClassName;
      const redirectUrl = "./CourseList.js";
      const ipnUrl = "https://toeicapp-be.onrender.com/momo_ipn";
      const amount = item.Tuition+'';
      const requestType = "payWithMethod";
      const extraData = user.uid+','+ item.classId; //pass empty value if your merchant does not have stores

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        //puts raw signature
        // Signature
        const signature = crypto.HmacSHA256(rawSignature, secretkey).toString();

        // JSON object to send to MoMo endpoint
        const requestBody = {
          partnerCode: partnerCode,
          accessKey: accessKey,
          requestId: requestId,
          amount: amount,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          extraData: extraData,
          requestType: requestType,
          signature: signature,
          lang: 'en',
          orderExpireTime:60,
          partnerName : "Coco",
          storeId : "CoCoToeic",

      };

        // Send the request and get the response
        const response = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const result = await response.json();
        console.log('Response: ', result);
        // Alert.alert('Response', JSON.stringify(result));

        if (result && result.payUrl) {
            // Handle the payment URL (e.g., open it in a webview or browser)
            console.log('payUrl: ', result.payUrl);
            const momoAppUrl = `momo://?action=payWithMoMo&amount=${amount}&partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&redirectUrl=${encodeURIComponent(redirectUrl)}&ipnUrl=${encodeURIComponent(ipnUrl)}&extraData=${extraData}&orderInfo=${orderInfo}&lang=en&signature=${signature}`;
            // navigation.navigate('MomoScreen',{url:result.payUrl})
            // Linking.openURL(result.deeplink);
            Linking.openURL(result.payUrl);
        }
    } catch (error) {
        console.error('Error: ', error);
        Alert.alert('Error', error.message);
    }
};
  const onSave = async () => {
    Alert.alert('Registered successfully');

    await Api.registerCourse({
      classId: item.classId,
      user: {
        id: user.uid,
        name: user.displayName,
      },
    })
      .then(() => {
        navigation.navigate('Teams');
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Register course</Text>
      </View>
      {
        from!='TeamRoom'?
        <>
         {item.PaymentPlan=='Pay charge'&&<View style={{flex: 1, padding: 10}}>
        <View style={styles.paymentContainer}>
          <Text style={{textAlign:'center'}}>You will successfully register for the course as soon as you pay the full fee</Text>
        </View>

        {!verify&&!verify1&&<View style={{width: '60%', alignSelf: 'center'}}>
          <FormButton title={'Pay via MoMo!!!'} onPress={()=>handlePayment()} />
        </View>}
        {
          verify&&<View style={[styles.paymentContainer,{backgroundColor:PRIMARY_COLOR}]}>
          <Text style={{textAlign:'center', color:'white'}}>You have successfully registered for this course. Let's see your classes!!!</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Teams');
          }}><Text>OK</Text></TouchableOpacity>
        </View>
        }
              {
          verify1&&<View style={[styles.paymentContainer,{backgroundColor:PRIMARY_COLOR}]}>
          <Text style={{textAlign:'center', color:'white'}}>You have failed to register for this course. It is possible that the payment process has not been completed. Please wait a while!!!</Text>
        </View>
        }

      </View>}

      {item.PaymentPlan=='Total free'&&<View style={{flex: 1, padding: 10}}>
      <View style={styles.paymentContainer}>
          <Text style={{textAlign:'center'}}>This course is completely free. If you are determined to register, press the register button below, you will be added to the class immediately!!!</Text>
        </View>
        <FormButton title={'Register'} onPress={()=>onSave()} />
      </View>}

      
      {item.PaymentPlan=='Free 2 days'&&<View style={{flex: 1, padding: 10}}>
      <View style={styles.paymentContainer}>
          <Text style={{textAlign:'center'}}>This course has a free trial for the first 2 days. After 2 days, if you want to continue studying, please pay the listed amount. If you are determined to subscribe, press the button below!!!</Text>
        </View>
        <FormButton title={'Register'} onPress={()=>onSave()} />
      </View>}
        </>
        :
        <View style={{flex: 1, padding: 10}}>
        <View style={styles.paymentContainer}>
          <Text style={{textAlign:'center'}}>You will successfully register for the course as soon as you pay the full fee</Text>
        </View>

        {!verify&&!verify1&&<View style={{width: '60%', alignSelf: 'center'}}>
          <FormButton title={'Pay via MoMo!!!'} onPress={()=>handlePayment()} />
        </View>}
        {
          verify&&<View style={[styles.paymentContainer,{backgroundColor:PRIMARY_COLOR}]}>
          <Text style={{textAlign:'center', color:'white'}}>You have successfully registered for this course. Let's see your classes!!!</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Teams');
          }}><Text>OK</Text></TouchableOpacity>
        </View>
        }
              {
          verify1&&<View style={[styles.paymentContainer,{backgroundColor:PRIMARY_COLOR}]}>
          <Text style={{textAlign:'center', color:'white'}}>You have failed to register for this course. It is possible that the payment process has not been completed. Please wait a while!!!</Text>
        </View>
        }

      </View>
      }
     
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
  paymentContainer: {
    backgroundColor: card_color,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
});

export default RegisterCourse;
