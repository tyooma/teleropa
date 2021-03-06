import React, { Component } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BoxShadow } from "react-native-shadow";
import Toast from "react-native-root-toast";
import ImageLoader from "../../helpers/image-loader";
import { connect } from "react-redux";
import { sWidth } from "../../helpers/screenSize";
import NavigationService from "../../navigation-service";
import FooterButton from "../../common/footer-button";
import Loading from "../loading";
import Input from "../../common/input";
import ModalView from "../../common/modal-view";
import ProgressBar from "../progress-bar";
import IPlantTreeItem from "../i-plant-tree-item";
import {
  getPreviewAsyncProductData,
  getPromocodeData,
} from "../../gets/productPosts";
import {
  addToCart,
  minusFromCart,
  deleteFromCart,
  clearCart,
} from "../../functions/cart-funcs";

getStock = (stock, order, pcs) => {
  if (!order) {
    if (stock > 0) {
      return <Text style={styles.cartItemInStock}>Produkt ist verfügbar</Text>;
    }
    return <Text style={styles.cartItemNotInStock}>nicht verfügbar</Text>;
  }
  return <Text>{pcs} St.</Text>;
};

getCounter = (order, pcs, id, onMinus, onAdd, methodMoney, bonus) => {
  if (!order) {
    return (
      <>
        <TouchableOpacity
          style={styles.minusPlusButton}
          onPress={() => onMinus(id, bonus, methodMoney)}
        >
          <Image
            source={require("../../assets/icons/036-minus.png")}
            style={styles.minusPlusButtonImage}
            key={id + methodMoney + "cartMinusItem"}
          />
        </TouchableOpacity>
        <Text style={styles.countText}>{pcs}</Text>
        <TouchableOpacity
          style={styles.minusPlusButton}
          onPress={() => onAdd(id, bonus, methodMoney)}
        >
          <Image
            source={require("../../assets/icons-color/035-more2.png")}
            style={styles.minusPlusButtonImage}
            key={id + methodMoney + "cartPlusItem"}
          />
        </TouchableOpacity>
      </>
    );
  }
};

