import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExploreCard = ({navigation, item}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (item.category === 'Video')
          navigation.push('DetailVideo', {video: item});
        else navigation.push('DetailExplore', {news: item});
      }}>
      <View style={styles.content}>
        <View style={styles.category}>
          <MaterialCommunityIcons
            name={
              item.category === 'News'
                ? 'newspaper-variant'
                : item.category === 'Video'
                ? 'play-box'
                : item.category === 'Story' && 'book-open'
            }
            size={20}
            color={
              item.category === 'News'
                ? '#15A853'
                : item.category === 'Video'
                ? '#CB3742'
                : item.category === 'Story' && '#30B1CE'
            }
          />
          <Text
            style={{
              color:
                item.category === 'News'
                  ? '#15A853'
                  : item.category === 'Video'
                  ? '#CB3742'
                  : item.category === 'Story' && '#30B1CE',
              fontWeight: '500',
            }}>
            {item.category}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Image
        source={
          item.category === 'Video' ? {uri: item.thumbnail} : {uri: item.image}
        }
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    marginTop: 10,
  },
  content: {
    flexDirection: 'column',
    maxWidth: '72%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  category: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default ExploreCard;
