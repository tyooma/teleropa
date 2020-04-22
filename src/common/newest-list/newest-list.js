import React, { Component } from 'react';

import { Text, TouchableOpacity, Image, View } from 'react-native';

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service';

import { getPreviewAsyncProductData } from '../../gets/productPosts';

import { connect } from 'react-redux';



const NewestListItem = ({ id, text, image, price, companyPrice, userInfo }) => {
    const showingPrice = userInfo.selectedUserType === 'EK' ? price : companyPrice;

    let pricefixed = parseFloat(showingPrice).toFixed(2)
    let formattedprice = pricefixed.toString().replace('.', ',');


    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.push('Product', { id: id, name: text, images: image, price: formattedprice, companyPrice: companyPrice })}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ overflow: 'hidden', borderTopLeftRadius: 5, borderTopRightRadius: 5, flex: 5, alignContent: 'flex-start', alignContent: 'flex-start' }}>
                    <ImageLoader source={image} style={styles.image} key={image} />
                </View>

                <View style={{ flex: 6, flexDirection: 'column' }}>
                    <View>
                        <Text style={styles.name} numberOfLines={3}
                        >{text}</Text>
                    </View>
                    <View>
                        <Text style={styles.salePrice}>{formattedprice} €</Text>
                        {/* <Text>{getPrice()}</Text> */}
                        {/* <ProductListItem
                // imageURL, name, price, salePrice, favourite, id, stock, rate, salePercent, userID, deleteAction, companyPrice, ...props
                imageURL={{uri: image}}
                name={text}
                price={price}
                companyPrice={companyPrice}
                salePrice={salePrice}
                prevPrice={}
                ></ProductListItem> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const width = sWidth < 600 ? (sWidth - 54) : (sWidth - 72) / 3
// const width = sWidth < 600 ? (sWidth - 54) / 2 : (sWidth - 72) / 3
const styles = {
    container: {
        flex: 2,
        width: width,
        height: 146,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginRight: 2,
        marginLeft: 18,
        marginTop: 8,
        fontFamily: 'Poppins-ExtraBoldItalic',
        // marginBottom: 2,
    },
    image: {

        width: width / 2,
        height: 140,
        resizeMode: 'contain',
    },
    name: {
        marginTop: 12,
        height: 90,
        // lineHeight: 18,
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Poppins-Medium',
        color: '#040404',
        paddingHorizontal: 8,
    },
    salePrice: {
        padding: 0,
        fontSize: 20,
        fontWeight: '800',
        fontStyle: 'italic',
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1, width: -1, height: -1, width: 1, height: 1 },
        // textShadowOffset: {width: -2, height: -2},
        // textShadowOffset: {width: 2, height: -2},
        // textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 15,
        color: '#000',
        // color: '#d10019',
        textAlign: 'center',
        // justifyContent: 'center'
        paddingHorizontal: 8,
    }
}

const mapStateToProps = ({ userID, userInfo }) => ({ userID, userInfo })
export default connect(mapStateToProps)(NewestListItem)
