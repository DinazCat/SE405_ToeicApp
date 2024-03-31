import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsignmentCard from '../ComponentTeam/AsignmentCard';
import AppStyle from '../theme';

const AsignmentScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const UpcommingAsignments = [
    {
      Date: '23-3-2023 Sat',
      Asignments: [
        {
          Title: 'Bài tập 1',
          Class: 'Lớp luyện SW 150+',
          Due: '22:00 Saturday, 23 March 2023',
        },
        {
          Title: 'Bài tập reading 1-5',
          Class: 'Lớp luyện RL 750+',
          Due: '23:30 Saturday, 23 March 2023',
        },
      ],
    },
    {
      Date: '25-3-2024 Mon',
      Asignments: [
        {
          Title: 'Bài tập quay vid speaking topic Family',
          Class: 'Lớp luyện SW 150+',
          Due: '12:00 Monday, 25 March 2023',
        },
      ],
    },
  ];
  const PastDueAsignments = [];
  const CompletedAsignments = [];
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.upzone}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
          }}>
          Asignment
        </Text>
      </View>
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 0 ? '#FFFBC4' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(0)}>
          <Text style={styles.tabFont}>Upcomming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 1 ? '#F1A3A2' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(1)}>
          <Text style={styles.tabFont}>Past due</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            {
              backgroundColor: selectedTab == 2 ? '#9CD8FF' : '#f0f0f0',
            },
          ]}
          onPress={() => setSelectedTab(2)}>
          <Text style={styles.tabFont}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.devider} />
      {selectedTab == 0 && (
        <>
          {UpcommingAsignments.map((item, key) => (
            <>
              <Text style={styles.DateText}>{item.Date}</Text>
              {item.Asignments.map((item1, key) => (
                <AsignmentCard
                  key={key}
                  item={item1}
                  onPress={() =>
                    navigation.navigate('AsignmentDetail', {asignment: item1})
                  }
                />
              ))}
            </>
          ))}
        </>
      )}
      {selectedTab == 1 && (
        <>
          {UpcommingAsignments.map((item, key) => (
            <>
              <Text style={styles.DateText}>{item.Date}</Text>
              {item.Asignments.map((item1, key) => (
                <AsignmentCard key={key} item={item1} />
              ))}
            </>
          ))}
        </>
      )}
      {selectedTab == 2 && (
        <>
          {UpcommingAsignments.map((item, key) => (
            <>
              <Text style={styles.DateText}>{item.Date}</Text>
              {item.Asignments.map((item1, key) => (
                <AsignmentCard key={key} item={item1} />
              ))}
            </>
          ))}
        </>
      )}
    </View>
  );
};

export default AsignmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  tabItem: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 7,
  },
  tabFont: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  devider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DDD',
    marginVertical: 2,
  },
  DateText: {
    marginLeft: 15,
    marginVertical: 5,
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
});
