import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';


import FooterButton from '../../common/footer-button';
import PaymentOption from '../../common/payment-option';

import base64 from 'react-native-base64'

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
    approvalUrl: null,
    paymentId: null
  }

  isSelected(value) {
    if (value === this.state.selected) {
      return true
    }
    return false
  }

  handlePayClick() {
    switch (this.state.selected) {
      case 'PayPalPlus':
        // this.payWithPayPal()        
        this.props.navigation.navigate("WebPayPal", {
          CartData: this.state.data,
        });
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
        <ScrollView style={{ marginHorizontal: 18 }}>
          <PaymentOption
            onPress={() => this.setState({ selected: 'PayPalPlus' })}
            selected={this.isSelected('PayPalPlus')}
            imageSource={require('../../assets/payments/PayPalPlus.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'Ratenkauf' })}
            selected={this.isSelected('Ratenkauf')}
            imageSource={require('../../assets/payments/Ratenkauf.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'AmazonPay' })}
            selected={this.isSelected('AmazonPay')}
            imageSource={require('../../assets/payments/AmazonPay.png')}
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra mae'
          />
          {
            Platform.OS === 'ios' ?
              <PaymentOption
                onPress={() => this.setState({ selected: 'ApplePay' })}
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
