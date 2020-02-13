import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';

import FooterButton from '../../common/footer-button';
import PaymentOption from '../../common/payment-option';

import Loading from '../loading'

export default class Payment extends Component {
  static navigationOptions = {
    title: 'Zahlungsweise'
  }

  state = {
    selected: '',
    data: this.props.navigation.getParam('data', null),
    loading: false
  }

  isSelected(value) {
      if(value === this.state.selected) {
        return true
      }
      return false
  }

  handlePayClick() {
      switch (this.state.selected) {
          case 'PayPalPlus':
              this.payWithPayPal()
              break;
          case 'Ratenkauf':
              alert('Ratenkauf')
              break;
          case 'AmazonPay':
              alert('AmazonPay')
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
      this.setState({loading: true})
      // let url = 'https://ptsv2.com/t/1rcni-1560428685/post';
      const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
      const username = 'AbkWPfPgd8Y2D9ZoJMuo0DROUxIAhcPW7yJxB4uyXzEJFH9ix8L5qHQxePbaXCvNv-EDLDRyx8m70eIX';
      const password = 'EOj5ZbPxHqSSv2_xJWdgo5cWTesNYb-_W4zYV__WhTWYot-n41k-f1CRiZMcjBVFVwN-AJ9b6xROmXVb';
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
        if(response.ok) return response.json()
      })
      .then(response => {
        console.log(response)
        console.log(response.access_token)
        return response.access_token
      })
      .then(access_token => {
          console.log('HERE');
          const url = 'https://api.sandbox.paypal.com/v2/checkout/orders';
          fetch(url, {
              method: 'POST',
              headers: {
                  accept: 'application/json',
                  'accept-language': 'en_US',
                  'Authorization': 'Bearer ' + access_token,
                  'Content-Type': 'application/json',
                  // 'PayPal-Partner-Attribution-Id': 'ShopwareAG_Cart_PayPalPlus_1017'
              },
              body: JSON.stringify(
                {
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      reference_id: 'store_mobile_world_order_1234',
                      description: 'Mobile World Store order-1234',
                      amount: {
                        currency_code: 'USD',
                        details: {
                          subtotal: '1.09',
                          shipping: '0.02',
                          tax: '0.33'
                        },
                        value: '1.44'
                      },
                      payee: {
                        email: 'seller@example.com'
                      },
                      items: [
                        {
                          name: 'NeoPhone',
                          sku: 'sku03',
                          price: '0.54',
                          currency: 'USD',
                          unit_amount: '1'
                        },
                        {
                          name: 'Fitness Watch',
                          sku: 'sku04',
                          price: '0.55',
                          currency: 'USD',
                          unit_amount: '1'
                        }
                      ],
                      shipping_address: {
                        line1: '2211 N First Street',
                        line2: 'Building 17',
                        city: 'San Jose',
                        country_code: 'US',
                        postal_code: '95131',
                        state: 'CA',
                        phone: '(123) 456-7890'
                      },
                      shipping_method: 'United Postal Service',
                      partner_fee_details: {
                        receiver: {
                          email: 'partner@example.com'
                        },
                        amount: {
                          value: '0.01',
                          currency: 'USD'
                        }
                      },
                      payment_linked_group: 1,
                      custom: 'custom_value_2388',
                      invoice_number: 'invoice_number_2388',
                      payment_descriptor: 'Payment Mobile World'
                    }
                  ],
                  application_context: {
                    return_url: 'https://example.com/return',
                    cancel_url: 'https://example.com/cancel'
                  }
                }
              )
          })
          .then(res => res.json())
          .then(res => console.log(res))
          .catch(err => {
            console.log(err)
        })
      })
      .catch(err => {
          console.log({ ...err })
      })
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
    const displayItems = deliveryPrice!=0 ? [
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
    if(this.state.loading) return <Loading />
    console.log(this.state)
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 18}}>
          <PaymentOption
            onPress={() => this.setState({selected: 'PayPalPlus'})}
            selected={this.isSelected('PayPalPlus')}
            imageSource={require('../../assets/payments/PayPalPlus.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          <PaymentOption
            onPress={() => this.setState({selected: 'Ratenkauf'})}
            selected={this.isSelected('Ratenkauf')}
            imageSource={require('../../assets/payments/Ratenkauf.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          <PaymentOption
            onPress={() => this.setState({selected: 'AmazonPay'})}
            selected={this.isSelected('AmazonPay')}
            imageSource={require('../../assets/payments/AmazonPay.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          {
            Platform.OS === 'ios' ? 
                <PaymentOption
                    onPress={() => this.setState({selected: 'ApplePay'})}
                    selected={this.isSelected('ApplePay')}
                    imageSource={require('../../assets/payments/ApplePay.png')}
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
                />
            : null
          }
          
        </ScrollView>
        <FooterButton text='Weiter' onPress={() => this.handlePayClick()} />
      </View>
    )
  }
}
