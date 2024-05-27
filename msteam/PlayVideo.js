import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    FlatList
  } from 'react-native';
  import React, {useEffect, useRef, useState, useContext} from 'react';
  import Pdf from 'react-native-pdf';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import AppStyle from '../theme';
  import {WebView} from 'react-native-webview';
  import YoutubePlayer from "react-native-youtube-iframe";
import { card_color, PRIMARY_COLOR } from '../assets/colors/color';
  const {width, height} = Dimensions.get('window');

  const PlayVideo = ({navigation, route}) => {
    const flatListRef = useRef(null);
    const videoRef = useRef(null);
    const {idvideo, subtitles, name} = route.params;
    const [listSub,setListSub] = useState([])
    const [currentTime, setCurrentTime] = useState(0);
    const [curIndex, setCurIndex] = useState(0)
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
      let interval
      if (isReady) {
      interval = setInterval(() => {
        // Cập nhật currentTime mỗi giây
       
        videoRef.current.getCurrentTime().then((s) => {
          setCurrentTime(s)
          const index = listSub?.findIndex(item => parseFloat(item.start) >= s-5);
          const index2 = listSub?.findIndex(item => parseFloat(item.start) >= s-2);

              if (index !== -1) {
                flatListRef.current.scrollToIndex({ animated: true, index });
              }
              if (index2 !== -1) {
                setCurIndex(index2)
              }
             
        });
      }, 1000);
    }
  
      return () => clearInterval(interval);
    }, [isReady]);
    const onReady = () => {
      setIsReady(true);
    };
    const [screenWidth, setScreenWidth] = useState(
      Dimensions.get('window').width,
    );
    const [screenHeight, setScreenHeight] = useState(
      Dimensions.get('window').height,
    );
    useEffect(() => {
      const updateScreenWidth = () => {
        setScreenWidth(Dimensions.get('window').width);
      };
      const updateScreenHeight = () => {
        setScreenHeight(Dimensions.get('window').height);
      };
  
      Dimensions.addEventListener('change', updateScreenWidth);
      Dimensions.addEventListener('change', updateScreenHeight);
      // return () => {
      //   Dimensions.removeEventListener('change', updateScreenWidth);
      // };
    }, []);
    const getSubtitle=()=>{
      const regex = /<text start="([\d.]+)" dur="([\d.]+)">([^<]+)<\/text>/g;;

      let match;
      const result = [];
      
      // Lặp qua mỗi kết quả tìm được từ biểu thức chính quy
      console.log('a9')
      while ((match = regex.exec(subtitles)) !== null) {
        // match[1] là giá trị start, match[2] là giá trị dur, match[3] là nội dung văn bản
        const item = {
          start: parseInt(match[1]),
          dur: parseInt(match[2]),
          text: match[3]
        };
        result.push(item);
      }
      setListSub(result)
    }
    useEffect(()=>{
      getSubtitle()
    },[]);
    return (
      <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity
            style={{marginLeft: '2%'}}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
        </View>
        {/* <WebView source={{ uri: `https://www.youtube.com/watch?v=${idvideo}` }} /> */}
        <YoutubePlayer
          height={300}
          play={true}
          videoId={idvideo}
          ref={videoRef}
          onReady={onReady}
        />
          <Text style={styles.title}>{name}</Text>
         {/* <ScrollView style={{ marginTop: 7, alignSelf:'center' }}> */}
         {listSub.length!=0&&<FlatList
         style={{width:screenWidth, alignSelf:'center'}}
          data={listSub}
          ref={flatListRef}
          extraData={curIndex}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{width:screenWidth*0.9, padding:3, backgroundColor:index==curIndex?PRIMARY_COLOR:card_color, alignSelf:'center', marginTop:3}}
              onPress={() => {
                if(isReady){
                  videoRef.current.seekTo(parseFloat(item.start), true);
                }
              }}>
              <Text style={{color:'black'}}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />}

        
       
      
      </View>
    );
  };
  const styles = StyleSheet.create({
    headerContainer: {
      height: 55,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#9ACC1C',
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    header: {
      textAlign: 'left',
      color: 'white',
      fontSize: 20,
      marginLeft: 15,
      width: '90%',
    },
    pdf: {
      flex: 1,
      width: width,
      height: height,
    },
    title: {
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
      padding: 10,
      backgroundColor: card_color,
    },
  });
  export default PlayVideo;
  