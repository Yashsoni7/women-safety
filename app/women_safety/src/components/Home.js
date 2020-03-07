import React, { Component } from 'react'
import { Text, TextInput, View, TouchableHighlight } from 'react-native'


function row (number = ""){


    return(
        <View style={}>
            
        </View>
    )
}



export default class Home extends Component {

    constructor(){
        super(this.props);
        this.state={
            helpTxt:'',
            contacts:[],
        }
    }




    render() {
        return (
            <View>
                <View style={styles.helpmsg} >
                    <Text> HELP MSG:</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(helpText) => this.setState({helpText})}
                        value={this.state.helpText}
                    />
                </View>
                <View>
                    <View style={contactHeader}>
                        <Text>Contacts:</Text>
                        <TouchableHighlight>
                            <View style={contactAddBtn}>
                                +
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
        flexDirection:'row'
    },
    contactHeader:{
        flex:1,
        flexDirection:'row'    
    },
    contactAddBtn:{
    }
});

