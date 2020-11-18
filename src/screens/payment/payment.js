import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Alert, ScrollView, Platform, View } from 'react-native';

import FooterButton from '../../common/footer-button';

import PaymentOption from '../../common/payment-option';

import Loading from '../loading';

import ProgressBar from '../progress-bar';

class Payment extends Component {
  static navigationOptions = { title: 'Zahlungsweise' }

  state = {
    selected: 'PayPal',
    data: this.props.navigation.getParam('data', null),
    loading: false,
  }

  isSelected(value) {
    if (value === this.state.selected) { return true }
    return false
  }

  onPay() {
    const products = this.props.cart.length;
    if (products > 0 || Object.keys(this.state.data.SofortKaufen).length) {
      const cart = this.state.data;
      switch (this.state.selected) {
        case 'PayPal':
          this.props.navigation.navigate('PayPal', { CartData: cart, Payment: 'PayPal', PaymentID: 28 });
          break;
        case 'AmazonPay':
          this.props.navigation.navigate('AmazonLoginWebView', { CartData: cart, Payment: 'AmazonLoginWebView', PaymentID: 28 });
          break;
        case 'Rechnung':
          this.props.navigation.navigate('PayPal', { CartData: cart, Payment: 'Rechnung', PaymentID: 28 });
          break;
        case 'Vorkasse':
          this.props.navigation.navigate('PrePayment', { CartData: cart, Payment: 'Vorkasse', PaymentID: 5 });
          break;
        case 'ApplePay':
          this.payWithApplePay();
          break;
        default:
          Alert.alert('WARNUNG!', 'WÄHLEN SIE DIE ZAHLUNGSMETHODE',
            // 'Предупреждение!', 'ВЫБЕРИТЕ МЕТОД ОПЛАТЫ',
            [{ text: 'Ja', onPress: () => null }],
            { cancelable: false },
          );
          break;
      }
    }
    else {
      Alert.alert(
        // 'Предупреждение!', 'Ваш заказ уже обработан. Вернитесь в главное меню, чтобы разместить новый заказ',
        'WARNUNG!', 'Ihre Bestellung wurde bereits bearbeitet. Kehren Sie zum Hauptmenü zurück, um eine neue Bestellung aufzugeben',
        [{ text: 'Zurück zum shop', onPress: () => this.props.navigation.navigate('Main') }],
        { cancelable: false },
      );
    }

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
    console.log(`state in payments:`, this.state);
    console.log(`props in payments:`, this.props);

    if (this.state.loading) return <Loading />;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 18 }}>
          <ProgressBar step={'payment'} />
          <PaymentOption
            onPress={() => this.setState({ selected: 'PayPal' })}
            selected={this.isSelected('PayPal')}
            text={'PayPal'}
            imageSource={require('../../assets/payments/PayPal.png')}
          />
          <PaymentOption
            onPress={() => this.setState({ selected: 'Rechnung' })}
            selected={this.isSelected('Rechnung')}
            text={'Kauf auf Rechnung'}
            imageSource={require('../../assets/payments/Rechnung.png')}
          />
          {/* <PaymentOption
            onPress={() => this.setState({ selected: 'AmazonPay' })}
            selected={this.isSelected('AmazonPay')}
            imageSource={require('../../assets/payments/AmazonPay.png')}
          /> */}
          <PaymentOption
            onPress={() => this.setState({ selected: 'Vorkasse' })}
            selected={this.isSelected('Vorkasse')}
            text={'Vorkasse'}
            imageSource={require('../../assets/payments/Vorkasse.png')}
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
        <FooterButton text='Zahlungspflichtig bestellen' onPress={() => this.onPay()} />
      </View>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(Payment);
