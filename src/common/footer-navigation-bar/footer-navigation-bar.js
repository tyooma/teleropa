import React, {PureComponent} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'

import NavigationService from '../../navigation-service';

export default class FooterNavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {badges: 0};
  }

  GetBadges() {
    let count = 0;
    try {
      AsyncStorage.getItem('Cart', (err, res) => {
        if(err) {
          console.log('GetBadges() AsyncStorage.getItem(err): ', err.message);
        } else {
          if (res != null) {
            const arr = JSON.parse(res);
            if (arr.length > 0) {
              arr.forEach(element => count += element.count);
            }
          }
        }
        console.log('getBadges() Badges =', count);
        this.setState({badges: count});
      });
    } catch(err) {
      this.setState({badges: count});
      console.log('getBadges() AsyncStorage.getItem(err): ', err.message);
    }
  }

  componentDidMount() {
    console.log('DidMount: this.badges: ', this.state.badges);
    this.GetBadges();
  }

  HomePress() {
    Linking.canOpenURL('whatsapp://send?phone=491707046434')
      .then((supported) => {
        if (!supported) {
          Linking.openURL("market://details?id=com.whatsapp");
        } else {
          return Linking.openURL('whatsapp://send?phone=491707046434');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  render() {
    const badges = this.state.badges;
    const CartIcon = (
      <View style={s.CartConteiner}>
        <View style={s.IconConteiner}><Icons name="ios-cart" size={25} color="#586589" /></View>
          <View style={s.BadgeConteiner}>
          {badges>0 && (
            <View style={s.BadgeCircle}><Text style={s.BadgeMarker}>{badges}</Text></View>
          )}
          </View>
      </View>
    );
    // console.log('Render(): badges =', badges);

    return (
      <View style={s.BarConteiner}>
        <TouchableOpacity onPress={() => NavigationService.navigate('Main')} style={s.ButtonConteiner}>
          <View style={s.BarIcon}><Icons name="ios-home" size={25} color="#586589" /></View>
          <Text style={s.ButtonText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Cart', {cartReceaved: false})} style={s.ButtonConteiner}>
        <View style={s.BarIcon}>{CartIcon}</View>
          <Text style={s.ButtonText}>Warenkorb</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.HomePress()} style={s.ButtonConteiner}>
          <View style={s.BarIcon}><Icons name="ios-help-circle-outline" size={25} color="#586589" /></View>
          <Text style={s.ButtonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Profile')} style={s.ButtonConteiner}>
          <View style={s.BarIcon}><Icons name="ios-person" size={25} color="#586589" /></View>
          <Text style={s.ButtonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  BarConteiner: {
    borderTopWidth: 0.5,
    borderColor: '#A7A7AA',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 49,
    minHeight: 49,
    maxHeight: 49,
    paddingHorizontal: 0,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  ButtonConteiner: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' },
  ButtonText: { color: '#586589', fontSize: 11, marginBottom: 1.5 },
  BarIcon: { paddingVertical: 3.4 },

  IconConteiner: {
    position: 'absolute', justifyContent: 'center', alignItems: 'center',
    minWidth: 25, minHeight: 25, 
  },
  BadgeConteiner: { alignItems: 'flex-end', minWidth: 25, minHeight: 25, top: -2, left: 6 },
  BadgeCircle: {
    alignItems: 'center', justifyContent: 'center',
    width: 13, height: 13, borderRadius: 10, backgroundColor: 'red',
  },
  BadgeMarker: { color: 'white', fontSize: 10, fontWeight: 'bold' },
});
