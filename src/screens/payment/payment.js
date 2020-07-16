import React, { Component } from 'react';

import { View, Text, ScrollView, Platform, TouchableOpacity, } from 'react-native';

import Toast from 'react-native-root-toast';

import ModalView from '../../common/modal-view';

import FooterButton from '../../common/footer-button';

import PaymentOption from '../../common/payment-option';

import Loading from '../loading';

export default class Payment extends Component {
  static navigationOptions = {
    title: 'Zahlungsweise'
  }

  state = {
    selected: '',
    ModalPaymentVisible: false,
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
        this.setState({ ModalPaymentVisible: !this.state.ModalPaymentVisible })

        break;
      case 'Rechnung':
        this.setState({ ModalPaymentVisible: !this.state.ModalPaymentVisible })
        break;
      case 'ApplePay':
        this.payWithApplePay()
        break;
      default:
        Toast.show(`SELECT PAYMENT METHOD`, {
          shadow: false,
          backgroundColor: '#505050'
        })
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

  CloseModal() {
    this.setState({ ModalPaymentVisible: !this.state.ModalPaymentVisible });
    if (!this.state.ModalPaymentVisible) this.props.navigation.navigate("Main")
  }


  render() {
    console.log("This state.payments.js~~~~", this.state)
    if (this.state.loading) return <Loading />
    return (
      <View style={{ flex: 1 }}>
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
          <PaymentOption
            onPress={() => this.setState({ selected: 'Vorkasse' })}
            selected={this.isSelected('Vorkasse')}
            text={'Vorkasse'}
            imageSource={require('../../assets/payments/Vorkasse.png')}
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'Rechnung' })}
            selected={this.isSelected('Rechnung')}
            text={'Kauf auf Rechnung'}
            imageSource={require('../../assets/payments/Rechnung.png')}
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

        <ModalView
          title='Vielen Dank für Ihre Bestellung!'
          buttonText='Zurück zum Shop'
          visible={this.state.ModalPaymentVisible}
          onSubmit={() => this.setState({ ModalPaymentVisible: !this.state.ModalPaymentVisible })}
          onRequestClose={() => this.CloseModal()}
        // this.props.navigation.navigate("Main")s
        >

          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            {/* <Text style={{ color: 'black', marginTop: 10, fontSize: 16, }}>Vielen Dank für Ihre Bestellung!</Text> */}
            <Text style={{ marginTop: 15, fontSize: 16, fontWeight: 'bold', color: 'black' }}>Fragen zu Ihrer Bestellung?</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>+49 (0) 6592 98487 0</Text>
              <Text style={{ fontSize: 12, padding: 4 }}>Täglich von 8:00 bis 16:00 Uhr</Text>
            </View>
            <Text style={{ textAlign: 'auto', marginTop: 15, fontSize: 16, }}>Wir haben Ihnen eine Bestellbestätigung per E-Mail geschickt.</Text>
            <Text style={{ textAlign: 'auto', fontSize: 16, marginTop: 10 }}>Wir empfehlen die unten aufgeführte Bestellbestätigung auszudrucken.</Text>
          </View>

        </ModalView>



        <FooterButton text='Weiter' onPress={() => this.handlePayClick()
        } />
      </View >
    )
  }
}