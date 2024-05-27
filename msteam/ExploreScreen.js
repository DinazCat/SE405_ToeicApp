import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../components/CustomHeader';
import ExploreCard from '../ComponentTeam/ExploreCard';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
const categories = [
  {
    title: 'News',
    color: '#15A853',
  },
  {
    title: 'Story',
    color: '#30B1CE',
  },
  {
    title: 'Grammar',
    color: '#E06C30',
  },
  {
    title: 'Videos',
    color: '#CB3742',
  },
];


// const resource = [
//   {
//     title: 'Freak robot made in China can learn, think, work like humans',
//     category: 'News',
//     image:
//       'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-The-S1-AI-powered-robot-is-outpacing-humans-big-time.jpg?ve=1&tl=1',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
//   {
//     title:
//       'They were pretty much everywhere: This Cambridge couple pulled more than a dozen ticks off their dog',
//     category: 'News',
//     image:
//       'https://s.yimg.com/ny/api/res/1.2/VYlhqR4uSjs7fLACw.dyNQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNjA0O2NmPXdlYnA-/https://media.zenfs.com/en/cbc.ca/a1b99925f20ac93d5fc54417a20f7606',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
//   {
//     title: 'How to change camera zoom levels on your iPhone',
//     category: 'News',
//     image:
//       'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1440/810/1-How-to-change-camera-zoom-levels-on-your-iPhone.jpg?ve=1&tl=1',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
//   {
//     title:
//       '20 Office Expressions to Describe Your Workplace - Visual Vocabulary',
//     category: 'Video',
//     time: '20:05',
//     channelImage:
//       'https://yt3.googleusercontent.com/ytc/AIdro_l9vxewHnT2_r54mnV8MBnSzn-aNfxt84V4XtytUZNzqw=s176-c-k-c0x00ffffff-no-rj-mo',
//     channel: 'Oxford',
//     thumbnail: 'https://i.ytimg.com/vi/_B2OYMuaXD4/maxresdefault.jpg',
//   },
//   {
//     title: 'Too Tiny for Tea',
//     category: 'Story',
//     image: 'https://www.englishclub.com/images/kids/s_tiny_tea.gif',
//     content:
//       'Marty Mckay was already five years old, but he was still the baby of the family.\n\n"Can I have some tea too?" Marty asked his mother. She drank her tea from a beautiful cup and stirred it with a silver spoon.\n\n"No, Marty. You\'re too young to drink tea."\n\n"But, why?" Marty asked.\n\n "Because your fingers are too tiny to hold the cup. And tea is too hot for you, baby."\n\n"I\'m not a baby," Marty said. "I\'m five-and-a-half."\n\nMarty went out to the yard. His brother Ralph was playing basketball.\n\n"Can I play too?" Marty asked. Ralph bounced the ball up and down under Marty\'s nose and then threw it into the basket.\n\n"No Marty, you\'re too young to play basketball."\n\n"But, why?" Marty asked.\n\n"Because the basket is too high for you to reach. And the ball is too big for your tiny baby hands," Ralph said.\n\n"I\'m not a baby," Marty said. "I\'m five and three quarters."\n\nMarty went into the kitchen. His sister Jane was getting ready to ride her bicycle to the candy store.\n\n"Can I go to the store to buy candy?" Marty asked Jane. He could feel the wind in his hair and the candy on his tongue.\n\n"No, you\'re too young to go to the store," Jane said.\n\n"But why?" Marty asked.\n\n"Because the store is too far for you to ride to. And your baby bike is too slow."  \n\n"I\'m not a baby," Marty said. "I\'m nearly six."\n\n"Six?" Jane laughed. "You just turned five!"\n\nMarty sat on the grass and watched his sister ride away on her bike. He started to cry. Marty\'s father was washing the car. He heard a tiny cry and went to find out what was wrong.\n\n"Why are you crying?" Marty\'s father asked.\n\n"Because I\'m too tiny to do anything. I wish I weren\'t the youngest one."\n\n"Be careful what you wish for," his father said.\n\nJust then, Marty\'s mother came out to bring Marty\'s dad his tea. She patted her belly and smiled.\n\n"We\'re going to have another baby," his mother said.\n\n"And that means you\'re going to be a big brother," his father said.\n\n"But, I\'m too tiny to be a big brother," Marty said. "I\'m just a baby!"',
//   },
//   {
//     title: 'The Chickens Take a Holiday',
//     category: 'Story',
//     image: 'https://www.englishclub.com/images/kids/s_chickens_chickens.jpg',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
//   {
//     title: 'Good Neighbours',
//     category: 'Story',
//     image: 'https://www.englishclub.com/images/kids/snowy.jpg',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
//   {
//     title: 'INKY-PINKY-POOHINKY-PINKY-POOH',
//     category: 'Story',
//     image: 'https://www.englishclub.com/images/kids/ipp01.gif',
//     content:
//       "Sometimes, you have to see it to believe it.\nAnd in rare cases, like this one, it freaks out observers watching. In the ever-expanding world of humanoid robots, a new star is rising, and its name is Astribot. \nThe Chinese company's latest creation, the S1 model, is turning heads with its astonishing speed and precision.\nImagine a robot that can move at a blistering pace of approximately 32.8 feet per second and handle a payload of 22 pounds per arm. That's Astribot's S1 for you. It's like watching a superhero in action. Only this one is made of wires and metal.\nThe S1's capabilities are not just impressive; they're record-setting. The robot's dexterity is showcased in a video where it performs tasks with such finesse that it can delicately shave a cucumber.\nIt can even engage in the art of calligraphy.\nThat's not all. It can also open and pour wine and flip a sandwich in a frying pan.\nAnd for those who hate ironing and folding laundry, the S1 does that, too.\nThe S1's ability to mimic human movements sets it apart from other robots. This robot is a learner, an imitator and a potential pioneer in robotics. The questions it raises are as intriguing as its abilities. Does it have a lower half? Can it walk, or is it destined to remain stationary? These are the mysteries that have yet to be answered.\nFounded in 2022 in Shenzhen, the Astribot maker Stardust Intelligence has roots that trace back to the Tencent Robotics Laboratory, Baidu, and the Hong Kong Polytechnic University, with its founder, Lai Jie.\nThe S1 took a year to evolve and is expected to hit the market later in 2024. The robot's name, inspired by the Latin proverb \"Ad astra per aspera,\" reflects its journey and commitment to AI robot technology.\nAs Astribot prepares to launch the S1 robot, the world watches with bated breath. Will it revolutionize the way we think about humanoid robots? Will it outshine its competitors and set a new standard in the industry? Can the U.S. keep us with this Chinese technology? Only time will tell. But one thing is certain: the robot wars have begun and Astribot's S1 is leading the charge.\nAs humanoid robots become more adept at tasks traditionally performed by humans, how do you feel about the potential impact on employment and job security? Let us know by writing us at Cyberguy.com/Contact.\nFor more of my tech tips and security alerts, subscribe to my free CyberGuy Report Newsletter by heading to Cyberguy.com/Newsletter.\nAsk Kurt a question or let us know what stories you'd like us to cover.\nAnswers to the most asked CyberGuy questions:\nWhat is the best way to protect your Mac, Windows, iPhone and Android devices from getting hacked?\nWhat is the best way to stay private, secure and anonymous while browsing the web?",
//   },
// ];

