import React, { Component } from 'react';
import { View, ScrollView, Platform, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import FooterButton from '../../common/footer-button';
import PaymentOption from '../../common/payment-option';
import WebviewPaypal from './webviewPaypal';

// import deliveryAddress from '../orders';

import Loading from '../loading'

export default class Payment extends Component {
  static navigationOptions = {
    title: 'Zahlungsweise'
  }

  state = {
    selected: '',
    data: this.props.navigation.getParam('data', null),
    loading: false,

    accessToken: null,
    //
    showModal: false,
    status: "Pending"

  }

  //
  // handleResponse = data => {
  //   if (data.title === "success") {
  //     this.setState({ showModal: false, status: "Complete" });
  //   } else if (data.title === "cancel") {
  //     this.setState({ showModal: false, status: "Cancelled" });
  //   } else {
  //     return;
  //   }
  // };


  isSelected(value) {
    if (value === this.state.selected) {
      return true
    }
    return false
  }

  handlePayClick() {
    switch (this.state.selected) {
      case 'PayPalPlus':
        this.payWithPayPal()
        break;
      case 'AmazonPay':
        alert('Amazon Pay')
        break;
      case 'ApplePay':
        this.payWithApplePay()
        break;
      default:
        alert('SELECT PAYMENT METHOD')
        break;
    }
    // this.props.navigation.navigate('OrderSuccess')
  }
  payWithPayPal() {
    const productsPrice = parseFloat(this.state.data.discountProductsPrice);
    const deliveryPrice = parseFloat(this.state.data.deliveryData.deliveryPrice);
    const deliveryService = this.state.data.deliveryData.services[2].name;////////////////////////////////////////////
    const total = productsPrice + deliveryPrice
    console.log('params', productsPrice, deliveryPrice, deliveryService, total)
    console.log('this.props.navigation', this.props.navigation.state)

    const productsQuantity = this.state.data.products.reduce((sum, { count }) => {
      return sum + count
    }, 0)

    // this.setState({ loading: true })
    // let url = 'https://ptsv2.com/t/1rcni-1560428685/post';
    const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
    const username = 'AcHzvoC8O-gZth7HdU-4UeDB065QSpwVftN4ZHXWC5anYkHIM8hSJylP3iTL4h6x6wMHZW3O0rBkd4g_';
    const password = 'EBN-azxVOelC-bJISKYDNC9hc9hXHLcyWg5lYaM6YdUnLPmEg19kgf954qW8-RezCyn1UBA7ZIxuZAhu';
    // access_token = "A21AAE6Sti8uCFijx_cGAjTZIUuHWDIu2-8UDUL6nuAtHvxRIfPKo8I2PSBBbjbSIzIX-0WZaudzMRyekD6KfRabkfDioqOxA",
    const authString = `${username}:${password}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(authString),
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials"
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(response => {
        console.log(response)
        console.log('response.access_token', response.access_token)
        this.setState({
          accessToken: response.access_token
        })
        return response.access_token
      })
      // .then(this.setState({
      //   accessToken: response.access_token
      // }))


      .then(access_token => {
        console.log('this', this);
        // const url = 'https://api.sandbox.paypal.com/v1/payments/payment';
        const url = 'https://api.sandbox.paypal.com/v2/checkout/orders';
        fetch(url, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'accept-language': 'de_DE',
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
            // 'PayPal-Partner-Attribution-Id': 'ShopwareAG_Cart_PayPalPlus_1017'
          },
          "disbursement_mode": "INSTANT",
          body: JSON.stringify(
            {
              intent: 'CAPTURE',
              purchase_units: [
                {
                  reference_id: 'store_mobile_world_order_1234',
                  description: 'Mobile World Store order-1234',
                  amount: {
                    currency_code: 'EUR',
                    value: productsQuantity,
                    details: {
                      subtotal: 1,
                      shipping: deliveryPrice,
                    },
                  },
                  payee: {
                    email: 'verkauf@teleropa.de'
                  },
                  // item:
                  //   [
                  //     {
                  //       name: 'NeoPhone',
                  //       sku: 'sku03',
                  //       price: productsPrice,
                  //       currency_code: 'EUR',
                  //       unit_amount: 1,
                  //       value: "1"
                  //     },

                  //   ],
                  shipping_address: {
                    line1: '2211 N First Street',
                    line2: 'Building 17',
                    city: 'San Jose',
                    country_code: 'US',
                    postal_code: '95131',
                    state: 'CA',
                    phone: '(123) 456-7890'
                  },
                  shipping_method: deliveryService,
                  partner_fee_details: {
                    receiver: {
                      email: 'partner@example.com'
                    },
                    amount: {
                      value: "0.01",
                      currency_code: "EUR"
                    }
                  },
                  payment_linked_group: 1,
                  custom: 'custom_value_2388',
                  invoice_number: 'invoice_number_2388',
                  payment_descriptor: 'Payment Mobile World'
                }
              ],
              redirect_urls: {
                // application_context: {
                return_url: 'https://api.sandbox.paypal.com/v2/checkout/return',
                cancel_url: 'https://api.sandbox.paypal.com/v2/checkout/orders/cancel'
              }
            }
          )
        })

          // .then(this.props.navigation.navigate('PaypalService'))
          .then(res => res.json())
          .then(res => console.log(res))
          // .then(Linking.openURL(`https://sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=${response.access_token}`))
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log({ ...err })
      })
    }

  payWithAmazon() {

  }

  payWithApplePay() {
    const productsPrice = parseFloat(this.state.data.discountProductsPrice);
    const deliveryPrice = parseFloat(this.state.data.deliveryData.deliveryPrice);
    const total = productsPrice + deliveryPrice
    console.log(productsPrice, deliveryPrice, total)
    const METHOD_DATA = [{
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: 'merchant.com.teleropa.teleropa',
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        countryCode: 'DE',
        currencyCode: 'EUR'
      }
    }];
    const displayItems = deliveryPrice != 0 ? [
      {
        label: 'Products',
        amount: { currency: 'EUR', value: productsPrice }
      },
      {
        label: 'Delivery',
        amount: { currency: 'EUR', value: deliveryPrice }
      }
    ] :
      [
        {
          label: 'Products',
          amount: { currency: 'EUR', value: productsPrice }
        }
      ]
    const DETAILS = {
      id: 'basic-example',
      displayItems,
      total: {
        label: 'Total',
        amount: { currency: 'EUR', value: total }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    console.log(paymentRequest);
    paymentRequest.show()
      .then(e => console.log('sucess', e))
      .catch(e => console.log('error', e))
  }

  render() {
    if (this.state.loading) return <Loading />
    console.log(this.state)
    return (
      <View style={{ flex: 1 }}>

        {/* <WebviewPaypal></WebviewPaypal> */}

        <ScrollView style={{ marginHorizontal: 18 }}>
          <PaymentOption
            onPress={() => this.setState({ selected: 'PayPalPlus' })}
            selected={this.isSelected('PayPalPlus')}
            imageSource={require('../../assets/payments/PayPalPlus.png')}
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'AmazonPay' })}
            selected={this.isSelected('AmazonPay')}
            imageSource={require('../../assets/payments/AmazonPay.png')}
          />
          {
            Platform.OS === 'ios' ?
              <PaymentOption
                onPress={() => this.setState({ selected: 'ApplePay' })}
                selected={this.isSelected('ApplePay')}
                imageSource={require('../../assets/payments/ApplePay.png')}
              />
              : null
          }
        </ScrollView>

        <FooterButton text='Weiter' onPress={() => this.handlePayClick()} />
      </View>
    )
  }
}
