import SmsAndroid from 'react-native-get-sms-android';
import getLocation from '../util/GetLocation';
import SendSMS from '../util/SendSMS';
import { AsyncStorage } from 'react-native';

const URL = require('../config');

module.exports = async (taskData) => {
  
    console.log('inside headless js');

    try {

        let url = URL.baseUrl + URL.Report;
        let location =  await getLocation();
        let phu = await AsyncStorage.getItem('phone_number');

        if(phu === null) phu = '918828183820';

        console.log('number ',phu);

        let body = {
            number : phu,
            lattitude : location.latitude,
            longitude : location.longitude,
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
            
            SmsAndroid.autoSend(
                num,
                helpMsg,
                (fail) => {
                    console.log('Failed with this error: ' + fail);
                    reject(fail)
                },
                (success) => {
                    console.log('SMS sent successfully');
                    resolve(success);
                },
            ); 
            
        });
        
        
    } catch (error) {
        console.error("error in task ",error);
    
    }

  };