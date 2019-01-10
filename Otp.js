import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
import OTPInput from 'react-native-otp';
const window = Dimensions.get('window');


type Props = {};
 class Otp extends Component<Props> {

  static navigationOptions = {
    title: 'Login',
    header: null
  };

 state = {
    otp: ''
  }


handleOTPChange = (otp) => {
    this.setState({ otp })
  }
 
  clearOTP = () => {
    this.setState({ otp: undefined })
  }
 
  autoFill = () => {
    this.setState({ otp: '221198' })
  }



  render() {
    return (
    <KeyboardAwareScrollView style={styles.containers}>
          <Image style={styles.otpImage}
           source={require('./otp.png')} />
            
          <Text style =  {styles.otpColor}>
           Verify your number
           </Text>
          <Text style =  {styles.andof}>
           Please enter the verification code sent to your given mobile number
           </Text>
             <Text style =  {styles.otpColor}>
             OTP
           </Text>

          <OTPInput
          value={this.state.otp}
          onChange={this.handleOTPChange}
          tintColor="#FB6C6A"
          offTintColor="#BBBCBE"
          otpLength={6}
        />
 
         <Text style =  {styles.andof}>
          Didn't receive the OTP ? 
           </Text>
            
            <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#ffffff'}}
   
            style={{fontSize: 14, color: 'darkgrey'}}

           onPress={() =>  this.props.navigation.navigate('Signup')}>
            Resend
           </Button>

                <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Signup')}>
         SUBMIT
        </Button>

     </KeyboardAwareScrollView>
    );
  }
}
export default Otp; 