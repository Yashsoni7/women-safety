import React, { Component } from 'react'
import { Text, TextInput, View, TouchableHighlight, StyleSheet, FlatList } from 'react-native'



export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            helpTxt:'',
            contacts:[{
                number:'12345678',
                name:'adfdgg'
            }],
        };
    }


    row (index){


        return(
            <View style={{flex:1, flexDirection:'row'}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin:5}}
                    onChangeText={(name) => {
                        let contacts = this.state.contacts;
                        contacts[index].name = name;
                        this.setState({contacts});
                    }}
                    value={this.state.contacts[index].name}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin:5}}
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

    _onPressButton(){
        
    };

    render() {

        let rows = this.state.contacts.map((item, i) => {
            return this.row(i);
        })

        return (
            <View style={{flex:1}}>
                <View style={styles.helpmsg} >
                    <Text style={{}}> HELP MSG:</Text>
                    <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        value={this.state.helpText}
                    />
                </View>
                <View style={{flex:1}}>
                    <View style={styles.contactHeader}>
                        <Text>Contacts:</Text>
                        <TouchableHighlight 
                            onPress={this._onPressButton.bind(this)}
                        >
                            <View style={styles.contactAddBtn}>
                                <Text>+</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {rows}
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

