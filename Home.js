import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
} from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import Carousel from 'react-native-banner-carousel';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FloatingAction } from 'react-native-floating-action';
const actions = [{
    text: 'Suppourt',
    icon: require('./supports.png'),
    name: 'bt_accessibility',
    position: 2
  }, {
    text: 'Request A Consumable',
    icon: require('./send.png'),
    name: 'bt_language',
    position: 1
  }];

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 )
const BannerWidth =  width ;
const BannerHeight = 220;
const equalHeight =  (height -190)



const images = [
    "http://139.59.76.223/test_apis/image/img1.jpg",
    "http://139.59.76.223/test_apis/image/img1.jpg",
    "http://139.59.76.223/test_apis/image/img1.jpg"
];


 class Home extends Component {
   renderPage(image, index) {
          return (

              <View style={styles.carousel}
              key={index}>
                  <Image style={styles.carousel}

                  source={{ uri: image }}/>

              </View>
          );
      }

  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: []
    }
  }

  _keyExtractor = (item, index) => item.inductry_id;
   _keyExtractors = (item, index) => item.id;
    _keyExtractorss = (item, index) => item.id;




  renderRowItem1 = (itemData) => {
    return (
              <TouchableOpacity>
    <View style={{ width: equalWidth + 30, height: 200, margin: 3 ,flex:1,flexDirection: 'column', borderWidth: 1.0,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#f7f7f7',
    // borderRadius: 10,
    cornerRadius :20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#f7f7f7',
    borderBottomColor: '#f7f7f7',
    borderLeftColor: '#f7f7f7',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRightColor: '#f7f7f7'}}>
        <Image
          style={{ marginTop :6 ,width: equalWidth + 30, height: 80, position: 'absolute',resizeMode:'contain' }}
          source={{ uri: itemData.item.image }}
        />

          <Text style={{ color: 'black', fontSize: 13, marginTop: 88 ,textAlign:'center' }}>Upcoming Events</Text>

         <View style = {{marginTop :10,flex:1,flexDirection: 'row'}}>

       <Image style={{ marginLeft :5 , height:18,width:18}}
                             source={require('./eventd.png')} />





        <Text  style={{fontSize: 12, color: '#7e7e7e' ,marginLeft: 10, height:15}}

       >
        { itemData.item.date_event}
        </Text>
       </View>

        <View style = {{marginTop : -10,flex:1,flexDirection: 'row'}}>

       <Image style={{ marginLeft :5 ,marginTop :4 ,height:18,width:18}}
                             source={require('./eventl.png')} />





        <Text  style={{width :equalWidth - 30,fontSize: 12, color: '#7e7e7e' ,margin: 10,marginTop: 5, height:50}}

       >
        { itemData.item.address}
        </Text>
       </View>

        <View style = {{marginTop : 0,flex:1,flexDirection: 'row'}}>

       <Image style={{ marginLeft :5 ,height:18,width:18}}
                             source={require('./eventa.png')} />





        <Text  style={{marginTop : 5,fontSize: 12, color: '#7e7e7e' ,marginLeft: 10, height:20}}

       >
         { itemData.item.hall_name}
        </Text>
       </View>

      </View>
      </TouchableOpacity>



    )
  }

  renderRowItem = (itemData) => {
    return (
              <TouchableOpacity

                  onPress={() => {
           GLOBAL.industry =  itemData.item.inductry_id,
            this.props.navigation.navigate('Category', {
              itemId: itemData.item.inductry_id,

            });
          }}

                >
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', width: equalWidth - 8, height: 150, flexDirection: 'row', marginLeft: 5,marginTop: 5 }}>
        <Image
          style={{ width: equalWidth - 8, height: 150, position: 'absolute' }}
          source={{ uri: itemData.item.image }}
        />


          <View style={{ flex: 1,padding : 5, backgroundColor: 'rgba(0, 0, 0, 0.8)', alignSelf: 'flex-end' }}>
          <Text style={{ color: 'white', fontSize: 16 ,textAlign:'center' }}>{itemData.item.inductry_name}</Text>



        </View>


      </View>
      </TouchableOpacity>



    )
  }


  renderRowItem2 = (itemData) => {
    return (
   <View style={{ width: equalWidth - 20, height: 50, margin: 5 ,flex:1,flexDirection: 'column', borderWidth: 1.0,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    cornerRadius :20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#f7f7f7',
    borderBottomColor: '#f7f7f7',
    borderLeftColor: '#f7f7f7',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRightColor: '#f7f7f7'}}>
        <Image
          style={{ width: equalWidth - 32, height: 35,margin : 6, position: 'absolute'}}
          source={{ uri: itemData.item.image }}
        />

      </View>




    )
  }
  _renderRightButton = () => {
        return(
            <TouchableOpacity onPress={() => this._handleIconTouch() } >
               <Text> hi </Text>
            </TouchableOpacity>
        );
    };

    _handleIconTouch = () => {
        console.log('Touched!');
    }


  componentWillMount() {
      var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
     GLOBAL.userid = e;
    })


     var value =  AsyncStorage.getItem('image');
    value.then((e)=>{
      GLOBAL.profile = e;
    })



     var value =  AsyncStorage.getItem('name');
    value.then((e)=>{

      GLOBAL.name = e;

    })


     var value =  AsyncStorage.getItem('email');
    value.then((e)=>{

      GLOBAL.email = e;
    })


     var value =  AsyncStorage.getItem('mobile');
    value.then((e)=>{

      GLOBAL.mobile = e;
    })


   {this.getMoviesFromApiAsync()}
  }


  render() {

    return (
    <KeyboardAwareScrollView style={styles.containers}>
     <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {this.state.moviesList.map((image, index) => this.renderPage(image, index))}
                </Carousel>

                <View >
        <FlatList
          data={this.state.moviesLists}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />






        <Text style = {{margin :10,   fontSize: 20,
    fontWeight: 'bold'}} >
          Our  Events
          </Text>

          <FlatList style = {{width:window.width ,height:200}}
          data={this.state.eventLists}
            keyExtractor={this._keyExtractorss}
          horizontal={true}
         renderItem={this.renderRowItem1}
        />





          </View>
            </View>



           <View style = {{width : window.width ,flexDirection:'row' ,height :130 ,backgroundColor :'rgba(242,246,252,0.5)'}}>
            <Image style = {{margin :10,width : 50, height:50,resizeMode:'contain'}}
           source={require('./logins.png')}


            />
            <Text style = {{marginTop : 30,width : window.width - 300,color :'#7e808c'}}>
             GST number is 33AABCM8821D1ZT.
            </Text>


          <View style = {{marginTop : 50,marginLeft : - width + 90,flexDirection :'row'}}>
  <TouchableOpacity onPress={() =>  Linking.openURL('https://www.facebook.com/monotechsystems') } >
          <Image style = {{margin :10,width : 30, height:30,resizeMode:'contain'}}
         source={require('./facebooks.png')}


          />
          </TouchableOpacity>
            <TouchableOpacity onPress={() =>  Linking.openURL('https://plus.google.com/115357225188625368206/posts') } >
          <Image style = {{margin :10,width : 30, height:30,resizeMode:'contain'}}
         source={require('./google-plus.png')}


          />
            </TouchableOpacity>
              <TouchableOpacity onPress={() =>  Linking.openURL('https://www.linkedin.com/company/monotech-systems/') } >
          <Image style = {{margin :10,width : 30, height:30,resizeMode:'contain'}}
         source={require('./lin.png')}


          />
            </TouchableOpacity>
              <TouchableOpacity onPress={() =>  Linking.openURL('https://twitter.com/monotechsystems') } >
          <Image style = {{margin :10,width : 30, height:30,resizeMode:'contain'}}
         source={require('./twitter.png')}


          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>  Linking.openURL('https://www.youtube.com/user/monotechsystem') } >
          <Image style = {{margin :10,width : 30, height:30,resizeMode:'contain'}}
         source={require('./youtube.png')}


          />
   </TouchableOpacity>
          </View>


           </View>

           <FloatingAction
                   actions={actions}
                   onPressItem={
                     (position) => {

                       if (position == 'bt_accessibility'){
                          this.props.navigation.navigate('Suppourt')
                       }else{
                           this.props.navigation.navigate('SendEnquiry')
                       }

                     }
                   }
                 />

     </KeyboardAwareScrollView>

    );
  }


  getMoviesFromApiAsync = () => {
   const url = GLOBAL.BASE_URL +  GLOBAL.front_main
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        var my = [];
       {responseJson.banner1.map((message) =>
        my.push(message.banner_image)

        )
      }

        this.setState({ moviesLists: responseJson.industry_array1 })
        this.setState({ moviesList: my })
        this.setState({eventLists:responseJson.events})
        this.setState({brandLists:responseJson.brand1})
        GLOBAL.info_number =  responseJson.info_number
        GLOBAL.info_email =  responseJson.info_email
        // this will update state to re-render ui
        return responseJson.movieList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  },
  carousel:{
   width: BannerWidth,
   height:BannerHeight,
 },

 zoomImage:{
   width:BannerWidth,
   height:BannerHeight,

 }
});
export default Home;
