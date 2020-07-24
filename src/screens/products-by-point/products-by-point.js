import React, { Component } from 'react'

import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';

import CategoryInfoButton from '../../common/header-buttons/category-info-button'

import FilterButton from '../../common/filter-button';

import FooterButton from '../../common/footer-button';

// import ProductListItem from '../../common/product-list-item';

import BonusListItem from '../../common/bonus-list-item';

import { getPreviewProductData, getBonusProducts } from '../../gets/productPosts';

import Loading from '../loading';

import { connect } from 'react-redux'

class ProductsByPoint extends Component {
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
        sortedData: [],
        loaded: false,
        routeName: 'ProductsByPoint',
        from: 0,
        minPrice: 0,
        maxPrice: 0,
        fromPrice: 0,
        toPrice: 0,
        sortBy: '',
    }


    componentDidMount() {
        var a = []
        const title = this.props.navigation.getParam('title', null)
        const userInfo = this.props.navigation.getParam('userInfo', null)


        this.props.navigation.addListener('didFocus', (route) => {
            const filterOptions = this.props.navigation.getParam('filterOptions', null)
            if (filterOptions) {
                const { from, to, sortBy } = filterOptions
                if (from !== this.state.fromPrice || to !== this.state.toPrice || sortBy !== this.state.sortBy) {
                    this.getIDs(this.state.ids, from, to, sortBy)
                }
            }
        });

        switch (title) {
            case 'TELEPOINTS':
                try {
                    getBonusProducts()
                        .then(responseJson => {
                            responseJson.map(x => {
                                getPreviewProductData(x.productID)
                                    .then(res => {
                                        if (res.status != "404") {
                                            this.setState({ data: [...this.state.data, { ...res, productID: x.productID, bonuspoint: x.required_points, }], userInfo: userInfo })
                                            this.SortByPoints()
                                        }
                                    })
                            })
                        })
                } catch (e) {
                    console.warn(e);
                }
                break;
            default: break
        }

    }

    getIDs(ids, fromPrice, toPrice, sortBy) {

    }

    SortByPoints() {
        const filtered = this.state.data.filter(item => item.stock > 0);
        const sorted = filtered.sort((first, second) => (Number(first.bonuspoint) < Number(second.bonuspoint)) ? -1 : ((Number(second.bonuspoint) < Number(first.bonuspoint)) ? 1 : 0))
        this.setState({ sortedData: sorted, loaded: true })
    }
    render() {
        console.log("this.state in product-by-point.js", this.state)

        if (!this.state.loaded) {
            return <Loading />
        }

        const { minPrice, maxPrice, fromPrice, toPrice, sortBy } = this.state
        // this.setState({ fromPrice, toPrice, sortBy })
        // const filtered = this.state.data.filter(({ price }) => price >= fromPrice && price <= toPrice)
        // console.log("FILTERED", filtered)
        // let sorted = [];
        // if (sortBy.length != 0) {
        //     switch (sortBy) {
        //         case 'popular':
        //             sorted = filtered.sort((first, second) => (first.popularity > second.popularity) ? -1 : ((second.popularity > first.popularity) ? 1 : 0))
        //             break
        //         case 'alphabet':
        //             sorted = filtered.sort((first, second) => (first.name > second.name) ? 1 : ((second.name > first.name) ? -1 : 0))
        //             break
        //         case 'price_down':
        //             sorted = filtered.sort((first, second) => (first.price > second.price) ? -1 : ((second.price > first.price) ? 1 : 0))
        //             break
        //         case 'price_up':
        //             sorted = filtered.sort((first, second) => (first.price < second.price) ? -1 : ((second.price < first.price) ? 1 : 0))
        //             break
        //         default: break
        //     }
        // }
        // const filtered = this.state.data.filter(item => item.stock > 0);
        // const sorted = filtered.sort((first, second) => (Number(first.bonuspoint) < Number(second.bonuspoint)) ? -1 : ((Number(second.bonuspoint) < Number(first.bonuspoint)) ? 1 : 0))
        return (
            <View>
                <FlatList
                    // data={!sorted.length ? this.state.data : sorted}
                    data={this.state.sortedData}
                    renderItem={({ item, index }) => {
                        const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID, tax, bonuspoint, } = item
                        return (
                            <View style={{ paddingBottom: 8 }}>
                                <BonusListItem
                                    name={productName}
                                    key={productID}
                                    price={this.props.userInfo.selectedUserType === 'EK' ? price.replace(/,/, '.') : companyPrice.replace(/,/, '.')}
                                    salePrice={salePrice.replace(/,/, '.') != 0 ? 'UVP ' + salePrice.replace(/,/, '.') : ''}
                                    companyPrice={companyPrice.replace(/,/, '.')}
                                    imageURL={previewImgURL}
                                    rate={rate}
                                    stock={stock}
                                    id={productID}
                                    imageURL={previewImgURL}
                                    tax={tax}
                                    bonuspoint={bonuspoint}
                                    salePercent={productSalePercent ? productSalePercent.int : null}
                                    routeName={this.state.routeName}
                                />
                            </View>
                        )
                        // }
                    }}


                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    // ListHeaderComponent={
                    //     this.state.data.length !== 0 ?
                    //         <FilterButton minPrice={minPrice} maxPrice={maxPrice} fromPrice={fromPrice} toPrice={toPrice} sortBy={sortBy} />
                    //         : null
                    // }
                    //ListFooterComponent={this.state.filteredIDs.length > this.state.products.length && (this.state.from + 12 === this.state.products.length) ? <FooterButton text='Weitere Produkte' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                    initialNumToRender={3}
                    windowSize={2}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, cart }) => ({ userInfo, cart })

export default connect(mapStateToProps)(ProductsByPoint)

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
