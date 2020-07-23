import React, { Component } from 'react';

import { Alert, Text, TouchableOpacity, View, Image, Modal, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { BoxShadow } from 'react-native-shadow'

import Toast from 'react-native-root-toast'

import ImageLoader from '../../helpers/image-loader';

import { connect } from 'react-redux'

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service'

import FooterButton from '../../common/footer-button';

import Loading from '../loading'

import Input from '../../common/input';

import ModalView from '../../common/modal-view';

import { getPreviewAsyncProductData, getPromocodeData } from '../../gets/productPosts';

import {
  addToCart,
  minusFromCart,
  deleteFromCart,
  clearCart
} from '../../functions/cart-funcs';

getStock = (stock, order, pcs) => {
  if (!order) {
    if (stock > 0) {
      return (
        <Text style={styles.cartItemInStock}>
          Produkt ist verfügbar
        </Text>
      )
    }

    return (
      <Text style={styles.cartItemNotInStock}>
        nicht verfügbar
      </Text>
    )
  }
  return (
    <Text >
      {pcs} St.
    </Text>
  )
}

getCounter = (order, pcs, id, onMinus, onAdd) => {

  if (!order) {
    return (
      <><TouchableOpacity style={styles.minusPlusButton} onPress={() => onMinus(id)}>
        <Image source={require('../../assets/icons/036-minus.png')} style={styles.minusPlusButtonImage} key={'cartMinusItem'} />
      </TouchableOpacity>
        <Text style={styles.countText}>
          {pcs}
        </Text>
        <TouchableOpacity style={styles.minusPlusButton} onPress={() => onAdd(id)}>
          <Image source={require('../../assets/icons-color/035-more2.png')} style={styles.minusPlusButtonImage} key={'cartPlusItem'} />
        </TouchableOpacity></>
    )
  }
}

export const CartItem = ({ img, name, pcs, price, companyPrice, selectedUserType, stock, order, orderReturnReason, id, onAdd, onMinus, onDelete, bonus, methodMoney }) => {
  return (
    <TouchableOpacity style={styles.cartItemContainer} onPress={() => NavigationService.push('Product', { id, name })}>
      <View style={{ flexDirection: 'row' }}>
        {img ?
          <View>
            <ImageLoader style={styles.cartItemImage} source={{ uri: img }} key={img} />
          </View>
          :
          <View>
            <Image style={styles.cartItemImage} source={require('../../assets/message-icons/no-photo.png')} key={'no-image'} />
          </View>
        }

        <View style={{ flex: 1 }}>
          <Text style={styles.cartItemName} numberOfLines={2}>
            {name}
          </Text>
          <View style={{ marginTop: 4, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              {getStock(stock, order, pcs)}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                {getCounter(order, pcs, id, onMinus, onAdd, methodMoney)}
              </View>
            </View>
            <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
              {methodMoney == 'buyOfPoints' ?
                <>
                  <Text style={styles.price}>{(bonus * pcs)} P.</Text>
                </>
                :
                selectedUserType === 'H' ?
                  <>
                    <Text style={styles.pricePerProduct}>{(companyPrice)} €\St</Text>
                    <Text style={styles.price}>{(parseFloat(companyPrice).toFixed(2) * pcs)} €</Text>
                  </>
                  :
                  <>
                    <Text style={styles.pricePerProduct}>{price} €\St</Text>
                    <Text style={styles.price}>{(parseFloat(price).toFixed(2) * pcs)} €</Text>
                  </>
              }
            </View>
          </View>
          {orderReturnReason ?
            <Text style={{ marginBottom: 5 }}>Grund für Rückgabe: {orderReturnReason}</Text>
            : null
          }
        </View>
        {
          !order ?
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
              <Image source={require('../../assets/icons/009-close.png')} style={styles.deleteButtonImage} key={'deleteFromCartButton'} />
            </TouchableOpacity>
            : null
        }

      </View>
    </TouchableOpacity>
  )
}

class Cart extends Component {
  state = {
    promocodeModalVisible: false,
    products: [],
    bonuses: [],
    originalProductsPrice: 0,
    discountProductsPrice: 0,
    orderVAT: 0,
    fullPrice: 0,
    promocode: '',
    promocodeData: null,
    discountValue: 0,
    cartReceaved: false,
    modalVisible: false,
    bonus: '',
    methodMoney: '',

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  static navigationOptions = {
    title: 'Warenkorb',
    headerRight: (
      < TouchableOpacity onPress={() => { clearCart(); NavigationService.back() }} style={{ height: '100%', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16, marginRight: 18 }}>löschen</Text>
      </TouchableOpacity >
    )
  }

  componentDidMount() {
    if (!this.state.cartReceaved) {
      this.init()
    }
  }




  async componentWillReceiveProps(props) {
    if (this.state.cartReceaved == true) {
      await this.initAfterUpdate(props.cart)
      console.log("await this.initAfterUpdate(props.cart)", await this.initAfterUpdate(props.cart))
    }
  }


  init() {
    const cart = this.props.cart
    if (cart.length > 0 && !this.state.cartReceaved) { this.setState({ cartReceaved: true }) }
    cart.map(({ id, count, bonus, selected }) => {
      console.log("selected selected v selected init", selected)
      getPreviewAsyncProductData(id)
        .then(res =>
          selected == "buyOfPoints" ?
            this.setState({ bonuses: [...this.state.bonuses, { ...res, id, count, methodMoney: selected }] })
            : this.setState({ products: [...this.state.products, { ...res, id, count, methodMoney: selected }] }))
    })
  }

  initAfterUpdate(cart) {
    this.setState({ products: [] })
    cart.map(({ id, count, bonus, selected }) => {
      console.log("selected selected v selected initAfterUpdate", selected)
      getPreviewAsyncProductData(id)
        .then(res =>
          selected == "buyOfPoints" ?
            this.setState({ bonuses: [...this.state.bonuses, { ...res, id, count, methodMoney: selected }] })
            : this.setState({ products: [...this.state.products, { ...res, id, count, methodMoney: selected }] }))
    })
  }


  addToCartAndState(id, bonus, selected) {
    addToCart(id, bonus, selected)
  }

  minusFromCartAndState(id, bonus, selected) {
    minusFromCart(id, bonus, selected)
  }

  
  deleteFromCartAndState(id, bonus, selected) {
    deleteFromCart(id, bonus, selected)
    const newProductsArray = []
    if (this.state.products.length != 0) {
      newProductsArray = this.state.products.filter(product => product.id !== id)
      this.setState({ products: newProductsArray })
    } else {
      newProductsArray = this.state.bonuses.filter(product => product.id !== id)
      this.setState({ bonuses: newProductsArray })
    }
  }

  getProductsCards() {
    if (this.state.products.length != 0) {
      return this.state.products.map(({ id, previewImgURL, productName, price, companyPrice, stock, count, methodMoney }) => {
        return (
          <CartItem
            key={id}
            id={id}
            img={previewImgURL}
            name={productName}
            pcs={count}
            price={price}
            companyPrice={companyPrice}
            selectedUserType={this.props.userInfo.selectedUserType}
            stock={stock}
            methodMoney={methodMoney}
            onAdd={id => this.addToCartAndState(id, methodMoney)}
            onMinus={id => this.minusFromCartAndState(id, methodMoney)}
            onDelete={id => this.deleteFromCartAndState(id, methodMoney)}
          />
        )
      })
    } else {
      return this.state.bonuses.map(({ id, previewImgURL, productName, price, companyPrice, stock, count, bonus, methodMoney }) => {
        return (
          <CartItem
            key={id}
            id={id}
            img={previewImgURL}
            name={productName}
            pcs={count}
            price={price}
            companyPrice={companyPrice}
            selectedUserType={this.props.userInfo.selectedUserType}
            stock={stock}
            bonus={bonus}
            methodMoney={methodMoney}
            onAdd={id => this.addToCartAndState(id, bonus, methodMoney)}
            onMinus={id => this.minusFromCartAndState(id, bonus, methodMoney)}
            onDelete={id => this.deleteFromCartAndState(id, bonus, methodMoney)}
          />
        )
      })
    }

  }

  isEmpty() {
    if (this.props.cart.length < 1) {
      return true
    }
    return false
  }

  setPrices() {
    const productsPrice = this.props.userInfo.selectedUserType === 'EK' ?
      this.state.products.reduce((sum, { price, count }) => {
        return sum + price * count
      }, 0)
      :
      this.state.products.reduce((sum, { companyPrice, count }) => {
        return sum + companyPrice * count
      }, 0)
    // }


    console.log("originalProductsPrice originalProductsPrice originalProductsPrice ", productsPrice)


    const productsVAT = this.state.products.reduce((sum, { price, companyPrice, tax, count }) => {
      if (this.props.userInfo.selectedUserType === 'EK') return (sum + price / (1 + (tax / 100)) * count)
      else return (sum + companyPrice / (1 + (tax / 100)) * count)
    }, 0)

    const discountProductsPrice = this.getDiscount(productsPrice)
    if (productsPrice.toFixed(2) !== this.state.originalProductsPrice || discountProductsPrice !== this.state.discountProductsPrice) {

      this.setState({
        originalProductsPrice: parseFloat(productsPrice).toFixed(2),
        discountProductsPrice,
        discountValue: parseFloat(productsPrice - discountProductsPrice).toFixed(2),
        orderVAT: parseFloat(productsVAT).toFixed(2)
      })
    }
  }

  getDiscount(price) {
    if (this.state.promocodeData) {
      const { percental, minimumcharge, value } = this.state.promocodeData
      if (minimumcharge > price) {
        alert('Der Gutscheincode kann nicht eingelöst werden, weil Ihr Warenkorb-Wert nicht ausreichend ist.')
        this.setState({ promocode: '', promocodeData: null, promocodeValue: 0, discountValue: 0 })
        return parseFloat(price).toFixed(2)
      }
      if (percental) {
        parseFloat(price - price / 100 * value).toFixed(2)
        return (price - price / 100 * value)
      }
      return parseFloat(price - value).toFixed(2)
    }
    return parseFloat(price).toFixed(2)
  }

  handlePromocodeSubmit() {
    if (this.state.promocode.length < 1) {
      alert('Bitte geben Sie den Gutscheincode ein.')
      return
    }
    getPromocodeData(this.state.promocode).then(promocodeData => {
      if (promocodeData.status.code === 'success') {
        this.setState({ promocodeData })
      }
      Toast.show(promocodeData.status.text, {
        shadow: false,
        backgroundColor: '#505050'
      })
    })
  }

  getDiscountBlock() {
    if (this.state.promocodeData && this.state.discountValue) {
      return (
        <View style={styles.line}>
          <Text style={styles.summaryText}>{this.state.promocodeData.description}:</Text>
          <Text style={styles.summaryText}>-{this.state.discountValue} €</Text>
        </View>
      )
    }
  }


  render() {
    console.log("render: this.state in cart.js", this.state)
    // console.log("render: this.poprs in cart.js", this.props)
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
    if (this.isEmpty()) {
      return (
        <View style={styles.emptyCartContainer}>
          <Image style={styles.emptyCartImage} source={require('../../assets/message-icons/cart-empty.png')} />
          <Text style={styles.emptyCartText}>Ihr Warenkorb ist leer</Text>
        </View>
      )
    }
    console.log("this.state.products.length + this.state.bonuses.length ", this.state.products.length + this.state.bonuses.length)
    console.log("this.props.cart.length this.props.cart.length ", this.props.cart.length)

    // if (this.state.products.length + this.state.bonuses.length !== this.props.cart.length) {
    //   return <Loading />
    // }
    this.setPrices()

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginHorizontal: 18, marginTop: 22 }}>
            {this.getProductsCards()}
            <TouchableOpacity style={styles.promocodeButton} onPress={() => this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible })} >
              <Text style={styles.promocodeButtonText}>
                Promo-Code eingeben
                            </Text>
            </TouchableOpacity>

            {/*
                                Ненужно с файла Comments_01.06.docx
                        <View style={styles.line}>                                
                             <Text style={styles.summaryText}>Cachback:</Text>                              
                            <Text style={styles.summaryText}>XX</Text>                        
                        </View>
                        */}

            {this.getDiscountBlock()}


            <View style={styles.line}>
              <Text style={styles.summaryText}>Summe:</Text>
              <Text style={styles.summaryText}>{this.state.methodMoney == 'buyOfPoints' ? parseFloat(0).toFixed(2) : parseFloat(this.state.discountProductsPrice)} €</Text>

            </View>



            <View style={styles.line}>
              <Text style={styles.summaryText}>Gesamtsumme ohne MwSt.:</Text>
              <Text style={styles.summaryText}>{this.state.methodMoney == 'buyOfPoints' ? parseFloat(0).toFixed(2) : this.state.orderVAT} €</Text>
            </View>

            <View style={styles.line}>
              <Text style={styles.summaryText}>zzgl. MwSt.:</Text>
              <Text style={styles.summaryText}> {this.state.methodMoney == 'buyOfPoints' ? parseFloat(0).toFixed(2) : parseFloat(this.state.discountProductsPrice - this.state.orderVAT)} €</Text>
            </View>
          </View>
        </ScrollView>

        <BoxShadow setting={shadowOpt}>
          <View style={styles.footerSummaryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text style={styles.summaryTextBold} >Gesamtbetrag:</Text>
              <Text style={styles.summaryTextBold} >{this.state.methodMoney == 'buyOfPoints' ? parseFloat(0).toFixed(2) : parseFloat(this.state.discountProductsPrice)} €</Text>
            </View>
          </View>
        </BoxShadow>



        <FooterButton text={'Zur Kasse'} onPress={() => {
          if (!this.props.userID || this.props.userID === "notloggedin") NavigationService.navigate('Login', { routeName: 'Cart' })
          else NavigationService.navigate('DeliveryService', { data: this.state, userInfo: this.props.userInfo })
        }} />

        <ModalView
          title='Promo-Code'
          buttonText='Code einlösen'
          onSubmit={() => {
            this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible })
            this.handlePromocodeSubmit()
          }}
          visible={this.state.promocodeModalVisible}
          onRequestClose={() => { this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible }) }}
        >
          <Input placeholder='Promo-Code eingeben' value={this.state.promocode} onChangeText={promocode => this.setState({ promocode })} />
        </ModalView>

      </View >
    )
  }
}