const ExploreScreen = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
//articles
useEffect(() => {
  fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=6ab02270c62c48e182bff4ff3ef52b94')
    .then(response => response.json())
    .then(data => {setArticles(data.articles); console.log(data.articles[0])})
    .catch(error => console.error(error));
}, []);
//video
useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: 'TED Talks',
          type: 'video',
          maxResults: 15,
          key: 'AIzaSyAor3Lt0QmIYuT30ZMp3S6PaVyxW65bdfU',
        },
      });
      console.log(response.data.items[0])
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data from YouTube API', error);
    }
  };

  fetchVideos();
}, []);
  return (
    <View style={styles.container}>
      <CustomHeader Title={'Explore'} navigation={navigation} />

      <ScrollView>
        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.push('NewsScreen')}>
            <View style={[styles.icon, {backgroundColor: categories[0].color}]}>
              <MaterialCommunityIcons
                name="newspaper-variant"
                size={40}
                color="white"
              />
            </View>
            <Text style={styles.categoryText}>{categories[0].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.push('StoryScreen')}>
            <View style={[styles.icon, {backgroundColor: categories[1].color}]}>
              <MaterialCommunityIcons
                name="book-open"
                size={40}
                color="white"
              />
            </View>
            <Text style={styles.categoryText}>{categories[1].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.push('GrammarScreen')}>
            <View style={[styles.icon, {backgroundColor: categories[2].color}]}>
              <MaterialCommunityIcons
                name="spellcheck"
                size={40}
                color="white"
              />
            </View>
            <Text style={styles.categoryText}>{categories[2].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.push('VideoScreen')}>
            <View style={[styles.icon, {backgroundColor: categories[3].color}]}>
              <MaterialCommunityIcons name="play-box" size={40} color="white" />
            </View>
            <Text style={styles.categoryText}>{categories[3].title}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          data={articles}
          renderItem={({item}) => (
            <ExploreCard item={{...item,category: 'News'}} navigation={navigation} />
          )}
        />
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  categories: {
    flexDirection: 'row',
    gap: 20,
    padding: 20,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
  },
  icon: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
  },
  list: {
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
    paddingTop: 10,
  },
});

export default ExploreScreen;
