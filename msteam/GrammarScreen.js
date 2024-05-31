import {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import axios from 'axios';
import { GrammarContext, ContentProvider } from './GrammarContext';
import { AuthContext } from '../navigation/AuthProvider';

const grammar = [
  {
    title: 'Noun',
    topic: ['Noun', 'Compound Noun', 'Pronouns', 'Noun phrase'],
  },
  {
    title: 'Verb',
    topic: ['Verb', 'Modal verb'],
  },
];

const GrammarScreen = ({navigation, route}) => {
  const {loading, articleContent, articleContent2} = useContext(GrammarContext);
  const [open, setOpen] = useState('');
  useEffect(()=>{
    console.log(loading)
  },[])
  if (articleContent?.length==0&&articleContent2?.length==0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.header}>Grammar</Text>
      </View>

      <ScrollView style={{padding: 10, paddingTop: 20}}>
        <FlatList
          data={grammar}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 10, gap: 10}}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => setOpen(item.title)}>
                <Text style={styles.title}>
                  {index + 1}. {item.title}
                </Text>
                {item?.topic?.length !== 0 && (
                  <Ionicons
                    name={open === item.title ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="white"
                  />
                )}
              </TouchableOpacity>
              {open === item.title &&
                item.topic &&
                item.topic.map((topic,index) => (
                  <TouchableOpacity
                  onPress={()=>{
                    if(item.title=='Noun'&&articleContent!=null){
                      console.log('hi')
                      navigation.push('DetailExplore', {news:{html:articleContent[index],category:'grammar'}});
                    }
                    else if(item.title=='Verb'&&articleContent2!=null){
                      navigation.push('DetailExplore', {news:{html:articleContent2[index],category:'grammar'}});
                    }
                  }}
                    style={{
                      marginHorizontal: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      backgroundColor: card_color,
                      borderRadius: 50,
                    }}>
                    <Text style={{fontSize: 16, color: 'black'}}>{topic}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        />
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GrammarScreen;
