import AsyncStorage from "@react-native-community/async-storage";

import Toast from "react-native-root-toast";

import { store } from "../app/app";

import { setCart } from "../actions/cart-actions";

import product from "../screens/product/product";

export async function getCart() {
    return await AsyncStorage.getItem("Cart");
}

export async function addToCart(id, bonus, selected, userPoints) {
    if (selected.length == 0) {
        return selected = 'buyOfMoney'
    }
    console.log("ID in addToCart", id)
    console.log("bonus in addToCart ", bonus)
    console.log("selected in addToCart:", selected)

    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            if (!res) {
                AsyncStorage.setItem("Cart", JSON.stringify([]));
                addToCart(id, selected);
            } else {
                const cart = JSON.parse(res);
                const productInCart = cart.find((product) => id === product.id);
                if (productInCart) {
                    const productBuyMethodCart = cart.find((product) => selected === product.selected);
                    if (productBuyMethodCart) {
                        var oddMoney = parseFloat(userPoints) - parseFloat(bonus) * parseFloat(productBuyMethodCart.count);
                        console.log("productBuyMethodCart.selected ", productBuyMethodCart.selected)

                        console.log("productBuyMethodCart.id ", productBuyMethodCart.id)

                        console.log("ШВ ШВ ИД  ", id)
                        console.log("ШparseFloat(oddMoney) parseFloat(oddMoney)  ", oddMoney)
                        console.log("arseFloat(bonus) arseFloat(bonus)  ", bonus)

                        console.log("productBuyMethodCart.selected ", productBuyMethodCart.selected)


                        if (productBuyMethodCart.selected == "buyOfPoints" && productBuyMethodCart.id == id && parseFloat(oddMoney) >= parseFloat(bonus)) {
                            productBuyMethodCart.count++;
                            const newCart = cart.map((product) => {
                                if (product.id === id && product.selected === selected) {
                                    return productBuyMethodCart;
                                }
                                return product;
                            });
                            // store.dispatch(setCart(newCart));
                            // AsyncStorage.setItem("Cart", JSON.stringify(newCart));
                            console.log("Увеличили КАУНТ ДЛя поинта если есть ПОинты", newCart)
                            Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        } else if (productBuyMethodCart.selected == "buyOfMoney" && productBuyMethodCart.id == id) {
                            productBuyMethodCart.count++;
                            const newCart = cart.map((product) => {
                                if (product.id === id && product.selected === selected) {
                                    console.log("Увеличили productBuyMethodCartКАУНТ ДЛя Денег", productBuyMethodCart)
                                    return productBuyMethodCart;
                                }
                                return product;
                            });
                            store.dispatch(setCart(newCart));
                            AsyncStorage.setItem("Cart", JSON.stringify(newCart));
                            console.log("Увеличили КАУНТ ДЛя Денег", newCart)
                            Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        } else {
                            Toast.show("Не хватает очков ДЕТКА", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        }

                    } else {

                        const newProduct = { id, count: 1, bonus, selected };
                        cart.push(newProduct);
                        // store.dispatch(setCart(cart));
                        // AsyncStorage.setItem("Cart", JSON.stringify(cart));

                        Toast.show("Artikel wurde in den Warenkorb gelegt", {
                            shadow: false,
                            backgroundColor: "#505050",
                            duration: 1500, //время которое будет отображаться тост при добавлении товара в корзину
                        });
                    }
                }
                else {
                    if (cart.length != 0) {
                        var CheckMoney = cart.filter(noMoney => noMoney.selected == "buyOfMoney")
                        var CheckPoint = cart.filter(noPoint => noPoint.selected == "buyOfPoints")
                        cart.map((x) => {
                            if (x.selected == "buyOfPoints" && x.selected == selected) {
                                if (CheckPoint.length < 1) {
                                    const newProduct = { id, count: 1, bonus, selected };
                                    cart.push(newProduct);
                                    store.dispatch(setCart(cart));
                                    AsyncStorage.setItem("Cart", JSON.stringify(cart));

                                    console.log("Добавили Для поинтов если Меньше 1")
                                    Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                        shadow: false,
                                        backgroundColor: "#505050",
                                        duration: 1500,
                                    });
                                } else {
                                    Toast.show("Nicht mehr als ein Gegenstand pro Punkt", {
                                        shadow: false,
                                        backgroundColor: "#505050",
                                        duration: 1500,
                                    })

                                }
                            }
                            else if (x.selected == "buyOfMoney" && x.selected == selected) {
                                if (CheckMoney.length < 3) {
                                    const newProduct = { id, count: 1, bonus, selected };
                                    cart.push(newProduct);
                                    store.dispatch(setCart(cart));
                                    AsyncStorage.setItem("Cart", JSON.stringify(cart));

                                    console.log("Создали для денег если их меньше 3")
                                    Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                        shadow: false,
                                        backgroundColor: "#505050",
                                        duration: 1500,
                                    });
                                } else {
                                    Toast.show("Nicht mehr als 3 Artikel pro €", {
                                        shadow: false,
                                        backgroundColor: "#505050",
                                        duration: 1500,
                                    });
                                }
                            }

                        })
                    }
                    else {
                        const newProduct = { id, count: 1, bonus, selected };
                        cart.push(newProduct);
                        store.dispatch(setCart(cart));
                        AsyncStorage.setItem("Cart", JSON.stringify(cart));

                        console.log("Просто Создали новый карточку")
                        Toast.show("Artikel wurde in den Warenkorb gelegt", {
                            shadow: false,
                            backgroundColor: "#505050",
                            duration: 1500,
                        });
                    }
                }
            }
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function minusFromCart(id, bonus, selected) {
    console.log("id id id", id)
    console.log("bonus bonus bonus ", bonus)
    console.log("selected selected selected", selected)
    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            const cart = JSON.parse(res);
            const productInCart = cart.find((product) => id === product.id && selected == product.selected);
            if (productInCart.count === 1) {
                deleteFromCart(id, bonus, selected);
            } else {
                productInCart.count--;
                const newCart = cart.map((product) => {
                    if (product.id === id && product.selected === selected) {
                        return productInCart;
                    }
                    return product;
                });
                store.dispatch(setCart(newCart));
                AsyncStorage.setItem("Cart", JSON.stringify(newCart));
            }
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function deleteFromCart(id, bonus, selected) {
    console.log("id", id);
    console.log("selected", selected);
    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            const cart = JSON.parse(res);
            const productInCart = cart.find((product) => id === product.id);
            if (productInCart) {

            }



            //  const newCart = cart.filter((product) => product.id == !id);

            //store.dispatch(setCart(newCart));
            //AsyncStorage.setItem("Cart", JSON.stringify(newCart));
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function clearCart() {
    store.dispatch(setCart([]));
    await AsyncStorage.setItem("Cart", JSON.stringify([]));
}
