import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BoxShadow } from 'react-native-shadow';
import ImageLoader from '../../helpers/image-loader';
import { sWidth } from '../../helpers/screenSize';
import NavigationService from '../../navigation-service';
import FooterButton from '../../common/footer-button';
// import Toast from 'react-native-root-toast';
// import Loading from '../loading';

import { fixPrice } from '../../functions/cart-funcs';

const unit = 'CartPreview';

getStock = (stock, order, pcs) => {
  if(!order) {
    if(stock > 0) {
      return <Text style={s.cartItemInStock}>Produkt ist verfügbar</Text>;
    }
    return <Text style={s.cartItemNotInStock}>nicht verfügbar</Text>;
  }
  return <Text>{pcs} St.</Text>;
}

getCounterInPreview = (order, pcs) => {
  if(!order) {
    return <Text style={s.countText}>Anzahl: {pcs}</Text>;
  }
}

export const CartItemInPreview = ({ img, name, pcs, price, companyPrice, selectedUserType, userType, stock, order, orderReturnReason, id, bonus, orderVAT, deliveryPrice }) => {
  console.log(`${unit} CartItemInPreview: ${bonus}`);
  return (
    <TouchableOpacity style={s.cartItemContainer} onPress={() => NavigationService.push('Product', { id, name, methodMoney: 'buyOfMoney' })}>
      <View style={{flexDirection: 'row'}}>
        {img ?
        <View><ImageLoader style={s.cartItemImage} source={{ uri: img }} key={img} /></View>
        :
        <View><Image style={s.cartItemImage} source={require('../../assets/message-icons/no-photo.png')} key={'no-image'} /></View>
        }
        <View style={{ flex: 1 }}>
          <Text style={s.cartItemName} numberOfLines={2}>{name}</Text>
          <View style={{ marginTop: 4, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                {getStock(stock, order, pcs)}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                {getCounterInPreview(order, pcs, id)}
                </View>
            </View>
            <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
                {
                (typeof bonus !== 'undefined' &&  bonus !== '') 
                ?
                <Text style={s.price}>{bonus * pcs} P.</Text>
                :
                selectedUserType == 'H' ?
                <>
                    <Text style={s.pricePerProduct}>{companyPrice} €\St</Text>
                    <Text style={s.price}>{companyPrice * pcs} €</Text>
                </>
                :
                <>
                    <Text style={s.pricePerProduct}>{price} €\St</Text>
                    <Text style={s.price}>{price * pcs} €</Text>
                </>
                }
            </View>
          </View>
          {orderReturnReason ?
            <Text style={{ marginBottom: 5 }}>Grund für Rückgabe: {orderReturnReason}</Text>
            :
            null
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class CartPreview extends Component {
  static navigationOptions = { title: 'Bestellübersicht' }

  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.navigation.getParam('userInfo', null),
      cartInfo: this.props.navigation.getParam('data', null),
      deliveryData: this.props.navigation.getParam('deliveryData', null),
    }
  }
  
  getProductsCards() {
    return this.state.cartInfo.products.map(({ id, previewImgURL, productName, price, companyPrice, stock, count, bonus }) => {
      return <CartItemInPreview
                key={id}
                id={id}
                img={previewImgURL}
                name={productName}
                pcs={count}
                price={price}
                companyPrice={companyPrice}
                stock={stock}
                bonus={bonus}
                selectedUserType={this.state.userInfo.selectedUserType}
                userType={this.state.userInfo.userType}
                orderVAT={this.state.cartInfo.orderVAT}
                deliveryPrice={this.state.deliveryData.deliveryPrice}
              />;
    });
  }

  productsVAT() {
    return this.state.cartInfo.products.reduce((sum, { tax, count }) => {
      return fixPrice(this.state.deliveryData.deliveryPrice / (1 + (tax / 100)) * count, 2);
    }, 0);
  }

  zzglVAT() {
    return this.state.cartInfo.products.reduce((sum, { tax, count }) => {
      return fixPrice((this.state.deliveryData.deliveryPrice / (1 + (tax / 100)) * count) * (tax / 100), 2);
    }, 0);
  }

  render() {
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

    console.log(unit, 'this.state:', this.state);
    
    console.log(unit, 'this.state.cartInfo.bonus:', this.state.cartInfo.bonus);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginHorizontal: 18, marginTop: 22 }}>
            {this.getProductsCards()}
            <View style={s.line}>
              <Text style={s.summaryText}>Summe:</Text>
              <Text style={s.summaryText}>
              { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                0
                :
                this.state.cartInfo.discountProductsPrice
              } €
              </Text>
            </View>
            <View style={s.line}>
              <Text style={s.summaryText}>Versandkosten:</Text>
              <Text style={s.summaryText}>{this.state.deliveryData.deliveryPrice} €</Text>
            </View>
            <View style={s.line}>
              <Text style={s.summaryTextBold}>Gesamtsumme:</Text>
              <Text style={s.summaryTextBold}>
              { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                this.state.deliveryData.deliveryPrice
                :
                this.state.cartInfo.discountProductsPrice + this.state.deliveryData.deliveryPrice
              } €
              </Text>

            </View>
            <View style={s.line}>
              <Text style={s.summaryText}>Gesamtsumme ohne MwSt.:</Text>
              <Text style={s.summaryText}>
              { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                this.productsVAT()
                :
                this.state.cartInfo.orderVAT
              } €
              </Text>
            </View>
            <View style={s.line}>
              <Text style={s.summaryText}>zzgl. MwSt.:</Text>
              <Text style={s.summaryText}>
              { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                this.zzglVAT()
                :
                fixPrice(this.state.cartInfo.discountProductsPrice - this.state.cartInfo.orderVAT, 2)
              } €
              </Text>
            </View>
            <View style={s.line}>
              <Text style={s.summaryTextPoint}>Punkte für die Bestellung:</Text>
              <View style={s.linePoint}>
                <Text style={s.summaryTextPointGreen}>
                { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                  '+ ' + 0
                  :
                  '+ ' + Math.floor(this.state.cartInfo.discountProductsPrice)
                }
                </Text>
                <Text style={s.radiusCircle}>P</Text>
              </View>
            </View>
            <View style={s.line}>
              <Text style={s.summaryTextPoint}>Punkte eingelöst:</Text>
              <View style={s.linePoint}>
                <Text style={s.summaryTextPointRed}>
                { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                  '- ' + this.state.cartInfo.bonus
                  :
                  '-' + 0
                }
                </Text>
                <Text style={s.radiusCircle}>P</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <BoxShadow setting={shadowOpt}>
          <View style={s.footerSummaryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text style={s.summaryTextBold} >Gesamtbetrag:</Text>
              <Text style={s.summaryTextBold}>
              { (typeof this.state.cartInfo.bonus !== 'undefined' && this.state.cartInfo.bonus !== '') ?
                this.state.deliveryData.deliveryPrice
                :
                (this.state.cartInfo.discountProductsPrice + this.state.deliveryData.deliveryPrice)
              } €
              </Text>
            </View>
          </View>
        </BoxShadow>

        <FooterButton
          text={'Zahlungspflichtig bestellen'} 
          onPress={() => {
            NavigationService.navigate('Payment', { data: this.state }) 
          }} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyCartImage: { height: 80, width: 80, resizeMode: 'contain' },
  emptyCartText: { marginTop: 10, color: '#717171', fontSize: 16 },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 19 },
  linePoint: { flexDirection: 'row' },
  summaryTextBold: {
    color: '#040404',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  summaryText: {
    color: '#040404',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  summaryTextPoint: { color: '#8a0010', fontSize: 16 },
  summaryTextPointRed: { color: '#e74c3c', fontSize: 16 },
  summaryTextPointGreen: { color: '#2ecc71', fontSize: 16 },
  radiusCircle: {
    left: 5,
    width: 100 / 4,
    height: 100 / 4,
    borderRadius: 150 / 2,
    backgroundColor: '#d10019',
    color: '#040404',
    fontSize: 16,
    textAlign: 'center',
  },
  cartItemContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 14,
    borderRadius: 5
  },
  cartItemImage: { margin: 10, height: 90, width: 80, resizeMode: 'contain' },
  cartItemName: {
    fontSize: 10,
    color: '#040404',
    lineHeight: 16,
    width: '80%',
    marginTop: 10
  },
  cartItemInStock: { fontSize: 10, color: '#3f911b' },
  cartItemNotInStock: { fontSize: 10, color: '#d10019' },
  deleteButton: { position: 'absolute', top: 0, right: 0 },
  deleteButtonImage: { margin: 12, width: 13, height: 13, resizeMode: 'contain' },
  minusPlusButton: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusPlusButtonImage: { width: 18, height: 18, resizeMode: 'contain' },
  countText: { fontSize: 12, color: '#000', marginHorizontal: 12 },
  pricePerProduct: { fontSize: 12, color: '#a0a0a0', marginBottom: 6 },
  price: { fontSize: 16, color: '#040404' },
  promocodeButton: {
    borderRadius: 5,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  promocodeButtonText: { fontSize: 16, color: '#030303' },
  footerSummaryContainer: {
    height: 50,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
