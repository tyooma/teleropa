import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64'
import Loading from '../loading'

export default class WebPayPal extends Component {

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
            paymentId: ''
        }
    }

    async componentDidMount() {
        const cart = this.props.navigation.getParam('CartData', null);
        console.log('``````', cart)
        const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
        const username = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
        const password = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';
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
                    const url = 'https://api.sandbox.paypal.com/v1/payments/payment';
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
                                            "total": "30.11",
                                            "currency": "USD",
                                            "details": {
                                                "subtotal": "30.00",
                                                "tax": "0.07",
                                                "shipping": "0.03",
                                                "handling_fee": "1.00",
                                                "shipping_discount": "-1.00",
                                                "insurance": "0.01"
                                            }
                                        },
                                        "description": "The payment transaction description.",
                                        "custom": "EBAY_EMS_90048630024435",
                                        "invoice_number": "48787589672",
                                        "payment_options": {
                                            "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                        },
                                        "soft_descriptor": "ECHI5786786",
                                        "item_list": {
                                            "items": [
                                                {
                                                    "name": "Jeens",
                                                    "description": "Black Jeens.",
                                                    "quantity": "5",
                                                    "price": "3",
                                                    "tax": "0.01",
                                                    "sku": "1",
                                                    "currency": "USD"
                                                },
                                                {
                                                    "name": "handbag",
                                                    "description": "Black handbag.",
                                                    "quantity": "1",
                                                    "price": "15",
                                                    "tax": "0.02",
                                                    "sku": "product34",
                                                    "currency": "USD"
                                                }
                                            ],
                                            "shipping_address": {
                                                "recipient_name": "John Doe",
                                                "line1": "4th Floor",
                                                "line2": "Unit #34",
                                                "city": "San Jose",
                                                "country_code": "US",
                                                "postal_code": "95131",
                                                "phone": "011862212345678",
                                                "state": "CA"
                                            }
                                        }
                                    }
                                ],
                                "note_to_payer": "Contact us for any questions on your order.",
                                "redirect_urls": {
                                    "return_url": "https://example.com/return",
                                    "cancel_url": "https://example.com/cancel"
                                }
                            }
                        )
                    })
                        .then(res => res.json())
                        .then(responseJson => {
                            console.log("responseJson responseJson 12312312", responseJson)
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

            if (p >= 0 && this.state.count) {
                this.setState({ count: false });
                const l = params.length;
                console.log('P1P1P1P1P1P1111111', p)
                const res = params.substring(p, l).replace('PayerID=', "");
                console.log("res", res);

                const paid = this.payment(res);
                // console.log(paid);

            }
        }
    }

    payment(payer) {
        console.log("this.state.paymentId ", this.state.paymentId)
        console.log("this.state.access_token ", this.state.access_token)
        console.log("payer ", payer)

        try {
            const url = 'https://api.sandbox.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute';
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