export const CartItem = ({
  img,
  name,
  pcs,
  price,
  companyPrice,
  selectedUserType,
  stock,
  order,
  orderReturnReason,
  bonus,
  id,
  onAdd,
  onMinus,
  onDelete,
  methodMoney,
}) => {
  console.log(
    "TouchableOpacity ==> CartItem  ==> ID ==> ",
    price,
    " Company Prise =>",
    companyPrice
  );
  // console.log("methodMoney in export const CartItem   ", methodMoney);
  // console.log("bonus in export const CartItem   ", bonus);
  return (
    <TouchableOpacity
      style={styles.cartItemContainer}
      onPress={() =>
        NavigationService.push("Product", { id, name, bonus, methodMoney })
      }
    >
      <View style={{ flexDirection: "row" }}>
        {img ? (
          <View>
            <ImageLoader
              style={styles.cartItemImage}
              source={{ uri: img }}
              key={id + methodMoney + img}
            />
          </View>
        ) : (
            <View>
              <Image
                style={styles.cartItemImage}
                source={require("../../assets/message-icons/no-photo.png")}
                key={id + methodMoney + "no-image"}
              />
            </View>
          )}
        <View style={{ flex: 1 }}>
          <Text style={styles.cartItemName} numberOfLines={2}>
            {name}
          </Text>
          <View
            style={{
              marginTop: 4,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              {getStock(stock, order, pcs)}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                {getCounter(order, pcs, id, onMinus, onAdd, methodMoney)}
              </View>
            </View>
            <View style={{ marginRight: 10, alignItems: "flex-end" }}>
              {methodMoney == "buyOfPoints" ? (
                <>
                  <Text style={styles.price}>
                    {(bonus * pcs).toFixed(0)} P.
                  </Text>
                </>
              ) : selectedUserType === "H" ? (
                <>
                  <Text style={styles.pricePerProduct}>
                    {companyPrice.toFixed(2)} €
                  </Text>
                  <Text style={styles.price}>
                    {(companyPrice * pcs).toFixed(2)} €
                  </Text>
                </>
              ) : (
                    <>
                      <Text style={styles.pricePerProduct}>
                        {price.toFixed(2)} €
                  </Text>
                      <Text style={styles.price}>{(price * pcs).toFixed(2)} €</Text>
                    </>
                  )}
            </View>
          </View>
          {orderReturnReason ? (
            <Text style={{ marginBottom: 5 }}>
              Grund für Rückgabe: {orderReturnReason}
            </Text>
          ) : null}
        </View>
        {!order ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(id)}
          >
            <Image
              source={require("../../assets/icons/009-close.png")}
              style={styles.deleteButtonImage}
              key={id + methodMoney + "deleteFromCartButton"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

class Cart extends Component {
  static navigationOptions = {
    title: "Warenkorb",
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          clearCart();
          NavigationService.back();
        }}
        style={{ height: "100%", justifyContent: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, marginRight: 18 }}>
          löschen
        </Text>
      </TouchableOpacity>
    ),
  };

  state = {
    products: [],
    originalProductsPrice: 0,
    orderVAT: 0,
    discountProductsPrice: 0,
    discountValue: 0,

    promocode: "",
    promocodeData: null,
    promocodeModalVisible: false,
    cartReceaved: false,
    modalVisible: false,

    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true });
    if (!this.state.cartReceaved) {
      this.init();
    }
  }

  async componentWillReceiveProps(props) {
    this.setState({ loading: true });
    if (this.state.cartReceaved == true) {
      await this.initAfterUpdate(props.cart);
    }
  }

  init() {
    const cart = this.props.cart;
    // console.log('init() => cart:', cart);
    // console.log('init() => this.state.products:', this.state.products);
    if (cart.length > 0 && !this.state.cartReceaved) {
      this.setState({ cartReceaved: true });
    }
    cart.map(({ id, count, bonus, selected }) => {
      getPreviewAsyncProductData(id).then((res) =>
        this.setState({
          products: [
            ...this.state.products,
            { ...res, id, count, methodMoney: selected, bonus },
          ],
          loading: false,
        })
      );
    });
  }

  initAfterUpdate(cart) {
    // console.log('initAfterUpdate() => cart:', cart);
    // console.log('initAfterUpdate() => this.state.products:', this.state.products);
    this.setState({ products: [] });
    cart.map(({ id, count, bonus, selected }) => {
      getPreviewAsyncProductData(id).then((res) =>
        this.setState({
          products: [
            ...this.state.products,
            { ...res, id, count, methodMoney: selected, bonus },
          ],
          loading: false,
        })
      );
    });
  }

  addToCartAndState(id, bonus, methodMoney) {
    addToCart(id, bonus, methodMoney, this.props.userInfo.points);
  }

  minusFromCartAndState(id, bonus, selected) {
    minusFromCart(id, bonus, selected);
  }

  deleteFromCartAndState(id, bonus, selected) {
    deleteFromCart(id, bonus, selected);
  }

  getProductsCards() {
    return this.state.products.map(
      ({
        id,
        previewImgURL,
        productName,
        price,
        companyPrice,
        stock,
        bonus,
        count,
        methodMoney,
      }) => {
        return (
          <CartItem
            key={id + methodMoney}
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
            onAdd={(id) =>
              this.addToCartAndState(id, bonus, methodMoney, count)
            }
            onMinus={(id) =>
              this.minusFromCartAndState(id, bonus, methodMoney, count)
            }
            onDelete={(id) =>
              this.deleteFromCartAndState(id, bonus, methodMoney)
            }
          />
        );
      }
    );
  }

  isEmpty() {
    if (this.props.cart.length < 1) {
      return true;
    }
    return false;
  }

  getDiscount(price) {
    if (this.state.promocodeData !== null) {
      const { percental, minimumcharge, value } = this.state.promocodeData;
      if (minimumcharge > price) {
        alert(
          "Der Gutscheincode kann nicht eingelöst werden, weil Ihr Warenkorb-Wert nicht ausreichend ist."
        );
        this.setState({
          promocode: "",
          promocodeData: null,
          promocodeValue: 0,
          discountValue: 0,
        });
        return price;
      }
      if (percental) {
        return price - (price / 100) * value;
      }
      return price - value;
    } else {
      price = 0;
    }
    return price;
  }

  setPrices() {
    const products = this.state.products.filter(
      (p) => p.methodMoney === "buyOfMoney"
    );

    let originalProductsPrice =
      this.props.userInfo.selectedUserType === "EK"
        ? products.reduce((sum, { price, count }) => {
          return sum + price * count;
        }, 0)
        : products.reduce((sum, { companyPrice, count, tax }) => {
          return sum + (companyPrice + (companyPrice / 100 * tax) ) * count;
        }, 0);

    //------------------------------------------------------------------------------------------------------------------------------
    let orderVAT = 0;
    products.map((p) => {
      orderVAT +=
        (p.tax / 100) *
        (this.props.userInfo.selectedUserType === "H"
          ? p.companyPrice
          : p.price * p.count);
    });
    //------------------------------------------------------------------------------------------------------------------------------

    let discountProductsPrice = this.getDiscount(originalProductsPrice);

    if (
      originalProductsPrice !== this.state.originalProductsPrice ||
      discountProductsPrice !== this.state.discountProductsPrice
    ) {
      // this.props.userInfo.selectedUserType === "H"
      //   ? this.setState({
      //     originalProductsPrice: originalProductsPrice + orderVAT,
      //     discountProductsPrice: discountProductsPrice,
      //     discountValue: (  originalProductsPrice + orderVAT) - discountProductsPrice,
      //     orderVAT: orderVAT,
      //   })
      //   :
         this.setState({
          originalProductsPrice: originalProductsPrice,
          discountProductsPrice: discountProductsPrice,
          discountValue: originalProductsPrice - discountProductsPrice,
          orderVAT: orderVAT,
        });
    }
  }

  handlePromocodeSubmit() {
    if (this.state.promocode.length < 1) {
      return alert("Bitte geben Sie den Gutscheincode ein.");
    }
    getPromocodeData(this.state.promocode).then((promocodeData) => {
      if (promocodeData.status.code === "success") {
        this.setState({ promocodeData });
      }
      Toast.show(promocodeData.status.text, {
        shadow: false,
        backgroundColor: "#505050",
        duration: 1500,
      });
    });
  }

  getDiscountBlock() {
    if (this.state.promocodeData && this.state.discountValue) {
      return (
        <View style={styles.line}>
          <Text style={styles.summaryText}>
            {this.state.promocodeData.description}:
          </Text>
          <Text style={styles.summaryText}>
            -{this.state.discountValue.toFixed(2)} €
          </Text>
        </View>
      );
    }
  }

  render() {
    console.log("this.state.loading +================> :", this.state.loading);
    const shadowOpt = {
      width: sWidth,
      height: 50,
      color: "#000",
      border: 6,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 0,
    };
    if (this.isEmpty()) {
      return (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={require("../../assets/message-icons/cart-empty.png")}
          />
          <Text style={styles.emptyCartText}>Ihr Warenkorb ist leer</Text>
        </View>
      );
    }
    // else if (this.state.products.length !== this.props.cart.length) {
    else if (this.state.loading) {
      return <Loading />;
    }

    this.setPrices();
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ProgressBar step={"cart"} />
          <View style={{ marginHorizontal: 18, marginTop: 22 }}>
            {this.getProductsCards()}

            <IPlantTreeItem cartSum={this.state.discountValue} />

            <TouchableOpacity
              style={styles.promocodeButton}
              onPress={() =>
                this.setState({
                  promocodeModalVisible: !this.state.promocodeModalVisible,
                })
              }
            >
              <Text style={styles.promocodeButtonText}>
                Promo-Code eingeben
              </Text>
            </TouchableOpacity>

            {this.getDiscountBlock()}

            <View style={styles.line}>
              <Text style={styles.summaryText}>Summe:</Text>
              <Text style={styles.summaryText}>
                {/* {
                  this.props.userInfo.selectedUserType === "H"
                    ? (this.state.originalProductsPrice + this.state.orderVAT).toFixed(2)
                    : this.state.originalProductsPrice.toFixed(2)
                } € */}
                {this.state.originalProductsPrice.toFixed(2)} €
              </Text>
            </View>

            <View style={styles.line}>
              <Text style={styles.summaryText}>Gesamtsumme ohne MwSt.:</Text>
              <Text style={styles.summaryText}>
                {/* {this.state.orderVAT.toFixed(2)} € */}

                {(
                  this.state.originalProductsPrice - this.state.orderVAT
                ).toFixed(2)}{" "}
                €
              </Text>
            </View>

            <View style={styles.line}>
              <Text style={styles.summaryText}>zzgl. MwSt.:</Text>
              <Text style={styles.summaryText}>
                {/* {
                  this.props.userInfo.selectedUserType === "H"
                    ? this.state.originalProductsPrice.toFixed(2)
                    : (this.state.originalProductsPrice - this.state.orderVAT).toFixed(2)

                } € */}



                {this.state.orderVAT.toFixed(2)} €
              </Text>
            </View>
          </View>
        </ScrollView>

        <BoxShadow setting={shadowOpt}>
          <View style={styles.footerSummaryContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.summaryTextBold}>Zwischensumme:</Text>
              <Text style={styles.summaryTextBold}>
                {this.state.discountValue.toFixed(2)} €
              </Text>
            </View>
          </View>
        </BoxShadow>

        <FooterButton
          text={"Weiter"}
          onPress={() => {
            if (!this.props.userID || this.props.userID === "notloggedin") {
              NavigationService.navigate("Login", { routeName: "Cart" });
            } else {
              NavigationService.navigate("DeliveryService", {
                data: this.state,
                userInfo: this.props.userInfo,
              });
            }
          }}
        />

        <ModalView
          title="Promo-Code"
          buttonText="Code einlösen"
          onSubmit={() => {
            this.setState({
              promocodeModalVisible: !this.state.promocodeModalVisible,
            });
            this.handlePromocodeSubmit();
          }}
          visible={this.state.promocodeModalVisible}
          onRequestClose={() => {
            this.setState({
              promocodeModalVisible: !this.state.promocodeModalVisible,
            });
          }}
        >
          <Input
            placeholder="Promo-Code eingeben"
            value={this.state.promocode}
            onChangeText={(promocode) => this.setState({ promocode })}
          />
        </ModalView>
      </View>
    );
  }
}

