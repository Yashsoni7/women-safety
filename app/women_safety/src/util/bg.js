import BackgroundTask from 'react-native-background-task';

import getLocation from '../util/GetLocation';
import SendSMS from '../util/SendSMS';

const URL = require('../config');

module.exports = {

    define:async function(){

        console.log('sending alert');
        

        // get 5 contacts *
        // click picture
        // upload picture and get its url  
        // send sms *

        try {

            let url = URL.baseUrl + URL.Report;
            let location =  await getLocation();
            let phu = await AsyncStorage.getItem('phone_number');

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

            contacts.forEach(num => {

                let success = await SendSMS(num,helpMsg);
                
            });
        
            
            
        } catch (error) {
            console.error("error in task ",error);
        
        
        }

        
    }.bind(this),

    checkStatus: async function() {
        const status = await BackgroundTask.statusAsync()
        
        if (status.available) {
            console.log('running bg');
            return
        }
        
        const reason = status.unavailableReason
        if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
            Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
        } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
            Alert.alert('Restricted', 'Background tasks are restricted on your device')
        }
    }.bind(this),
    
    startAlert: function(){
        console.log('alert started ');

        BackgroundTask.schedule({
            period: 5*60, // Aim to run every 30 mins - more conservative on battery
          });
          
          // Optional: Check if the device is blocking background tasks or not
          this.checkStatus();
    
    }.bind(this),

}


