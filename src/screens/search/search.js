import React, { Component } from 'react';

import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, Platform, ScrollView, StyleSheet, FlatList, Alert } from 'react-native';

import FooterButton from '../../common/footer-button';

import NavigationService from '../../navigation-service';

import BackButton from '../../common/header-buttons/back-button';

import AsyncStorage from '@react-native-community/async-storage';

import ScannerButton from '../../common/header-buttons/scanner-button';

import { getSearchResult } from '../../gets/productsListPost';

import { getPreviewProductData } from '../../gets/productPosts';

import Loading from '../loading'

import FilterButton from '../../common/filter-button';

import ProductListItem from '../../common/product-list-item'

const CustomHeader = ({ value, onChangeText, onEndEditing }) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#d10019' }}>
            <View style={styles.headerStyle}>
                <TouchableOpacity style={styles.backStyle} onPress={() => NavigationService.back()}>
                    <BackButton />
                </TouchableOpacity>
                <TextInput
                    autoFocus
                    value={value}
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    style={styles.searchInputStyle}
                    placeholder='Bitte geben Sie den Artikelnamen ein'
                    onChangeText={value => onChangeText(value)}
                    onEndEditing={() => onEndEditing()}
                />
                <ScannerButton />
            </View>
        </SafeAreaView>
    )
}

const SearchStoryItem = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.searchStoryItem} onPress={() => onPress()}>
            <Image style={styles.searchStoryItemImage} source={require('../../assets/icons/006-search.png')} key={'searchImageInput'} />
            <Text style={styles.searchStoryItemText} >{text}</Text>
        </TouchableOpacity>
    )
}

