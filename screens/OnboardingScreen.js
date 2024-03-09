import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
            backgroundColor: '#C7FFAC',
            image: <Image style={styles.img} source={require('../assets/english.png')} />,
            title: 'TOEIC Practicing with Coco',
            subtitle: 'The app for TOEIC test-takers',
            },
        {
            backgroundColor: '#F5FFA0',
            image: <Image style={styles.img} source={require('../assets/test.png')} />,
            title: 'Manifold Practice Tests',
            subtitle: 'A variety of practice tests and answers covering all parts of the TOEIC test',
        },
        {
            backgroundColor: '#FFB2D8',
            image: <Image style={styles.img} source={require('../assets/group.png')} />,
            title: 'Community Network',
            subtitle: 'You can ask and discuss with other leaners on the app, which help you to enhance your skills',
        }, 
        {
            backgroundColor: '#A8D2FF',
            image: <Image style={styles.img} source={require('../assets/pie-chart.png')} />,
            title: 'Detailed Perfomance Stistics',
            subtitle: 'The scores, time spent on each skill and skills that need improvement will be promtly informed to you',
        },   
      ]}
    />
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
  }
})