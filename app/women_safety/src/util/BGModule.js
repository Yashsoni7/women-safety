/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 */
import {NativeEventEmitter,NativeModules, AsyncStorage }  from 'react-native';
import invokeApp from 'react-native-invoke-app';

import BackgroundTask from 'react-native-background-task';
import getLocation from '../util/GetLocation';
import SendSMS from '../util/SendSMS';


const bg = require('./bg');

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
eventEmitter.addListener('updateLocation',async (event) => {
    console.log('event received in js ');
    console.log(event);


    //Alert is pressed

    // push alert in db

    // start background task every 5 mins

    // BackgroundTask.schedule({
    //     period: 180, // Aim to run every 30 mins - more conservative on battery
    // });

    console.log('in BGModule');
        

    // // const yourObject = { route: "Home" };

    // // invokeApp({
    // //     data: yourObject,
    // // });

    // // get 5 contacts *
    // // send sms *

    // try {

    //     let url = URL.baseUrl + URL.Report;
    //     let location =  await getLocation();
    //     let phu = await AsyncStorage.getItem('phone_number');

    //     if(phu === null) phu = '918828183820';

    //     console.log('number ',phu);

    //     let body = {
    //         number : phu,
    //         // lattitude : location.latitude,
    //         // longitude : location.longitude,
    //     }

    //     console.log('sending to ',url,body);
        

    //     let response = await fetch(url,{
    //         method: 'POST',
    //         headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body),
    //     });


    //     console.log('resp ',response);

        
    //     let res = await response.json();

    //     // {
    //     //     "emergency_contact1": 1,
    //     //     "emergency_contact2": 1,
    //     //     "emergency_contact3": 1,
    //     //     "emergency_contact4": 1,
    //     //     "emergency_contact5": 1,
    //     //     "address": "90 Feet Road, Dharavi, Zone 2, Mumbai, Mumbai City, Maharashtra, BOUNDARY, India"
    //     // }
    //     console.log('res ',res);
    
    //     let contacts=[];
    //     for(let i=1;i<=5;i++){
            
    //         if(res[`emergency_contact${i}`])
    //             contacts.push(res[`emergency_contact${i}`]);
        
    //     }    

    //     let helpMsg = await AsyncStorage.getItem('helpMsg');
    //     // let contacts = await AsyncStorage.getItem('contacts');

    //     if(helpMsg === null) helpMsg = "please help me i am in distress";
    //     // if(contacts !==null) contacts = JSON.parse(contacts);

    //     contacts.forEach(async num => {
    //         console.log('sendin msg to ',num);
    //         let success = await SendSMS(num,helpMsg);
            
    //     });
        
        
    // } catch (error) {
    //     console.error("error in task ",error);
    
    // }

    // await bg.test();

    // console.log('should be scheduled');
    

});

module.exports = NativeModules.BGmodule;