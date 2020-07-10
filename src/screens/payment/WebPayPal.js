import React, { Component } from 'react';

<<<<<<< HEAD
import { connect } from 'react-redux'

import { View } from 'react-native';

import Toast from 'react-native-root-toast';
=======
import { connect } from 'react-redux';

import { View, ToastAndroid, Alert } from 'react-native';
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5

import { WebView } from 'react-native-webview';

import base64 from 'react-native-base64';

import Loading from '../loading';

<<<<<<< HEAD
import { addToCart, minusFromCart, deleteFromCart, clearCart } from '../../functions/cart-funcs'
=======
import { addToCart, minusFromCart, deleteFromCart, clearCart } from '../../functions/cart-funcs';

>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5

export class WebPayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: true,
            access_token: "",
            approvalUrl: null,
            url: false,
            id: '',
            loading: false,
            paymentId: '',
            cart: this.props.navigation.getParam('CartData'),
            name: this.props.userInfo.name,
            surname: this.props.userInfo.surname,
            phone: this.props.userInfo.phone,
            country: this.props.userInfo.country,
            street: this.props.userInfo.street,
            city: this.props.userInfo.city,
            post: this.props.userInfo.post,
<<<<<<< HEAD

            // realAccount: true
            realAccount: false
        }
    }
    async componentDidMount() {
        const paypalClientId = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const paypalSecret = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = (productsPrice + deliveryPrice).toFixed(2);
        const token = base64.encode(`${paypalClientId}:${paypalSecret}`);
        try {
=======
        }
    }



    // async componentDidMount() {
    async componentWillMount() {
        //const username = 'Aa30wKqF5Jq5epDJ7wPnGLYBBnhtp4i8t91Qb0PNW7o82k-cQYoFp9t_4ujkCU84D27ke16unohfm3XX'; //Sandbox
        //const password = 'EPBftFl3oHshi5rBEYudrbsCho_aqm1-ynQYkJbW3T0z3APbEt4g76lI01EZs_zLnYexSWScCIU7Ex6K';//Sandbox

        const username = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const password = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = (productsPrice + deliveryPrice).toFixed(2);
        const token = base64.encode(`${username}:${password}`);
        console.log("TOKEN", token)
        try {
            // fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
            fetch('https://api.paypal.com/v1/oauth2/token', {
                method: 'POST',
                'Authorization': {
                    'TYPE': 'Basic Auth',
                    'Username': `${paypalClientId}`
                },
                headers: {
                    'Authorization': 'Basic ' + `${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=client_credentials"
            })
                .then(response => {
                    return response.json()
                })
<<<<<<< HEAD
                .then(response => {                    
=======
                .then(response => {
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                    this.setState({
                        access_token: response.access_token
                    })
                    return response.access_token
                })
                .then(access_token => {
<<<<<<< HEAD
                    var paypalPaymentObj =
=======
                    var PAYMENT =
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                    {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal",
                        },
                        "transactions": [{
                            "amount": {
                                "total": total,
                                "currency": "EUR",
                                "details": {
                                    "subtotal": productsPrice,
                                    "shipping": deliveryPrice,
                                }
                            },

                            "description": "The payment transaction description.",
                            "item_list": {
                                "items": this.state.cart.products.map((product) => {
                                    return {
                                        'name': product.productName,
                                        'quantity': product.count,
                                        'price': this.props.userInfo.selectedUserType === 'EK' ? product.price : product.companyPrice,
                                        'currency': 'EUR'
                                    }
<<<<<<< HEAD
                                },
                                "payment_options": {
                                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                },
                                "item_list": {
                                    "items": this.state.cart.products.map(product => {
                                        return {
                                            "name": product.productName,
                                            "quantity": product.count,
                                            "price": product.companyPrice,
                                            "currency": 'EUR'
                                        }
                                    }),
=======
                                }),
                                "shipping_address": {
                                    "recipient_name": this.state.name + ' ' + this.state.surname,
                                    //"recipient_name": 'name',
                                    "line1": this.state.street,
                                    //"line1": 'line1',
                                    "city": this.state.city,
                                    //"city": 'city',                                    
                                    "country_code": 'DE',
                                    "postal_code": this.state.post,
                                    //"postal_code": '12356',
                                    "phone": this.state.phone,
                                    //"phone": '+380937955781',
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                                }

                            }
                        }],
                        "redirect_urls": {
                            // "return_url": "https://teleropa.de/return",
                            // "cancel_url": "https://teleropa.de/cancel"

                            "return_url": "https://example.com/",
                            "cancel_url": "https://example.com/"
                            // "return_url": this.setState({ approvalUrl: null }),
                            // "cancel_url": this.setState({ approvalUrl: null })
                        }
                    }
                    console.log("PETY", PAYMENT.transactions)
                    // Create a payment
<<<<<<< HEAD
=======
                    // fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                    fetch('https://api.paypal.com/v1/payments/payment', {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Authorization': 'Bearer ' + access_token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            PAYMENT
                        )
                    })
<<<<<<< HEAD
                        .then(res => console.log("Create a payment~~~~~~~~~~~~~~~~~~~", res.json()))
                        .then(responseJson => {
                            const { id, links } = responseJson
                            console.log("Create a payment", responseJson)
                            // console.log("links", links)
=======
                        .then(res => res.json())
                        .then(responseJson => {
                            const { id, links } = responseJson
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                            const approvalUrl = links.find(data => data.rel == "approval_url")
                            this.setState({
                                paymentId: id,
                                approvalUrl: approvalUrl.href
                            })
                        })
                        .catch(err => {
                            // console.log(err)
                            Alert.alert(
                                "Bitte geben Sie eine gültige Lieferadresse ein", '',
                                [
                                    { text: 'OK', onPress: () => this.props.navigation.navigate('Cart') },
                                ],
                                { cancelable: false },
                            );
                        })
                })
                .catch(err => {
                    console.log({ ...err })
                })
        } catch (error) {
            alert(error);
        }
    }


    _onNavigationStateChange = (webViewState) => {
        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: null
            })
            const params = webViewState.url.toString();
            const p = params.indexOf('PayerID=');

            if (p >= 0 && this.state.count) {
                this.setState({ count: false });
                const l = params.length;
                const res = params.substring(p, l).replace('PayerID=', "");

                const paid = this.payment(res);
            }
        }
    }

    payment(payer) {
        try {
<<<<<<< HEAD
=======
            // fetch('https://api.sandbox.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
            fetch('https://api.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + this.state.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "payer_id": payer
                })
            })
                .then(response => {
                    console.log("response.json();", response.json())
                    response.json();
                    new Promise((resolve) => {
                        ToastAndroid.show(`Ihre Zahlung wird nicht bestätigt`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                        setTimeout(() => resolve(), 200)
                    })
                })
                .then(responseJson => {
<<<<<<< HEAD
                    if (responseJson.name.length > 0) {
                        //ToastAndroid.show(`Your Payment is confirmed`, ToastAndroid.LONG);
                        Toast.show('Your Payment is confirmed', {
                            shadow: false,
                            backgroundColor: '#505050',
                            duration: 1500
                        })
                        this.props.navigation.navigate('Main');
                    } else {
                        // ToastAndroid.show(`Your Payment is not confirmed`, ToastAndroid.LONG);
                        Toast.show('Your Payment is not confirmed', {
                            shadow: false,
                            backgroundColor: '#505050',
                            duration: 1500
                        })
=======
                    console.log("responseJson11111111111", responseJson)
                    if (responseJson == undefined) {
                        ToastAndroid.show(`Ihre Zahlung wird nicht bestätigt`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                    }
                    if (responseJson.name == 'INSTRUMENT_DECLINED') {
                        ToastAndroid.show(`Ihre Zahlung wird nicht bestätigt`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                    }
                    if (responseJson.failed_transactions.length == 0) {
                        ToastAndroid.show(`Ihre Zahlung wird bestätigt`, ToastAndroid.LONG);
                        clearCart()
                        this.props.navigation.navigate('Main');
                    } else {
                        ToastAndroid.show(`Ihre Zahlung wird nicht bestätigt`, ToastAndroid.LONG);
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                        this.props.navigation.navigate('Payment');
                    }
                })
        } catch (error) {
            Alert.alert(
                "Ihr Gerätecode ", error,
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Main') },
                ],
                { cancelable: false },
            );
        }
    }


    render() {
<<<<<<< HEAD
        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ?
                        <WebView
                            style={{ height: 400, width: 300 }}
                            source={{ uri: approvalUrl }}
=======
        console.log("this.state in PAYPAL   ", this.state);
        console.log("this.props in PAYPAL   ", this.props);
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.approvalUrl ?
                        <WebView
                            style={{ height: 400, width: 300 }}
                            source={{ uri: this.state.approvalUrl }}
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                            onNavigationStateChange={this._onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
<<<<<<< HEAD
=======
                            injectedJavaScript={this.state.cookie}
                            BackAndroid={true}
                            BackHandler={true}
>>>>>>> bbd40886bc5d9a34a01ab284f7f8e322b01257f5
                            style={{ marginTop: 20 }}
                        />
                        : <Loading />
                }
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID })

export default connect(mapStateToProps)(WebPayPal)