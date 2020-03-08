import GetLocation from 'react-native-get-location';
 
async function getlocation(){
    try {
        // Alert.alert("Location Sent")
        let location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        });
        // console.log(location.latitude , location.longitude);
        return location;
    } catch (error) {
        const { code, message } = error;
        console.warn(code, message);
    }
    
}

export default getlocation;