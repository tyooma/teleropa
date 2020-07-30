import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ToastAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import Loading from '../loading';
import { ClearCartByProducts } from '../../functions/cart-funcs';
import { ExecuteOrder } from './PrePaymentOrder';

const unit = '<PayPal>';

export class PayPal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // USER
      customerID: this.props.userID,
      user: this.props.navigation.getParam('CartData').userInfo,

      // PAYMENT
      paymentID: this.props.navigation.getParam('PaymentID'),
      paymentName: this.props.navigation.getParam('Payment'),

      // CART
      cart: this.props.navigation.getParam('CartData').cartInfo,
      productsMoney: this.props.navigation.getParam('CartData').cartInfo.products.filter(p => p.methodMoney==='buyOfMoney'),
      productsBonus: this.props.navigation.getParam('CartData').cartInfo.products.filter(p => p.methodMoney==='buyOfPoints'),

      // DELIVERY
      deliveryID: this.props.navigation.getParam('CartData').deliveryData.selected,
      deliveryName: this.props.navigation.getParam('CartData').deliveryData.name,
      delivery: this.props.navigation.getParam('CartData').deliveryData,

      // PAYPAL section
      paymentId: null,
      access_token: null,
      approvalUrl: null,
      count: true,

      loading: false,      
    }
  }

  componentWillMount() {
    //const seller_username = 'Aa30wKqF5Jq5epDJ7wPnGLYBBnhtp4i8t91Qb0PNW7o82k-cQYoFp9t_4ujkCU84D27ke16unohfm3XX'; //Sandbox
    //const seller_password = 'EPBftFl3oHshi5rBEYudrbsCho_aqm1-ynQYkJbW3T0z3APbEt4g76lI01EZs_zLnYexSWScCIU7Ex6K';//Sandbox
    const seller_username = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
    const seller_password = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
    const token = base64.encode(`${seller_username}:${seller_password}`);
    const orderPrice = this.state.cart.discountValue;
    const deliveryPrice = this.state.delivery.deliveryPrice;
    const totalPrice = orderPrice + deliveryPrice;
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
              total: totalPrice.toFixed(2),
              currency: 'EUR',
              details: { subtotal: orderPrice.toFixed(2), shipping: deliveryPrice.toFixed(2) }
            },
            description: this.state.paymentName==='PayPal' ? 'Teleropa PayPal payment.':'Teleropa PayPal Kauf auf Rechnung payment.',
            item_list: {
              items: this.state.productsMoney.map((product) => {
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
          const { id, links, name, details } = json;
          if ( typeof name !== 'undefined' && name === 'VALIDATION_ERROR' ) {
            console.log(`${unit}: Payment Validation Error!`);
            Alert.alert(
              `PayPal Zahlungsvalidierungsfehler!`,`${details[0].issue}`,
              // `PayPal Payment Validation Error!`,`${details[0].issue}`,
              [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
              { cancelable: false },
            );
          } else {
            const approvalUrl = links.find(data => data.rel === 'approval_url');
            if ( this.state.paymentName === 'PayPal' ) {
              this.setState({
                paymentId: id, approvalUrl: approvalUrl.href, access_token: access_token
              });
            }
            if ( this.state.paymentName === 'Rechnung' ) {
              if (approvalUrl.length != 0) {
                const params = approvalUrl.href.toString();
                const rech_token = getUrlParam(params, 'token');
                function getUrlParam(url, param) {
                  if (url.indexOf('?') < 0) return null;
                  var vars = url.substring(url.indexOf('?') + 1);
                  var result = null;
                  var s = vars.split('&');
                  s.forEach(function (elem) {
                    var name = elem.split('=')[0];
                    var value = elem.split('=')[1];
                    if (name == param) result = value;
                  });
                  return result;
                }
                console.log('Rechnung TOKEN:', rech_token);
                this.setState({ paymentId: id, approvalUrl: 'https://www.paypal.com/webapps/xoonboarding?token=' + rech_token });
              } else {
                console.log('Token-Fetch Catch-Eror:', err);
                Alert.alert(
                  'WARNUNG!', 'Paypal hat beim Versuch, sich anzumelden, einen Fehler verursacht',
                  // 'Пайпал вызвал ошибку при попытке авторизоваться!','',
                  [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
                  { cancelable: false },
                );
              }
            }
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
        Alert.alert(
          'WARNUNG!', 'Paypal hat beim Versuch, sich anzumelden, einen Fehler verursacht',
          // 'Пайпал вызвал ошибку при попытке авторизоваться!','',
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
          { cancelable: false },
        );
      });
    } catch (err) {
      console.log('Try-Catch Eror:', err);
      Alert.alert(
        'WARNUNG!', 'Die Anwendung hat bei der Verarbeitung der Anforderung einen Fehler ausgelöst',
        // 'При обработке запроса приложение вызвало ошибку!','',
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Cart') }],
        { cancelable: false },
      );
    }
  }

  WebViewChange = (WebViewState) => {
    console.log('<onNavigationStateChange>...............webViewState', WebViewState);
    if (WebViewState.url.includes('https://example.com/')) {
      this.setState({
        approvalUrl: null
      });
    }
    
    const params = WebViewState.url.toString();
    const p = params.indexOf('PayerID=');    

    console.log('<onNavigationStateChange>...............WebViewState.url.includes');
    if (p >= 0 && this.state.count) {
    // if (p >= 0) {
      console.log('<onNavigationStateChange>...............WebViewState.url.includes  P>=0');
      this.setState({ count: false });
      const l = params.length;
      const res = params.substring(p, l).replace('PayerID=', "");
      console.log('PayerID', res)
      const paid = this.PayPalExecute(res);
    }
  }

  // Execute an approved PayPal payment
  PayPalExecute(PayerID) {
    console.log('<PayPalExecute> PayerID:', PayerID);
    try {
      // fetch('https://api.sandbox.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
      fetch('https://api.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.state.access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({payer_id: PayerID})
      })
      .then(res => {
        console.log('<PayPalExecute> Response.JSON:', res.json());
        res.json();
      })
      .then(json => {
        console.log('<PayPalExecute> JSON:', json);
        if (json === undefined) {
          console.log('<PayPalExecute> Execute Fail:', json);
          Alert.alert(
            'WARNUNG!', 'Ihre Zahlung wird nicht bestätigt',
            // '','Ваш платеж не подтвержден',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Payment') }],
            { cancelable: false },
          );
        }
        if (json.name == 'INSTRUMENT_DECLINED') {
          console.log('<PayPalExecute> Execute Fail:', json);
          Alert.alert(
            'WARNUNG!', 'Ihre Zahlung wird nicht bestätigt',
            // '','Ваш платеж не подтвержден',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Payment') }],
            { cancelable: false },
          );
        }
        if (json.failed_transactions.length == 0) {
          //---------------------------------------------------------------------------
          ClearCartByProducts(this.state.productsMoney, 'buyOfMoney');
          console.log('<PayPalExecute> PayPal Execute Success:', json);
          //--------------------------------------------
          const orderInfo = {
            customerID: this.state.customerID,
            paymentID: this.state.paymentID,
            dispatchID: this.state.deliveryID,
            products: this.state.productsBonus,
          }

          // Buy of Bonus-Points
          const payment = ExecuteOrder(orderInfo);

          // {code: "error", text: "incorrect parameters"}
          let prepayment_message = 'Ошибка при покупке бонусных товаров';
          // {code: "success", text: "Information erfolgreich aktualisiert", data: {…}}
          if ( payment.code === 'success' ) {
            prepayment_message = `Заказ #${payment.data.orderNumber} на покупку бонусных товаров успешно выполнен.`;
            ClearCartByProducts(productsBonus, 'buyOfPoints');
          }
          //---------------------------------------------------------------------------
          Alert.alert(
            'Обработка заказа!', `Заказ по оплате PayPal успешно выполнен\n\r${prepayment_message}`,
            // '','***********************',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Main') }],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            'WARNUNG!', 'Ihre Zahlung wird nicht bestätigt',
            // '','Ваш платеж не подтвержден',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Payment') }],
            { cancelable: false },
          );
        }
      });
    } catch (error) {
      console.log('Try-Catch Eror:', err);
      Alert.alert(
        "Ihr Gerätecode", error,
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Main') }],
        { cancelable: false },
      );
    }
  }

  render() {
    console.log("this.state in PAYPAL   ", this.state);
    console.log("this.props in PAYPAL   ", this.props);
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.approvalUrl ?
          <WebView
            style={{ height: 400, width: 300 }}
            source={{ uri: this.state.approvalUrl }}
            onNavigationStateChange={this.WebViewChange}
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
