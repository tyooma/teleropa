import React, { Component } from 'react';

import { View, Platform } from 'react-native';


import { WebView } from 'react-native-webview';

import Loading from '../loading';


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

        //this.showLoginButton();
    }

    showLoginButton() {
        var authRequest;
        OffAmazonPayments.Button("AmazonPayButton", "A12MAN4EHAQW5I", {
            type: "PwA",
            color: "Gold",
            size: "medium",

            authorization: function () {
                loginOptions = { scope: "profile payments:widget payments:shipping_address", popup: true };
                authRequest = amazon.Login.authorize(loginOptions, function (t) {
                    // console.log(t.access_token);
                    // console.log(t.expires_in);
                    // console.log(t.token_type);
                    this.showAddressBookWidget();
                });
            }
        });
    }


    showAddressBookWidget() {
        // AddressBook
        new OffAmazonPayments.Widgets.AddressBook({
            sellerId: 'A12MAN4EHAQW5I',

            onReady: function (orderReference) {
                var orderReferenceId = orderReference.getAmazonOrderReferenceId();
                var el;
                if ((el = document.getElementById("orderReferenceId"))) {
                    el.value = orderReferenceId;
                }
                // Wallet
                showWalletWidget(orderReferenceId);
            },
            onAddressSelect: function (orderReference) {
                // do stuff here like recalculate tax and/or shipping
            },
            design: {
                designMode: 'responsive'
            },
            onError: function (error) {
                // Error handling code 
                // We also recommend that you implement an onError handler in your code. 
                // @see https://payments.amazon.com/documentation/lpwa/201954960
                console.log('OffAmazonPayments.Widgets.AddressBook', error.getErrorCode(), error.getErrorMessage());
                switch (error.getErrorCode()) {
                    case 'AddressNotModifiable':
                        // You cannot modify the shipping address when the order reference is in the given state.
                        break;
                    case 'BuyerNotAssociated':
                        // The buyer is not associated with the given order reference. 
                        // The buyer must sign in before you render the widget.
                        break;
                    case 'BuyerSessionExpired':
                        // The buyer's session with Amazon has expired. 
                        // The buyer must sign in before you render the widget.
                        break;
                    case 'InvalidAccountStatus':
                        // Your merchant account is not in an appropriate state to execute this request. 
                        // For example, it has been suspended or you have not completed registration.
                        break;
                    case 'InvalidOrderReferenceId':
                        // The specified order reference identifier is invalid.
                        break;
                    case 'InvalidParameterValue':
                        // The value assigned to the specified parameter is not valid.
                        break;
                    case 'InvalidSellerId':
                        // The merchant identifier that you have provided is invalid. Specify a valid SellerId.
                        break;
                    case 'MissingParameter':
                        // The specified parameter is missing and must be provided.
                        break;
                    case 'PaymentMethodNotModifiable':
                        // You cannot modify the payment method when the order reference is in the given state.
                        break;
                    case 'ReleaseEnvironmentMismatch':
                        // You have attempted to render a widget in a release environment that does not match the release environment of the Order Reference object. 
                        // The release environment of the widget and the Order Reference object must match.
                        break;
                    case 'StaleOrderReference':
                        // The specified order reference was not confirmed in the allowed time and is now canceled. 
                        // You cannot associate a payment method and an address with a canceled order reference.
                        break;
                    case 'UnknownError':
                        // There was an unknown error in the service.
                        break;
                    default:
                    // Oh My God, What's going on?
                }
            }
        })
    }

    showWalletWidget(orderReferenceId) {
        // Wallet
        new OffAmazonPayments.Widgets.Wallet({
            sellerId: 'A12MAN4EHAQW5I',
            amazonOrderReferenceId: orderReferenceId,
            onReady: function (orderReference) {
                console.log(orderReference.getAmazonOrderReferenceId());
            },
            onPaymentSelect: function () {
                console.log(arguments);
            },
            design: {
                designMode: 'responsive'
            },
            onError: function (error) {
                // Error handling code 
                // We also recommend that you implement an onError handler in your code. 
                // @see https://payments.amazon.com/documentation/lpwa/201954960
                console.log('OffAmazonPayments.Widgets.Wallet', error.getErrorCode(), error.getErrorMessage());
            }
        })
    }



    _onNavigationStateChange = (webViewState) => {
        console.log("webViewState", webViewState)
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
                <WebView source={{ uri: "https://pay.amazon.com/signup" }} />
                {/* {this.showLoginButton()} */}
            </View>
        )
    }
}
