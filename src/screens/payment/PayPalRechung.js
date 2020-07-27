import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ToastAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import Loading from '../loading';
import { clearCart } from '../../functions/cart-funcs';


export class PayPalRechung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: true,
            access_token: '',
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
        }
    }

    componentWillMount() {
        const username = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const password = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
        const productsPrice = this.state.cart.cartInfo.discountProductsPrice;
        const deliveryPrice = this.state.cart.deliveryData.deliveryPrice;
        // console.log(` -- productsPrice: `, productsPrice);
        // console.log(` -- deliveryPrice: `, deliveryPrice);

        const total = (productsPrice + deliveryPrice);
        const token = base64.encode(`${username}:${password}`);
        // console.log(` -- TOKEN: `, token);
        // console.log(` -- TOTAL: `, total);
        // QWNJR2dGMFhyWUY0aGVyMHo5elNsWEN1VW5xRURhemthTTBERFU1ZW1oaHA3MFVnZ0FSekRiZDVMVzF5UWhyOHFFYVYyUTdyLUFtSzNiSEg6RUhOMk9jYWNvWkZrODgyM2haX29XWEhvSV9ULVNtdERjczJYa2xXMDdGMEx3ZDU3VGpqczlDNjNoZHpfNXdvWGltbUVlbll2ZUNZMnpNdEY=

        try {
            fetch('https://api.paypal.com/v1/oauth2/token', {
                method: 'POST',
                'Authorization': { 'TYPE': 'Basic Auth', 'Username': `${username}` },
                headers: {
                    'Authorization': 'Basic ' + `${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=client_credentials"
            })
                .then(response => { return response.json() })
                .then(response => {
                    this.setState({
                        access_token: response.access_token
                    });
                    return response.access_token;
                })
                .then(access_token => {
                    const PAYMENT = {
                        "intent": "sale",
                        "payer": { "payment_method": "paypal" },
                        "transactions": [
                            {
                                "amount": {
                                    "total": total,
                                    "currency": "EUR",
                                    "details": { "subtotal": productsPrice, "shipping": deliveryPrice }
                                },
                                "description": "The payment transaction description.",
                                "item_list": {
                                    "items": this.state.cart.cartInfo.products.map((product) => {
                                        return {
                                            'name': product.productName,
                                            'quantity': product.count,
                                            'price': this.props.userInfo.selectedUserType === 'EK' ? product.price : product.companyPrice,
                                            'currency': 'EUR'
                                        }
                                    }),
                                    "shipping_address": {
                                        "recipient_name": this.state.name + ' ' + this.state.surname,
                                        "line1": this.state.street,
                                        "city": this.state.city,
                                        "country_code": 'DE',
                                        "postal_code": this.state.post,
                                        "phone": this.state.phone,
                                    }
                                }
                            }
                        ],
                        "redirect_urls": {
                            "return_url": "https://example.com/",
                            "cancel_url": "https://teleropa.de/"
                        }
                    }
                    console.log('PAYMENT.transactions:', PAYMENT.transactions);
                    fetch('https://api.paypal.com/v1/payments/payment', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + access_token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(PAYMENT)
                    })
                        .then(res => res.json())
                        .then(json => {
                            const { id, links } = json;
                            const approvalUrl = links.find(data => data.rel == "approval_url");
                            if (approvalUrl.length != 0) {
                                const params = approvalUrl.href.toString();
                                var token = getUrlParam(params, "token");
                                function getUrlParam(url, param) {
                                    if (url.indexOf('?') < 0) return null;
                                    var vars = url.substring(url.indexOf('?') + 1);
                                    var result = null;
                                    var s = vars.split("&");
                                    s.forEach(function (elem) {
                                        var name = elem.split("=")[0];
                                        var value = elem.split("=")[1];
                                        if (name == param) result = value;
                                    });
                                    return result;
                                }

                                console.log('TOKENNNNNNNNNNNNNNN', token);
                                this.setState({ paymentId: id, approvalUrl: 'https://www.paypal.com/webapps/xoonboarding?token=' + token });
                            }

                        })
                        .catch(err => {
                            console.log('fetchEror:', err);
                            Alert.alert(
                                "Bitte geben Sie eine gültige Lieferadresse ein", '',
                                [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
                                { cancelable: false },
                            );
                        });
                })
                .catch(err => {
                    console.log('fetchEror:', err);
                    // console.log({ ...err })
                });
        } catch (err) {
            console.log('tryCatchEror:', err);
            // alert(error);
        }

    }

    _onNavigationStateChange = (webViewState) => {
        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: null
            })

            const p = params.indexOf('PayerID=');
            if (p >= 0 && this.state.count) {
                this.setState({ count: false });
                const l = params.length;
                const res = params.substring(p, l).replace('PayerID=', "");
                const paid = this.payment(res);
            }
        }
    }

    // Execute an approved PayPal payment
    payment(payer) {
        console.log("PAYER", payer)
        try {
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
        console.log(`Пейпал за бабки -- state.cart.products: `, this.state);
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.approvalUrl ?
                        <WebView
                            style={{ height: 400, width: 300 }}
                            source={{ uri: this.state.approvalUrl }}
                            onNavigationStateChange={this._onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            injectedJavaScript={this.state.cookie}
                            BackAndroid={true}
                            BackHandler={true}
                            style={{ marginTop: 20 }}
                        />
                        : <Loading />
                }
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID })

export default connect(mapStateToProps)(PayPalRechung)