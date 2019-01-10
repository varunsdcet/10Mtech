import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
    WebView
} from 'react-native';

const GLOBAL = require('./Global');



const { width, height } = Dimensions.get('window');

const equalWidth =  (width -20 )

 class Alliance extends Component {

static navigationOptions = {
          title: 'Alliance',
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
  constructor(props) {
    super(props)
    this.state = {

    }
  }





  render() {

    return (
 <WebView
      source={{uri: 'http://www.monotech.in/alliances.php'}}
    />
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  }
});
export default Alliance;
