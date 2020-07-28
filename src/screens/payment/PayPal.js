import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ToastAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import Loading from '../loading';
import { clearCart } from '../../functions/cart-funcs';

const unit = '<PayPal>';

export class PayPal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.navigation.getParam('CartData').cartInfo,
      productsBonus: this.props.navigation.getParam('CartData').cartInfo.products.filter(p => p.methodMoney==='buyOfPoints'),
      productsMoney: this.props.navigation.getParam('CartData').cartInfo.products.filter(p => p.methodMoney==='buyOfMoney'),

      delivery: this.props.navigation.getParam('CartData').deliveryData,
      user: this.props.navigation.getParam('CartData').userInfo,
      // PAYPAL section
      paymentId: null,
      access_token: null,
      approvalUrl: null,
      count: true,

      loading: false,      
    }
  }

  componentWillMount() {
    // console.log(`${unit} -- cart: `, this.state.cart);
    // console.log(`${unit} -- delivery: `, this.state.delivery);
    // console.log(`${unit} -- user: `, this.state.user);

    //const seller_username = 'Aa30wKqF5Jq5epDJ7wPnGLYBBnhtp4i8t91Qb0PNW7o82k-cQYoFp9t_4ujkCU84D27ke16unohfm3XX'; //Sandbox
    //const seller_password = 'EPBftFl3oHshi5rBEYudrbsCho_aqm1-ynQYkJbW3T0z3APbEt4g76lI01EZs_zLnYexSWScCIU7Ex6K';//Sandbox
    const seller_username = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
    const seller_password = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
    const token = base64.encode(`${seller_username}:${seller_password}`);
    // console.log(`${unit} -- TOKEN: `, token);

    const orderPrice = this.state.cart.discountValue;
    const deliveryPrice = this.state.delivery.deliveryPrice;

    try {
      // Get AccessToken for PayPal
      // 'https://api.sandbox.paypal.com/v1/oauth2/token'
      fetch('https://api.paypal.com/v1/oauth2/token', {
        method: 'POST',
        'Authorization': { 'TYPE': 'Basic Auth', 'Username': seller_username },
        headers: {
          'Authorization': `Basic ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })
        .then(res => { return res.json() })
        .then(json => { return json.access_token })
        .then(access_token => {
          const PAYMENT = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            transactions: [{
              amount: {
                total: orderPrice+deliveryPrice,
                currency: 'EUR',
                details: { subtotal: orderPrice, shipping: deliveryPrice }
              },
              description: 'Teleropa PayPal payment.',
              item_list: {
                items: this.state.cart.products.map((product) => {
                  return {
                    name: product.productName,
                    quantity: product.count,
                    price: this.state.user.selectedUserType === 'EK' ? product.price : product.companyPrice,
                    currency: 'EUR'
                  }
                }),
                shipping_address: {
                  recipient_name: `${this.state.user.name} ${this.state.user.surname}`,
                  line1: this.state.user.street,
                  city: this.state.user.city,
                  country_code: 'DE',
                  postal_code: this.state.user.post,
                  phone: this.state.user.phone,
                },
              },
            }],
            redirect_urls: {
              return_url: 'https://teleropa.de/return', cancel_url: 'https://teleropa.de/cancel'
            },
          }
          console.log('PAYMENT:', PAYMENT);

          // Get "ApprovalURL" for PayPal with AccessToken
          // 'https://api.sandbox.paypal.com/v1/payments/payment'
          fetch('https://api.paypal.com/v1/payments/payment', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(PAYMENT)
          })
            .then(res => res.json())
            .then(json => {
              console.log('JSON:', json);
              const { id, links, name, information_link, details } = json;
              if ( typeof name !== 'undefined' && name === 'VALIDATION_ERROR' ) {
                console.log(`${unit}: Payment Validation Error!`);
                Alert.alert(`PayPal Payment Validation Error!`,`${details[0].issue}`,
                  [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
                  { cancelable: false },
                );
              } else {
                const approvalUrl = links.find(data => data.rel === 'approval_url');
                this.setState({
                  paymentId: id, approvalUrl: approvalUrl.href, access_token: access_token
                });
              }
            })
            .catch(err => {
              console.log('Payment-Fetch Catch-Eror:', err);
              Alert.alert(
                'WARNUNG!', 'Bitte geben Sie eine gültige Lieferadresse ein',
                // 'Пожалуйста, введите действительный адрес доставки!','',
                [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
                { cancelable: false },
              );
            });
        })
        .catch(err => {
          console.log('Token-Fetch Catch-Eror:', err);
        });
    } catch (err) {
      console.log('Try-Catch Eror:', err);
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log('<onNavigationStateChange>...............webViewState', webViewState);
    if (webViewState.url.includes('https://example.com/')) {
      this.setState({
        approvalUrl: null
      })
    
      const params = webViewState.url.toString();
      const p = params.indexOf('PayerID=');    

      console.log('<onNavigationStateChange>...............webViewState.url.includes');
      if (p >= 0 && this.state.count) {
      // if (p >= 0) {
        console.log('<onNavigationStateChange>...............webViewState.url.includes  P>=0');
        this.setState({ count: false });
        const l = params.length;
        const res = params.substring(p, l).replace('PayerID=', "");
        console.log('res res res', res)
        const paid = this.payment(res);
      }
    }
  }

  // Execute an approved PayPal payment
  payment(payer) {
    try {
      // fetch('https://api.sandbox.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
      fetch('https://api.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.state.access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({payer_id: payer})
      })
        .then(response => {
          console.log("response.json();", response.json())
          response.json();

          // new Promise((resolve) => {
          //   ToastAndroid.show(`Ihre Zahlung wird nicht bestätigt`, ToastAndroid.LONG);
          //   this.props.navigation.navigate('Payment');
          //   setTimeout(() => resolve(), 200)
          // })
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
    // console.log("this.state in PAYPAL   ", this.state);
    // console.log("this.props in PAYPAL   ", this.props);
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
          :
          <Loading />
        }
      </View>
    );
  }
}

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID });

export default connect(mapStateToProps)(PayPal);
