import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'
import getLocation from '../util/GetLocation';
import SendSMS from '../util/SendSMS';

const {baseUrl} = require('../config');



export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            helpTxt:'',
            contacts:[{
                number:'12345678',
                name:'adfdgg'
            }],
            message : '',
        };
    }


    row (index){

        return(
            <View style={styles.row}>
                <TextInput
                    style={{height: 40,width:100, borderColor: 'gray', borderWidth: 1, margin:5}}
                    onChangeText={(name) => {
                        let contacts = this.state.contacts;
                        contacts[index].name = name;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index].name}
                />
                <TextInput
                    style={{height: 40,width:100, borderColor: 'gray', borderWidth: 1, margin:5}}
                    onChangeText={(number) => {
                        let contacts = this.state.contacts;
                        contacts[index].number = number;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index].number}
                />       
            </View>
        )
    };    

    _onPressButton(){
        let contacts = this.state.contacts;
        if(contacts.length>=5) return;
        
        contacts.push({
            number:'',
            name:''
        });
        this.setState({contacts});
    };

    async sendMsg(){
        try {
            let success = await SendSMS('9930440152',this.state.message);
            this.setState({
                helpText : '',
            })
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

            // const phu = await AsyncStorage.getItem('phone_number');
            // console.log(phu);
            
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number : '918779079797',
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

    render() {

        let rows = this.state.contacts.map((item, i) => {
            return this.row(i);
        });


        return (
            <View style={{flex:1}}>
                <View style={styles.helpmsg} >
                    <Text style={{}}> HELP MSG:</Text>
                    <TextInput 
                        style={{height: 40,width:300, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        value={this.state.helpText}
                    />
                </View>
                <View style={{flex:8}}>
                    <View style={styles.contactHeader}>
                        <Text>Contacts:</Text>
                        <TouchableHighlight   onPress={()=>this._onPressButton()}>
                            <View style={styles.contactAddBtn}>
                                <Text>+</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                <View style={styles.row}>
                    <Text style={{height: 20,width:100,paddingLeft:20,justifyContent:"center",alignContent:'center', alignItems:'center'}}> Name </Text>
                    <Text style={{height: 20,width:100,paddingLeft:20,justifyContent:"center",alignContent:'center', alignItems:'center'}} > Number </Text>       
                </View>
                    {rows}
                </View>
                
                <TouchableHighlight onPress={()=>this.startAlert()}>
                    <View style={styles.center,{backgroundColor:'red',width:150,height:70}}>
                    <Text>ALERT</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.center,{flex:1}}>       
                    <View style={styles.button}>
                        <TouchableHighlight
                            onPress={()=>this.sendLocation()}
                        >
                        <Text>Send Location</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.center,{flex:1}}>       
                    <View style={styles.button}>
                        <TouchableHighlight
                            onPress={()=>this.sendMsg()}
                        >
                        <Text>Send Message</Text>
                        </TouchableHighlight>
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
        justifyContent:"center",alignContent:'center', alignItems:'center',
    }

});

