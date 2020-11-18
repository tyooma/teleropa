import React, { Component } from 'react';

import { View, Alert, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

//import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import { SearchButton } from '../../common/header-buttons';

import ProductReviews from './product-reviews';

import ProductDescription from './product-description';

import ProductSpecs from './product-specs';

import ProductPackage from './product-package';

import ProductVideo from './product-video';

import { getFullProductData } from '../../gets/productPosts';

import FooterNavBar from '../../common/footer-navigation-bar/footer-navigation-bar';

class Product extends Component {

  static navigationOptions = ({ navigation }) => {
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
      siteURL: '',
      configurations: [],
      productOptions: [],
      varaints: []
    },
    productDescription: '',
    productDetails: '',
    productPackage: '',
    productVideo: '',
    productReviews: '',
    productSimilar: [],
    screen: 'Beschreibung',
  }

  initProduct = async (id) => {
    getFullProductData(id)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == '404') {
          Alert.alert(
            "Alarm",
            "Error 404 niet gevonden",
            [
              {
                text: "Ja",
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
            siteURL: responseJson.siteURL,
            productOptions: responseJson.productOptions,
            configurations: responseJson.configurations,
            varaints: responseJson.varaints
          },
          productDescription: responseJson.description_long,
          productDetails: responseJson.description_details,
          productPackage: responseJson.description_package,
          productVideo: responseJson.description_video,
          productReviews: responseJson.reviews,
          productSimilar: responseJson.similarProductIDs,

        });
      });
  }

  constructor(props) {
    super(props)
    this.initProduct(this.props.navigation.getParam('id'))
  }


  shouldComponentUpdate(nextProps, { images, info, productDescription, id }) {
    if (id) {
      return true
    }
    return false
  }


  render() {
    // console.log('this.state  RENDER in product.js', this.state)
    // const tabOptions = {
    //   lazy: true,
    //   tabBarOptions: {
    //     activeTintColor: 'red',
    //     upperCaseLabel: false,
    //     scrollEnabled: true,
    //     inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    //     tabStyle: {
    //       height: 42,
    //     },
    //     pressOpacity: 0,
    //     indicatorStyle: {
    //       backgroundColor: '#fff',
    //       height: 1.7,
    //       marginBottom: 1.7
    //     },
    //     style: {
    //       height: 42,
    //       backgroundColor: '#c00017'
    //     },
    //     labelStyle: {
    //       color: '#fff',
    //       fontSize: 12,
    //       height: 12,
    //       lineHeight: 12,
    //       textAlignVertical: 'center'
    //     }
    //   },
    // }


    // const ID = this.props.navigation.getParam('id')
    // const name = this.props.navigation.getParam('name')

    // const Tab = createMaterialTopTabNavigator({
    //   Beschreibung: {
    //     screen: props =>
    //       <ProductDescription
    //         {...props}
    //         key={ID}
    //         id={ID}
    //         name={name}
    //         images={this.state.images}
    //         productInfo={this.state.info}
    //         productSimilar={this.state.productSimilar}
    //         productDescription={this.state.productDescription}
    //       />

    //   },
    //   'Technische Details': {
    //     screen: props =>
    //       <ProductSpecs
    //         {...props}
    //         key={this.state.id}
    //         id={this.state.id}
    //         name={name}
    //         details={this.state.productDetails}
    //       />
    //   },
    //   Lieferumfang: {
    //     screen: props =>
    //       <ProductPackage
    //         {...props}
    //         id={this.state.id}
    //         key={this.state.id}
    //         name={name}
    //         packageInfo={this.state.productPackage}
    //       />
    //   },
    //   Video: {
    //     screen: props =>
    //       <ProductVideo
    //         {...props}
    //         key={this.state.id}
    //         id={this.state.id}
    //         name={name}
    //         videoID={this.state.productVideo}
    //       />
    //   },
    //   Bewertungen: {
    //     screen: props =>
    //       <ProductReviews
    //         {...props}
    //         key={this.state.id}
    //         id={this.state.id}
    //         name={name}
    //         reviews={this.state.productReviews}
    //       />
    //   }
    // }, tabOptions);

    function chooseScreen(s, props) {
      switch (s.screen) {
        case 'Beschreibung':
          console.log("SWITCH FROM PRODUCT:", s);
          return <ProductDescription
            {...props}
            key={s.images.lenght + s.id}
            id={s.id}
            name={s.productPackage}
            images={s.images}
            productInfo={s.info}
            productSimilar={s.productSimilar}
            productDescription={s.productDescription}
          />
          break;
        case 'Technische Details':
          return <ProductSpecs
            {...props}
            key={s.id}
            id={s.id}
            name={s.productPackage}
            details={s.productDetails}
          />
          break;
        case 'Lieferumfang':
          return <ProductPackage
            {...props}
            id={s.id}
            key={s.id}
            name={s.productPackage}
            packageInfo={s.productPackage}
          />
          break;
        case 'Video':
          return <ProductVideo
            {...props}
            key={s.id}
            id={s.id}
            name={s.productPackage}
            videoID={s.productVideo}
          />
          break;
        case 'Bewertungen':
          return <ProductReviews
            {...props}
            key={s.id}
            id={s.id}
            name={s.productPackage}
            reviews={s.productReviews}
          />
          break;
      }
    }

    const CustomTopTapBar = (props) => {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#c00015", flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 10, alignItems: "center", height: 40 }}>
            <TouchableOpacity onPress={() => this.setState({ screen: "Beschreibung" })}>
              <Text style={this.state.screen == 'Beschreibung' ? { color: "white", fontWeight: 'bold' } : { color: "white" }}>Beschreibung</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ screen: "Technische Details" })}>
              <Text style={this.state.screen == 'Technische Details' ? { color: "white", fontWeight: 'bold' } : { color: "white" }}>Technische Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "#c00015", flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 10, alignItems: "center", height: 40 }}>
            <TouchableOpacity onPress={() => this.setState({ screen: 'Lieferumfang' })}>
              <Text style={this.state.screen == 'Lieferumfang' ? { color: "white", fontWeight: 'bold' } : { color: "white" }}>Lieferumfang</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ screen: "Video" })}>
              <Text style={this.state.screen == 'Video' ? { color: "white", fontWeight: 'bold' } : { color: "white" }}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { console.log(this.state.screen); this.setState({ screen: "Bewertungen" }) }}>
              <Text style={this.state.screen == 'Bewertungen' ? { color: "white", fontWeight: 'bold' } : { color: "white" }}>Bewertungen</Text>
            </TouchableOpacity>
          </View>

          {chooseScreen(this.state, this.props)}
        </View>
      )
    }

    // const Aaa = createAppContainer(Tab);
    // return Tab;
    return (
      <>
        {/* <Aaa />        
        <FooterNavBar /> */}
        <View style={{ flex: 1 }}>
          <CustomTopTapBar />
          <FooterNavBar />
        </View>
      </>
    );
  }
}
export default connect()(Product);


