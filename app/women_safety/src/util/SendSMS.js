import SmsAndroid from 'react-native-get-sms-android';

function SendSMS(phoneNumber , message){
    return new Promise(
        (resolve,reject) => {
            // let phoneNumber = '8828183820'
            
            // let message = "I am in Distress"
             
            SmsAndroid.autoSend(
                phoneNumber,
                message,
                (fail) => {
                    console.log('Failed with this error: ' + fail);
                    reject(fail)
                },
                (success) => {
                    console.log('SMS sent successfully');
                    resolve(success);
                },
            ); 
        }
    )
}
export default SendSMS
