import { View, Text,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Pdf from 'react-native-pdf';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import VideoPlayer from 'react-native-video-player'
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');
const FileViewScreen = ({navigation,route}) =>{
    const {link,sign, name} = route.params
    const [url, setURL] = useState('')
//   const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${docUrl}`;
    // useEffect(() => {
    //     console.log(route.params.link)
    //   }, []);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
useEffect(() => {
  const updateScreenWidth = () => {
    setScreenWidth(Dimensions.get('window').width);
  };
  const updateScreenHeight= () => {
    setScreenHeight(Dimensions.get('window').height);
  };

  Dimensions.addEventListener('change', updateScreenWidth);
  Dimensions.addEventListener('change', updateScreenHeight);
  // return () => {
  //   Dimensions.removeEventListener('change', updateScreenWidth);
  // };
}, []);
    const getlinkfromnodejs = async()=>{
        console.log('h1')
        if(sign=='fileWord'){
            const response = await fetch(`http://192.168.1.26:3000/getfilehtml/${link}`).catch((e)=>console.log(e))
            const data = await response.json();
            setURL(data.html)
        }
        else if(sign == 'fileImage'){
            const response = await fetch(`http://192.168.1.26:3000/getfilebase64/${link}`).catch((e)=>console.log(e))
            const data = await response.json();
            const base64 = `data:image/jpg;base64,${data.base64}`;
            setURL(base64)
        }
        else if(sign == 'fileMp4'){
          const response = await fetch(`http://192.168.1.26:3000/getfilebase64/${link}`).catch((e)=>console.log(e))
          const data = await response.json();
          const base64 = `data:video/mp4;base64,${data.base64}`;
          const html = `
          <html>
            <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
              <video controls style="width: 100%; height: auto;">
                <source src="data:video/mp4;base64,${data.base64}" type="video/mp4">
              </video>
            </body>
          </html>
        `;
        setURL(html)
      }
        else if(sign == 'filePDF'){
            const response = await fetch(`http://192.168.1.26:3000/getfilebase64/${link}`).catch((e)=>console.log(e))
            const data = await response.json();
            setURL(data.base64)
        }
        else if(sign == 'filePPT'){
            setURL(`https://docs.google.com/gview?embedded=true&url=https://${link}`)
        }
    }
    useEffect(() => {
        getlinkfromnodejs();
      }, []);

     
  return (
    <View  style={styles.container}>
                 <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>{name}</Text>
      </View>
      {url!=''&& sign=='fileMp4'&&<WebView 
      style={{ flex: 1 }} 
      source={{ html:url
     }}> 
   </WebView>}
        {url!=''&& sign=='fileImage'&& <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Image
             style={{ width: screenWidth*0.9, height: screenHeight, alignSelf:'center'}}
             resizeMode='contain'
          source={{
            uri: url
          }}
        />
          </View>}
        
       {url!=''&& sign=='fileWord'&& <WebView
        source={{ html: url }}

        style={{ flex: 1 }} />}

       {url!=''&&sign=='filePDF'&&<Pdf
        source={{ uri: `data:application/pdf;base64,${url}` }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.error(error);
        }}
        style={styles.pdf}
      />}
       {/* {sign=='fileMp4'&&<View style={{ flex: 1 }}>
       <VideoPlayer
            video={{uri:`https://`+link}}
            videoWidth={400}
            videoHeight={300}
            // disableControlsAutoHide={true}
            // disableSeek={true}
            showDuration={true}
            fullScreenOnLongPress={true}
            endThumbnail={{uri:'https://tse1.mm.bing.net/th?id=OIP.pENsrXZ3F7yXMHHRIHS22QHaEK&pid=Api&rs=1&c=1&qlt=95&w=192&h=108'}}
          />
       </View>} */}
           
    </View>
  );
}
const styles = StyleSheet.create({
headerContainer:{
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
    width:'90%'
  },
pdf: {
    flex:1,
    width:width,
    height:height,
}
})
export default FileViewScreen