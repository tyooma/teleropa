import React, {PureComponent} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import base64 from 'react-native-base64';

import FooterNavBar from './modules/footer-navigation-bar';
import FooterAgreement from '../common/footer-agreement/footer-agreement';

export default class TestBox extends PureComponent {
  static navigationOptions = { title: 'Testing' };
  state = { order: '<NoNe>' };

  getPayments() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getPaymentOptions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: {}
    })
    .then(res => {
      console.log('<getPayments> - API_RESPONSE: ', res.json());
    })
    .catch(err => {
      console.log('<getPayments> - ERROR: ', err.message)
    });
  }

  getProductByID() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewProductData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: `productID=${56569}`
      body: `productID=${56569}`
    })
    .then(res => {
      console.log('<getProductByID> - API_RESPONSE: ', res.json());
    })
    .catch(err => {
      console.log('<getProductByID> - ERROR: ', err.message);
    });
  }

  getDelivery() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getDeliverySuppliers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: {}
    })
    .then(res => {
      console.log('<getDelivery> - API_RESPONSE: ', res.json());
    })
    .catch(err => {
      console.log('<getDelivery> - error: ', err.message)
    });
  }

  Json2UrlEncoded(doc) {
    const delim = ',';
    const customerID = `customerID=${doc.customerID}`;
    const paymentID = `paymentID=${doc.paymentID}`;
    const dispatchID = `dispatchID=${doc.dispatchID}`;
    
    let productItems = '';
    doc.products.forEach(p => {
      productItems += '{';
      productItems += `productID=${p.productID}${delim}`;
      productItems += `productName='${p.productName}'${delim}`;
      productItems += `productCount=${p.productCount}${delim}`;
      productItems += `productPrice=${p.productPrice}${delim}`;
      productItems += `previewImageURL=${p.previewImageURL}${delim}`;
      productItems += `returnData=${p.returnData}`;
      productItems += `}${delim}`;
    });
    const products = `products=[${productItems}]`;

    let pseudoItems = '';
    doc.pseudoProducts.forEach(p => {
      // на данный момент не известно, заказчик не предоставил данные
      // pseudoProducts += `{ ${p.productID}, ${p.productName}, ${p.productCount}, ${p.productPrice}, ${p.previewImageURL}, ${p.returnData} },`;
    });
    const pseudoProducts = `pseudoProducts=[${pseudoItems}]`;

    const orderTotalPrice = `orderTotalPrice=${doc.orderTotalPrice}`;
    const orderDeliveryPrice = `orderDeliveryPrice=${doc.orderDeliveryPrice}`;
    const orderVAT = `orderVAT=${doc.orderVAT}`;

    const uri = `${customerID}&${paymentID}&${dispatchID}&${products}&${pseudoProducts}&${orderTotalPrice}&${orderDeliveryPrice}&${orderVAT}`;
    return encodeURI(uri);
  }

  createOrder() {
    const customer_id = 23345;
    const payment_id = 5;
    const dispatch_id = 11;
    const products = [
      {
        productID: 56569,
        productName: 'TECHNIVISTA 55 SL 139 cm (55 Zoll) UHD LED Fernseher',
        productCount: 1,
        productPrice: 1599,
        previewImageURL: 'https://teleropa3.shop-cdn.com/media/image/ea/cc/72/TECHNIVISTA-SL-Geraet-Glasdrehfuss-Fernbedi_29K4PlhTzPyTUE_200x200.jpg',
        returnData: null
      },
    ];
    const pseudo_products = [];
    const order_total_price = 1376.47;
    const order_delivery_price = 39;
    const order_vat =  1638;

    let PAYMENT = {
      customerID: customer_id,
      paymentID: payment_id,
      dispatchID: dispatch_id,
      products: products,
      pseudoProducts: pseudo_products,
      orderTotalPrice: order_total_price,
      orderDeliveryPrice: order_delivery_price,
      orderVAT: order_vat,
    };

    PAYMENT = this.Json2UrlEncoded(PAYMENT);
    // console.log(PAYMENT);

    // 4.86000000000000031974423109204508364200592041015625
    // tax: 16 %
    // console.log('zzgl> MwSt.:', 4.86000000000000031974423109204508364200592041015625*0.16);
    // console.log('Sparen:', 9.9900000000000002131628207280300557613372802734375*0.5135000000000000142108547152020037174224853515625);
    // Sparen: 5.129865000000001

    // fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/createOrder', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: PAYMENT
    // })
    // .then(res => { console.log('result: ', res.json()) })
    // .catch(err => { console.log('error: ', err.message) });
  }

  render() {
    console.log('<TextBox> - RENDER');
    const nav = this.props.navigation;
    let order = this.state.order;
    return (
      <View style={s.Conteiner}>
        <ScrollView style={s.Form}>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>AGB:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'AGB'})} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>Impressum:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'Impressum'})} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>Datenschutz:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'Datenschutz'})} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>getDelivery:</Text>
            <Button title="Execute" onPress={() => this.getDelivery()} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>getProductByID:</Text>
            <Button title="Execute" onPress={() => this.getProductByID()} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>createOrder:</Text>
            <Button title="Execute" onPress={() => this.createOrder()} />
          </View>
        </ScrollView>
        {/* <FooterAgreement /> */}
        {/* <FooterNavBar /> */}
        <Text>{order}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  Conteiner: { flex: 1 },
  Form: { marginHorizontal: 18, marginTop: 22 },
  FormItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ItemText: { color: '#040404', fontSize: 16 },
});
