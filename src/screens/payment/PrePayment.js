import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Loading from '../loading';
import { clearCart } from '../../functions/cart-funcs';

const unit = '<PrePayment>';

class PrePayment extends PureComponent {
  static navigationOptions = ({ navigation }) => { return { title: navigation.getParam('Payment') } };

  constructor(props) { super(props) }

  state = {
    cart: this.props.navigation.getParam('CartData'),
    paymentID: this.props.navigation.getParam('PaymentID'),
    paymentName: this.props.navigation.getParam('Payment'),
    deliveryID: this.props.navigation.getParam('CartData').deliveryData.selected,
    deliveryName: this.props.navigation.getParam('CartData').deliveryData.name,
    payment: null,
    // Info from REDUX props:
    customerID: this.props.userID,
    name: this.props.userInfo.name,
    surname: this.props.userInfo.surname,
    gender: this.props.userInfo.gender,
    email: this.props.userInfo.email,
    street: this.props.userInfo.street,
    post: this.props.userInfo.post,
    city: this.props.userInfo.city,
    country: this.props.userInfo.country,
  }

  getUrlEncodedOrder() {
    const customerID = `customerID=${this.state.customerID}`;
    const paymentID = `paymentID=${this.state.paymentID}`;
    const dispatchID = `dispatchID=${this.state.deliveryID}`;
    
    let items = '';
    // console.log(`${unit}.<${method}> cartInfo: `, this.state.cart.cartInfo);
    this.state.cart.cartInfo.products.forEach(product => {
      items += `{productID:${product.id},`;
      if(product.methodMoney!=='' && product.methodMoney.toUpperCase()==='BUYOFPOINTS') items += 'bonus:1,';
      items += `quantity:${product.count}},`;
    });
    const products = `products=[${items}]`;

    const uri = `${customerID}&${paymentID}&${dispatchID}&${products}`;
    const uriEncoded = encodeURI(uri);
    return uriEncoded;
  }

  componentWillMount() {
    const method = 'componentWillMount';
    console.log('................................................................................');
    console.log(`${unit}.<${method}>`);
    try {
      // const ORDER = this.getUrlEncodedOrder();
      // console.log(`${unit}.<${method}> ORDER:`, ORDER);
      //.....................................................................................................
      // Dummy Fetch for Payment-Object
      const payment = { code: 'success', text: 'Information erfolgreich aktualisiert', data: { orderNumber: '34217' } };
      // const payment = { code: 'error', text: 'Information konnte nicht aktualisiert werden' };
      // const payment = { code: 'requestError', text: 'Сайт Teleropa.de пока не может обработать этот запрос: «HTTP ERROR 500»' };
      this.setState({ payment: payment });
      //.....................................................................................................

      /*
      fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/createOrder', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: ORDER
      })
      .then(res => res.json())
      .then(json => {
        console.log(`${unit}.<${method}>.<json>:`, json);
        const { code, text, data } = json;
        const payment = { code: code, text: text, data: data };
        this.setState({
          payment: payment
        });
        console.log(`${unit}.<${method}>.<fetchSuccess>:`, payment);
      })
      .catch(err => {
        this.setState({
          payment: { code: 'requestError', text: err.message }
        });
        console.log(`${unit}.<${method}>.<fetchError>:`, err);
      });
      */
    } catch(err) {
      this.setState({
        payment: { code: 'unknown_error', text: err.message }
      });
      console.log(`${unit}.<${method}>.<tryError>:`, err);
    }
    console.log('................................................................................');
  }

  render() {
    console.log(`${unit}.<"${this.props.navigation.getParam('Payment')}"><RENDER>:`, this.state);
    // const productsCount = this.state.cart.cartInfo.products.length;
    let screen = null;
    if (this.state.payment !== null) {
      const payment = this.state.payment;
      console.log(`${unit}: [payment] NOT NULL: `, payment);
      const customer = `${this.state.gender}, ${this.state.name} ${this.state.surname}`;
      switch (payment.code) {
        case 'success':
          const order = payment.data.orderNumber;
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText}>Vielen Dank für Ihre Bestellung!</Text>
              <Text style={s.ContentBaseText}>Fragen zu Ihrer Bestellung?</Text>
              <Text style={s.ContentBaseText}>+49 (0) 6592 98487 0 Täglich von 8:00 bis 16:00 Uhr</Text>
              <Text></Text>
              <Text style={s.ContentBaseText}>Wir haben Ihnen eine Bestellbestätigung per E-Mail geschickt: <Text style={s.TextBold}>«{this.state.email}»</Text>.</Text>
              <Text></Text>
              <Text style={s.ContentBaseText, s.TextBold}>Rechnungs- und Lieferadresse</Text>
              <Text style={s.ContentBaseTextItem}>{customer}</Text>
              <Text style={s.ContentBaseTextItem}>{this.state.street}</Text>
              <Text style={s.ContentBaseTextItem}>{this.state.post} {this.state.city}</Text>
              <Text style={s.ContentBaseTextItem}>{this.state.country}</Text>
              <Text></Text>
              <Text style={s.ContentBaseText, s.TextBold}>Informationen</Text>
              <Text style={s.ContentBaseTextItem}>Bestellnummer: {order}</Text>
              <Text style={s.ContentBaseTextItem}>Gewählte Zahlungsart: {this.state.paymentName}</Text>
              <Text style={s.ContentBaseTextItem}>Versandart: {this.state.deliveryName}</Text>
            </View>
          );
          // clearCart();
          console.log(`${unit}.<RENDER> payment=success: clearCart()`);
          break;
        case 'error':
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              <Text style={s.ContentBaseText}>Сервис оплаты вернул ошибку при обработке Вашего заказа:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
        case 'requestError':
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              <Text style={s.ContentBaseText}>При обработке Вашего заказа возникла ошибка соединения:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
        default:
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              <Text style={s.ContentErrorCaption}>При обработке Вашего заказа возникла неизвестная ошибка</Text>
              <Text style={s.ContentBaseText}>Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa.</Text>
            </View>
          );
          break;
      }
    } else {
      screen = <Loading />;
      console.log(`${unit}: [payment] == NULL!`);
    }
    return (
      <SafeAreaView style={s.Container}>
        {/* <Text style={s.ContentSuccessCaption}>Товаров в Корзине: {productsCount}</Text>
        <Text>......................................</Text> */}
        {screen}
        <View style={s.ActionConteiner}>
          <TouchableOpacity style={s.ButtonConteiner} onPress={() => { this.props.navigation.navigate('Main') }}>
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
  ContentBaseTextItem: { fontSize: 13, marginTop: 2 },
  ContentSuccessCaption: {
    color: '#000000',
    backgroundColor: '#99CCFF',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5
  },
  ContentErrorCaption: {
    color: '#FFFFFF',
    backgroundColor: '#FF6666',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5
  },
  TextBold: { fontWeight: 'bold' },

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

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID });
export default connect(mapStateToProps)(PrePayment);
