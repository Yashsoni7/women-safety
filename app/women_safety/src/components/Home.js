import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'
import getLocation from '../util/GetLocation';
import SendSMS from '../util/SendSMS';
import Camera from '../components/Camera';

import {baseUrl} from '../config';

import BackgroundTask from 'react-native-background-task';

import BGModule from '../util/BGModule';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            helpTxt:'',
            contacts:['',],
            message : '',
            isListening:false,
        };
    }


    row (index){

        return(
            <View style={styles.row}>
                <TextInput
                    style={{height: 40,width:100, borderColor: 'gray', borderWidth: 1, margin:5}}
                    onChangeText={(number) => {
                        let contacts = this.state.contacts;
                        contacts[index] = number;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index]}
                />       
            </View>
        )
    };    

    _onPressButton(){
        let contacts = this.state.contacts;
        if(contacts.length>=5) return;

        contacts.push('');
        this.setState({contacts});
    }

    async sendMsg(){
        try {
            await this.sendLocation()
            const phu = await AsyncStorage.getItem('phone_number');
            const url = baseUrl + '/user/contacts/'
            let response = await fetch(url,{
                method : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone_number : phu,
                }),
            })
            console.log("HIIIII",response.json())
            const ph_no = '8828183820'
            const msg = `Please Help Me.I am in Trouble.Address ${this.state.message} `
            let success = await SendSMS(ph_no,msg);
        } catch (error) {
            console.error(error);
        }
    }    

    async sendLocation(){
        const location =  await getLocation();
        let lat = location.latitude;
        let long = location.longitude;
        console.log(lat);
        let url = baseUrl+'/crime/report/';

        try {

            const phu = await AsyncStorage.getItem('phone_number');
            // console.log(phu);
            
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number : phu,
                    lattitude : lat,
                    longitude : long,
            }),
        });

            console.log('resp ',response);
            
            let res =await response.json();

            console.log('res ',res);
            this.setState({
                message : res.address,
            });
        
        } catch (error) {    
            console.error(error);
        }

    }

    async sendContacts(){
        let url = baseUrl + '/user/signup/';

        try {

            // const phu = await AsyncStorage.getItem('phone_number');
            // console.log(phu);
            const phu = await AsyncStorage.getItem('phone_number');

            let body = {}
            body["phone_number"] = phu ;
            console.log(this.state.contacts)
            this.state.contacts.forEach((item,index,array) => {
                console.log(item)
                body[`emergency_contact${index+1}`] = item;
            });
            console.log(body)
                 
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
        });

            console.log('resp ',response);
            
            let res = await response.json();

            console.log('res ',res);
        } catch (error) {
            console.error(error);
        }

    }

    sendPics(){
        this.props.navigation.navigate('Camera');
    }


    async checkStatus() {
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
    }
    
    startAlert(){
        console.log('alert clicked ');

        this.setState({isListening:true});    
        // BackgroundTask.schedule({
        //     period: 5*60, // Aim to run every 30 mins - more conservative on battery
        //   });
          
        //   // Optional: Check if the device is blocking background tasks or not
        //   this.checkStatus();

        BGModule.startNoti();
    }



    render() {

        let rows = this.state.contacts.map((item, i) => {
            return this.row(i);
        });


        return (
            <View style={{flex:1}}>
                {/* <View style={styles.helpmsg} >
                    <Text style={{}}> HELP MSG:</Text>
                    <TextInput 
                        style={{height: 40,width:300, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        value={this.state.helpText}
                    />
                </View> */}
                <View style={{flex:8}}>
                    <View style={styles.contactHeader}>
                        <Text>Contacts:</Text>
                        <TouchableHighlight   onPress={()=>this._onPressButton()}>
                            <View style={styles.contactAddBtn}>
                                <Text>+</Text>
                            </View>
                        </TouchableHighlight>
                            <View style={styles.button}>
                                <TouchableHighlight
                                    onPress={()=>this.sendContacts()}
                                >
                                <Text>Save SOS Contacts</Text>
                            </TouchableHighlight>
                        </View>    
                    </View>
                <View style={styles.row}>
                    <Text style={{height: 20,width:100,paddingLeft:20,justifyContent:"center",alignContent:'center', alignItems:'center'}} > Number </Text>       
                </View>
                    {rows}
                </View>
                <View style={styles.center,{flex:4}}>

                    <View style={styles.center,this.state.isListening?styles.btnOn:styles.btnDefault}>
                        <TouchableHighlight style={styles.center} onPress={()=>this.startAlert()}>
                            <Text style={styles.center,{paddingTop:7}}>Start Listening</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.center,{flex:3,flexDirection:'row',justifyContent:'space-evenly',margin:10,paddingTop:10}}>       
                        <View style={styles.center,styles.button,{margin:10}}>
                            <TouchableHighlight
                                onPress={()=>this.sendMsg()}
                            >
                            <Text>Send Message</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.center,styles.button,{margin:10}}>
                            <TouchableHighlight
                                onPress={()=>this.sendPics()}
                            >
                            <Text>Send Location Pics</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
 
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    helpmsg:{
        flex:1,
        flexDirection: 'row',
        justifyContent:"center",alignContent:'center', alignItems:'center',
        borderColor:'red',
        borderWidth:2,
        margin:5,
    },
    contactHeader:{
        flexDirection:'row',
        justifyContent:"center",alignContent:'center', alignItems:'center',
        margin:5,

    },
    contactAddBtn:{
        width:50,
        justifyContent:"center",alignContent:'center', alignItems:'center',
        margin:5,
    },
    row:{
        flexDirection:'row', justifyContent:"center",alignContent:'center', alignItems:'center',
        margin:5,
    
    },
    center:{
        justifyContent:"center",alignContent:'center', alignItems:'center',alignSelf:'center',flex:1
    },

    btnDefault:{flex:1,borderColor:'brown',borderWidth:2, marginHorizontal:40},
    btnOn:{flex:1,borderColor:'brown',borderWidth:2, marginHorizontal:40,backgroundColor:'brown'}

});

