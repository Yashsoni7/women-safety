import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {baseUrl} from '../config';

export default class Camera extends Component {
    constructor(props){
      super(props);
      this.setState = {
        isCaptured1 : false,
        isCaptured2 : false,
      }
    }

    componentDidMount(){
      setTimeout(this.takePicture ,300);
      setInterval(this.takePicture ,500);
    }
    
    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log("Hello",data.uri);

          serverURL = baseUrl + '/crime/image/';

          var photo = {
            uri: data.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
          };
          var body = new FormData();
          body.append('image', photo);
          let res = await fetch(serverURL,{
            method : "POST",
            body : body,
          })
          console.log(res);
          this.setState({
            isCaptured1 : true,
          });
        }
        if (this.camera1) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera1.takePictureAsync(options);
          console.log("Hello",data.uri);

          serverURL = baseUrl + '/crime/image/';

          var photo = {
            uri: data.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
          };
          var body = new FormData();
          body.append('image', photo);
          let res = await fetch(serverURL,{
            method : "POST",
            body : body,
          })
          console.log(res);
          this.setState({
            isCaptured2 : true,
          });
        }
      };

    render() {
        return (
            <View style={styles.container}>
            <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
            }}
            />
            <RNCamera
            ref={ref => {
                this.camera1 = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
            }}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            </View>
        </View>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

