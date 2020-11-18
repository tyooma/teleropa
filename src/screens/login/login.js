import React, { Component, createRef } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

import RNRestart from 'react-native-restart';

import { connect } from 'react-redux';

import * as actions from '../../actions/login-actions';

import { logIn, resetPassword } from '../../posts/authPosts';

import Loading from '../../screens/loading';

import FooterButton from '../../common/footer-button';

import Input from '../../common/input';

import ModalView from '../../common/modal-view';

import ButtonItem from '../../common/button-item';
import ProgressBar from '../progress-bar';

class Login extends Component {
  static navigationOptions = { title: 'Anmeldung' }

  state = {
    passRecoveryVisible: false,
    response: 'Nothing to display',
    email: '',
    password: '',
    emailForReset: '',
    loading: false,
    userID: null,
    routeName: this.props.navigation.getParam('routeName', null)
  }

  handlerPassRecoveryVisible() {
    this.setState({ passRecoveryVisible: !this.state.passRecoveryVisible })
  }

  logInHandler() {
    const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const { email, password, routeName } = this.state;

    if (emailChecker.test(email) && password.length >= 3) {
      this.setState({ loading: true })
      this.props.setLoggedUserId(null)
      logIn(email, password, routeName)
      if (routeName != null) {
        this.props.navigation.navigate(`${routeName}`);
      }
    } else {
      Alert.alert('Fehler', 'E-Mail oder Passwort sind ungültig')
    }
  }

  componentWillMount() {
    this.getUserID()
  }

  getUserID = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID')
      if (userID && userID !== 'notloggedin') {
        Alert.alert(
          'Abmelden', 'Sind Sie sicher, dass Sie sich abmelden möchten?',
          [{ text: 'Nein', onPress: () => this.props.navigation.goBack(), style: 'cancel' },
          {
            text: 'Ja', onPress: async () => {
              await this.props.setLoggedUserId('notloggedin');
              await this.props.setLoggedUserInfo({});
              await RNRestart.Restart();
            }
          }
          ], { cancelable: false }
        );
      }
      this.setState({ userID });
    } catch (e) {
      // read error
    }
  }

  handlePassReset() {
    const email = this.state.emailForReset
    if (!email) {
      alert('Bitte geben Sie Ihre E-Mail ein')
    } else {
      const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailChecker.test(email)) {
        alert('Die E-Mail-Adresse ist ungültig')
        return false
      } else {
        resetPassword(email)
      }
    }

  }


  email = createRef();
  password = createRef();

  render() {
    if (this.state.loading && !this.props.userID) { return <Loading /> }

    if (this.props.userID === "notloggedin") {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginHorizontal: 18 }}>
            {this.state.routeName != null
              ? <ProgressBar step={'login'} />
              : null
            }
            <Text style={s.PlaceholderControl}>Ihre E-Mail*</Text>
            <Input
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              autoCapitalize='none'
              required
              maxLength={70}
              ref={(input) => { this.email = input; }}
              focus={true}
              returnKeyType={"next"}
              onSubmitEditing={this.password.tearger}
              blurOnSubmit={false}
            />



            <Text style={s.PlaceholderControl}>Passwort*</Text>
            <Input
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              autoCapitalize='none'
              password
              maxLength={16}
              ref={(input) => { this.password = input; }}
              focus={true}
              returnKeyType={"next"}
              blurOnSubmit={false}
            />

            <View style={s.ControlContainer}>
              <View style={s.ControlLeft}>
                <TouchableOpacity onPress={() => this.handlerPassRecoveryVisible()} style={s.ActionButton}>
                  <Text style={s.ActionText}>Passwort vergessen?</Text>
                </TouchableOpacity>
              </View>
              <View style={s.ControlRight}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'RegistrationUser' })} style={s.ActionButton}>
                  <Text style={s.ActionText}>Anmelden</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>

          <FooterButton text='Anmelden' onPress={() => { this.logInHandler() }} />

          <ModalView
            title='Passwort zurücksetzen'
            buttonText='Senden'
            onSubmit={() => this.handlePassReset()}
            onRequestClose={() => this.handlerPassRecoveryVisible()}
            visible={this.state.passRecoveryVisible}
          >
            <Input placeholder='Email' value={this.state.emailForReset} onChangeText={emailForReset => this.setState({ emailForReset })} autoCapitalize='none' />
          </ModalView>
        </View>
      );
    } else {
      return (
        <></>
      );
    }
  }
}

const mapStateToProps = (state) => { return { userID: state.userID } }
export default connect(mapStateToProps, actions)(Login)

const s = {
  PlaceholderControl: { fontSize: 12, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  InputControl: { fontSize: 16, marginTop: 0, marginBottom: -5 },

  ControlContainer: { width: '100%', flexDirection: 'row', marginVertical: 40 },

  ControlLeft: {
    width: '60%', height: 35, paddingRight: 20, justifyContent: 'center', alignItems: 'center'
  },

  ControlRight: {
    width: '40%', height: 35, paddingLeft: 20, justifyContent: 'center', alignItems: 'center'
  },

  ActionButton: {
    width: '100%', height: 35, backgroundColor: '#d10019', alignItems: 'center', justifyContent: 'center'
    // zIndex: 999, overflow: 'hidden',
  },

  ActionText: { fontSize: 16, color: '#FFFFFF' }
}
