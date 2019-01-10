import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo,
  ScrollView,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import Button from 'react-native-button';

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Model extends Component {
static navigationOptions = {
          title: 'Product List',
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
      status : '',
      industry_id : '',
      loading : '',
      productID : '',
       product : '',
      moviesList: []
    }
  }


resPress = (resId,resName,productID) => {

  if (resName == "1"){
    GLOBAL.main_id =  resId

   this.props.navigation.navigate('Model')
  } else {

    GLOBAL.productid = productID
  this.props.navigation.navigate('Detail')
  }

  }

 bookmarks = (productID) => {
alert(productID)
      const url = GLOBAL.BASE_URL +  GLOBAL.add_bookmark
        fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productID: productID,
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
    this.getMoviesFromApiAsync()


    })
    .catch((error) => {
      console.error(error);

    });


  }



getMoviesFromApiAsync1 = () => {

}

  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {




    return (


  <TouchableOpacity

    onPress={() => this.resPress(itemData.item.main_id, itemData.item.product,itemData.item.productID)}
  >

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:5,  width : equalWidth ,margin : 10}}>

     <View style = {{flex : 1, flexDirection :'row'}}>

      <Image
          style={{ width: equalWidth, height : 150,margin :0 }}
          source={{ uri: itemData.item.image }}



        />
       <TouchableOpacity onPress={() => this.bookmarks(itemData.item.productID)} >

      <View style = {{flex : 1, width:100,marginLeft : - 25,marginTop : 20, height:100}}>
      <Image
          source={{ uri: itemData.item.favrouite_img }}
          style={{width:36,marginLeft : - 15,marginTop : 2, height:32}}

          />
          </View>
          </TouchableOpacity >

       </View>

     <View style={{marginLeft : 0,width :equalWidth ,height :1,backgroundColor :'#f7f7f7' }}>

        </View>
          <View style={{flex : 2}}>
          <Text style={{color:'#e41582', fontSize: 20, marginTop: 6 ,marginLeft :6}}>{itemData.item.product_name}</Text>

          <ScrollView style={{ flex: 1 ,marginLeft : 6 ,marginTop :3 ,marginBottom :6 }}>
                <HTML html={itemData.item.description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>

        </View>
         </View>

    </TouchableOpacity>





    )
  }


   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
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

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

      this.setState({industry_id: itemId})
      {this.getMoviesFromApiAsync()}

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
      <View style={styles.container1}>
        <FlatList style= {{backgroundColor:'#f7f7f7',flexGrow:0}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
      </View>
    );
  }


getMoviesFromApiAsync = () => {

       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.dervie_detail_of_product

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    main_id: GLOBAL.main_id,
    user_id :GLOBAL.userid

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true){
       this.setState({ moviesList: responseJson.derive_detail_category})
      }

       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);

       this.hideLoading();
    });
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  }
});
export default Model;
