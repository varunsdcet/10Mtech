import React, {Component} from 'react';
import {Platform, ActivityIndicator ,AsyncStorage,StyleSheet,NetInfo, Text, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';


type Props = {};
 class Signup extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }



  static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      username: '',
      password: '',
      email : '',
      mobile : '',
      status : '',
      iPAddress : '',
      loading:'',
        results: [],
    }
}
componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
}
componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        console.log(`is connected: ${this.state.status}`);
}



showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
buttonClickListener = () =>{
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({iPAddress:ip})
});

    if (this.state.username == ''){
      alert('Please Enter Username')
    } else if (this.state.email == ''){
      alert('Please Enter Email')
    }  else if (this.state.mobile == ''){
      alert('Please Enter Mobile')
    }   else if (this.state.password == ''){
      alert('Please Enter Password')
    }  else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {
      const url = GLOBAL.BASE_URL +  GLOBAL.Signup
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: this.state.username,
    mobile: this.state.mobile,
    email: this.state.email,
    password: this.state.password,
    deviceID: DeviceInfo.getUniqueID(),
    deviceType: Platform.OS,
    deviceToken: '',
    model_name: DeviceInfo.getModel(),
    carrier_name: DeviceInfo.getCarrier(),
    device_country: DeviceInfo.getDeviceCountry(),
    device_memory: DeviceInfo.getTotalMemory(),
    has_notch: DeviceInfo.hasNotch(),
    manufacture: DeviceInfo.getManufacturer(),
    ip_address: this.state.iPAddress,

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true) {

      this.setState({ results: responseJson.user_detail })



       AsyncStorage.setItem('userID', this.state.results.userID);
       AsyncStorage.setItem('image', this.state.results.image);
       AsyncStorage.setItem('name', this.state.results.name);
       AsyncStorage.setItem('email', this.state.results.email);
       AsyncStorage.setItem('mobile', this.state.results.mobile);


        this.props.navigation.navigate('DrawerNavigator')
       }
       this.hideLoading()
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  }


  render() {
     if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (







    <KeyboardAwareScrollView style={styles.containers}>
          <Image style={styles.logoImage}
           source={require('./logins.png')} />
                <View style={styles.viewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./username.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Username"
                                  onChangeText={(text) => this.setState({username:text})}
                                   />
                       </View>

                 </View>

                         <View style={styles.passwordviewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./email.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Email"

                                  onChangeText={(text) => this.setState({email:text})}
                                   />
                       </View>

                 </View>



                   <View style={styles.passwordviewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./mobile.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Mobile"
                                     keyboardType={'phone-pad'}
                                  onChangeText={(text) => this.setState({mobile:text})}
                                   />
                       </View>

                 </View>






                  <View style={styles.passwordviewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./password.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Password"
                                    secureTextEntry={true}
                                  onChangeText={(text) => this.setState({password:text})}
                                   />
                       </View>

                 </View>






          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

        onPress={this.buttonClickListener}
        >
         Sign In
        </Button>


         <View style = {{margin : 15}}>
        <Text style={styles.privacy} >
        <Text style={styles.and} >
         <Text style={styles.createaccount} >
        <Text style={styles.account} >
        By Registering you confirm that you accept our
        </Text>
      &nbsp;Terms & Conditions
        </Text>
      &nbsp;And
        </Text>
      &nbsp;Privacy Policy
        </Text>
      </View>





          <TouchableOpacity  onPress={() =>  this.props.navigation.goBack()}>

         <Text style={styles.createaccount} >
        <Text style={styles.account} >
        Already have'n account ?
        </Text>
       &nbsp;Sign In
        </Text>
        </TouchableOpacity>





     </KeyboardAwareScrollView>



    );
  }
}
export default Signup;
