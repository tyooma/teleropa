import React, { Component } from 'react';

import { Text, TouchableOpacity, View, Image, Modal, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { BoxShadow } from 'react-native-shadow'

import Toast from 'react-native-root-toast'

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service'

import FooterButton from '../../common/footer-button';

import Loading from '../loading'

import { getPreviewAsyncProductData, getPromocodeData } from '../../gets/productPosts';

getStock = (stock, order, pcs) => {
    if (!order) {
        if (stock > 0) {
            return (
                <Text style={styles.cartItemInStock}>
                    Produkt ist verfügbar
                </Text>
            )
        }

        return (
            <Text style={styles.cartItemNotInStock}>
                nicht verfügbar
            </Text>
        )
    }
    return (
        <Text >
            {pcs} St.
        </Text>
    )
}

getCounterInPreview = (order, pcs) => {
    if (!order) {
        return (

            <Text style={styles.countText}>
                Anzahl:  {pcs}
            </Text>

        )
    }
}

export const CartItemInPreview = ({ img, name, pcs, price, companyPrice, stock, order, orderReturnReason, id, userType, orderVAT, deliveryPrice }) => {
    return (
        <TouchableOpacity style={styles.cartItemContainer} onPress={() => NavigationService.push('Product', { id, name })}>
            <View style={{ flexDirection: 'row' }}>
                {img ?
                    <View>
                        <ImageLoader style={styles.cartItemImage} source={{ uri: img }} key={img} />
                    </View>
                    :
                    <View>
                        <Image style={styles.cartItemImage} source={require('../../assets/message-icons/no-photo.png')} key={'no-image'} />
                    </View>
                }

                <View style={{ flex: 1 }}>
                    <Text style={styles.cartItemName} numberOfLines={2}>
                        {name}
                    </Text>
                    <View style={{ marginTop: 4, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            {getStock(stock, order, pcs)}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                {getCounterInPreview(order, pcs, id)}
                            </View>
                        </View>
                        <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
                            {userType && userType === 'H' ?
                                <>
                                    <Text style={styles.pricePerProduct}>{companyPrice} €\St</Text>
                                    {/* <Text style={styles.price}>{parseFloat((companyPrice * pcs) + deliveryPrice).toFixed(2)} €</Text> */}
                                    <Text style={styles.price}>{parseFloat((companyPrice * pcs)).toFixed(2)} €</Text>
                                </>
                                :
                                <>
                                    <Text style={styles.pricePerProduct}>{price} €\St</Text>
                                    {/* <Text style={styles.price}>{((price * pcs) + deliveryPrice).toFixed(2)} €</Text> */}
                                    <Text style={styles.price}>{((price * pcs)).toFixed(2)} €</Text>
                                </>
                            }
                        </View>
                    </View>
                    {orderReturnReason ? <Text style={{ marginBottom: 5 }}>Grund für Rückgabe: {orderReturnReason}</Text> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default class CartPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryData: this.props.navigation.getParam('deliveryData', null),
            cartInfo: this.props.navigation.getParam('data', null),
        }
    }

    static navigationOptions = { title: 'Bestellübersicht' }


    getProductsCards() {
        return this.state.cartInfo.products.map(({ id, previewImgURL, productName, price, companyPrice, stock, count }) => {
            return (
                <CartItemInPreview
                    key={id}
                    id={id}
                    img={previewImgURL}
                    name={productName}
                    pcs={count}
                    price={price}
                    companyPrice={companyPrice}
                    stock={stock}
                    userType={this.state.cartInfo.selectedUserType}
                    orderVAT={this.state.cartInfo.orderVAT}
                    deliveryPrice={this.state.deliveryData.deliveryPrice}
                />
            )
        })
    }



    render() {
        const shadowOpt = {
            width: sWidth,
            height: 50,
            color: "#000",
            border: 6,
            radius: 1,
            opacity: 0.1,
            x: 0,
            y: 0
        }
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 18, marginTop: 22 }}>
                        {this.getProductsCards()}
                        <View style={styles.line}>
                            <Text style={styles.summaryText}>Summe:</Text>
                            <Text style={styles.summaryText}>{parseFloat(this.state.cartInfo.discountProductsPrice).toFixed(2)} €</Text>
                            {/* <Text style={styles.summaryText}>{(parseFloat(this.state.cartInfo.discountProductsPrice) + parseFloat(this.state.cartInfo.orderVAT)).toFixed(2)} €</Text> */}

                        </View>


                        <View style={styles.line}>
                            <Text style={styles.summaryText}>Versandkosten:</Text>
                            <Text style={styles.summaryText}>{this.state.deliveryData.deliveryPrice.toFixed(2)} €</Text>
                        </View>


                        <View style={styles.line}>
                            <Text style={styles.summaryTextBold}>Gesamtsumme:</Text>
                            <Text style={styles.summaryTextBold}>{(parseFloat(this.state.cartInfo.discountProductsPrice) + parseFloat(this.state.deliveryData.deliveryPrice)).toFixed(2)} €</Text>
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.summaryText}>Gesamtsumme ohne MwSt.:</Text>
                            <Text style={styles.summaryText}>{this.state.cartInfo.orderVAT} €</Text>
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.summaryText}>zzgl. MwSt.:</Text>
                            <Text style={styles.summaryText}> {parseFloat(this.state.cartInfo.discountProductsPrice - this.state.cartInfo.orderVAT).toFixed(2)} €</Text>
                        </View>


                        <View style={styles.line}>
                            <Text style={styles.summaryTextPoint}>Punkte für die Bestellung:</Text>
                            <View style={styles.linePoint}>
                                <Text style={styles.summaryTextPointGreen}>{'+ ' + Math.floor(parseFloat(this.state.cartInfo.discountProductsPrice))}</Text>
                                <Text style={styles.radiusCircle}>P</Text>
                            </View>
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.summaryTextPoint}>Punkte eingelöst:</Text>
                            <View style={styles.linePoint}>
                                <Text style={styles.summaryTextPointRed}>{'- ' + 0}</Text>
                                <Text style={styles.radiusCircle}>P</Text>
                            </View>
                        </View>


                    </View>
                </ScrollView>


                <BoxShadow setting={shadowOpt}>
                    <View style={styles.footerSummaryContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={styles.summaryTextBold} >Gesamtbetrag:</Text>
                            <Text style={styles.summaryTextBold}>{(parseFloat(this.state.cartInfo.discountProductsPrice) + parseFloat(this.state.deliveryData.deliveryPrice)).toFixed(2)} €</Text>
                        </View>
                    </View>
                </BoxShadow>


                <FooterButton text={'Zahlungspflichtig bestellen'} onPress={() => { NavigationService.navigate('Payment', { data: this.state }) }} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    emptyCartText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 19
    },
    linePoint: {
        flexDirection: 'row',
    },
    summaryTextBold: {
        color: '#040404',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    summaryText: {
        color: '#040404',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    summaryTextPoint: {
        color: '#8a0010',
        fontSize: 16
    },
    summaryTextPointRed: {
        color: '#e74c3c',
        fontSize: 16
    },
    summaryTextPointGreen: {
        color: '#2ecc71',
        fontSize: 16,
    },
    radiusCircle: {
        left: 5,
        width: 100 / 4,
        height: 100 / 4,
        borderRadius: 150 / 2,
        backgroundColor: '#d10019',
        color: '#040404',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    cartItemContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginBottom: 14,
        borderRadius: 5

    },
    cartItemImage: {
        margin: 10,
        height: 90,
        width: 80,
        resizeMode: 'contain'
    },
    cartItemName: {
        fontSize: 10,
        color: '#040404',
        lineHeight: 16,
        width: '80%',
        marginTop: 10
    },
    cartItemInStock: {
        fontSize: 10,
        color: '#3f911b'
    },
    cartItemNotInStock: {
        fontSize: 10,
        color: '#d10019'
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    deleteButtonImage: {
        margin: 12,
        width: 13,
        height: 13,
        resizeMode: 'contain'
    },
    minusPlusButton: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    minusPlusButtonImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    countText: {
        fontSize: 12,
        color: '#000',
        marginHorizontal: 12
    },
    pricePerProduct: {
        fontSize: 12,
        color: '#a0a0a0',
        marginBottom: 6
    },
    price: {
        fontSize: 16,
        color: '#040404'
    },
    promocodeButton: {
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    promocodeButtonText: {
        fontSize: 16,
        color: '#030303'
    },
    footerSummaryContainer: {
        height: 50,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
})