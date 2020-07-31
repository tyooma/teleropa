import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Loading from '../loading';
import { clearCart } from '../../functions/cart-funcs';
import { ExecuteOrder } from './PrePaymentOrder';

const unit = '<PrePayment>';

class PrePayment extends PureComponent {
  static navigationOptions = ({ navigation }) => { return { title: navigation.getParam('Payment') } };

  constructor(props) { super(props) }

  state = {
    // ORDER
    payment: null,
    orderInfo: {
      customerID: this.props.userID,
      paymentID: this.props.navigation.getParam('PaymentID'),
      dispatchID: this.props.navigation.getParam('CartData').deliveryData.selected,
      products: this.props.navigation.getParam('CartData').cartInfo.products,
    },

    // PAYMENT
    paymentName: this.props.navigation.getParam('Payment'),

    // DELIVERY
    deliveryName: this.props.navigation.getParam('CartData').deliveryData.name,

    // CART
    cart: this.props.navigation.getParam('CartData'),

    // USER
    name: this.props.userInfo.name,
    surname: this.props.userInfo.surname,
    gender: this.props.userInfo.gender,
    email: this.props.userInfo.email,
    street: this.props.userInfo.street,
    post: this.props.userInfo.post,
    city: this.props.userInfo.city,
    country: this.props.userInfo.country,
  }

  componentWillMount() {
    const method = '<componentWillMount>';
    console.log('................................................................................');
    console.log(unit+'.'+method);
    try {
      //.....................................................................................................
      // Dummy Fetch for Payment-Object
      // const payment = { code: 'success', text: 'Information erfolgreich aktualisiert', data: { orderNumber: '11111' } };
      // const payment = { code: 'error', text: 'Information konnte nicht aktualisiert werden' };
      // const payment = { code: 'requestError', text: 'Сайт Teleropa.de пока не может обработать этот запрос: «HTTP ERROR 500»' };
      //.....................................................................................................

      ExecuteOrder(this.state.orderInfo).then((payment) => {
        console.log(unit+'.'+method+' ExecuteOrder Success:', payment);
        this.setState({payment: payment});
      });
      
    } catch(err) {
      this.setState({payment: {code: 'unknown_error', text: err.message}});
      console.log(unit+'.'+method+' Try-Catch Error:', err);
    }
    console.log('................................................................................');
  }

  render() {
    console.log(`${unit}.<"${this.props.navigation.getParam('Payment')}"><RENDER>:`, this.state);
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
          clearCart();
          console.log(`${unit}.<RENDER> payment=success: clearCart()`);
          break;
        case 'error':
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              {/* Сервис оплаты вернул ошибку при обработке Вашего заказа: */}
              <Text style={s.ContentBaseText}>Der Zahlungsservice hat bei der Bearbeitung Ihrer Bestellung einen Fehler zurückgegeben:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              {/* Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa. */}
              <Text style={s.ContentBaseText}>Wir bitten Sie, den Vorgang später zu wiederholen oder sich an den Support des Teleropa-Geschäfts zu wenden.</Text>
            </View>
          );
          break;
        case 'requestError':
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              {/* При обработке Вашего заказа возникла ошибка соединения: */}
              <Text style={s.ContentBaseText}>Bei der Bearbeitung Ihrer Bestellung ist ein Verbindungsfehler aufgetreten:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              {/* Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa. */}
              <Text style={s.ContentBaseText}>Wir bitten Sie, den Vorgang später zu wiederholen oder sich an den Support des Teleropa-Geschäfts zu wenden.</Text>
            </View>
          );
          break;
        default:
          screen = (
            <View style={s.ContentContainer}>
              <Text style={s.ContentBaseText, s.TextBold}>{customer}</Text>
              {/* <Text style={s.ContentErrorCaption}>При обработке Вашего заказа возникла неизвестная ошибка: */}
              <Text style={s.ContentErrorCaption}>Bei der Bearbeitung Ihrer Bestellung ist ein unbekannter Fehler aufgetreten:</Text>
              <Text style={s.ContentErrorCaption}>{payment.text}</Text>
              {/* Просим Вас повторить операцию позже или обратиться в службу поддержки магазина Teleropa. */}
              <Text style={s.ContentBaseText}>Wir bitten Sie, den Vorgang später zu wiederholen oder sich an den Support des Teleropa-Geschäfts zu wenden.</Text>
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
        {screen}
        <View style={s.ActionConteiner}>
          <TouchableOpacity style={s.ButtonConteiner} onPress={() => { this.props.navigation.navigate('Main') }}>
            <View style={s.ButtonIcon}><Icons name="ios-home" size={30} color="#FFFFFF" /></View>
            {/* Main */}
            {/* <Text style={s.ButtonText}>Hauptbildschirm</Text> */}
            <Text style={s.ButtonText}>Zurück zum shop</Text>
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
    borderTopWidth: 1,
    borderColor: '#A7A7AA',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  ButtonConteiner: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  ButtonIcon: { paddingRight: 10 },
  ButtonText: { color: '#FFFFFF', fontSize: 24, marginBottom: 1.5 },
});

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID });
export default connect(mapStateToProps)(PrePayment);
