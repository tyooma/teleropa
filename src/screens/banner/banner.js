import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import Loading from '../loading'

import HTML from 'react-native-render-html';


import { getBannerImage } from '../../gets/mainPagePosts'

export default class Banner extends Component {

    state = {
        content: '',
        loaded: false
    }

    componentDidMount() {
        getBannerImage()
        // .then(res => {
        //     this.setState({ loaded: true, content: res.cmsStatic.content })
        // })
    }

    render() {
        if (!this.state.loaded) return <Loading />

        return (
            <ScrollView>
                <HTML html={this.state.content} style={styles.content} />
            </ScrollView>
        )
    }
}

const styles = {
    content: {
        margin: 18,
        width:400, height: 200
    }
}

  // import React, { Component } from 'react';
// import { View, Text, ScrollView, FlatList } from 'react-native';

// import Loading from '../loading'

// import { connect } from 'react-redux';

// import { getBrandsList } from '../../gets/mainPagePosts';


// import {
//     SearchButton
// } from '../../common/header-buttons';

// import BrandListItem from '../../common/brand-list-item';

// class Brands extends Component {

//     getBrands() {
//         const brands = this.props.brands.filter((val) => {
//             if (val.imgURL && val.supplierID) {
//                 return val
//             }
//         })
//         return brands
//     }

//     render() {
//         if(!this.props.brands) {
//             getBrandsList()
//             return <Loading />
//         }
//         return (
//         <View style={{flex: 1}}>
//             <FlatList 
//                 numColumns={4}
//                 data={this.getBrands()}
//                 renderItem={({item}) => {
//                     console.log(item);
//                     return <BrandListItem brand={item.title} image={{uri: item.imgURL}} id={item.supplierID} /> 
//                 }}
//                 keyExtractor={item => item.title}
//                 initialNumToRender={12}
//                 windowSize={2}
//                 showsHorizontalScrollIndicator={false}
//             /> 
//         </View>
//         );
//     }
// }


// const mapStateToProps = (state) => (
//     {
//         brands: state.mainPage.brands
//     }
// )

// export default connect(mapStateToProps)(Brands)