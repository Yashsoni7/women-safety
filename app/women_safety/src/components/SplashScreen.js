import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'

export default class SplashScreen extends Component {

    async componentDidMount(){
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            if (value == true) {
              // We have data!!
              console.log('is logged in');
              this.props.navigation.navigate('Home');
            }else{
              this.props.navigation.navigate('SignUp');
            }
          } catch (error) {
            // Error retrieving data
            this.props.navigation.navigate('SignUp');

          }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'brown', justifyContent:"center",alignContent:'center', alignItems:'center'}}>
                <Text> BETI BACHAU </Text>
            </View>
        )
    }
}
