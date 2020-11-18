import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions/login-actions';
import ModalView from '../../common/modal-view';
import Checkbox from '../../common/checkbox';
import Input from '../../common/input';
import { getUserBillingAddress, getUserShippingAddress, getUserInfo } from '../../gets/userPosts';
import { changePassword } from '../../posts/userDataPosts';
import Loading from '../loading';

class PersonalData extends Component {
  static navigationOptions = { title: 'Persönliche Angaben' }
  state = { passChangeVisible: false, newPasswordOne: '', newPasswordTwo: '', isAgree: false }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      getUserInfo(this.props.userID).then(res => this.props.setLoggedUserInfo(res))
      getUserBillingAddress(this.props.userID).then(res => this.setState({ paymentAddress: res }))
      getUserShippingAddress(this.props.userID).then(res => this.setState({ deliveryAddress: res }))
    });
  }

  runPasswordChange() {
    if (this.isPasswordFormValid()) {
      changePassword(this.props.userID, this.state.newPasswordOne)
    }
  }

  isPasswordFormValid() {
    const { newPasswordOne, newPasswordTwo } = this.state;
    if (newPasswordOne.length < 3 || newPasswordTwo.length < 3) {
      alert('Das Passwort ist zu kurz');
      return false;
    }
    if (newPasswordOne !== newPasswordTwo) {
      alert('Das Passwort stimmt nicht überein');
      return false;
    }
    return true;
  }

  render() {
    const { name, surname, birthDate, email, gender } = this.props.userInfo;
    if (!name || !this.state.paymentAddress || !this.state.deliveryAddress) { return <Loading /> }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={styles.welcomeText}>Herzlich willkommen, {name}!</Text>
          <Text style={styles.subTitle}>Persönliche Angaben</Text>
          <View style={styles.shadowBlock}>
            <Text style={styles.infoText}>{gender} {name} {surname}</Text>
            <Text style={styles.infoText}>{birthDate ? birthDate : 'Bitte das Geburtsdatum angeben'}</Text>
            <Text style={styles.infoText}>{email}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserInfo' })} style={styles.borderButton}>
              <Text style={styles.borderButtonText}> Persönliche Angaben ändern</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>Rechnungsadresse</Text>
          <View style={styles.shadowBlock}>
            <Text style={styles.infoText}>{this.state.paymentAddress.salutation} {this.state.paymentAddress.firstname} {this.state.paymentAddress.lastname} </Text>
            <Text style={styles.infoText}>{this.state.paymentAddress.street}</Text>
            <Text style={styles.infoText}>{this.state.paymentAddress.zipcode} {this.state.paymentAddress.city}</Text>
            <Text style={styles.infoText}>{this.state.paymentAddress.country}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserBillingAddress' })} style={styles.borderButton}>
              <Text style={styles.borderButtonText}> Rechnungsadresse ändern</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>Versandadresse</Text>
          <View style={styles.shadowBlock}>
            <Text style={styles.infoText}>{this.state.deliveryAddress.salutation} {this.state.deliveryAddress.firstname} {this.state.deliveryAddress.lastname}</Text>
            <Text style={styles.infoText}>{this.state.deliveryAddress.street}</Text>
            <Text style={styles.infoText}>{this.state.deliveryAddress.zipcode} {this.state.deliveryAddress.city}</Text>
            <Text style={styles.infoText}>{this.state.deliveryAddress.country}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserShippingAddress' })} style={styles.borderButton}>
              <Text style={styles.borderButtonText}> Versandadresse ändern</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>Passwort</Text>
          <View style={{ marginHorizontal: 18, marginBottom: 18 }}>
            <TouchableOpacity onPress={() => { this.setState({ passChangeVisible: true }) }} style={styles.borderButton}>
              <Text style={styles.borderButtonText}>Passwort ändern</Text>
            </TouchableOpacity>
            <Checkbox text='Ich möchte einen kostenlosen Newsletter erhalten' checked={this.state.isAgree} onPress={() => this.setState({ isAgree: !this.state.isAgree })} />
          </View>
        </ScrollView>

        <ModalView
          onSubmit={() => this.runPasswordChange()}
          title='Passwort ändern'
          buttonText='Speichern'
          visible={this.state.passChangeVisible}
          onRequestClose={() => { this.setState({ passChangeVisible: !this.state.passChangeVisible }) }}
        >
          <Text style={styles.PlaceholderControl}>Passwort <Text style={styles.PlaceholderRequiered}>*</Text></Text>
          <Text style={styles.PlaceholderNotes}>Ihr Passwort muss mindestens 8 Zeichen umfassen. Die maximal 16 Zeichen.</Text>
          <Input
            onChangeText={newPasswordOne => this.setState({ newPasswordOne })}
            value={this.state.newPasswordOne}
            maxLength={16}
            password
          />
          
          <Text style={styles.PlaceholderControl}>Passwort wiederholen <Text style={styles.PlaceholderRequiered}>*</Text></Text>
          <Input 
            onChangeText={newPasswordTwo => this.setState({ newPasswordTwo })}
            value={this.state.newPasswordTwo}
            maxLength={16}
            password
          />
        </ModalView>

      </View>
    )
  }
}

const mapStateToProps = ({ userInfo, userID }) => { return { userInfo: userInfo, userID: userID } }
export default connect(mapStateToProps, actions)(PersonalData);

const styles = {
  PlaceholderControl: { fontSize: 13, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  PlaceholderNotes: { fontSize: 12, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  PlaceholderRequiered: { fontSize: 13, color: 'red' },

  welcomeText: {
    fontSize: 16,
    color: '#d10019',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 12
  },
  subTitle: {
    marginLeft: 18,
    color: '#040404',
    marginTop: 22,
    marginBottom: 15,
    fontSize: 12
  },
  shadowBlock: {
    paddingTop: 12,
    paddingHorizontal: 9,
    marginHorizontal: 18,
    shadowColor: 'rgb(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  infoText: {
    marginBottom: 20,
    color: '#030303',
    fontSize: 16,
    marginBottom: 19
  },
  paymentInfoText: {
    marginBottom: 20,
    color: '#a0a0a0',
    fontSize: 11,
    marginBottom: 19
  },
  borderButton: {
    height: 34,
    borderRadius: 5,
    borderColor: '#a0a0a0',
    borderWidth: 0.3,
    justifyContent: 'center',
    marginBottom: 10
  },
  borderButtonText: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#030303'
  }
}
