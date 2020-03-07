import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native'


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

    onSubmit = (phu) => {
        //Alert.alert("Form Submitted");
        url = 'https://4f2677e1.ngrok.io/user/number/';
        fetch(url,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phu: phu,
            }),
        })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });
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
                    <Button
                        title="Sign Up"
                        color="#0f0f0f"
                        onPress={this.onSubmit(this.state.phu)}
                    />
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

