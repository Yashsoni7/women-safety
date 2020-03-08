import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableHighlight, AsyncStorage } from 'react-native'
import {baseUrl} from '../config'


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
            console.log(phu);
            
            
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

            if(res.type == 'success'){
                this.props.navigation.navigate('Home');
                await AsyncStorage.setItem('isLoggedIn', 'true')
            }else{
                if(res.message === "Mobile no. already verified"){
                    this.props.navigation.navigate('Home');
                }else{
                    Alert.alert("Something Went Wrong......Try Again!!!")
                    this.props.navigation.navigate('SignUp')
                }
            }
        
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
                        onChangeText={(otp) => this.setState({otp : otp})}
                        value={this.state.otp}
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
