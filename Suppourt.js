import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Suppourt extends Component<Props> {

static navigationOptions = {
          title: 'Support',
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
       message: '',
       status :'' ,
       loading : '',
       userid : '',
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
   buttonClickListener = () =>{
   
    if (this.state.name == ''){
      alert('Please Enter Name')
    }    else if (this.state.email == ''){
      alert('Please Enter Email')
    }  else if (this.state.message == ''){
      alert('Please Enter Message')
    } 

     else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.need_help
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: this.state.userid,
    name: this.state.name,
    email: this.state.email,
    message: this.state.message,
   

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      
      
       this.hideLoading()
       if (responseJson.status == true) {

       alert('Your Query has been Successfully Submitted. We will reach Soon')

     

       
       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
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
    shadowOpacity: 1.0,borderRadius: 8,backgroundColor : '#ffffff',margin : 15,marginTop : 25,width :window.width - 30, flex: 1, alignSelf: 'auto' }}>
         
          
      <Text style={{ fontSize: 20, margin: 6,marginTop: 12,textAlign: 'center' ,color : '#000000'}}>NEED HELP</Text>
       


      <View style = {{ marginTop :15,flex:1,flexDirection: 'row'}}>
      
       <Image style={{ marginLeft: 10 ,height:20,width:20}}
                             source={require('./phone.png')} />


       


        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 10, height:20}}

        onPress={() =>  Linking.openURL(`tel:${GLOBAL.info_number}`)}>
        {GLOBAL.info_number}
        </Text>
       </View>

      
          <View style = {{flex:1,flexDirection: 'row' ,marginTop :10}}>
         <Image style={{ marginLeft: 10 ,height:20,width:20}}
                             source={require('./emails.png')} />

        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 10, height:20}}

        onPress={() =>  Linking.openURL('mailto: {GLOBAL.info_email}')}>
       {GLOBAL.info_email}
        </Text>
        </View>


          <Text style={{ fontSize: 20, marginLeft: 6 ,textAlign :'center',marginTop :30,color : '#000000'}}>OR LEAVE US A MESSAGE</Text>

          <Text style={{ fontSize: 16, margin: 8 ,marginTop :15 ,color : '#000000'}}>Full Name</Text>
          <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}} 
                                   placeholder="Enter Full Name"
                                  onChangeText={(text) => this.setState({name:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 8 }}
           />




        


            <Text style={{ fontSize: 16, marginLeft: 8 ,marginTop :10,color : '#000000'}}>EMAIL</Text>
          <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}} 
                                   placeholder="Enter Email"
                                  onChangeText={(text) => this.setState({email:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 8 }}
           />

            <Text style={{ fontSize: 16, margin: 8 ,marginTop :10,color : '#000000'}}>MESSAGE</Text>
        <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}} 
                                   placeholder="Enter Message"
                                  onChangeText={(text) => this.setState({message:text})} 
                                   />



                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

            
          <Button
           containerStyle={{margin: 8,marginTop : 30,marginBottom : 30,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonClickListener}>
        SEND
        </Button>

        </View>



      
    

     </KeyboardAwareScrollView>
    );
  }
}
export default Suppourt; 