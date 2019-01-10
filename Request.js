import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,AsyncStorage,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Request extends Component<Props> {


static navigationOptions = {
          title: 'Request Enquiry',
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
     name: '',
      email: '',
       business: '',
      message: '',
      city: '',
      state: '',
      userid: '',
      description: '',
      status :'',
      loading :'',
    }
}


buttonClickListener = () =>{

    if (this.state.name == ''){
      alert('Please Enter Name')
    }  else if (this.state.business == ''){
      alert('Please Enter Bussiness Name')
    }
        else if (this.state.email == ''){
      alert('Please Enter Email')
    }   else if (this.state.city == ''){
      alert('Please Enter City')
    } else if (this.state.state == ''){
      alert('Please Enter State')
    } else if (this.state.description == ''){
      alert('Please Enter Description')
    }

       else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.submit_enquiry
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: this.state.userid,
    product_id :GLOBAL.productid,
    name: this.state.name,
    email: this.state.email,
    business_name: this.state.business,
    city:this.state.city,
    state:this.state.state,
    description:this.state.description,


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {

       alert('Your Enquiry has been Successfully Submitted. We will reach Soon')




       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  }
showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }



handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
}

  render() {

    var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
     this.setState({userid:e})
    })
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (
    <KeyboardAwareScrollView style={styles.container2}>

      <View style={{ padding :5, shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 4,backgroundColor : '#ffffff',margin : 20,width :window.width - 40, flex: 1, alignSelf: 'auto' }}>


          <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>FULL NAME</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter Full Name"
                                  onChangeText={(text) => this.setState({name:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />




          <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>ORGANISATION NAME</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter Bussiness Name"
                                  onChangeText={(text) => this.setState({business:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />


            <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>EMAIL</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter Email"
                                  onChangeText={(text) => this.setState({email:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

            <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>CITY</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter City Name"
                                  onChangeText={(text) => this.setState({city:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

            <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>STATE</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter State Name"
                                  onChangeText={(text) => this.setState({state:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

            <Text style={{ fontSize: 14, margin: 6 ,color : '#000000'}}>DESCRIPTION</Text>
          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Enter Description"
                                  onChangeText={(text) => this.setState({description:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />
         <Button
           containerStyle={{margin: 6,marginBottom:30,marginTop : 30,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

         onPress={this.buttonClickListener}>
        SEND
        </Button>


        </View>






     </KeyboardAwareScrollView>
    );
  }
}
export default Request;
