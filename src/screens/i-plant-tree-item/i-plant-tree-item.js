import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { getPreviewAsyncProductData, getIPlantTreeData } from '../../gets/productPosts';

export default class IPlantTreeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartSum: 0, //product sum in cart
    }
  }

  componentDidMount() {
    this.setState({
      cartSum: this.props.cartSum
    })
    getIPlantTreeData().then(res => {
      getPreviewAsyncProductData(res.selectArticle).then(res1 => {
        this.setState({
          iPlantTreeItem: res1,
          iPlantTreeData: res
        })
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartSum !== prevProps.cartSum) {
      this.setState({
        cartSum: this.props.cartSum
      })
    }
  }

  render() {
    console.log("Cart Sum (i-plant-tree-item.js): ", this.state.cartSum)
    console.log("Cart Trigger (i-plant-tree-item.js): ", this.state.cartPrice)
    console.log("I Plant Tree Data (i-plant-tree-item.js): ", this.state.iPlantTreeData)
    console.log("I Plant Tree Item (i-plant-tree-item.js): ", this.state.iPlantTreeItem)
    return (
      this.state.iPlantTreeData
        &&
        this.state.iPlantTreeItem
        &&
        this.state.cartSum >= this.state.iPlantTreeData.cartPrice
        ? (
          <View style={styles.iPlantTreeItem}>
            <Image
              style={styles.iPlantTreeItemImage}
              source={{ uri: this.state.iPlantTreeItem.previewImgURL }}
            />
            <View style={styles.iPlantTreeItemInfoContainer}>
              <Text style={styles.iPlantTreeItemTitle}>
                {this.state.iPlantTreeItem.productName}
              </Text>
              <Text style={styles.iPlantTreeItemDescription}>
                {this.state.iPlantTreeData.infoText}
              </Text>
              <Text style={styles.iPlantTreeItemPrice}>
                GRATIS!
            </Text>
            </View>
          </View>
        )
        : (
          <View />
        )
    );
  }
}

const styles = {
  iPlantTreeItem: {
    marginBottom: 14,

    flex: 1,
    flexDirection: 'row',

    elevation: 4,

    backgroundColor: '#fff',

    borderWidth: 2,
    borderColor: '#2ecc71',
    borderRadius: 5,

    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  iPlantTreeItemImage: {
    margin: 10,

    width: 80,
    height: 90,

    resizeMode: 'contain'
  },
  iPlantTreeItemInfoContainer: {
    width: '80%',
  },
  iPlantTreeItemTitle: {
    marginTop: 10,

    fontSize: 10,
    lineHeight: 16,

    color: '#040404'
  },
  iPlantTreeItemDescription: {
    marginTop: 4,

    fontSize: 10,

    color: '#2ecc71'
  },
  iPlantTreeItemPrice: {
    marginTop: 4,


    fontSize: 16,
    fontWeight: 'bold',

    color: '#2ecc71'
  }
}
