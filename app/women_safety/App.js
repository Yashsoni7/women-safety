/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SignUp from './src/components/SignUp';
import Home from './src/components/Home';
import SplashScreen from './src/components/SplashScreen';
import Otp from './src/components/Otp';
import Camera from './src/components/Camera';

let { define } = require('./src/util/bg');

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BackgroundTask from 'react-native-background-task'


BackgroundTask.define(async () => {
  await define();
  BackgroundTask.finish()
})


const Stack = createStackNavigator();


const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SplashScreen" component={SplashScreen}/> 
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
