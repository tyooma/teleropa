import React, { Component } from 'react';

import { View, FlatList, Text, Image } from 'react-native';

import { SearchButton } from '../../common/header-buttons';

// import CategoryInfoButton from '../../common/header-buttons/category-info-button';

import FilterButton from '../../common/filter-button';

import ProductListItem from '../../common/product-list-item';

import { getProductsByCategory } from '../../gets/productPosts';

import Loading from '../loading';

import { connect } from 'react-redux';

import FooterNavBar from '../../common/footer-navigation-bar/footer-navigation-bar';

class ProductsByCategory extends Component {

  static navigationOptions = ({ navigation }) => {
    const cmsText = navigation.getParam('cmsText', null);
    const name = navigation.getParam('categoryName', 'Kategorien');
    return {
      title: name,
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 9 }}>
          {/* {cmsText ? <CategoryInfoButton cmsText={cmsText} name={name} /> : null} 
          <CategoryInfoButton cmsText={cmsText} name={name} />*/}
          <SearchButton />
        </View>
      )
    }
  }

  state = {
    loaded: false,
    originalIDs: [],
    filteredIDs: [],

    from: 0,
    minPrice: 0,
    maxPrice: 0,
    fromPrice: 0,
    toPrice: 0,
  }


  getProductsIDs() {
    const id = this.props.navigation.getParam('categoryID', null);
    getProductsByCategory(id)
      .then(responseJson => {
        this.getIDs(responseJson.products);
      });
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', (route) => {
      const filterOptions = this.props.navigation.getParam('filterOptions', null)
      if (filterOptions) {
        const { from, to, sortBy } = filterOptions
        if (from !== this.state.fromPrice || to !== this.state.toPrice || sortBy !== this.state.sortBy) {
          this.getIDs(this.state.ids, from, to, sortBy)
        }
      }
    });

    this.getProductsIDs();
  }


  getIDs(ids, fromPrice, toPrice, sortBy) {

    if (fromPrice == 0 || toPrice == 0) {
      Toast.show("Prijs kan niet 0 zijn", {
        shadow: false,
        backgroundColor: "#505050",
        duration: 1500,
      })
    }
    if (fromPrice && toPrice) {
      this.setState({ fromPrice, toPrice, sortBy })
      var sorted = [];
      var filtered = [];
      if (this.props.userInfo.selectedUserType == 'EK') {
        filtered = this.state.originalIDs.filter(({ price }) => parseFloat(price.replace(/\./g, '').replace(/,/, '.')) >= fromPrice && parseFloat(price.replace(/\./g, '').replace(/,/, '.')) <= toPrice)
        if (sortBy != undefined) {
          switch (sortBy) {
            case 'popular':
              sorted = filtered.sort((first, second) => (first.rate > second.rate) ? -1 : ((second.rate > first.rate) ? 1 : 0))
              break
            case 'alphabet':
              sorted = filtered.sort((first, second) => (first.productName > second.productName) ? 1 : ((second.productName > first.productName) ? -1 : 0))
              break
            case 'price_down':
              sorted = filtered.sort((first, second) => (parseFloat(first.price.replace(/\./g, '').replace(/,/, '.')) > parseFloat(second.price.replace(/\./g, '').replace(/,/, '.'))) ? -1 : ((parseFloat(second.price.replace(/\./g, '').replace(/,/, '.')) > parseFloat(first.price.replace(/\./g, '').replace(/,/, '.'))) ? 1 : 0))
              break
            case 'price_up':
              sorted = filtered.sort((first, second) => (parseFloat(first.price.replace(/\./g, '').replace(/,/, '.')) < parseFloat(second.price.replace(/\./g, '').replace(/,/, '.'))) ? -1 : ((parseFloat(second.price.replace(/\./g, '').replace(/,/, '.')) < parseFloat(first.price.replace(/\./g, '').replace(/,/, '.'))) ? 1 : 0))
              break
            default: break
          }
        } else {
          sorted = filtered
        }
      } else {
        filtered = this.state.originalIDs.filter(({ companyPrice }) => parseFloat(companyPrice.replace(/\./g, '').replace(/,/, '.')) >= fromPrice && parseFloat(companyPrice.replace(/\./g, '').replace(/,/, '.')) <= toPrice)
        if (sortBy != undefined) {
          switch (sortBy) {
            case 'popular':
              sorted = filtered.sort((first, second) => (parseFloat(first.rate) > parseFloat(second.rate)) ? -1 : ((parseFloat(second.rate) > parseFloat(first.rate)) ? 1 : 0))
              break
            case 'alphabet':
              sorted = filtered.sort((first, second) => (first.productName > second.productName) ? 1 : ((second.productName > first.productName) ? -1 : 0))
              break
            case 'price_down':
              sorted = filtered.sort((first, second) => (parseFloat(first.companyPrice.replace(/\./g, '').replace(/,/, '.')) > parseFloat(second.companyPrice.replace(/\./g, '').replace(/,/, '.'))) ? -1 : ((parseFloat(second.companyPrice.replace(/\./g, '').replace(/,/, '.')) > parseFloat(first.companyPrice.replace(/\./g, '').replace(/,/, '.'))) ? 1 : 0))
              break
            case 'price_up':
              sorted = filtered.sort((first, second) => (parseFloat(first.companyPrice.replace(/\./g, '').replace(/,/, '.')) < parseFloat(second.companyPrice.replace(/\./g, '').replace(/,/, '.'))) ? -1 : ((parseFloat(second.companyPrice.replace(/\./g, '').replace(/,/, '.')) < parseFloat(first.companyPrice.replace(/\./g, '').replace(/,/, '.'))) ? 1 : 0))
              break
            default: break
          }
        } else {
          sorted = filtered
        }
      }
      new Promise((resolve) => {
        this.setState({ filteredIDs: sorted, from: 0, loaded: true });
        setTimeout(() => resolve(), 200)
      })
    } else {
      this.findMinMaxPrice(ids)

    }
  }

  findMinMaxPrice(ids) {
    if (this.props.userInfo.selectedUserType === 'EK') {
      const prices = ids.map(({ price }) => (parseFloat(price.replace(/\./g, '').replace(/,/, '.'))));
      const maxPrice = Math.max(...prices)
      const minPrice = Math.min(...prices)
      this.setState({ minPrice, maxPrice, fromPrice: minPrice, toPrice: maxPrice, originalIDs: ids, filteredIDs: ids, loaded: true })
    } else {
      const companyPrice = ids.map(({ companyPrice }) => (parseFloat(companyPrice.replace(/\./g, '').replace(/,/, '.'))))
      const maxPrice = Math.max(...companyPrice)
      const minPrice = Math.min(...companyPrice)
      this.setState({ minPrice, maxPrice, fromPrice: minPrice, toPrice: maxPrice, originalIDs: ids, filteredIDs: ids, loaded: true, })

    }
  }



  render() {
    console.log("this.state RENDER() in products-by-category.js", this.state);

    if (!this.state.loaded) {
      return <Loading />
    }


    const { minPrice, maxPrice, fromPrice, toPrice, sortBy } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.containerFlatList}>
          <FlatList
            // .filter(item => item.stock > 0)            
            data={this.state.filteredIDs.filter(item => item.stock > 0)}
            renderItem={({ item }) => {
              const { companyPrice, is_variable, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID } = item;
              return (
                <View style={{ paddingBottom: 8 }}>
                  <ProductListItem
                    name={productName}
                    price={this.props.userInfo.selectedUserType === 'EK' ? price.replace(/,/, '.') : companyPrice.replace(/,/, '.')}
                    salePrice={salePrice.replace(/,/, '.') != 0 ? 'UVP ' + salePrice.replace(/,/, '.') : ''}
                    companyPrice={companyPrice.replace(/,/, '.')}
                    rate={rate}
                    stock={stock}
                    id={productID}
                    imageURL={previewImgURL}
                    salePercent={productSalePercent ? productSalePercent.int : null}
                    is_variable={is_variable}
                  />
                </View>
              );
            }}
            columnWrapperStyle={{ flexWrap: 'wrap' }}
            numColumns={4}
            ListHeaderComponent={
              <FilterButton minPrice={minPrice} maxPrice={maxPrice} fromPrice={fromPrice} toPrice={toPrice} sortBy={sortBy} screenBack={this.props.navigation.state.routeName} />
            }
            initialNumToRender={12}
            windowSize={4}
            keyExtractor={item => item.siteURL}
          />
        </View>
        <View style={styles.footer}>
          <FooterNavBar />
        </View>
      </View >
    );
  }
}


const mapStateToProps = ({ userID, userInfo }) => ({ userID, userInfo })

export default connect(mapStateToProps)(ProductsByCategory)

const styles = {
  container: {
    // height: sHeight,
  },
  containerFlatList: {
    height: '95%',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  footer: {
    height: 5,
    width: '100%',
  },
}
