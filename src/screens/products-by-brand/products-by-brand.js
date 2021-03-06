import React, { Component } from 'react'
import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';

// import { getProductsByBrand } from '../../gets/productsListPost';
import FilterButton from '../../common/filter-button';
import FooterButton from '../../common/footer-button';

import ProductListItem from '../../common/product-list-item';

import { getProductsBySupplier } from '../../gets/productPosts';


import Loading from '../loading'

export default class ProductsByBrand extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: navigation.getParam('brand', 'error'),
            headerRight: (
                <View style={{ flexDirection: 'row', marginRight: 9 }}>
                    <SearchButton />
                </View>
            )
        }
    }

    state = {
        IDs: [],
        data: [],
        from: 0,
        loaded: false
    }

    getProductsIDs() {
        const id = this.props.navigation.getParam('supplierID')
        getProductsBySupplier(id)
            .then(res => {
                this.setState({
                    data: res.products,
                    IDs: res.productsCount,
                    loaded: true,
                });
            });
    }

    // getIDs(IDs) {
    //     this.setState({IDs, loaded: true})
    //     console.log(IDs)
    //     this.getData(0)
    // }

    // async getData(from) {
    //     this.setState({from})
    //     const currentID = this.state.currentID 
    //     console.log(currentID)
    //     try {
    //         await Promise.all(
    //             this.state.IDs.filter((id, key) => {
    //                 if(key >= from && key < (from + 12)) {
    //                     return getPreviewProductData(id).then(res => {this.setState({data: [...this.state.data, {...res, id}]}); console.log('added')}).catch(e => console.log('error with product: ', id, e ))
    //                 }
    //             })
    //                     );
    //     }
    //     catch(e) {
    //         console.warn(e)
    //     }
    // }

    componentDidMount() {
        this.getProductsIDs()
    }

    render() {
        let userInfo = this.props.navigation.getParam('userInfo', null)
        if (!this.state.loaded) {
            return <Loading />
        }
        if (this.state.data.length < 1) {
            return (
                <View style={styles.noProductsContainer}>
                    <Image source={require('../../assets/message-icons/no-categorie-products.png')} style={styles.noProductImage} />
                    <Text style={styles.noProductText} >Kein Produkt gefunden</Text>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    // contentContainerStyle={{paddingLeft: 18}}
                    data={this.state.data.filter(item => item.stock > 0)}
                    // data={this.state.data}
                    renderItem={({ item }, index) => {
                        const { companyPrice,is_variable, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID } = item
                        return (
                            <View style={{ paddingBottom: 8 }}>
                                <ProductListItem
                                    name={productName}
                                    price={this.props.userInfo.selectedUserType === 'EK' ? price.replace(/,/, '.') : companyPrice.replace(/,/, '.')}
                                    salePrice={salePrice.replace(/,/, '.') != 0 ?  salePrice.replace(/,/, '.') + ' UVP' : ''}
                                    companyPrice={companyPrice.replace(/,/, '.')}
                                    rate={rate}
                                    stock={stock}
                                    id={productID}
                                    imageURL={previewImgURL}
                                    salePercent={productSalePercent ? productSalePercent.int : null}
                                    is_variable={is_variable}
                                />
                            </View>
                        )
                        // }
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    // ListFooterComponent={this.state.IDs.length > this.state.data.length && (this.state.from+12 === this.state.data.length) ? <FooterButton text='Weitere Produkte' onPress={() => {this.getData(this.state.from+12)}} /> : null}
                    initialNumToRender={12}
                    windowSize={4}
                    keyExtractor={item => item.siteURL}
                />
            </View>
        )
    }
}


const styles = {
    popularText: {
        fontSize: 16,
        color: '#030303',
        marginLeft: 18,
        marginTop: 18
    },
    productsLine: {
        flexDirection: 'row',
        marginLeft: 18,
        flexWrap: 'wrap',
        marginBottom: 16
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noProductImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    noProductText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    }
}