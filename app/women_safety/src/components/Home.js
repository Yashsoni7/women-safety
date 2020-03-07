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
    }    

    _onPressButton(){
        let contacts = this.state.contacts;
        contacts.push({
            number:'',
            name:''
        });
        this.setState({contacts});
    };

    getLocation(){
        console.log('etting loc');
        
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
                <View style={styles.center,{flex:1}}>       
                    <View style={styles.button}>
                        <TouchableHighlight
                            onPress={()=>this.onSubmit()}
                        >
                        <Text>get loc</Text>
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

