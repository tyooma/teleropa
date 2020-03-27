import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64'
import Loading from '../loading'
import { addToCart, minusFromCart, deleteFromCart, clearCart } from '../../functions/cart-funcs'

import { connect } from 'react-redux'

export class WebPayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            res: '',
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

            realAccount: true
        }
    }
    async componentDidMount() {

        const userAPI = 'verkauf_api1.teleropa.de';
        const userPassword = 'W3GZUK35NCHVLFPX';
        const userSignature = 'ATPe0x.0AaCf8Jbe3rt2FqZjSzAIAIJ9zA8Pd5oyWSdMCF6lvdU3HtDm';

        const sandboxClientId = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
        const sandboxSecret = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';
        const paypalClientId = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const paypalSecret = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = productsPrice + deliveryPrice;

        const productsQuantity = this.state.cart.products.reduce((sum, { count }) => {
            return sum + count
        }, 0)

        const deliveryId = this.state.cart.deliveryData.services.find(item => item.id == this.state.cart.deliveryData.selected);
        const deliveryService = deliveryId.name;

        const url = this.state.realAccount ? 'https://api.paypal.com/v1/oauth2/token' : 'https://api.sandbox.paypal.com/v1/oauth2/token';
        const username = this.state.realAccount ? paypalClientId : sandboxClientId;
        const password = this.state.realAccount ? paypalSecret : sandboxSecret;
        // const username = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
        // const password = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';        
        const token = base64.encode(`${username}:${password}`);
        try {
            fetch(url, {
                method: 'POST',
                'Authorization': {
                    'TYPE': 'Basic Auth',
                    'Username': `${username}`
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
                .then(response => {
                    this.setState({
                        access_token: response.access_token
                    })
                    return response.access_token
                })
                .then(access_token => {
                    const url = this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment' : 'https://api.sandbox.paypal.com/v1/payments/payment';
                    // const num

                    var paypalPaymentObj =
                    {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },
                        "transactions": [
                            {
                                "amount": {
                                    "total": total,
                                    "currency": "EUR",
                                    "details": {
                                        "subtotal": productsPrice,
                                        "shipping": deliveryPrice,
                                    }
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
                                            "tax": "0.00",
                                            "sku": product.stock,
                                            "currency": 'EUR'
                                        }
                                    }),
                                }
                            }
                        ],
                        "redirect_urls": {
                            "return_url": "/checkout/review",
                            "cancel_url": "https://example.com/cancel"
                        }
                    }
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Authorization': 'Bearer ' + access_token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            paypalPaymentObj
                        )
                    })
                        .then(res => res.json())
                        .then(responseJson => {
                            const { id, links } = responseJson
                            const approvalUrl = links.find(data => data.rel == "approval_url")
                            this.setState({
                                paymentId: id,
                                approvalUrl: approvalUrl.href
                            })
                        })
                        .then(clearCart())
                        .catch(err => {
                            console.log(err)
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
            const url = (this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment/' : 'https://api.sandbox.paypal.com/v1/payments/payment/') + this.state.paymentId + '/execute';
            fetch(url, {
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
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.name.length > 0) {
                        ToastAndroid.show(`Your Payment is confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Main');
                    } else {
                        ToastAndroid.show(`Your Payment is not confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                    }
                })
                .catch(err => {
                    console.log({ ...err })
                })
        } catch (error) {
            alert(error);
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.approvalUrl ? <WebView
                        style={{ height: 400, width: 300 }}
                        source={{ uri: this.state.approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <Loading />
                }
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID })

export default connect(mapStateToProps)(WebPayPal)
