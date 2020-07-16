import React, { Component } from 'react'

import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';

import CategoryInfoButton from '../../common/header-buttons/category-info-button'

import FilterButton from '../../common/filter-button';

import FooterButton from '../../common/footer-button';

import ProductListItem from '../../common/product-list-item';

import { getPreviewProductData, getBonusProducts } from '../../gets/productPosts';

import Loading from '../loading';

import { connect } from 'react-redux'

export default class ProductsByPoint extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerRight: (
                <View style={{ flexDirection: 'row', marginRight: 9 }}>
                    <SearchButton />
                </View>
            )
        }
    }

    state = {
        userInfo: null,
        data: [],
        loaded: false,
    }


    componentDidMount() {
        const title = this.props.navigation.getParam('title', null)
        const userInfo = this.props.navigation.getParam('userInfo', null)
        var a = []
        switch (title) {
            case 'TELEPOINTS':
                getBonusProducts()
                    .then(responseJson => {
                        responseJson.map(x => {
                            getPreviewProductData(x.productID)
                                .then(res => {
                                    if (res.status != "404") this.setState({ data: [...this.state.data, { ...res, productID: x.productID, bonuspoint: x.required_points, }], userInfo: userInfo, loaded: true })
                                })
                        })
                    })
                break;
            default: break
        }
    }

    render() {
        if (!this.state.loaded) {
            return <Loading />
        }
        return (
            <View>
                <FlatList
                    // contentContainerStyle={{paddingLeft: 18}}                    
                    data={this.state.data.filter(item => item.stock > 0)}
                    renderItem={({ item }) => {
                        const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID, tax, bonuspoint } = item
                        return (
                            <View style={{ paddingBottom: 8 }}>
                                <ProductListItem
                                    name={productName}
                                    price={price}
                                    key={productID}
                                    companyPrice={companyPrice.toFixed(2)}
                                    imageURL={previewImgURL}
                                    salePrice={salePrice != 0 ? 'UVP ' + salePrice.toFixed(2) : ''}
                                    rate={rate}
                                    stock={stock}
                                    id={productID}
                                    imageURL={previewImgURL}
                                    tax={tax}
                                    bonuspoint={bonuspoint}
                                    salePercent={productSalePercent ? productSalePercent.int : null}
                                />
                            </View>
                        )

                        // }
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    initialNumToRender={12}
                    windowSize={4}
                //keyExtractor={item => item.siteURL}
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
