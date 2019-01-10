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

 class Brand extends Component {

static navigationOptions = {
          title: 'Brand',
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
      source={{uri: 'http://www.monotech.in/brands.php'}}
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
export default Brand;
