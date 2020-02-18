import React, { Component } from 'react'
import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';
import CategoryInfoButton from '../../common/header-buttons/category-info-button'

// import { getProductsByCategory } from '../../gets/productsListPost';
import FilterButton from '../../common/filter-button';
import FooterButton from '../../common/footer-button';

import ProductListItem from '../../common/product-list-item';

import { getPreviewProductData, getProductsByCategory } from '../../gets/productPosts';

import Loading from '../loading'

export default class ProductsByCategory extends Component {

    static navigationOptions = ({ navigation }) => {
        const cmsText = navigation.getParam('cmsText', null)
        const name = navigation.getParam('categoryName', 'Kategorien')
        return {
            title: name,
            headerRight: (
                <View style={{ flexDirection: 'row', marginRight: 9 }}>
                    {/* {cmsText ? <CategoryInfoButton cmsText={cmsText} name={name} /> : null} */}
                    <CategoryInfoButton cmsText={cmsText} name={name} />
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
        // const id = 1
        const id = this.props.navigation.getParam('categoryID', null)
        // getProductsByCategory(id).then(res => this.getIDs(res.products))        
        console.log('id in getProductsIDs() передача getProductsByCategory в products-by-category.js', id)
        getProductsByCategory(id)
            .then(response => response.json())
            .then(responseJson => {
                console.log('responseJson  передача getProductsByCategory в products-by-category.js', responseJson)
                this.setState({
                    data: responseJson.products,
                    IDs: responseJson.productsCount,
                    loaded: true,
                });
            });
    }

    getIDs(IDs) {
        this.setState({ IDs, loaded: true })
        console.log('getIDs(IDs).products.by-category.js', IDs)
        this.getData(0)
    }

    // getData(from) {
    //     this.setState({from})
    //     const currentID = this.state.currentID 
    //     console.log(currentID)
    //     this.state.IDs.filter((id, key) => {
    //         // console.log(id, key)
    //         if(key >= from && key < (from + 12)) {
    //             getPreviewProductData(id).then(res => {this.setState({data: [...this.state.data, {...res, id}]}); console.log('added')}).catch(e => console.log(id, e))
    //             console.log(id)
    //         }
    //     })
    // }

    componentDidMount() {
        this.getProductsIDs()
    }

    render() {

        console.log("this.state RENDER() in products-by-category.js", this.state)
        if (!this.state.loaded) {
            return <Loading />
        }
        if (this.state.IDs.length < 1) {
            return (
                <View style={styles.noProductsContainer}>
                    <Image source={require('../../assets/message-icons/no-categorie-products.png')} style={styles.noProductImage} />
                    <Text style={styles.noProductText} >Kein Produkt gefunden</Text>
                </View>
            )
        }
        // console.log(this.state.IDs)
        // console.log(this.getproduct)
        return (
            <View>
                <FlatList
                    // contentContainerStyle={{paddingLeft: 18}}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID } = item
                        // getProductInfo(item)
                        // getProductInfo(item).then(e => console.log(e))
                        // console.log(item)
                        // console.log(item, <SelfLoadingProductListItem id={item} />)
                        // if (<SelfLoadingProductListItem id={item} />) {                        
                        return (
                            <View style={{ paddingBottom: 8 }}>
                                <ProductListItem
                                    name={productName}
                                    price={price}
                                    companyPrice={companyPrice}
                                    salePrice={salePrice}
                                    rate={rate}
                                    stock={stock}
                                    id={productID}
                                    imageURL={previewImgURL}
                                    salePercent={productSalePercent ? productSalePercent.int : null}
                                />
                            </View>
                        )
                        // }
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    ListFooterComponent={this.state.IDs.length > this.state.data.length && (this.state.from + 12 === this.state.data.length) ? <FooterButton text='More products' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                    // ListFooterComponent={<TouchableOpacity onPress={() => {this.getData(this.state.from+12)}} ><Text>END</Text></TouchableOpacity>}
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