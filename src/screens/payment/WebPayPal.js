import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64'
import Loading from '../loading'

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

            realAccount: false
        }
    }
    async componentDidMount() {

        const clientId = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const userAPI = 'verkauf_api1.teleropa.de';
        const userPassword = 'W3GZUK35NCHVLFPX';
        
        const sandboxClientId = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
        const sandboxSecret = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';
        const paypalClientId = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const paypalSecret = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';

        console.log('this.props.userInfo', this.props.userInfo)
        console.log('this.state', this.state)

        console.log('this.state.cart', this.state.cart)
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = productsPrice + deliveryPrice;

        const productsQuantity = this.state.cart.products.reduce((sum, { count }) => {
            return sum + count
        }, 0)

        const deliveryId = this.state.cart.deliveryData.services.find(item => item.id == this.state.cart.deliveryData.selected);
        const deliveryService = deliveryId.name;

        console.log('-------------realAccount-------------', this.state.realAccount)
        const url = this.state.realAccount ? 'https://api.paypal.com/v1/oauth2/token' : 'https://api.sandbox.paypal.com/v1/oauth2/token';
        const username = this.state.realAccount ? paypalClientId : sandboxClientId;
        const password = this.state.realAccount ? paypalSecret : sandboxSecret;
        // const username = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
        // const password = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';
        console.log('url, username, password', {url, username, password})
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
                    console.log(' Create Paypal payment object');
                    const url = this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment' : 'https://api.sandbox.paypal.com/v1/payments/payment';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Authorization': 'Bearer ' + access_token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            {
                                "intent": "sale",
                                "payer": {
                                    "payment_method": "paypal"
                                },
                                "transactions": [
                                    {
                                        "amount": {
                                            "total": total,
                                            "currency": 'EUR',
                                            "details": {
                                                "subtotal": productsPrice,
                                                // "tax": "0.00",
                                                "shipping": deliveryPrice,
                                                // "handling_fee": "1.00",
                                                // "shipping_discount": "-1.00",
                                                // "insurance": "0.01"
                                            }
                                        },

                                        // "description": "The payment transaction description.",
                                        // "custom": "PAYID-LZNJFKQ6PR2713655624654Y",
                                        // "invoice_number": "48787589672",
                                        "payment_options": {
                                            "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                        },
                                        // "soft_descriptor": "ECHI5786786",
                                        "item_list": {
                                            // "items": [
                                            //     {
                                            //         "name": "Jeens",
                                            //         "description": "Black Jeens.",
                                            //         "quantity": "1",
                                            //         "price": total,
                                            //         "tax": "0.01",
                                            //         "sku": "1",
                                            //         "currency": 'EUR'
                                            //     },
                                            // ],
                                            "shipping_address": {
                                                "recipient_name": this.state.name + ' ' + this.state.surname,
                                                "country_code": "DE",
                                                "postal_code": this.state.post,
                                                "city": this.state.city,
                                                "line1": this.state.street,
                                                "phone": this.state.phone,
                                            }
                                        }
                                    }
                                ],
                                // "note_to_payer": "Contact us for any questions on your order.",
                                "redirect_urls": {
                                    "return_url": "/checkout/review",
                                    "cancel_url": "https://example.com/cancel"
                                }
                            }
                        )
                    })
                        .then(res => res.json())
                        .then(responseJson => {
                            console.log("responseJson", responseJson)
                            const { id, links } = responseJson
                            const approvalUrl = links.find(data => data.rel == "approval_url")
                            this.setState({
                                paymentId: id,
                                approvalUrl: approvalUrl.href
                            })
                            console.log('this.state.approvalUrl', this.state.approvalUrl),
                                console.log('this.state.paymentId', this.state.paymentId)
                        })
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
        console.log('webViewState.url', webViewState.url)
        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: null
            })
            const params = webViewState.url.toString();
            const p = params.indexOf('PayerID=');
            console.log('webViewState.url', webViewState.url)
            console.log('params', params)
            console.log('PPPPPP', p)

            // if (p >= 0 && this.state.count) {
            //     this.setState({ count: false });
            //     const l = params.length;
            //     const res = params.substring(p, l).replace('PayerID=', "");

                // const paid = this.payment(res);
                // console.log('paid',paid);

            // }
        }
    }

    payment(payer) {
        console.log("this.state.paymentId ", this.state.paymentId)
        console.log("this.state.access_token ", this.state.access_token)
        console.log("payer ", payer)

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
                    console.log('responseJson', responseJson)
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
            this.props.navigation.navigate('Payment');
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
