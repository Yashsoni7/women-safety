/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 */
import {NativeEventEmitter,NativeModules} from 'react-native';

import BackgroundTask from 'react-native-background-task';

const bg = require('./bg');

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
eventEmitter.addListener('updateLocation', (event) => {
    console.log('event received in js ');
    console.log(event);


    //Alert is pressed

    // push alert in db

    // start background task every 5 mins

    bg.startAlert();

});

module.exports = NativeModules.BGmodule;