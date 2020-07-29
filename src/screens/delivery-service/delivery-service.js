import React, { Component } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import FooterButton from '../../common/footer-button';
import DeliveryOption from '../../common/delivery-option';
import { BoxShadow } from 'react-native-shadow';
import { sWidth } from '../../helpers/screenSize';
import Loading from '../loading';
import { getDeliverySuppliers } from '../../gets/ordersPosts';
import NavigationService from '../../navigation-service';

const unit = '<DeliveryService>';

export default class DeliveryService extends Component {
  static navigationOptions = { title: 'Versandart wählen' };
  
  constructor(props) {
    super(props);
    this.SelectionChange = this.SelectionChange.bind(this);
  }

  state = {
    productsPrice: 0,
    deliveryPrice: 0,
    selected: null,
    name: null,
    services: [],
    loaded: false
  }

  isSelected(id) { return id === this.state.selected }

  componentWillMount() {
    const productsPrice = this.props.navigation.getParam('data', null).discountValue;
    console.log('productsPrice:',productsPrice);
    getDeliverySuppliers()
    .then(services => {
      console.log('services:', services);
      let delivery = [];
      let tdelivery = null;
      services.map(service => {
        tdelivery = service.costs.reverse().find(({ from }) => from < productsPrice);
        console.log('tdelivery:', tdelivery);

        if( service.costs.reverse().find(({ from }) => from < productsPrice) !== undefined ) {
          delivery.push(service);
        }
      });
      console.log('delivery:', delivery);
      this.setState({
        productsPrice: productsPrice, services: delivery, loaded: true
      });
    })
    .catch(err => {
      console.log('getDeliverySuppliers fetchEror:', err);
    });
  }

  DeliveryOptions() {
    return this.state.services.map(({ id, name, description, shippingFree, costs }) => (
      <DeliveryOption
        key={id}
        SelectionChange={this.SelectionChange}
        selected={this.isSelected(id)}
        id={id}
        name={name}
        shippingFree={shippingFree}
        costs={costs}
        description={description}
      />
    ));
  }

  SelectionChange(id, name, shippingFree, costs) {
    // console.log('SelectionChange..................................................');
    console.log('id:',id,'name:',name,'shippingFree:',shippingFree,'costs:',costs);
    const price = costs.reverse().find(({ from }) => from < this.state.productsPrice);
    console.log('price:', price);

    let deliveryPrice = shippingFree;
    if(price) { deliveryPrice = price.value; }
    this.setState({ selected: id, name: name, deliveryPrice: deliveryPrice });
  }

  render() {
    console.log(unit, 'RENDER => this.state:', this.state);

    const shadowOpt = {
      width: sWidth,
      height: 50,
      color: "#000",
      border: 6,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 0
    }

    if(!this.state.loaded) return <Loading />;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 18 }}>
          {this.DeliveryOptions()}
        </ScrollView>
        <BoxShadow setting={shadowOpt}>
          <View style={s.footerSummaryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={s.summaryText}>Versandkosten:</Text>
              <Text style={s.summaryText}>{this.state.deliveryPrice.toFixed(2)} €</Text>
            </View>
          </View>
        </BoxShadow>
        <FooterButton
          text='Weiter'
          onPress={() =>
            this.state.selected
            ?
            NavigationService.navigate('CartPreview', { userInfo: { ...this.props.navigation.getParam('userInfo', null) }, data: { ...this.props.navigation.getParam('data', null) }, deliveryData: { ...this.state } })
            :
            Alert.alert('Versandart wählen', '', [{ text: 'OK', onPress: () => null }], { cancelable: false })
          }
        />
      </View>
    );
  }
}

const s = {
  footerSummaryContainer: {
    height: 50,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  summaryText: { color: '#040404', fontSize: 16 },
}
