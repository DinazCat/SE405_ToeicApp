import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AppStyle from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';

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

const GrammarScreen = ({navigation}) => {
  const [open, setOpen] = useState('');
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
                item.topic.map(topic => (
                  <TouchableOpacity
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
});

export default GrammarScreen;
