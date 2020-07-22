import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from '../loading';
import { MenuButton } from '../../common/header-buttons';
import { clearCart } from '../../functions/cart-funcs';
import Icons from 'react-native-vector-icons/Ionicons';

import { ToastAndroid } from 'react-native';
import cart from '../cart/cart';

export class PrePayment extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return { title: navigation.getParam('Payment'), headerLeft: <MenuButton />, headerRight: <></> }
  }

  constructor(props) { super(props) }

  state = {
    cart: this.props.navigation.getParam('CartData'),
    paymentID: this.props.navigation.getParam('PaymentID'),
    paymentName: this.props.navigation.getParam('Payment'),
    deliveryID: this.props.navigation.getParam('CartData').deliveryData.selected,
    deliveryName: this.props.navigation.getParam('CartData').deliveryData.name,
    // payment: null,
    payment: { code: 'success', text: 'Information erfolgreich aktualisiert', data: { orderNumber: '34217' } },
    // payment: { code: 'error', text: 'Information konnte nicht aktualisiert werden' },
    // payment: { code: 'requestError', text: 'Сайт Teleropa.de пока не может обработать этот запрос: «HTTP ERROR 500»' },

    // Info from REDUX props:
    customerID: this.props.userID,
    name: this.props.userInfo.name,
    surname: this.props.userInfo.surname,
    gender: this.props.userInfo.gender,
    email: this.props.userInfo.email,
    country: this.props.userInfo.country,
  }

  componentWillMount() {
    //const username = 'Aa30wKqF5Jq5epDJ7wPnGLYBBnhtp4i8t91Qb0PNW7o82k-cQYoFp9t_4ujkCU84D27ke16unohfm3XX'; //Sandbox
    //const password = 'EPBftFl3oHshi5rBEYudrbsCho_aqm1-ynQYkJbW3T0z3APbEt4g76lI01EZs_zLnYexSWScCIU7Ex6K';//Sandbox
    // const username = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
    // const password = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
    // const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
    // const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
    // const total = (productsPrice + deliveryPrice).toFixed(2);
    // const token = base64.encode(`${username}:${password}`);
    // console.log("TOKEN", token);
    /*
      try {
          // fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
          fetch('https://api.paypal.com/v1/oauth2/token', {
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
                  var PAYMENT =
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
                  // fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
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
                      .then(res => res.json())
                      .then(responseJson => {
                          const { id, links } = responseJson
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
  */
  }

  _onNavigationStateChange = (webViewState) => {
    /*
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
    */
  }

  // Execute an approved PayPal payment
  payment(payer) {
    /*
    try {
      // fetch('https://api.sandbox.paypal.com/v1/payments/payment/' + this.state.paymentId + '/execute', {
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
        */
  }

  testGetTime() {
    const today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  }

  componentDidMount() {
    // this.setState({
    //   payment: { code: 'requestError', text: 'Сайт Teleropa.de пока не может обработать этот запрос: «HTTP ERROR 500»' }
    // });

    // const productsPrice = this.props.navigation.getParam('productsPrice', 0);
    // this.setState({ productsPrice });
    // getDeliverySuppliers()
    //   .then(services => {
    //     this.setState({ services, loaded: true });
    //   });
  }

  render() {
    // console.log(`<PrePayment="${this.state.title}">:`, this.props);
    console.log(`<PrePayment="${this.state.title}">:`, this.state);
    let screen = <Loading />;
    if(this.state.payment!==null) {
      const payment = this.state.payment;
      console.log('payment:', payment);
      const customer = <Text style={{fontWeight:'bold'}}>Уважаемый {`${this.state.gender} ${this.state.name} ${this.state.surname}`}</Text>;
      switch(payment.code) {
        case 'success':
          // { code: 'success', text: 'Information erfolgreich aktualisiert', data: {orderNumber: '34217'} }
          const order = payment.data.orderNumber;
          screen = (
            <View style={s.ContentContainer}>
              {customer}
              {/* <Text style={s.ContentSuccessCaption}>{payment.text}</Text> */}
              <Text style={s.ContentSuccessCaption}>Ваш заказ <Text style={{fontWeight:'bold'}}>«{order}»</Text> успешно выполнен!</Text>
              <Text></Text>
              <Text>PaymentID: {this.state.paymentID}</Text>
              <Text>PaymentName: {this.state.paymentName}</Text>
              <Text></Text>
              <Text>DeliveryID: {this.state.deliveryID}</Text>
              <Text>DeliveryName: {this.state.deliveryName}</Text>
              <Text></Text>
              <Text>Payment.Code: {this.state.payment.code}</Text>
              <Text>Payment.Text: {this.state.payment.text}</Text>
              <Text>Payment.OrderNumber: {this.state.payment.data.orderNumber}</Text>
              <Text></Text>
              <Text>CustomerID: {this.state.customerID}</Text>
              <Text>CustomerName: {customer}</Text>
              <Text>CustomerEmail: {this.state.cart.userInfo.email}</Text>
              <Text>CustomerCountry: {this.state.cart.userInfo.country}</Text>
            </View>
          );
          // email: this.props.userInfo.email,
          // country: this.props.userInfo.country,
          // clearCart();
          break;
        case 'error':
          screen = (
            <View style={s.ContentContainer}>
              {customer}
              <Text style={s.ContentBaseText}>При выполнении Вашего заказа возникла ошибка сервиса оплаты:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
        case 'requestError':
          screen = (
            <View style={s.ContentContainer}>
              {customer}
              <Text style={s.ContentBaseText}>При выполнении Вашего заказа возникла ошибка сервиса оплаты:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
        default:
          screen = (
            <View style={s.ContentContainer}>
              {customer}
              <Text style={s.ContentErrorCaption}>При выполнении Вашего заказа возникла неизвестная ошибка</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
      }
    }
    return (
      <SafeAreaView style={s.Container}>
        { screen }
        <View style={s.ActionConteiner}>
          {/* <TouchableOpacity style={s.ButtonConteiner} onPress={() => { this.props.navigation.navigate('Main') }}> */}
          <TouchableOpacity style={s.ButtonConteiner} onPress={() => { ToastAndroid.show(`MAIN PAGE: ${this.testGetTime()}`, ToastAndroid.LONG) }}>
            <View style={s.ButtonIcon}><Icons name="ios-home" size={30} color="#FFFFFF" /></View>
            <Text style={s.ButtonText}>Main</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  Container: { flex: 1, justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 5 },

  // Content section
  ContentContainer: { marginVertical: 5 },
  ContentBaseText: { fontSize: 13, marginTop: 5 },
  ContentSuccessCaption: {
    color: '#000000',
    backgroundColor: '#99CCFF',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5 },
  ContentErrorCaption: {
    color: '#FFFFFF',
    backgroundColor: '#FF6666',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5 },
  ContentErrorText: { fontSize: 13, marginTop: 5 },

  // Action section
  ActionConteiner: {
    borderTopWidth: 0.5,
    borderColor: '#A7A7AA',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
  },
  ButtonConteiner: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  ButtonIcon: { paddingRight: 5 },
  ButtonText: { color: '#FFFFFF', fontSize: 24, marginBottom: 1.5 },
});

/**
 * 
 
            <View>
              <Text>PaymentID: {this.state.paymentID}</Text>
              <Text>PaymentName: {this.state.paymentName}</Text>
              <Text></Text>
              <Text>DeliveryID: {this.state.deliveryID}</Text>
              <Text>DeliveryName: {this.state.deliveryName}</Text>
              <Text></Text>
              <Text>Payment.Code: {this.state.payment.code}</Text>
              <Text>Payment.Text: {this.state.payment.text}</Text>
              <Text>Payment.OrderNumber: {this.state.payment.data.orderNumber}</Text>
              <Text></Text>
              <Text>CustomerID: {this.state.customerID}</Text>
              <Text>CustomerName: {this.state.cart.userInfo.gender} {this.state.cart.userInfo.name} {this.state.cart.userInfo.surname}</Text>
              <Text>CustomerEmail: {this.state.cart.userInfo.email}</Text>
              <Text>CustomerCountry: {this.state.cart.userInfo.country}</Text>
            </View>

 * 
 */

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID });
export default connect(mapStateToProps)(PrePayment);
