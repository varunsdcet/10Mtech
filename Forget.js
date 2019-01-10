import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import OfflineNotice from './OfflineNotice.js';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';

type Props = {};
 class Forget extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  
  }



static navigationOptions = {
          title: 'Forget Password',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 18,
          },
      };

  constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      username: '',
      password: '',
      status :'',
      ipAdd : '',
      loading:'',
      results: [],
     
    }
}


showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    buttonClickListener = () =>{
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({ipAdd:ip})
});

    if (this.state.username == ''){
      alert('Please Enter Email')
    }     else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {
      const url = GLOBAL.BASE_URL +  GLOBAL.forget_password
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: this.state.username,
   

  }),
}).then((response) => response.json())
    .then((responseJson) => {
              
     
       this.hideLoading()
       if (responseJson.status == true) {

        alert('Your Password Send to Your Registered Email id')
       }else {
           alert('Your Email is not Registered')
       }
    })
    .catch((error) => {
      console.error(error);
    });
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
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
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

       <Text style = {{textAlign :'center' ,margin : 30}} >

       Please Enter Your Registered Email Address . We will send Password your Email Address. 

      </Text>

                <View style={styles.viewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./email.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Email"
                                  onChangeText={(text) => this.setState({username:text})} 
                                   />
                       </View>

                 </View>


                

                
          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}
          onPress={this.buttonClickListener}
        >
       
         SUBMIT
        </Button>

        
    

     </KeyboardAwareScrollView>
    );
  }
}
export default Forget; 