const mapStateToProps = ({ userInfo, userID, cart }) => ({ userInfo, userID, cart })
export default connect(mapStateToProps)(Cart)

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyCartImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
  },
  emptyCartText: {
    marginTop: 10,
    color: '#717171',
    fontSize: 16
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19
  },
  linePoint: {
    flexDirection: 'row',
  },
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
  summaryTextPoint: {
    color: '#8a0010',
    fontSize: 16
  },
  summaryTextPointRed: {
    color: '#e74c3c',
    fontSize: 16
  },
  summaryTextPointGreen: {
    color: '#2ecc71',
    fontSize: 16,
  },
  radiusCircle: {
    left: 5,
    width: 100 / 4,
    height: 100 / 4,
    borderRadius: 150 / 2,
    backgroundColor: '#d10019',
    color: '#040404',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  cartItemImage: {
    margin: 10,
    height: 90,
    width: 80,
    resizeMode: 'contain'
  },
  cartItemName: {
    fontSize: 10,
    color: '#040404',
    lineHeight: 16,
    width: '80%',
    marginTop: 10
  },
  cartItemInStock: {
    fontSize: 10,
    color: '#3f911b'
  },
  cartItemNotInStock: {
    fontSize: 10,
    color: '#d10019'
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  deleteButtonImage: {
    margin: 12,
    width: 13,
    height: 13,
    resizeMode: 'contain'
  },
  minusPlusButton: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  minusPlusButtonImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  countText: {
    fontSize: 12,
    color: '#000',
    marginHorizontal: 12
  },
  pricePerProduct: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 6
  },
  price: {
    fontSize: 16,
    color: '#040404'
  },
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
  promocodeButtonText: {
    fontSize: 16,
    color: '#030303'
  },
  footerSummaryContainer: {
    height: 50,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
})