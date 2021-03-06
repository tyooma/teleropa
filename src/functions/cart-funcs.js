import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-root-toast";
import { store } from "../app/app";
import { setCart } from "../actions/cart-actions";
import product from "../screens/product/product";
import Cart from "../screens/cart";


export async function getCart() {
    return await AsyncStorage.getItem("Cart");
}

// фунция для додавання карточки в редукс 
export async function addToCart(id, bonus, selected, userPoints) {
    //перевірка чи приходить вибраний метод, якщо ні, то робимо його за Гроші    

    console.log("id ======>",id,"bonus ======>", bonus,"selected ======>", selected, "userPoints ======>", userPoints);

    if (selected.length == 0) {
        return selected = 'buyOfMoney'
    }

    try {
        //Беремо карточку з редуксу
        await AsyncStorage.getItem("Cart", (err, res) => {
            if (!res) {
                //ящко рес повертає нам пусте  то кладемо карточку та викликаємо метод додавання карточки 
                AsyncStorage.setItem("Cart", JSON.stringify([]));                
                addToCart(id, bonus, selected, userPoints);
            } else {
                // Парсим Джсон та записуємо до карточки
                const cart = JSON.parse(res);                
                const productInCart = cart.find((product) => id === product.id);
                if (productInCart) {
                    const productBuyMethodCart = cart.find((product) => id === product.id && selected === product.selected);
                    console.log("productBuyMethodCart для поинтов  productBuyMethodCart.count++ ", productBuyMethodCart)
                    if (productBuyMethodCart) {
                        var oddMoney = parseFloat(userPoints) - parseFloat(bonus) * parseFloat(productBuyMethodCart.count);
                        console.log("oddMoney  для поинтов productBuyMethodCart.count++ ", oddMoney)
                        if (productBuyMethodCart.selected == "buyOfPoints" && productBuyMethodCart.id == id && parseFloat(oddMoney) >= parseFloat(bonus)) {
                            console.log("Если у нас за Поинты и ид==ид а так все ок")
                            productBuyMethodCart.count++;
                            const newCart = cart.map((product) => {
                                if (product.id === id && product.selected === selected) {
                                    return productBuyMethodCart;
                                }
                                return product;
                            });
                            console.log("newCart   для поинтов  productBuyMethodCart.count++;", newCart)
                            store.dispatch(setCart(newCart));
                            AsyncStorage.setItem("Cart", JSON.stringify(newCart));
                            Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        } else if (productBuyMethodCart.selected == "buyOfMoney" && productBuyMethodCart.id == id) {
                            console.log("newCart   для за БАБКИ  productBuyMethodCart.count++;")
                            productBuyMethodCart.count++;
                            const newCart = cart.map((product) => {
                                if (product.id === id && product.selected === selected) {
                                    // console.log("Увеличили productBuyMethodCartКАУНТ ДЛя Денег", productBuyMethodCart)
                                    return productBuyMethodCart;
                                }
                                return product;
                            });
                            console.log("newCart   для Бабок  productBuyMethodCart.count++;", newCart)
                            store.dispatch(setCart(newCart));
                            AsyncStorage.setItem("Cart", JSON.stringify(newCart));
                            Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        } else {
                            Toast.show("Nicht genügend TELEPOINTS", {
                                shadow: false,
                                backgroundColor: "#505050",
                                duration: 1500,
                            })
                        }

                    } else {
                        console.log("ЕЛСЕ ХЗ")
                        const newProduct = { id, count: 1, bonus, selected };
                        console.log("ЕЛСЕ ХЗ newProduct", newProduct)
                        cart.push(newProduct);
                        store.dispatch(setCart(cart));
                        AsyncStorage.setItem("Cart", JSON.stringify(cart));
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
                        console.log("CheckMoney", CheckMoney)
                        console.log("CheckPoint", CheckPoint)
                        if (selected == "buyOfPoints") {
                            console.log(" выбрали за ОЧКИ другой товар");
                            if (CheckPoint.length < 1) {
                                const newProduct = { id, count: 1, bonus, selected };
                                cart.push(newProduct);
                                store.dispatch(setCart(cart));
                                AsyncStorage.setItem("Cart", JSON.stringify(cart));

                                Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                    shadow: false,
                                    backgroundColor: "#505050",
                                    duration: 1500,
                                });
                            } else {
                                Toast.show("Nicht mehr als ein Gegenstand pro TELEPOINTS", {
                                    shadow: false,
                                    backgroundColor: "#505050",
                                    duration: 1500,
                                })

                            }
                        } else if (selected == "buyOfMoney") {
                            // if (CheckMoney.length > 2) {
                            //     Toast.show("Nicht mehr als 3 Artikel pro €", {
                            //         shadow: false,
                            //         backgroundColor: "#505050",
                            //         duration: 1500,
                            //     });
                            // } else {
                                const newProduct = { id, count: 1, bonus, selected };
                                console.log("Добавление за бабосики и когда меньше 3 товаров", newProduct)
                                cart.push(newProduct);
                                store.dispatch(setCart(cart));
                                AsyncStorage.setItem("Cart", JSON.stringify(cart));

                                Toast.show("Artikel wurde in den Warenkorb gelegt", {
                                    shadow: false,
                                    backgroundColor: "#505050",
                                    duration: 1500,
                                });
                            // }
                        }
                    }
                    else {
                        const newProduct = { id, count: 1, bonus, selected };
                        console.log("ELSE  else newProduct newProduct newProduct ", newProduct)
                        cart.push(newProduct);
                        store.dispatch(setCart(cart));
                        AsyncStorage.setItem("Cart", JSON.stringify(cart));

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
    try {
        await AsyncStorage.getItem("Cart", (err, res) => {
            const cart = JSON.parse(res);
            const productBuyMethodCart = cart.find((product) => id === product.id && selected === product.selected);
            // console.log("Знаходимо на що натиснули productBuyMethodCart ", productBuyMethodCart)
            if (productBuyMethodCart.selected == "buyOfPoints" && productBuyMethodCart.id == id) {
                //Якщо натиснули олату за Поінти, то залишаемо тільки за гроші
                const newCart = cart.filter((product) => product.selected != selected);
                // console.log("Оплата за поинти, залишили оплату за Гроші", newCart);
                store.dispatch(setCart(newCart));
                AsyncStorage.setItem("Cart", JSON.stringify(newCart));

            }
            else if (productBuyMethodCart.selected == "buyOfMoney") {
                //Якщо натиснули олату за гроші та Ид співпадають, то залишаемо тільки за гроші                       
                var newCart = [];
                cart.map((product) => {
                    if (product.id == id && product.selected != 'buyOfMoney') {
                        newCart.push(product)

                    } else if (product.id != id) {
                        newCart.push(product)
                    }
                })
                store.dispatch(setCart(newCart));
                AsyncStorage.setItem("Cart", JSON.stringify(newCart));
            }
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function clearCart() {
    store.dispatch(setCart([]));
    await AsyncStorage.setItem("Cart", JSON.stringify([]));
}

//----------------------------------------------------------------------

export async function DeleteFromCartByID(productID) {
    try {
        // с Редукса забираємо те, що нам потрібно
        await AsyncStorage.getItem("Cart", (err, res) => {
            /* парсимо його */
            const cart = JSON.parse(res);
            // находимо всіх продуктів не з таким ід котрий ми передали
            const newCart = cart.filter((product) => product.id !== productID);
            // перезаписуємо редукс
            store.dispatch(setCart(newCart));
            // для редукса новий массив записуємо
            AsyncStorage.setItem("Cart", JSON.stringify(newCart));
            console.log('<DeleteFromCartByID> Success Delete by ID:', productID);
        });
    } catch (e) {
        console.log('<DeleteFromCartByID> Try-Catch Error:', err);
    }
}

export function ClearCartByProducts(produfcts, methodMoney) {
    products.map((product) => {
        deleteFromCart(product.id, methodMoney);
    });
}

export function fixPrice(vprice, fixed) {
    let price = vprice;
    switch (typeof price) {
        case 'string':
            price = price.replace(',', '.');
            // price = price.replace(/\s/g, '');
            price = parseFloat(price);
            break;
        case 'number':
            if (typeof fixed !== 'undefined' && fixed >= 0) {
                price = parseFloat(price.toFixed(fixed));
            }
            break;
        default:
            typeof price;
    }
    // console.log("------------------------------------------------------------------------------------------------------------------------------")
    // console.log("fixPrice ==> vprice ==>", price)
    return price;
}

export function getPurchasePoints(products) {
    // p = [{id:1, methodMoney:'buyOfPoints', bonus:'50'},
    //      {id:3, methodMoney:'buyOfPoints', bonus:'150'},
    //      {id:3, methodMoney:'buyOfMoney', bonus:''},
    //      {id:4, methodMoney:'buyOfMoney', bonus:'300'}];
    return products.filter(p => p.methodMoney === 'buyOfPoints').reduce((sum, { bonus, count }) => {
        return sum + parseFloat(bonus) * count
    }, 0);
}