export default class Search extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return ({
            header: (
                <CustomHeader
                    value={params.searchText}
                    onChangeText={value => params.onChangeSearch(value)}
                    onEndEditing={() => params.onSubmit()}
                />
            )
        })
    }

    state = {
        showResult: false,
        originalIDs: [],
        products: [],
        from: 0,
        minPrice: 0,
        maxPrice: 0,
        fromPrice: 0,
        toPrice: 0,
        sortBy: '',
        loaded: false,
        searchText: '',
        searchStory: []
    }

    handleSearchSubmit() {
        try {
            AsyncStorage.getItem('searchStory').then(res => {
                if (!res) {
                    AsyncStorage.setItem("searchStory", JSON.stringify([]))
                    this.handleSearchSubmit()
                } else {
                    const story = JSON.parse(res)
                    if (story.length > 4) story.pop()
                    story.unshift(this.state.searchText)
                    AsyncStorage.setItem('searchStory', JSON.stringify(story))
                }

            })
        }
        catch (e) {
            console.warn(e)
        }
    }

    componentWillReceiveProps() {
        const searchFromProps = this.props.navigation.getParam('searchText', '')

        if (searchFromProps.length >= 3) {
            this.setState({ showResult: true })
        }
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
        AsyncStorage.getItem('searchStory').then(searchStory => {
            this.setState({ searchStory: JSON.parse(searchStory) })
        })
        this.props.navigation.setParams({
            searchText: this.state.searchText,
            onChangeSearch: value => this.onSearchChange(value),
            onSubmit: () => this.handleSearchSubmit()
        })
        if (this.state.searchText.length >= 3) {
            this.setState({ showResult: true })
        }
    }

    onSearchChange(searchText) {
        // console.log('searchText',searchText)
        // alert('asd')
        this.setState({ searchText })
        this.props.navigation.setParams({ searchText })
        this.setState({ showResult: searchText.length >= 3 })
        if (searchText.length >= 3) {
            // this.abortController.abort()
            this.setState({ loaded: false, products: [], from: 0, ids: [] })
            this.getProductsIDs(searchText)
        }
    }

    getProductsIDs(searchText) {
        getSearchResult(searchText).then(res => this.getIDs(res.searchResult))
    }

    findMinMaxPrice() {
        const prices = this.state.originalIDs.map(({ price }) => price)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)
        this.setState({ minPrice, maxPrice, fromPrice: minPrice, toPrice: maxPrice })
    }

    getIDs(ids, fromPrice, toPrice, sortBy) {
        if (fromPrice) {
            this.setState({ fromPrice, toPrice, sortBy })
            const filtered = this.state.originalIDs.filter(({ price }) => price >= fromPrice && price <= toPrice)
            switch (sortBy) {
                case 'popular':
                    filtered.sort((first, second) => (first.popularity > second.popularity) ? -1 : ((second.popularity > first.popularity) ? 1 : 0))
                    break
                case 'alphabet':
                    filtered.sort((first, second) => (first.name > second.name) ? 1 : ((second.name > first.name) ? -1 : 0))
                    break
                case 'price_down':
                    filtered.sort((first, second) => (first.price > second.price) ? -1 : ((second.price > first.price) ? 1 : 0))
                    break
                case 'price_up':
                    filtered.sort((first, second) => (first.price > second.price) ? 1 : ((second.price > first.price) ? -1 : 0))
                    break
                default: break
            }
            new Promise((resolve) => {
                this.setState({ filteredIDs: filtered, products: [], from: 0 })
                setTimeout(() => resolve(), 100)
            }).then(() => this.getData(0))
            // this.setState({ids: filtered, products: [], from: 0})
            console.log('SUKASUKASUKASUKASUKASUKASUKASUKASUKASUKASUKASUKASUKASUKASUKA', filtered)
            // this.getData(0)

        } else {
            this.setState({ originalIDs: ids, filteredIDs: ids, loaded: true })
            this.findMinMaxPrice()
            this.getData(0)
        }
    }

    getData(from) {
        this.setState({ from })
        this.state.filteredIDs.filter(({ productID }, key) => {
            // console.log(id, key)
            if (key >= from && key < (from + 12)) {
                getPreviewProductData(productID)
                    .then(res => {
                        const isProductContainInList = this.state.originalIDs.find((product) => product.productID === productID)
                        const isProductAlreadyShows = this.state.products.find((product) => product.id === productID)
                        if (isProductContainInList && !isProductAlreadyShows) {
                            console.log('added', productID)
                            this.setState({ products: [...this.state.products, { ...res, id: productID }] })
                        }
                    })
                    .catch(e => console.log(productID, e))
            }
        })
    }


    getSearchStory() {
        if (this.state.searchStory && this.state.searchStory.length > 0) {
            return (
                <View style={styles.searchStory}>
                    <Text style={styles.searchStoryTextHelper}> Suche </Text>
                    {this.state.searchStory.map((searchItem, index) => (
                        <SearchStoryItem onPress={() => this.onSearchChange(searchItem)} text={searchItem} key={index} />
                    ))}
                </View>
            )
        }
        return null
    }

    renderHelper() {
        console.log('this.state in search.js', this.state);
        if (!this.state.showResult) {
            return this.getSearchStory()
        }

        //if (!this.state.loaded || this.state.products.length == 0) return <Loading />
        if (!this.state.loaded) return <Loading />
        const { minPrice, maxPrice, fromPrice, toPrice, sortBy } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* <FilterButton /> */}
                <View style={styles.productsLine}>
                    {this.state.products.length == 0 ? Alert.alert(
                        "Alarm",
                        "Nicht verfügbar",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    //this.props.navigation.goBack();
                                    return this.getSearchStory()
                                },
                            },
                        ],
                        { cancelable: false }
                    )
                        :
                        <FlatList
                            // contentContainerStyle={{paddingLeft: 18}}
                            data={this.state.products}
                            renderItem={({ item }) => {
                                const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, id } = item
                                return (
                                    <View style={{ paddingBottom: 8 }}>
                                        <ProductListItem
                                            name={productName}
                                            price={price}
                                            salePrice={salePrice}
                                            companyPrice={companyPrice}
                                            rate={rate}
                                            stock={stock}
                                            id={id}
                                            imageURL={previewImgURL}
                                            salePercent={productSalePercent ? productSalePercent.int : null}
                                        />
                                    </View>
                                )
                                // }
                            }}
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            numColumns={4}
                            ListHeaderComponent={<FilterButton minPrice={minPrice} maxPrice={maxPrice} fromPrice={fromPrice} toPrice={toPrice} sortBy={sortBy} />}
                            ListFooterComponent={this.state.filteredIDs.length > this.state.products.length && (this.state.from + 12 === this.state.products.length) ? <FooterButton text='More products' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                            initialNumToRender={3}
                            windowSize={2}
                            keyExtractor={item => item.id}
                        />
                    }
                </View>
            </View>
        )
    }

    render() {
        return this.renderHelper()
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#d10019',
        height: Platform.OS === 'ios' ? 44 : 56,
        flexDirection: 'row'
    },
    backStyle: {
        paddingHorizontal: 1,
        justifyContent: 'center',
        height: '100%'
    },
    searchInputStyle: {
        flex: 1,
        color: '#fff',
        fontSize: 16
    },
    searchStory: {
        paddingHorizontal: 18
    },
    searchStoryTextHelper: {
        marginVertical: 20,
        color: '#a0a0a0',
        fontSize: 12
    },
    searchStoryItemImage: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        marginRight: 15
    },
    searchStoryItemText: {
        fontSize: 16,
        color: '#505050'
    },
    searchStoryItem: {
        marginBottom: 15,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productsLine: {
        flexDirection: 'row',
        // marginTop: 6,
        // marginBottom: 30,
        flexWrap: 'wrap'
    }
})