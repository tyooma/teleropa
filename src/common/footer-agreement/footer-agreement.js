import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import NavigationService from '../../navigation-service';

export default class FooterAgreement extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={s.BarConteiner}>
        <TouchableOpacity onPress={() => NavigationService.navigate('Agreement', {title: 'AGB'})} style={s.LinkConteiner}>
          <Text style={s.LinkText}>AGB</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Agreement', {title: 'Datenschutz'})} style={s.LinkConteiner}>
          <Text style={s.LinkText}>Datenschutz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Agreement', {title: 'Impressum'})} style={s.LinkConteiner}>
          <Text style={s.LinkText}>Impressum</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  BarConteiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  LinkConteiner: { alignItems: 'center', justifyContent: 'center' },
  LinkText: { color: '#007BFF', fontSize: 11, marginBottom: 1.5 },
});
