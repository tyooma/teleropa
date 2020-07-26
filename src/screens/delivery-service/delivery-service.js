import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import FooterButton from '../../common/footer-button';
import DeliveryOption from '../../common/delivery-option';
import { BoxShadow } from 'react-native-shadow';
import { sWidth } from '../../helpers/screenSize';
import Loading from '../loading';
import { getDeliverySuppliers } from '../../gets/ordersPosts';
import Toast from 'react-native-root-toast';
import NavigationService from '../../navigation-service';

import { fixPrice } from '../../functions/cart-funcs';

const unit = 'DeliveryService';

export default class DeliveryService extends Component {
  static navigationOptions = { title: 'Versandart wählen' };

  state = {
    productsPrice: 0,
    deliveryPrice: 0,
    selected: null,
    name: null,
    services: [],
    loaded: false
  }

  isSelected(id) { return id === this.state.selected }

  componentDidMount() {
    const productsPrice = this.props.navigation.getParam('productsPrice', 0);
    this.setState({ productsPrice });
    getDeliverySuppliers()
    .then(services => {
      this.setState({ services, loaded: true });
    });
  }

  getDeliveryOptions() {
    return this.state.services.map(({ id, description, name }) => (
      <DeliveryOption
        onPress={() => this.handleSelectionChange(id, name)}
        selected={this.isSelected(id)}
        name={name}
        description={description}
        key={id}
      />
    ));
  }

  handleSelectionChange(selected, name) {
    this.setState({ selected, name }, this.getDeliveryPrice);
  }

  getDeliveryPrice() {
    const deliveryOption = this.state.services.find((service) => service.id === this.state.selected);
    const Q = deliveryOption.costs.sort((first, second) => (first.from > second.from) ? 1 : ((second.from > first.from) ? -1 : 0));
    const price = deliveryOption.costs.reverse().find(({ from }) => from < this.state.productsPrice);
    if(price) {
      this.setState({ deliveryPrice: price.value });
    } else {
      this.setState({ deliveryPrice: deliveryOption.shippingFree });
    }
  }

  render() {
    console.log(unit, 'this.state:', this.state);

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
          {this.getDeliveryOptions()}
        </ScrollView>
        <BoxShadow setting={shadowOpt}>
          <View style={s.footerSummaryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={s.summaryText}>Versandkosten:</Text>
              <Text style={s.summaryText}>{this.state.deliveryPrice} €</Text>
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
            Toast.show('Versandart wählen', {shadow: false, backgroundColor: '#505050', duration: 1500})
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
