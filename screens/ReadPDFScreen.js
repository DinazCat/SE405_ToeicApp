import { View, Text,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Pdf from 'react-native-pdf';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width,height} = Dimensions.get('window');
const ReadPDFScreen = ({navigation,route}) =>{
    const {link} = route.params
    // useEffect(() => {
    //     console.log(route.params.link)
    //   }, []);
  return (
    <View  style={styles.container}>
                <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name={'arrow-left'} style={{color: '#222', fontSize: 25, padding: 5, marginHorizontal: 5}} />
          </TouchableOpacity>
        </View>
        <Pdf
        trustAllCerts={false}
                    source={{ uri: link }}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                       // console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        //console.log(error);
                    }}
                    onPressLink={(uri) => {
                        //console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
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
pdf: {
    flex:1,
    width:width,
    height:height,
}
})
export default ReadPDFScreen