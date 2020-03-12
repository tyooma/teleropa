import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MenuButton from '../../common/header-buttons/menu-button';
import SearchButton from '../../common/header-buttons/search-button';

import { getRootCategories } from '../../gets/categoryPosts';

import Loading from '../loading'

import CategoriesListItem from '../../common/categories-list-item';

export default class CategoriesList extends Component {

  static navigationOptions = {
    headerLeft: MenuButton,
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 9}}>
        <SearchButton />
      </View>
    ),
    title: 'Kategorien',
  }

  state = {
      categories: [],
      currentCategory: {},
      loaded: false
  }

  getCategories() {
      return this.state.categories.map(({id, name, haveSubCategories, cmsText}) => {
            if (name.toUpperCase() === 'SALE') return <CategoriesListItem name={name} id={id} key={id} textStyle={{color: '#d10019'}} haveSubCategories={haveSubCategories} cmsText={cmsText} />
            if (name.toUpperCase() === 'BRANDS') return <CategoriesListItem route='Brands' name={name} id={id} key={id} haveSubCategories={haveSubCategories} />
            // if (name.toUpperCase() !== 'BRANDS' && haveSubCategories === 'false') return null
            return <CategoriesListItem  name={name} id={id} key={id} haveSubCategories={haveSubCategories} cmsText={cmsText} />
          }
        )
  }

  componentDidMount() {
      getRootCategories().then(res => this.setState({...res, loaded: true}))
  }

  render(){
    console.log('categories-list', this.state)
    if (!this.state.loaded) return <Loading />
    return(
      <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false}>
        {this.getCategories()}
        {/* <CategoriesListItem route='SubcategoriesList' text='Sport & Freizeit' image={require('../../assets/icons/019-bike.png')} />
        <CategoriesListItem route='SubcategoriesList' text='TV/Video' image={require('../../assets/icons/020-tv.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Audio' image={require('../../assets/icons/023-speaker.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Haushaltsgeräte' image={require('../../assets/icons/030-household.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Empfangs-Technik' image={require('../../assets/icons/021-satellite-dish.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Konsolen & Games' image={require('../../assets/icons/024-joystick.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Computer & Büro ' image={require('../../assets/icons/022-monitor.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Handys & Telefone  ' image={require('../../assets/icons/025-phone.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Smart Home' image={require('../../assets/icons/027-home-automation.png')} />
        <CategoriesListItem route='SubcategoriesList' text='Beleuchtung' image={require('../../assets/icons/026-idea.png')} /> */}
      </ScrollView>
    )
  }

}
