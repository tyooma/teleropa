import React, { Component } from 'react';
import { View, Platform } from 'react-native'
import { WebView } from 'react-native-webview';

export default class AmazonLoginWebView extends Component {

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
            // name: this.props.userInfo.name,
            // surname: this.props.userInfo.surname,
            // phone: this.props.userInfo.phone,
            // country: this.props.userInfo.country,
            // street: this.props.userInfo.street,
            // city: this.props.userInfo.city,
            // post: this.props.userInfo.post,
            realAccount: false
        }
    }
    async componentDidMount() {
        console.log('``````````````````', this.state.cart)
        const merchant_id = 'A12MAN4EHAQW5I';
        const access_key = 'AKIAJFNFAMVRHUHZ73MQ';
        const secret_key = 'W26N3Bz4zhG8pI6c + tXr + /3/ / 3c2XS5h8CCmeH69';
        const client_id = 'amzn1.application - oa2 - client.a51ef97abbbe4844a97431b166b4535a';
        const client_secret = 'fe8bb5f8314378849588cbae407d1c8a833f71417986cbfb32e0a7abdb954d22';

        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = productsPrice + deliveryPrice;



        // const productsQuantity = this.state.cart.products.reduce((sum, { count }) => {
        //     return sum + count
        // }, 0)

        // const deliveryId = this.state.cart.deliveryData.services.find(item => item.id == this.state.cart.deliveryData.selected);
        // const deliveryService = deliveryId.name;

        // const token = base64.encode(`${username}:${password}`);
        // try {
        //     fetch('https://mws.amazonservices.com/OffAmazonPayments_Sandbox/2013-01-01', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         params: ({

        //         })

        //     })
        // } catch (error) {
        //     alert(error);
        // }
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
