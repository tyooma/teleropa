import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'

import { sWidth, sHeight } from '../../helpers/screenSize';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { getBrandsList, getBannerImage, getPopularCategories } from '../../gets/mainPagePosts';

import ImageLoader from '../../helpers/image-loader';

import CategoryWithImageItem from '../../common/category-with-image-item';
import BrandListItem from '../../common/brand-list-item';

import { sendToken } from '../../posts/authPosts'

import Loading from '../loading';

import { MenuButton, SearchButton } from '../../common/header-buttons';

class Main extends Component {
    static navigationOptions = {
        title: 'Startseite',
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
        getBrandsList()
        getPopularCategories()
        getBannerImage().then(image => Image.getSize(image, (w, h) => {
            this.setImageSize(w, h);
            this.setState({ image })
        }))
        // getBannerImage().then(e => console.log('3', e))

    }

    getBrands() {
        const brands = this.props.mainPage.brands.filter((val, index) => {
            if (val.imgURL && val.supplierID) {
                return val
            }
        })
        return brands
    }

    setImageSize(width, height) {
        this.setState({ imageRatio: sWidth / (width / height) })
    }

    getCategoriesCards() {
        // console.log(this.props.mainPage.categories)

        return this.props.mainPage.categories.map(({ categoryName, categoryImageURL, categoryID }) => {
            // console.log(category)
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
        if (!this.props.mainPage.categories || !this.props.mainPage.brands || !this.state.image) {
            return <Loading />
        }

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
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
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
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
                    NEED TO DELETE
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', { name: 'Uno 4K SE Linux Receiver UHD 2160p', id: '58126' })}>
                        <ImageLoader source={{ uri: this.state.image }} style={{ width: '100%', height: this.state.imageRatio, resizeMode: 'contain' }} />
                    </TouchableOpacity>

                    <Text style={styles.helperText}>
                        Unsere aktuellen Wochenangebote
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft: 18, flexWrap: 'wrap' }}>
                        {this.getCategoriesCards()}
                    </View>
                    <View style={{ height: 100, marginBottom: 18 }} >
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
                    </View>

                    <View style={{ paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                        <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Subscribe')}>
                            <Text style={styles.bottomButtonText}>
                                Newsletter anmelden
                            </Text>
                        </TouchableOpacity>
                    </View>
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