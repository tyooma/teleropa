import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';
// import { getPrice } from '../product-list-item'
import NavigationService from '../../navigation-service';
import { getPreviewAsyncProductData } from '../../gets/productPosts';
import { connect } from 'react-redux'

// getPrice = (price, companyPrice) => {
//     const showingPrice = props.userInfo.selectedUserType === 'EK' ? price : companyPrice
//     return (
//         <>
//             <Text style={styles.prevPrice}>
//                 <Text style={{ fontSize: 10 }}></Text>
//             </Text>

//             <Text style={styles.price}>
//                 {showingPrice}<Text style={{ fontSize: 16 }}>€</Text>
//             </Text>
//         </>
//     )
// }
const OffersListItem = ({ id, text, image, price, companyPrice, salePrice }) => {
    let re = /(?=\B(?:\d{3})+(?!\d))/g;
    
    let salepricenumber = parseFloat(salePrice);
    let formattedsaleprice = salepricenumber.toFixed(2).toString().replace('.', ',');
    
    let pricefixed = price.toFixed(2)
    let formattedprice = pricefixed.toString().replace('.', ',');
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.push('Product', { id: id, name: text, images: image, price: price, companyPrice: companyPrice, salePrice: formattedsaleprice })}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ overflow: 'hidden', borderTopLeftRadius: 5, borderTopRightRadius: 5, flex: 5, alignContent: 'flex-start', alignContent: 'flex-start' }}>
                    <ImageLoader source={image} style={styles.image} key={image} />
                </View>

                <View style={{ flex: 6, flexDirection: 'column' }}>
                    <View>
                        <Text style={styles.name} numberOfLines={3}
                        //  ellipsizeMode='middle'
                        >{text}</Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={styles.pseudoPrice}>uvp <Text style={[styles.pseudoPrice, { textDecorationLine: 'line-through' }]}>{formattedsaleprice} €</Text></Text>
                        <Text style={styles.salePrice}>{formattedprice} €</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const width = sWidth < 600 ? (sWidth - 54) : (sWidth - 72) / 3
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
        height: 75,
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
        lineHeight: 20,
        paddingHorizontal: 8,
    },
    pseudoPrice: {
        fontSize: 13,
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
        // paddingHorizontal: 8,
    }
}

// const mapStateToProps = ({ userID, userInfo }) => (
//     { userID, userInfo }
// )

// export default connect(mapStateToProps)(ProductDescription)(NewestListItem)
// export default connect(mapStateToProps)(NewestListItem)
export default OffersListItem;
