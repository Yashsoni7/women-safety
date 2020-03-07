import React, { Component } from 'react'
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native'



export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            helpTxt:'',
            contacts:[],
        };
    }


    row (number = "",index){


        return(
            <View style={{flex:1}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(name) => {
                        let contacts = this.state.contacts;
                        contacts[index].name = name;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index].name}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(number) => {
                        let contacts = this.state.contacts;
                        contacts[index].number = number;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index].number}

                />       
            </View>
        )
    }    


    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.helpmsg} >
                    <Text> HELP MSG:</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        value={this.state.helpText}
                    />
                </View>
                <View>
                    <View style={styles.contactHeader}>
                        <Text>Contacts:</Text>
                        <TouchableHighlight>
                            <View style={styles.contactAddBtn}>
                                <Text>+</Text>
                            </View>
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
        flexDirection: 'row'
    },
    contactHeader:{
        flex:1,
        flexDirection:'row'    
    },
    contactAddBtn:{
    }
});

