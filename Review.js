import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Review extends Component<Props> {



static navigationOptions = {
          title: 'Review',
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

  ratingCompleted(rating) {
  GLOBAL.rating =  rating
  console.log("Rating is: " + rating)
}
showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }



   buttonClickListener = () =>{
   
    if (this.state.name == ''){
      alert('Please Enter Name')
    }    else if (this.state.email == ''){
      alert('Please Enter Email')
    }  else if (this.state.message == ''){
      alert('Please Enter Message')
    } 

      else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.rating_product
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: this.state.userid,
    name: this.state.name,
    email: this.state.email,
    review: this.state.message,
    product_id :GLOBAL.productid ,
    rating : GLOBAL.rating,
   

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      
      
       this.hideLoading()
       if (responseJson.status == true) {

       alert('Your Review has been Successfully Submitted')

     

       
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

  

      <View style={{  shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 8,backgroundColor : '#ffffff',margin : 15,marginTop : 25,width :window.width - 30, flex: 1, alignSelf: 'auto' }}>
         
      <Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

     

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
export default Review; 