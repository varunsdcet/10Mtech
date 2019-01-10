import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  NetInfo,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import HTML from 'react-native-render-html';


const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Category extends Component {
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
      moviesList: []
    }
  }

  _keyExtractor = (item, index) => item.categoryID;

  renderRowItem = (itemData) => {

    return (

     <TouchableOpacity

                  onPress={() => {
           GLOBAL.category =  itemData.item.categoryID,
            this.props.navigation.navigate('Product', {
              itemId: itemData.item.categoryID,

            });
          }}>

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:5,  width : equalWidth ,margin : 10}}>


      <Image
          style={{ width: equalWidth, height : 150,margin :0 }}
          source={{ uri: itemData.item.image }}



        />

     <View style={{marginLeft : 0,width :equalWidth ,height :1,backgroundColor :'#b2b2b2' }}>

        </View>




          <View style={{flex : 2}}>
          <Text style={{color:'#e41582', fontSize: 20, marginLeft: 6 ,marginTop :6 }}>{itemData.item.category}</Text>

         <ScrollView style={{ flex: 1 ,style : 10,marginLeft: 6 ,marginTop : 3 ,marginBottom :6}}>
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
       const url = GLOBAL.BASE_URL +  GLOBAL.derive_detail_industry

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    industry_id: GLOBAL.industry,

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
       this.setState({ moviesList: responseJson.derive_detail_inductry})
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
export default Category;
