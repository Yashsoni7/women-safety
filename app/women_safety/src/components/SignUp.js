import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableHighlight, AsyncStorage } from 'react-native'

const {baseUrl} = require('../config');

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            otp : '',
            phu : '',
            ph1 : '',
            ph2 : '',
            ph3 : '',
            ph4 : '',
            ph5 : '', 
        }
    }

    async onSubmit(){
        //Alert.alert("Form Submitted");
        let url = baseUrl+'/user/number/';

        
        console.log('url ',url);

        try {
            
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: this.state.phu,
                }),
            });

            console.log('resp ',response);
            
            let res =await response.json();

            await AsyncStorage.setItem('phone_number', this.state.phu);

            console.log('res ',res);

            this.props.navigation.navigate('Otp');

        
        } catch (error) {
                
            console.error(error);
        }

} 

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.text} >
                    <Text> Name: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(name) => this.setState({name : name})}
                        value={this.state.name}
                    />
                </View>
                <View style={styles.text} >
                    <Text> Phone Number: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(phu) => this.setState({phu : phu})}
                        value={this.state.phu}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress={()=>this.onSubmit()}
                    >
                        <Text>submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    text:{
        flex:1,
    },
    button:{
        justifyContent: 'space-between',
    },
});

