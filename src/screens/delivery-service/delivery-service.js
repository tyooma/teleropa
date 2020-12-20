import React, { Component } from "react";

import { Alert, ScrollView, Text, View } from "react-native";

import FooterButton from "../../common/footer-button";

import DeliveryOption from "../../common/delivery-option";

import { BoxShadow } from "react-native-shadow";

import { sWidth } from "../../helpers/screenSize";

import Loading from "../loading";

import { getDeliverySuppliers } from "../../gets/ordersPosts";

import { getPreviewAsyncProductData } from "../../gets/productPosts";

import NavigationService from "../../navigation-service";

import ProgressBar from "../progress-bar";

const unit = "<DeliveryService>";

export default class DeliveryService extends Component {
  static navigationOptions = { title: "Versandart wählen" };

  constructor(props) {
    super(props);
    this.SelectionChange = this.SelectionChange.bind(this);
  }

  state = {
    productsPrice: 0,
    deliveryPrice: 0,
    selected: null,
    name: null,
    data: this.props.navigation.getParam("data"),
    services: [],
    loaded: false,
  };

  isSelected(id) {
    return id === this.state.selected;
  }

  componentWillMount() {
    var ProductID = this.props.navigation.getParam("id", null);
    if (ProductID) {
      this.getProductBySofortKaufen(ProductID);
    } else {
      this.FuncgetDeliverySuppliers(this.state.data.discountValue);
    }
  }

  getProductBySofortKaufen(ProductID) {
    let userInfo = this.props.navigation.getParam("userInfo", null);

    getPreviewAsyncProductData(ProductID).then((res) => {
      res.id = ProductID;
      this.setState({ data: res });
      userInfo.selectedUserType === "EK"
        ? this.FuncgetDeliverySuppliers(res.price)
        : this.FuncgetDeliverySuppliers(res.companyPrice);
    });
  }

  FuncgetDeliverySuppliers(productsPrice) {
    getDeliverySuppliers()
      .then((services) => {
        let delivery = [];
        let tdelivery = null;
        services.map((service) => {
          tdelivery = service.costs
            .reverse()
            .find(({ from }) => productsPrice >= from);
          console.log("tdelivery ==> Delivery-service.js ==>", tdelivery);
          if (tdelivery !== undefined) {
            delivery.push(service);
          }
        });
        console.log(
          "productsPrice ==> Delivery-service.js ==>",
          productsPrice,
          "delivery ==>",
          delivery
        );
        this.setState({
          productsPrice: productsPrice,
          services: delivery,
          loaded: true,
        });
      })
      .catch((err) => {
        console.error("getDeliverySuppliers fetchEror:", err);
      });
  }

  DeliveryOptions() {
    console.log(
      "this.state.services ==> Delivery-service.js ==>",
      this.state.services
    );
    return this.state.services.map(
      ({ id, name, description, shippingFree, costs }) => (
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
      )
    );
  }

  SelectionChange(id, name, shippingFree, costs) {
    const price = costs.find(({ from }) => this.state.productsPrice >= from);
    const deliveryPrice = price.value;
    this.setState({ selected: id, name: name, deliveryPrice: deliveryPrice });
  }

  render() {
    console.log(unit, "RENDER => this.state:", this.state);
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

    if (!this.state.loaded) return <Loading />;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 18 }}>
          <ProgressBar step={"delivery"} />
          {this.DeliveryOptions()}
        </ScrollView>
        <BoxShadow setting={shadowOpt}>
          <View style={s.footerSummaryContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={s.summaryText}>Versandkosten:</Text>
              <Text style={s.summaryText}>
                {this.state.deliveryPrice.toFixed(2)} €
              </Text>
            </View>
          </View>
        </BoxShadow>
        <FooterButton
          text="Weiter"
          onPress={() =>
            this.state.selected
              ? NavigationService.navigate("CartPreview", {
                  userInfo: {
                    ...this.props.navigation.getParam("userInfo", null),
                  },
                  data: { ...this.props.navigation.getParam("data", null) },
                  SofortKaufen: { ...this.state.data },
                  deliveryData: { ...this.state },
                })
              : Alert.alert(
                  "Versandart wählen",
                  "",
                  [{ text: "Ja", onPress: () => null }],
                  { cancelable: false }
                )
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  summaryText: { color: "#040404", fontSize: 16 },
};
