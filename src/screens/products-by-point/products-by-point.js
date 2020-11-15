import React, { Component } from 'react'

import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';

import BonusListItem from '../../common/bonus-list-item';

import { getPreviewProductData1, getBonusProducts } from '../../gets/productPosts';

import Loading from '../loading';

import { connect } from 'react-redux'

import FooterNavBar from '../../common/footer-navigation-bar/footer-navigation-bar';

import FilterButtonPoint from '../../common/filter-point-button';

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
        originalIDs: [],
        filteredIDs: [],
        loaded: false,
        routeName: 'ProductsByPoint',
        from: 0,
        minBonuspoint: 0,
        maxBonuspoint: 0,
        fromBonuspoint: 0,
        toBonuspoint: 0,
        sortBy: '',
    }

    async componentDidMount() {
        var arr = [];
        var sorted = [];

        const title = this.props.navigation.getParam('title', null)
        const userInfo = this.props.navigation.getParam('userInfo', null)
        const checkURL = this.props.navigation.getParam('checkURL', null)

        this.props.navigation.addListener('didFocus', (route) => {
            const filterOptions = this.props.navigation.getParam('filterOptions', null)
            if (filterOptions) {
                const { from, to, sortBy } = filterOptions
                if (from !== this.state.fromBonuspoint || to !== this.state.toBonuspoint || sortBy !== this.state.sortBy) {
                    this.getIDs(this.state.ids, from, to, sortBy)
                }
            }
        });

        // learnRegExp = () => {
        //     return /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(learnRegExp.arguments[0]);
        // }


        // switch (title, checkURL) {
        switch (title) {
            case 'TELEPOINTS':
                try {
                    let getBonusProductsJSON = await getBonusProducts()
                    count = getBonusProductsJSON.length;
                    count1 = 0;
                    getBonusProductsJSON.map((x) => {
                        let respJSON = getPreviewProductData1(x.productID)
                        console.log("getPreviewProductData  ==> res", respJSON);
                        console.log("********************************************************************************************************")
                        respJSON
                            .then(ResponseRespJSON => {
                                count1++;
                                if (ResponseRespJSON.status != "404" && ResponseRespJSON.stock > 0) {
                                    arr.push({ ...ResponseRespJSON, productID: x.productID, bonuspoint: x.required_points, })
                                }
                                if (count === count1) {
                                    sorted = arr.sort((first, second) => (Number(first.bonuspoint) < Number(second.bonuspoint)) ? -1 : ((Number(second.bonuspoint) < Number(first.bonuspoint)) ? 1 : 0))
                                    //this.setState({ sortedData: sorted, loaded: true, userInfo: userInfo })                                             
                                    this.getIDs(sorted)
                                }
                            })
                    })
                } catch (e) {
                    console.warn(e);
                }
                break;
            default:
                this.props.navigation.navigate('Main');
        }

    }


    findMinMaxPrice(ids) {
        const Bonuspoint = ids.map(({ bonuspoint }) => bonuspoint);
        const maxBonuspoint = Math.max(...Bonuspoint)
        const minBonuspoint = Math.min(...Bonuspoint)
        this.setState({ minBonuspoint, maxBonuspoint, fromBonuspoint: minBonuspoint, toBonuspoint: maxBonuspoint, originalIDs: ids, filteredIDs: ids, loaded: true, })
        // this.getData(0)
    }

    getIDs(ids, fromBonuspoint, toBonuspoint, sortBy) {
        // console.log("ids", ids, "fromBonuspoint", fromBonuspoint, "toBonuspoint", toBonuspoint, " sortBy", sortBy);
        if (fromBonuspoint == 0 || toBonuspoint == 0) {
            Toast.show("Prijs kan niet 0 zijn", {
                shadow: false,
                backgroundColor: "#505050",
                duration: 1500,
            })
        }
        if (fromBonuspoint && toBonuspoint) {
            const filtered = this.state.originalIDs.filter(({ bonuspoint }) => bonuspoint >= fromBonuspoint && bonuspoint <= toBonuspoint)
            let sorted = [];
            if (sortBy.length != 0) {
                switch (sortBy) {
                    case 'popular':
                        sorted = filtered.sort((first, second) => (first.rate > second.rate) ? -1 : ((second.rate > first.rate) ? 1 : 0))
                        break
                    case 'alphabet':
                        sorted = filtered.sort((first, second) => (first.productName > second.productName) ? 1 : ((second.productName > first.productName) ? -1 : 0))
                        break
                    case 'price_down':
                        sorted = filtered.sort((first, second) => (parseFloat(first.bonuspoint) > parseFloat(second.bonuspoint)) ? -1 : ((parseFloat(second.bonuspoint) > parseFloat(first.bonuspoint)) ? 1 : 0))
                        break
                    case 'price_up':
                        sorted = filtered.sort((first, second) => (parseFloat(first.bonuspoint) < parseFloat(second.bonuspoint)) ? -1 : ((parseFloat(second.bonuspoint) < parseFloat(first.bonuspoint)) ? 1 : 0))
                        break
                    default: break
                }
                this.setState({ filteredIDs: sorted, from: 0, fromBonuspoint, toBonuspoint, sortBy, });
            } else {
                sorted = filtered
                this.setState({ filteredIDs: sorted, from: 0, fromBonuspoint, toBonuspoint, sortBy, });
            }
        } else { this.findMinMaxPrice(ids) }
    }



    render() {
        //    console.log("this.state in product-by-point.js ", this.state)

        if (!this.state.loaded) { return <Loading /> }

        const { minBonuspoint, maxBonuspoint, fromBonuspoint, toBonuspoint, sortBy } = this.state
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.filteredIDs}
                    renderItem={({ item, index }) => {
                        const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID, tax, bonuspoint, } = item
                        return (
                            <View key={index} style={{ paddingBottom: 8 }}>
                                <BonusListItem
                                    key={index}
                                    name={productName}
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
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    ListHeaderComponent={
                        <FilterButtonPoint minBonuspoint={minBonuspoint} maxBonuspoint={maxBonuspoint} fromBonuspoint={fromBonuspoint} toBonuspoint={toBonuspoint} sortBy={sortBy} />
                    }
                    //ListFooterComponent={this.state.filteredIDs.length > this.state.products.length && (this.state.from + 12 === this.state.products.length) ? <FooterButton text='Weitere Produkte' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                    initialNumToRender={3}
                    windowSize={2}
                    keyExtractor={item => item.id}
                />
                <View style={styles.footer}>
                    <FooterNavBar />
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, cart }) => ({ userInfo, cart })

export default connect(mapStateToProps)(ProductsByPoint)

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
    },

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
