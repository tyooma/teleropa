import React, { Component } from 'react';

import { View, ScrollView, Platform, ToastAndroid } from 'react-native';


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
    loading: false,
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
        this.props.navigation.navigate("WebPayPal", {
          CartData: this.state.data,
        });
        break;
      case 'AmazonPay':
        this.props.navigation.navigate("AmazonLoginWebView", {
          CartData: this.state.data,
        });
        break;
      case 'Vorkasse':
        console.log("Выбранно Vorkasse и тут нужен Рест Апи запрос + окно фидбека")
        // this.props.navigation.navigate("WebPayPal", {
        //   CartData: this.state.data,
        // });
        break;
      case 'Nachnahme':
        console.log("Выбранно Nachnahme и тут нужен Рест Апи запрос + окно фидбека")
        // this.props.navigation.navigate("WebPayPal", {
        //   CartData: this.state.data,
        // });
        break;
      case 'ApplePay':
        this.payWithApplePay()
        break;
      default:
        ToastAndroid.show(`SELECT PAYMENT METHOD`, ToastAndroid.LONG)
        break;
    }
    // this.props.navigation.navigate('OrderSuccess')
  }

  payWithApplePay() {
    const productsPrice = parseFloat(this.state.data.discountProductsPrice);
    const deliveryPrice = parseFloat(this.state.data.deliveryData.deliveryPrice);
    const total = productsPrice + deliveryPrice
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
    paymentRequest.show()
      .then(e => console.log('sucess', e))
      .catch(e => console.log('error', e))
  }

  render() {
    console.log("this.state in payment.js", this.state);
    console.log("this.props in payment.js", this.props);
    if (this.state.loading) return <Loading />
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 18 }}>
          <PaymentOption
            onPress={() => this.setState({ selected: 'PayPalPlus' })}
            selected={this.isSelected('PayPalPlus')}
            imageSource={require('../../assets/payments/PayPalPlus.png')}
          />
          {/* <PaymentOption
            onPress={() => this.setState({ selected: 'AmazonPay' })}
            selected={this.isSelected('AmazonPay')}
            imageSource={require('../../assets/payments/AmazonPay.png')}
          /> */}
          <PaymentOption
            onPress={() => this.setState({ selected: 'Vorkasse' })}
            selected={this.isSelected('Vorkasse')}
            imageSource={require('../../assets/payments/Vorkasse.png')}
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'Nachnahme' })}
            selected={this.isSelected('Nachnahme')}
            imageSource={require('../../assets/payments/Nachnahme.png')}
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

        <FooterButton text='Weiter' onPress={() => this.handlePayClick()
        } />
      </View>
    )
  }
}