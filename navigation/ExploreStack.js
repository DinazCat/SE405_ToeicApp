import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreScreen from '../msteam/ExploreScreen';
import NewsScreen from '../msteam/NewsScreen';
import DetailExplore from '../msteam/DetailExplore';
import StoryScreen from '../msteam/StoryScreen';
import GrammarScreen from '../msteam/GrammarScreen';
import VideoScreen from '../msteam/VideoScreen';
import DetailVideo from '../msteam/DetailVideo';
import PlayVideo from '../msteam/PlayVideo';

const Stack = createNativeStackNavigator();
export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="DetailExplore"
        component={DetailExplore}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="StoryScreen"
        component={StoryScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="GrammarScreen"
        component={GrammarScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="DetailVideo"
        component={DetailVideo}
        options={{header: () => null}}
      />
       <Stack.Screen
        name="PlayVideo"
        component={PlayVideo}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
