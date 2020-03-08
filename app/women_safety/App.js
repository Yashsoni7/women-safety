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
  DeviceEventEmitter
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

  console.log('starting bg alert');
        
  // get 5 contacts *
  // send sms *

  try {

      let url = URL.baseUrl + URL.Report;
      // let location =  await getLocation();
      let phu = await AsyncStorage.getItem('phone_number');

      if(phu === null) phu = '918828183820';

      let body = {
          number : phu,
          // lattitude : location.latitude,
          // longitude : location.longitude,
      }

      console.log('sending to ',url,body);
      

      let response = await fetch(url,{
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });


      console.log('resp ',response);

      
      let res = await response.json();

      // {
      //     "emergency_contact1": 1,
      //     "emergency_contact2": 1,
      //     "emergency_contact3": 1,
      //     "emergency_contact4": 1,
      //     "emergency_contact5": 1,
      //     "address": "90 Feet Road, Dharavi, Zone 2, Mumbai, Mumbai City, Maharashtra, BOUNDARY, India"
      // }
      console.log('res ',res);
  
      let contacts=[];
      for(let i=1;i<=5;i++){
          
          if(res[`emergency_contact${i}`])
              contacts.push(res[`emergency_contact${i}`]);
      
      }    

      let helpMsg = await AsyncStorage.getItem('helpMsg');
      // let contacts = await AsyncStorage.getItem('contacts');

      if(helpMsg === null) helpMsg = "please help me i am in distress";
      // if(contacts !==null) contacts = JSON.parse(contacts);

      contacts.forEach(async num => {
          console.log('sendin msg to ',num);
          let success = await SendSMS(num,helpMsg);
          
      });
      
      
  } catch (error) {
      console.error("error in task ",error);
  }

  BackgroundTask.finish();
});


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