const mapStateToProps = ({ userInfo, userID, cart }) => ({
  userInfo,
  userID,
  cart,
});
export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartImage: { height: 80, width: 80, resizeMode: "contain" },
  emptyCartText: { marginTop: 10, color: "#717171", fontSize: 16 },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 19,
  },
  linePoint: { flexDirection: "row" },
  summaryTextBold: {
    color: "#040404",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  summaryText: {
    color: "#040404",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  summaryTextPoint: { color: "#8a0010", fontSize: 16 },
  summaryTextPointRed: { color: "#e74c3c", fontSize: 16 },
  summaryTextPointGreen: { color: "#2ecc71", fontSize: 16 },
  radiusCircle: {
    left: 5,
    width: 100 / 4,
    height: 100 / 4,
    borderRadius: 150 / 2,
    backgroundColor: "#d10019",
    color: "#040404",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  cartItemContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 14,
    borderRadius: 5,
  },
  cartItemImage: { margin: 10, height: 90, width: 80, resizeMode: "contain" },
  cartItemName: {
    fontSize: 10,
    color: "#040404",
    lineHeight: 16,
    width: "80%",
    marginTop: 10,
  },
  cartItemInStock: { fontSize: 10, color: "#3f911b" },
  cartItemNotInStock: { fontSize: 10, color: "#d10019" },
  deleteButton: { position: "absolute", top: 0, right: 0 },
  deleteButtonImage: {
    margin: 12,
    width: 13,
    height: 13,
    resizeMode: "contain",
  },
  minusPlusButton: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  minusPlusButtonImage: { width: 18, height: 18, resizeMode: "contain" },
  countText: { fontSize: 12, color: "#000", marginHorizontal: 12 },
  pricePerProduct: { fontSize: 12, color: "#a0a0a0", marginBottom: 6 },
  price: { fontSize: 16, color: "#040404" },
  promocodeButton: {
    borderRadius: 5,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 0.3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  promocodeButtonText: { fontSize: 16, color: "#030303" },
  footerSummaryContainer: {
    height: 50,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
