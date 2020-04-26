import React, { Component } from 'react';

import { View, ScrollView } from 'react-native';

import {sWidth} from '../../helpers/screenSize';

import CategoriesListItem from '../../common/categories-list-item'

import SearchButton from '../../common/header-buttons/search-button';
import CategoryInfoButton from '../../common/header-buttons/category-info-button';
import Loading from '../loading'

import { getCategoriesIDs } from '../../gets/categoryPosts'

export default class SubcategoriesList extends Component {

  static navigationOptions = ({navigation}) => {
    const cmsText = navigation.getParam('cmsText', null)
    const name = navigation.getParam('name', null)
    return {
        title: navigation.getParam('name', 'Kategorien'),
        headerRight: (
          <View style = {{flexDirection: 'row', marginRight: 9}}>
            {cmsText ? <CategoryInfoButton cmsText={cmsText} name={name} /> : null}
            <SearchButton />
          </View>
        ),
        headerTitleContainerStyle: {
          width: sWidth - 140,
          marginLeft: 0,
          justifyContent: 'flex-start',
          left: 56,
          paddingLeft: 0
        }
    }
  }

  state = {
    categories: [],
    currentCategory: {},
    loaded: false
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 1)
    console.log(id)
    getCategoriesIDs(id).then(res => this.setState({...res, loaded: true}))
  }

  getCategories() {
      return this.state.categories.map(({id, name, cmsText, haveSubCategories}) => 
          <CategoriesListItem name={name} id={id} key={id} cmsText={cmsText} haveSubCategories={haveSubCategories} />
      )
  }

  getAllProductsButton() {
      const id = this.state.currentCategory.id
      const cmsText = this.state.currentCategory.cmsText
      if (this.state.categories.length > 1) return <CategoriesListItem name={'Alle Produkte anzeigen'} id={id} key={id} cmsText={cmsText} />
  }

  render() {
    if(!this.state.loaded) return <Loading />    
    return(
      <View>
        <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false}>
          {this.getAllProductsButton()}
          {this.getCategories()}
        </ScrollView>
      </View>
    )
  }
}
