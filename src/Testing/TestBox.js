import React, {PureComponent} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import FooterNavBar from './modules/footer-navigation-bar';
import FooterAgreement from '../common/footer-agreement/footer-agreement';

export default class TestBox extends PureComponent {
  static navigationOptions = { title: 'Testing Box' };

  render() {
    const nav = this.props.navigation;
    return (
      <View style={s.Conteiner}>
        <ScrollView style={s.Form}>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>AGB:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'AGB'})} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>Impressum:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'Impressum'})} />
          </View>
          <View style={s.FormItem}>
            <Text style={s.ItemText}>Datenschutz:</Text>
            <Button title="Execute" onPress={() => nav.navigate('Agreement', {title: 'Datenschutz'})} />
          </View>
        </ScrollView>
        <FooterAgreement />
        <FooterNavBar />
      </View>
    );
  }
}

const s = StyleSheet.create({
  Conteiner: { flex: 1 },
  Form: { marginHorizontal: 18, marginTop: 22 },
  FormItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ItemText: { color: '#040404', fontSize: 16 },
});
