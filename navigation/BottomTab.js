import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useContext, useEffect} from 'react'
import TeamStack from './TeamStack';
import ChatStack from './ChatStack';
import AgendaStack from './AgendaStack';
import AsignmentStack from './AsignmentStack';
import TeacherStack from './TeacherStack';
import TeacherStack_tc from './TeacherStack_tc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from './AuthProvider';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { isTeacher } = useContext(AuthContext);
  const getIconColor = focused => ({
    color: focused ? PRIMARY_COLOR : 'black',
  });
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Class"
        component={TeamStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon name={'school'} size={20} style={[getIconColor(focused)]} />
              <Text style={[getIconColor(focused)]}>Class</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={AgendaStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon
                name={'calendar'}
                size={20}
                style={[getIconColor(focused)]}
              />
              <Text style={[getIconColor(focused)]}>Agenda</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon
                name={'rocketchat'}
                size={20}
                style={[getIconColor(focused)]}
              />
              <Text style={[getIconColor(focused)]}>Chat</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Assignment"
        component={AsignmentStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon
                name={'feather'}
                size={20}
                style={[getIconColor(focused)]}
              />
              <Text style={[getIconColor(focused)]}>Assignment</Text>
            </View>
          ),
          tabBarVisible: false,
        }}
      />
      {!isTeacher&&<Tab.Screen
        name="Teacher"
        component={TeacherStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon name={'users'} size={20} style={[getIconColor(focused)]} />
              <Text style={[getIconColor(focused)]}>Teacher</Text>
            </View>
          ),
        }}
      />}
            {isTeacher&&<Tab.Screen
        name="Teacher"
        component={TeacherStack_tc}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Icon name={'users'} size={20} style={[getIconColor(focused)]} />
              <Text style={[getIconColor(focused)]}>Teacher</Text>
            </View>
          ),
        }}
      />}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 56,
    bottom: 0,

    //borderTopColor: "transparent",
    shadowColor: '#000',
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  tabBar2: {
    position: 'absolute',
    padding: 0,
    left: 16,
    right: 16,
    bottom: 32,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderTopColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  tabIconContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BottomTab;
