import React, { Component } from 'react';

import {
  View,
  Alert,
} from 'react-native';

import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'


import { SearchButton } from '../../common/header-buttons'

import { connect } from 'react-redux'

// import * as actions from '../../actions/product-actions'

// import init from './init-product'

import ProductReviews from './product-reviews'
import ProductDescription from './product-description'
import ProductSpecs from './product-specs'
import ProductPackage from './product-package'
import ProductVideo from './product-video'

import {
  getFullProductData
} from '../../gets/productPosts';

class Product extends Component {

  static navigationOptions = ({ navigation }) => {
    navigation.getParam('id');
    return ({
      title: navigation.getParam('name'),
      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 9 }}>
          <SearchButton />
        </View>
      )
    })
  };

  state = {
    id: 0,
    images: [],
    info: {
      productName: '',
      productSalePercent: '',
      stock: 0,
      salePrice: 0,
      price: 0,
      companyPrice: 0,
      rate: 0,
      siteURL: ''
    },
    productDescription: '',
    productDetails: '',
    productPackage: '',
    productVideo: '',
    productReviews: '',
    productSimilar: [],
  }

  initProduct = async (id) => {
    console.log("this.initProduct(ID)", id)
    getFullProductData(id)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == '404') {
          Alert.alert(
            "Alarm",
            "Error 404 niet gevonden",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
        }

        this.setState({
          id: id,
          images: responseJson.imgURLs,
          info: {
            productName: responseJson.productName,
            productSalePercent: responseJson.productSalePercent,
            stock: responseJson.stock,
            salePrice: responseJson.salePrice,
            price: responseJson.price,
            companyPrice: responseJson.companyPrice,
            rate: responseJson.rate,
            siteURL: responseJson.siteURL
          },
          productDescription: responseJson.description_long,
          productDetails: responseJson.description_details,
          productPackage: responseJson.description_package,
          productVideo: responseJson.description_video,
          productReviews: responseJson.reviews,
          productSimilar: responseJson.similarProductIDs
        });
      });
    // .then(({  
    // })
    // const getImages = getFullSizeProductImages(id).then(images => { this.setState({images: images.imgURLs}); console.log('images')})
    // const getInfo = getProductInfo(id).then(info => { this.setState({info}); console.log('info') })
    // const getProducts = getSimilarProducts(id).then(similar => { this.setState({productSimilar: similar.productIDs}); console.log('similar')})
    // const getDesc = getProductDescription(id).then(description => { this.setState({productDescription: description.text}); console.log('desc')})
    // const getPackage = getProductPackage(id).then(packageInfo => { this.setState({productPackage: packageInfo.data}); console.log('packageInfo')})
    // const getDetails = getProductDetails(id).then(details => { this.setState({productDetails: details.data}); console.log('details')})
    // const getReviews = getProductReviews(id).then(reviews => { this.setState({productReviews: reviews.reviewsItems}); console.log('reviews')})
    // const getVideo = getProductVideo(id).then(video => { this.setState({productVideo: video.data}); console.log('video')})

    // Promise.all([getImages, getInfo, getDesc, getProducts, getPackage, getDetails, getReviews, getVideo]).then(() => {
    //         this.setState({id})
    //     })    
    // )
  }

  constructor(props) {
    super(props)
    const ID = this.props.navigation.getParam('id')
    this.initProduct(ID)
  }


  shouldComponentUpdate(nextProps, { images, info, productDescription, id }) {
    console.log('shouldComponentUpdate `````````nextProps', nextProps);
    console.log('shouldComponentUpdate `````````id', id)
    if (id) {
      return true
    }
    return false
  }


  render() {
    console.log('this.state  RENDER in product.js', this.state)
    const tabOptions = {
      lazy: true,
      tabBarOptions: {
        activeTintColor: 'red',
        upperCaseLabel: false,
        scrollEnabled: true,
        inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabStyle: {
          height: 42,
        },
        pressOpacity: 0,
        indicatorStyle: {
          backgroundColor: '#fff',
          height: 1.7,
          marginBottom: 1.7
        },
        style: {
          height: 42,
          backgroundColor: '#c00017'
        },
        labelStyle: {
          color: '#fff',
          fontSize: 12,
          // margin: 0,
          // borderWidth: 1,
          height: 12,
          lineHeight: 12,
          textAlignVertical: 'center'
        }
      },
    }

    
    const ID = this.props.navigation.getParam('id')
    const name = this.props.navigation.getParam('name')
    const Tab = createMaterialTopTabNavigator({
      Beschreibung: {
        screen: props =>
          <ProductDescription
            {...props}
            // id={this.state.id}
            id={ID}
            name={name}
            images={this.state.images}
            productInfo={this.state.info}
            productSimilar={this.state.productSimilar}
            productDescription={this.state.productDescription}
          />
      },
      'Technische Details': {
        screen: props =>
          <ProductSpecs
            {...props}
            id={this.state.id}
            name={name}
            details={this.state.productDetails}
          />
      },
      Lieferumfang: {
        screen: props =>
          <ProductPackage
            {...props}
            id={this.state.id}
            name={name}
            packageInfo={this.state.productPackage}
          />
      },
      Video: {
        screen: props =>
          <ProductVideo
            {...props}
            id={this.state.id}
            name={name}
            videoID={this.state.productVideo}
          />
      },
      Bewertungen: {
        screen: props =>
          <ProductReviews
            {...props}
            id={this.state.id}
            name={name}
            reviews={this.state.productReviews}
          />
      }
    }, tabOptions);

    const Aaa = createAppContainer(Tab);
    // return Tab;
    return <Aaa />;
  }

}
// console.log(123);
// const Container = createAppContainer(Tab);
export default connect()(Product);