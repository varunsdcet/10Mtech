import React, {Component} from 'react';
import {NavigationActions,StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,AsyncStorage,Image,TouchableOpacity,Alert} from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from './Style.js';
const GLOBAL = require('./Global');
class Drawer extends Component {

 constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      my: '',


    }
}


_YesLogout=()=>{

  AsyncStorage.removeItem('userID');

   this.props
   .navigation
   .dispatch(StackActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({
         routeName: 'Login',
         params: { someParams: 'parameters goes here...' },
       }),
     ],
   }))


    this.props.navigation.dispatch(DrawerActions.closeDrawer())
}

navigateToScreen1 = (route) => () => {

    Alert.alert('Logout!','Are you sure you want to Logout?',
      [{text:"Cancel"},
        {text:"Yes", onPress:()=>this._YesLogout()
 },
      ],
      {cancelable:false}
      )

  }


  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {

    return (
      <View>
        <ScrollView>
          <View>

            <View  style={styles.headertop}>
          <TouchableOpacity onPress={this.navigateToScreen('EditProfile')}>
          <Image style={ styles.thumbnail } source={{ uri: GLOBAL.profile }} />
          </TouchableOpacity>
         <Text style = {styles.drawerText} >
          {GLOBAL.name}
         </Text>

          <Text style = {styles.drawerText} >
          {GLOBAL.email}
         </Text>

            </View>


            <View style={styles.menuItem}>
                 <Image style={styles.drawericon}
                             source={require('./home.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('closeDrawer')}>
                Home
              </Text>
            </View>

             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./enquiry.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('Enquiry')}>
                My Enquiry
              </Text>
            </View>

             <View style={styles.menuItem}>

                 <Image style={styles.drawericon}
                             source={require('./about.png')} />
             <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('About')}>
                About
              </Text>
            </View>


            <View style={styles.menuItem}>

                <Image style={styles.drawericon}
                            source={require('./about.png')} />
            <Text style = {styles.drawerTexts}
             onPress={this.navigateToScreen('Brand')}>
               Brand
             </Text>
           </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./about.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Alliance')}>
              Alliance
            </Text>
          </View>

             <View style={styles.menuItem}>
             <Image style={styles.drawericon}
                             source={require('./suppourt.png')} />

            <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('Suppourt')}>
                Support
              </Text>
            </View>

              <View style={styles.menuItem}>
                  <Image style={styles.drawericon}
                             source={require('./favourite.png')} />
             <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('ListBookmark')}>
                Favourite
              </Text>
            </View>


             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./logout.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen1('Login')}>

                Logout
              </Text>
            </View>


          </View>
        </ScrollView>
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.object
};

export default Drawer;
