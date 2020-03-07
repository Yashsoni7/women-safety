import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableHighlight, AsyncStorage } from 'react-native'


export default class Otp extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            otp :  '', 
        }
    };

    verifyOTP = async () => {
        let url = baseUrl+'/user/verify/';

        
        console.log('url ',url);

        try {

            const phu = await AsyncStorage.getItem('phone_number');
            
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phu,
                    otp : this.state.otp,
                }),
            });

            console.log('resp ',response);
            
            let res =await response.json();
        
            console.log('res ',res);

            if(res.type == 'success') this.props.navigation.navigate('Home');
        
        } catch (error) {
                
            console.error(error);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.text} >
                    <Text> OTP: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(name) => this.setState({name : name})}
                        value={this.state.name}
                        maxLength={4}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress={()=>this.verifyOTP()}
                    >
                        <Text>submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({

    text:{
        flex:1,
    },
    button:{
        justifyContent: 'space-between',
    },
});
