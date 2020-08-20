import React from 'react'

import NavigationService from '../../navigation-service';

import { Image, Text, TouchableOpacity } from 'react-native';

export default function FilterButton({ minPrice, maxPrice, fromPrice, toPrice, sortBy, screenBack }) {
    // console.log("minPrice in Filter-button", minPrice, " maxPrice", maxPrice, " fromPrice,", fromPrice, " toPrice", toPrice, "sortBy", sortBy, " screenBack", screenBack)
    return (
        // <TouchableOpacity style={screenBack != 'Search' ? styles.filterButton : styles.filterButton1} onPress={() => NavigationService.navigate('Filter', { minPrice, maxPrice, fromPrice, toPrice, sortBy, screenBack })} >
        <TouchableOpacity style={styles.filterButton} onPress={() => NavigationService.navigate('Filter', { minPrice, maxPrice, fromPrice, toPrice, sortBy, screenBack })} >
            <Image source={require('../../assets/icons-color/018-filter2.png')} style={styles.filterImage} key={'filterImage'} />
            <Text style={styles.filterText} >
                Filter
        </Text>
        </TouchableOpacity>
    )
}

const styles = {
    filterButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // marginTop: 10,
    },
    filterButton1: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    filterText: {
        fontSize: 16,
        color: '#050505',
        marginLeft: 10
    },
    filterImage: {
        resizeMode: 'contain',
        width: 17,
        height: 17
    }
}