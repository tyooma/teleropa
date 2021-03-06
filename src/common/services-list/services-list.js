import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux'

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service';


const TeleropaService = ({ text, image, title, userInfo, services, checkURL }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.navigate('ProductsByPoint', { name: text, title: title, services: services, userInfo: userInfo, checkURL: checkURL })}>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title} >{title}</Text>
            </View>

            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>

                <View style={{ paddingLeft: 5, overflow: 'hidden', borderTopLeftRadius: 5, borderTopRightRadius: 5, flex: 5, alignContent: 'flex-start', alignContent: 'flex-start' }}>
                    <ImageLoader source={image} style={styles.image} key={image} />
                </View>
                <View style={{ flex: 6, flexDirection: 'column' }}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.name} numberOfLines={5}>{text}</Text>
                    </View>
                </View>
            </View>


        </TouchableOpacity>

    )
};

const mapStateToProps = (state) => {
    return {
        bonusProducts: state.mainPage.services,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(TeleropaService)

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
    },
    title: {
        color: '#d10019',
        height: 16,
    },
    image: {
        height: 135,
        resizeMode: 'contain',
        paddingHorizontal: 5,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'center',
    },

    name: {
        marginTop: 12,
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Poppins-Medium',
        color: '#040404',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
    }
}
