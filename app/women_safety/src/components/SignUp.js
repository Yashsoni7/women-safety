import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableHighlight, AsyncStorage } from 'react-native'

const {baseUrl} = require('../config');

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            phu : '',
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
                    name: this.state.name,
                }),
            });

            console.log('resp ',response);
            
            // let res =await response.json();

            await AsyncStorage.setItem('phone_number', this.state.phu);

            // console.log('res ',res);
            if(response.status === 200){
                this.props.navigation.navigate('Otp');
            }else{
                Alert.alert("Something went Wrong!")
            }


        
        } catch (error) {
                
            console.error(error);
        }

} 

    render() {
        return (
            <View style={{flex:1, justifyContent:"center",alignContent:'center', alignItems:'center'}}>
                <View style={{width:200,height:200, justifyContent:"center",alignContent:'center', alignItems:'center'}}>
                  
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
                            <Text>SUBMIT</Text>
                        </TouchableHighlight>
                    </View>
                  
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
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: 'black',
        width: 100,
        // textColor: 'red',
        alignItems: 'center',
        fontSize: 19,
        fontWeight: 'bold',
    },
});

