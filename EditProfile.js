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
import ImagePicker from 'react-native-image-picker';

type Props = {};

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

 class EditProfile extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }



 	static navigationOptions = {
          title: 'EditProfile',
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
      business: '',
      name: '',
      email: '',
      status :'',
      ipAdd : '',
      loading:'',
      avatarSource : '',
      results: [],

    }
}

 bookmarks = () => {
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else {

    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });

    GLOBAL.profile = 'data:image/jpeg;base64,' + response.data
this.setState({
      avatarSource: source,
    });
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };


  }
});
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
    }   else {
      this.showLoading()
 const url = GLOBAL.BASE_URL +  GLOBAL.update_profile_patient
 const data = new FormData();
data.append('user_id', GLOBAL.userid);
data.append('name', this.state.name);
data.append('flag', '1');
data.append('business',this.state.business);
// you can append anyone.
data.append('image', {
  uri: GLOBAL.profile,
  type: 'image/jpeg', // or photo.type
  name: 'image.png'
});
fetch(url, {
  method: 'post',
  body: data,
  headers: {
      'Content-Type': 'multipart/form-data',
    }

}).then((response) => response.json())
      .then((responseJson) => {
  this.hideLoading()
   if (responseJson.status == true){
    alert('Sucessfully Update ')
   }

    this.setState({
      name: responseJson.name,
    });

  this.setState({
      avatarSource: responseJson.image,
    });
  Global.name = this.state.name
   Global.profile = this.state.avatarSource
  console.log(responseJson)
});
  }

}




  render() {

    var value =  AsyncStorage.getItem('image');
    value.then((e)=>{
     this.setState({avatarSource:e})
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
    <KeyboardAwareScrollView style={styles.containers}>
     <TouchableOpacity onPress={() => this.bookmarks()} >
        <Image
           style = {styles.uploadAvatar}
          source={{ uri: GLOBAL.profile }}



        />


        <Text style = {{margin : 10 ,color :'#000000',textAlign :'center'}} >

        {GLOBAL.mobile}
        </Text>

        <Text style = {{margin : 10 ,color :'#000000',textAlign :'center'}} >

        {GLOBAL.email}
        </Text>

           </TouchableOpacity>
                <View style={styles.viewBackground}>
                      <View style={styles.viewBackground1}>
                           <Image style={styles.icon}
                             source={require('./username.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Name"
                                  onChangeText={(text) => this.setState({name:text})}
                                   />





                       </View>
                     <View style={styles.viewBackgrounds}>
                       <View style={styles.viewBackground1}>
                            <Image style={styles.icon}
                              source={require('./username.png')} />
                                 <TextInput   style={styles.welcome1}
                                    placeholder="Business name"
                                   onChangeText={(text) => this.setState({business:text})}
                                    />





                        </View>
                         </View>

                 </View>





          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 70,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}
          onPress={this.buttonClickListener}
        >

         UPDATE
        </Button>





     </KeyboardAwareScrollView>
    );
  }
}
export default EditProfile;
