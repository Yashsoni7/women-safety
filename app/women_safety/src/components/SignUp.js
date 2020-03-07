import React, { Component } from 'react'
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native'


export default class SignUp extends Component {

    constructor(){
        super(this.props);
        this.state={
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

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    };




    render() {
        return (
            <View>
                <View style={styles.helpmsg} >
                    <Text> Name: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        name="name"
                        value={this.state.name}
                    />
                </View>
                <View style={styles.helpmsg} >
                    <Text> Name: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        name="name"
                        value={this.state.name}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    helpmsg:{
        flex:1,
        flexDirection:'row'
    },
    contactHeader:{
        flex:1,
        flexDirection:'row'    
    },
    contactAddBtn:{
    }
});

