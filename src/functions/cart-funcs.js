import AsyncStorage from "@react-native-community/async-storage";

import Toast from "react-native-root-toast";

import { store } from "../app/app";

import { setCart } from "../actions/cart-actions";

export async function getCart() {
    return await AsyncStorage.getItem("Cart");
}

export async function addToCart(id, bonus, selected) {
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
                        productBuyMethodCart.count++;
                        const newCart = cart.map((product) => {
                            if (product.id === id && product.selected === selected) {
                                return productBuyMethodCart;
                            }
                            return product;
                        });
                        store.dispatch(setCart(newCart));
                        AsyncStorage.setItem("Cart", JSON.stringify(newCart));
                    } else {
                        const newProduct = { id, count: 1, selected };
                        cart.push(newProduct);
                        store.dispatch(setCart(cart));
                        AsyncStorage.setItem("Cart", JSON.stringify(cart));
                    }
                } else {
                    const newProduct = { id, count: 1, bonus, selected };
                    cart.push(newProduct);
                    store.dispatch(setCart(cart));
                    AsyncStorage.setItem("Cart", JSON.stringify(cart));
                }

                Toast.show("Artikel wurde in den Warenkorb gelegt", {
                    shadow: false,
                    backgroundColor: "#505050",
                    duration: 1500, //время которое будет отображаться тост при добавлении товара в корзину
                });
            }
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function minusFromCart(id, selected) {
    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            const cart = JSON.parse(res);
            const productInCart = cart.find((product) => id === product.id); //searching item in cart
            if (productInCart.count === 1) {
                console.log("ID ID ID ID productInCart.coun", id);
                deleteFromCart(id);
            } else {
                productInCart.count--;
                const newCart = cart.map((product) => {
                    if (product.id === id) {
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

export async function deleteFromCart(id) {
    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            const cart = JSON.parse(res);
            const newCart = cart.filter((product) =>
                console.log("product.id !== id", product)
            );
            store.dispatch(setCart(newCart));
            AsyncStorage.setItem("Cart", JSON.stringify(newCart));
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function clearCart() {
    store.dispatch(setCart([]));
    await AsyncStorage.setItem("Cart", JSON.stringify([]));
}
