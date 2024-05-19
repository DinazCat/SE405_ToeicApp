import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExploreCard from '../ComponentTeam/ExploreCard';

const news = [
  {
    title: 'Freak robot made in China can learn, think, work like humans',
    category: 'News',
    image:
      'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-The-S1-AI-powered-robot-is-outpacing-humans-big-time.jpg?ve=1&tl=1',
    content:
      "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
  },
  {
    title:
      'They were pretty much everywhere: This Cambridge couple pulled more than a dozen ticks off their dog',
    category: 'News',
    image:
      'https://s.yimg.com/ny/api/res/1.2/VYlhqR4uSjs7fLACw.dyNQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNjA0O2NmPXdlYnA-/https://media.zenfs.com/en/cbc.ca/a1b99925f20ac93d5fc54417a20f7606',
    content:
      "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
  },
  {
    title: 'How to change camera zoom levels on your iPhone',
    category: 'News',
    image:
      'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-How-to-change-camera-zoom-levels-on-your-iPhone.jpg?ve=1&tl=1',
    content:
      "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
  },
  {
    title:
      '20 Office Expressions to Describe Your Workplace - Visual Vocabulary',
    category: 'News',
    image: 'https://i.ytimg.com/vi/_B2OYMuaXD4/maxresdefault.jpg',
    content:
      "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
  },
];

const NewsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>News</Text>
      </View>

      <ScrollView style={{padding: 10}}>
        <FlatList
          data={news}
          renderItem={({item}) => (
            <ExploreCard item={item} navigation={navigation} />
          )}
        />
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    zIndex: -1,
  },
});

export default NewsScreen;
