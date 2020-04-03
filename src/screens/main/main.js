import React, { Component } from 'react'
import { Dimensions, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'

import { sWidth, sHeight } from '../../helpers/screenSize';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { getBannerImage, getBrandsList, getNewestList, getOffersList, getPopularCategories } from '../../gets/mainPagePosts';

import ImageLoader from '../../helpers/image-loader';

import CategoryWithImageItem from '../../common/category-with-image-item';
import NewestListItem from '../../common/newest-list';
import OffersListItem from '../../common/offers-list';
import BrandListItem from '../../common/brand-list-item';

import { sendToken } from '../../posts/authPosts'

import Loading from '../loading';

import { MenuButton, SearchButton } from '../../common/header-buttons';


import HTML from "react-native-render-html";

class Main extends Component {
    static navigationOptions = {
        //title: 'Startseite',
        headerLeft: (
            <>
                <MenuButton />
                <Image style={{ width: 60, height: 30, resizeMode: 'contain' }} source={require('../../assets/teleropa-logo.png')} key={'menuTeleropaLogo'} />
            </>
        ),
        headerRight: (
            <View style={{ flexDirection: 'row', marginRight: 9 }}>
                <SearchButton />
            </View>
        )
    }

    state = {
        brands: null,
        imageRatio: sHeight / 3,
        image: null
    }
    constructor(props) {
        super(props)
    }



    componentDidMount() {
        this.getTokenFromStorage()
        // getBrandsList()
        getNewestList()
        getOffersList()
        getPopularCategories()
        getBannerImage().then(image => Image.getSize(image, (w, h) => {
            this.setImageSize(w, h);
            this.setState({ image })
        }))
        // getBannerImage().then(e => console.log('3', e))
    }

    setImageSize(width, height) {
        this.setState({ imageRatio: sWidth / (width / height) })
    }

    getBanner() {
        console.log('getBannerImage', getBannerImage)

        // return this.props.mainPage.banner.products.filter(({  }) => {
        //     // console.log(category)
        //     if (previewImgURL) return <NewestListItem key={productID} id={productID} text={productName} image={{ uri: previewImgURL }} price={price} companyPrice={companyPrice} />
        // })
    }

    getBrands() {
        const brands = this.props.mainPage.brands.filter((val, index) => {
            if (val.imgURL && val.supplierID) {
                return val
            }
        })
        return brands
    }

    getNewest() {
        return this.props.mainPage.newest.products.filter(({ productID, productName, previewImgURL, price, companyPrice }) => {
            if (previewImgURL) return <NewestListItem key={productID} id={productID} text={productName} image={{ uri: previewImgURL }} price={price} companyPrice={companyPrice} />
        })
    }

    getOffers() {
        // const offers = this.props.mainPage.offers.products.filter((val, index) => {
        //     if (val.productID && val.productName && val.previewImgURL && val.price && val.companyPrice && val.pseudoprice) {
        //     return val
        //     }
        // })
        // return offers

        return this.props.mainPage.offers.products.filter(({ productID, productName, previewImgURL, price, companyPrice, pseudoprice }) => {
            // console.log(category)
            if (previewImgURL) return <OffersListItem key={productID} id={productID} text={productName} image={{ uri: previewImgURL }} price={price} companyPrice={companyPrice} salePrice={pseudoprice} />
        })
    }

    getCategoriesCards() {
        console.log('this.props.mainPage', this.props.mainPage)
        return this.props.mainPage.categories.map(({ categoryName, categoryImageURL, categoryID }) => {
            console.log('getCategoriesCards', this)
            if (categoryImageURL) return <CategoryWithImageItem key={categoryID} id={categoryID} text={categoryName} image={{ uri: categoryImageURL }} />
        })
    }


    async getTokenFromStorage() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        this.setState({ fcmToken })
    }

    send() {
        console.log('Triggered')
        sendToken(this.state.fcmToken)
    }

    render() {
        console.log("this.props in main.js", this.props)
        if (!this.props.mainPage.categories ||
            // !this.props.mainPage.brands || 
            !this.state.image ||
            !this.props.mainPage.newest.products ||
            !this.props.mainPage.offers.products
        ) {
            return <Loading />
        }

        // const htmlContent = 
        // `<a href="/audiohifi/s-20-radio-internetradio-dab-ukw-usb-hybridradio" class="index-hello-link">
        //     <img class="index-hello-image" src="https://teleropa.de/media/image/11/8f/1c/Banner_S20_teleropa.jpg">
        //         <div class="index-hello-groups">
        //             <div class="index-hello-content">
        //                 <div class="index-hello-headline"><b>20€ SPAREN</b><span>DIGITALRADIO ZUM MEGAPREIS</span></div>
        //                 <div class="index-hello-desc">
        //                     <p>TELESTAR S20</p>
        //                     <p>DAB+ & RDS UKW Stereoradio</p>
        //                     <ul> <li>Weckfunktion</li> <li>Digitaler Soundprozessor (DSP)</li> <li>Speicherplatz für 10 DAB+/UKW Sender</li> </ul>
        //                 </div>
        //                 <div class="index-hello-actions">
        //                     <div class="index-hello-logo">
        //                         <img src="/media/image/d6/fc/1e/Telestar-Logo-weiss.png">
        //                     </div>
        //                         <div class="index-hello-price"><span>NUR</span><b><i class="wbp-net-switch-banner--value">99,00</i> €</b></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </a>`

        const image = require('../../assets/icons-color/008-check2.png');
        return (
            <View style={{ flex: 1 }} >
                <ScrollView>
                    {/* NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE */}

                    {/* <Text style={{marginBottom: 8, paddingHorizontal: 18, width: '100%'}} > Токен:</Text>
                    <Text style={{marginBottom: 18, paddingHorizontal: 18, width: '100%'}} >{this.state.fcmToken}</Text>
                    <View style={{paddingHorizontal: 18, alignItems: 'center', jusifyContent: 'center', width: '100%'}} >
                        <TouchableOpacity style={styles.bottomButton} onPress={() => this.send()}>
                            <Text style={styles.bottomButtonText}>
                                Отправить токен на teleropa
                            </Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE */}
                    <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
                        <View style={styles.topContainer}>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Kostenloser Hin- und Rückversand ab 40 EUR*</Text>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Tagesaktuelle Preise</Text>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Tagesaktuelle Preise</Text>
                        </View>
                    </ScrollView>

                    {/* <TouchableOpacity onPress={() => this.props.setNetworkStatusOff()}> */}

                    {/* <HTML html={htmlContent} /> */}

                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Product', { name: 'Uno 4K SE Linux Receiver UHD 2160p', id: '58126' })}>
                        {this.getBanner()}
                        <ImageLoader source={{ uri: this.state.image }} style={{ width: '100%', height: this.state.imageRatio, resizeMode: 'contain' }} />
                    </TouchableOpacity>

                    <Text style={styles.helperText}>
                        Unsere aktuellen Wochenangebote
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft: 18, flexWrap: 'wrap' }}>
                        {this.getCategoriesCards()}
                    </View>

                    <Text style={styles.helperText}>
                        Aktuelle Angebote
                    </Text>
                    <View style={{ flexDirection: 'row', height: 160, flexWrap: 'wrap' }} >
                        <FlatList
                            horizontal
                            data={this.getOffers()}
                            renderItem={({ item }) => {
                                return <OffersListItem key={item.productID} id={item.productID} text={item.productName} image={{ uri: item.previewImgURL }} price={item.price} companyPrice={item.companyPrice} salePrice={item.pseudoprice} />
                            }}
                            keyExtractor={item => item.productName}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <Text style={styles.helperText}>
                        Unsere Neuheiten
                    </Text>
                    <View style={{ flexDirection: 'row', height: 170, flexWrap: 'wrap' }} >
                        <FlatList
                            horizontal
                            data={this.getNewest()}
                            renderItem={({ item }) => {
                                return <NewestListItem key={item.productID} id={item.productID} text={item.productName} image={{ uri: item.previewImgURL }} price={item.price} companyPrice={item.companyPrice} />
                            }}
                            keyExtractor={item => item.productName}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>


                    {/* <View style={{ height: 100 }} >
                        <FlatList
                            horizontal
                            data={this.getBrands()}
                            renderItem={({ item }) => {
                                return <BrandListItem brand={item.title} image={{ uri: item.imgURL }} id={item.supplierID} />
                            }}
                            keyExtractor={item => item.title}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View> */}

                    {/* <View style={{ paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                        <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Subscribe')}>
                            <Text style={styles.bottomButtonText}>
                                Newsletter anmelden
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        mainPage: state.mainPage
    }
}



export default connect(mapStateToProps)(Main);

const styles = {
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 58,
        paddingLeft: 17,
        paddingRight: 3
    },
    topImage: {
        width: 17,
        height: 17,
        resizeMode: 'contain'
    },
    topText: {
        marginLeft: 6,
        marginRight: 14,
        fontSize: 16,
        color: '#030303'
    },
    promoImage: {
        // backgroundColor: '#D1001A',
        resizeMode: 'contain',
        // flex: 1,
        height: 132,
        width: '100%'
    },
    helperText: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 0,
        color: '#030303',
        marginLeft: 18
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 18,
        height: 40,
        maxWidth: 330,
        borderRadius: 5,
        marginBottom: 21,
        borderWidth: 0.3,
        borderColor: '#d10019'
    },
    bottomButtonText: {
        color: '#d10019',
        fontSize: 16
    }
}