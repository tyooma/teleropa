import React, { Component } from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions/login-actions';

import Picker from '../../common/picker-input';
import Input from '../../common/input';
import Checkbox from '../../common/checkbox';
import FooterButton from '../../common/footer-button';
import ModalView from '../../common/modal-view';
import Loading from '../loading';

import { getCountries } from '../../gets/mainPagePosts';
import { getUserBillingAddress, getUserShippingAddress } from '../../gets/userPosts';
import { ChangeUserInfo, ChangeUserAddress } from '../../posts/userDataPosts';
import { register } from '../../posts/authPosts';

class ChangeMainData extends Component {

  state = {
    screenID: null, loaded: false, userID: null,
    customerType: '', company: '', department: '', vatId: '',
    salutation: '', firstname: '', lastname: '', phone: '', birthDate: null, dateVisible: false,
    email: '', passwordOne: '', passwordTwo: '',
    street: '', zipcode: '', city: '', country: '', countries: null,
  }

  componentDidMount() {
    // console.log('DidMount => props:', this.props);
    const screenID = this.props.navigation.state.params.ScreenID;
    const userID = this.props.userID;

    // console.log('DidMount => screenID:', screenID);
    // console.log('DidMount => userID:', this.props.userID);

    if (screenID === 'ChangeUserInfo') {
      const { name, surname, birthDate, gender } = this.props.userInfo;
      console.log('UserInfo => name:', name);
      console.log('UserInfo => surname:', surname);
      console.log('UserInfo => birthDate:', birthDate);
      console.log('UserInfo => gender:', gender);
      this.setState({
        screenID: screenID, loaded: true, userID: userID,
        salutation: gender, firstname: name, lastname: surname,
        birthDate: birthDate ? new Date(birthDate) : null,
      });
    } else if (screenID === 'ChangeUserBillingAddress') {
      getCountries().then(({countries}) => {
        this.setState({countries: countries});
        getUserBillingAddress(userID).then(info => {
          const {
            company, department, vatId, salutation, firstname, lastname,
            street, zipcode, city, country, phone
          } = info;
          const customerType = company ? 'Firma' : 'Privatkunde';
          this.setState({
            screenID: screenID, loaded: true, userID: userID, customerType: customerType,
            company: company, department: department, vatId: vatId,
            salutation: salutation, firstname: firstname, lastname: lastname, phone: phone,
            street: street, zipcode: zipcode, city: city, country: country,
          });
        });
      });
    } else if (screenID === 'ChangeUserShippingAddress') {
      getCountries().then(({countries}) => {
        this.setState({countries: countries});
        getUserShippingAddress(userID).then(info => {
          const {
            company, department, vatId, salutation, firstname, lastname,
            street, zipcode, city, country, phone
          } = info;
          const customerType = company ? 'Firma' : 'Privatkunde';
          this.setState({
            screenID: screenID, loaded: true, userID: userID, customerType: customerType,
            company: company, department: department, vatId: vatId,
            salutation: salutation, firstname: firstname, lastname: lastname, phone: phone,
            street: street, zipcode: zipcode, city: city, country: country,
          });
        });
      });
    } else {
      // screenID === 'RegistrationUser'
      getCountries().then(({countries}) => this.setState({
        screenID: screenID, loaded: true,
        customerType: '', company: '', department: '', vatId: '',
        salutation: '', firstname: '', lastname: '', phone: '', birthDate: null, dateVisible: false,
        email: '', passwordOne: '', passwordTwo: '',
        street: '', zipcode: '', city: '', country: '', countries: countries,
        subscribe: false, isAgree: false,
      }));
    }
  }

  Executing() {
    const {
      screenID, userID, customerType, company, department, vatId,
      salutation, firstname, lastname, phone, birthDate,
      email, passwordOne, street, zipcode, city, countries, country, subscribe
    } = this.state;

    if (this.Validation()) {
      if (screenID === 'ChangeUserInfo') {
        ChangeUserInfo(userID, firstname, lastname, this.getBirthdayStr(birthDate), salutation);
      } else if (screenID === 'ChangeUserBillingAddress') {
        const countryID = countries.find(({name}) => name === country).id;
        const userType = customerType === 'Firma' ? 'business' : 'private';
        // changePaymentAddress(userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
        ChangeUserAddress('ChangeUserBillingAddress', userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
      } else if (screenID === 'ChangeUserShippingAddress') {
        const countryID = countries.find(({name}) => name === country).id;
        const userType = customerType === 'Firma' ? 'business' : 'private';
        // changeDeliveryAddress(userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
        ChangeUserAddress('ChangeUserShippingAddress', userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
      } else {
        const data = {
          customerType: customerType === 'Firma' ? 'business' : 'private',
          billingCompany: company,
          billingDepartment: department,
          billingVatId: vatId,
          salutation: salutation,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          birthday: this.getBirthdayStr(birthDate),
          email: email,
          password: passwordOne,
          billingStreet: street,
          billingZipcode: zipcode,
          billingCity: city,
          billingCountry: countries.find(({name}) => name === country).id,
          newsletterSubscribe: subscribe ? 1 : 0
        }
        register(data);
      }
    }
  }

  getValidMsg(field) {
    switch (field) {
      case 'customerType':      return 'Bitte wählen Sie den Kundentyp';
      case 'company_vatId':     return 'Bitte geben Sie Information über Ihre Firma ein';
      
      case 'salutation':        return 'Bitte wählen Sie Ihr Geschlecht aus';
      case 'firstname':         return 'Bitte geben Sie Ihren Vornamen ein';
      case 'lastname':          return 'Bitte geben Sie Ihren Nachnamen ein';

      case 'email':             return 'Bitte geben Sie Ihre E-Mail ein';
      case 'emailChecker':      return 'Die E-Mail-Adresse ist ungültig';
      case 'password_length':   return 'Das Passwort ist zu kurz';
      case 'password_compares': return 'Das Passwort stimmt nicht überein';
      
      case 'street':            return 'Bitte geben Sie Ihre Anschrift ein';
      case 'zipcode':           return 'Bitte geben Sie die PLZ ein';
      case 'city':              return 'Bitte geben Sie den Ort ein';
      case 'country':           return 'Bitte wählen Sie Ihr Land aus';
      case 'isAgree':           return 'Bitte akzeptieren Sie unsere AGB';
    }
  }

  Validation() {
    const {
      screenID, customerType, company, vatId, salutation, firstname, lastname,
      email, passwordOne, passwordTwo, street, zipcode, city, country, isAgree
    } = this.state;

    if (screenID === 'ChangeUserInfo') {
      if (!salutation) { alert( this.getValidMsg('salutation') ); return false; }
      if (!firstname) { alert( this.getValidMsg('firstname') ); return false; }
      if (!lastname) { alert( this.getValidMsg('lastname') ); return false; }

    } else if (screenID === 'ChangeUserBillingAddress' || screenID === 'ChangeUserShippingAddress') {

      if (!customerType) { alert( this.getValidMsg('customerType') ); return false; }
      if (customerType === 'Firma' && (!company || !vatId)) { alert( this.getValidMsg('company_vatId') ); return false; }

      if (!salutation) { alert( this.getValidMsg('salutation') ); return false; }
      if (!firstname)  { alert( this.getValidMsg('firstname') ); return false; }
      if (!lastname)   { alert( this.getValidMsg('lastname') ); return false; }

      if (!street) { alert( this.getValidMsg('street') ); return false; }
      if (!zipcode) { alert( this.getValidMsg('zipcode') ); return false; }
      if (!city) { alert( this.getValidMsg('city') ); return false; }
      if (!country) { alert( this.getValidMsg('country') ); return false; }

    } else {

      if (!customerType) { alert( this.getValidMsg('customerType') ); return false; }
      if (customerType==='Firma' && (!company||!vatId)) { alert( this.getValidMsg('company_vatId') ); return false; }
      
      if (!salutation) { alert( this.getValidMsg('salutation') ); return false; }
      if (!firstname) { alert( this.getValidMsg('firstname') ); return false; }
      if (!lastname) { alert( this.getValidMsg('lastname') ); return false; }

      if (!email) { alert( this.getValidMsg('email') ); return false; }
      const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailChecker.test(email)) { alert( this.getValidMsg('emailChecker') ); return false; }

      if (passwordOne.length<3 || passwordTwo.length<3) { alert( this.getValidMsg('password_length') ); return false; }
      if (passwordOne !== passwordTwo) { alert( this.getValidMsg('password_compares') ); return false; }

      if (!street) { alert( this.getValidMsg('street') ); return false; }
      if (!zipcode) { alert( this.getValidMsg('zipcode') ); return false; }
      if (!city) { alert( this.getValidMsg('city') ); return false; }
      if (!country) { alert( this.getValidMsg('country') ); return false; }
      if (!isAgree) { alert( this.getValidMsg('isAgree') ); return false; }

    }

    return true;

  }

  getBirthdayStr(date) {
    return date ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`:'';
  }

  BirthdayRender() {
    const { dateVisible, birthDate } = this.state;
    return Platform.OS === 'ios' ? (
      <>
        <TouchableOpacity onPress={() => this.setState({dateVisible: !dateVisible})}>
          { birthDate ? (
            <View style={styles.dateBox}>
              <Text style={[styles.dateStyle, {color: '#050505'}]}>{this.getBirthdayStr(birthDate)}</Text>
            </View>
          ) : (
            <View style={styles.dateBox}><Text style={styles.dateStyle}>Geburtstag</Text></View>
          )}
        </TouchableOpacity>
        <ModalView 
          visible={dateVisible}
          onSubmit={() => this.setState({dateVisible: !dateVisible})}
          onRequestClose={() => this.setState({dateVisible: !dateVisible})}
          buttonText='Speichern'
        >
          <DatePickerIOS
            date={birthDate ? birthDate : new Date()}
            maximumDate={new Date()}
            mode='date'
            onDateChange={value => this.setState({birthDate: value})}
          />
        </ModalView>
      </>
    ) : (
      <>
        <TouchableOpacity onPress={ async () => {
          try {
            const currentDate = birthDate ? new Date(`${birthDate.getFullYear()}-${birthDate.getMonth()+1}-${birthDate.getDate()} 12:00`) : new Date();
            const { action, year, month, day } = await DatePickerAndroid.open({
              date: currentDate, maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              const birthdayPicker = new Date(year, month, day);
              this.setState({ birthDate: birthdayPicker });
            }
          } catch ({code, message}) { console.warn('Cannot open date picker', message) }
        }}>
        { birthDate ? ( 
          <View style={styles.dateBox}>
            <Text style={[styles.dateStyle, {color: '#050505'}]}>{this.getBirthdayStr(birthDate)}</Text>
          </View>
        ) : (
          <View style={styles.dateBox}><Text style={styles.dateStyle}></Text></View>
        )}
        </TouchableOpacity>
      </>
    );
  }

  Visible(field) {
    const { screenID } = this.state;
    if (screenID === 'ChangeUserInfo') {
      switch (field) {
        case 'salutation':   return true;
        case 'firstname':    return true;
        case 'lastname':     return true;
        case 'birthDate':    return true;
      }
    } else if (screenID === 'ChangeUserBillingAddress' || screenID === 'ChangeUserShippingAddress') {
      switch (field) {
        case 'customerType': return true;
        case 'salutation':   return true;
        case 'firstname':    return true;
        case 'lastname':     return true;
        case 'phone':        return true;
        case 'address':      return true;
      }
    } else {
      switch (field) {
        case 'customerType': return true;
        case 'salutation':   return true;
        case 'firstname':    return true;
        case 'lastname':     return true;
        case 'phone':        return true;
        case 'birthDate':    return true;
        case 'email':        return true;
        case 'passwordOne':  return true;
        case 'passwordTwo':  return true;
        case 'address':      return true;
        case 'subscribe':    return true;
        case 'isAgree':      return true;
      }
    }
  }

  CustomerChange(value) {
    this.setState({customerType: value});
    if (value === 'Privatkunde') {
      this.setState({ company: '', department: '', vatId: '' });
    }
  }

  render() {
    console.log('RENDER => state:', this.state);
    
    const {
      loaded, customerType, company, department, vatId, 
      salutation, firstname, lastname, phone, email, passwordOne, passwordTwo,
      street, zipcode, city, country, countries, subscribe, isAgree, 
    } = this.state;

    if (!loaded) return <Loading/>;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
          {this.Visible('customerType') && (
          <View>
            <Text style={styles.PlaceholderControl}>Ich bin Neukunde*</Text>
            <Picker onValueChange={(value) => this.CustomerChange(value)} values={['Privatkunde', 'Firma']} selected={customerType}/>
          </View>
          )}

          { (customerType === 'Firma') && this.Visible('customerType') && 
          <View>
            <Text style={styles.PlaceholderControl}>Firmennamen*</Text>
            <Input onChangeText={company => this.setState({company})} value={company} maxLength={255}/>
            
            <Text style={styles.PlaceholderControl}>Abteilung</Text>
            <Input onChangeText={department => this.setState({department})} value={department} maxLength={35}/>
            
            <Text style={styles.PlaceholderControl}>Steuernummer*</Text>
            <Input onChangeText={vatId => this.setState({vatId})} value={vatId} maxLength={50}/>
          </View>
          }

          {this.Visible('salutation') && (
          <View>
            <Text style={styles.PlaceholderControl}>Geschlecht*</Text>
            <Picker onValueChange={salutation => this.setState({salutation})} values={['Herr', 'Frau']} selected={salutation}/>
          </View>
          )}

          {this.Visible('firstname') && (
          <View>
            <Text style={styles.PlaceholderControl}>Vorname*</Text>
            <Input onChangeText={firstname => this.setState({firstname})} value={firstname} maxLength={255} style={styles.InputControl}/>
          </View>
          )}

          {this.Visible('lastname') && (
          <View>
            <Text style={styles.PlaceholderControl}>Nachname*</Text>
            <Input onChangeText={lastname => this.setState({lastname})} value={lastname} maxLength={255} style={styles.InputControl}/>
          </View>
          )}

          {this.Visible('birthDate') && (
          <View>
            <Text style={styles.PlaceholderControl}>Geburtstag</Text>
            {this.BirthdayRender()}
          </View>
          )}

          {this.Visible('phone') && (
          <View>
            <Text style={styles.PlaceholderControl}>Telefon</Text>
            <Input onChangeText={phone => this.setState({phone: `${phone.replace(/[^0-9]/gi,'')}`})} value={phone} keyboardType='phone-pad' maxLength={40} style={styles.InputControl}/>
          </View>
          )}

          {this.Visible('email') && (
          <View>
            <Text style={styles.PlaceholderControl}>Email*</Text>
            <Input onChangeText={email => this.setState({email})} autoCapitalize='none' value={email} maxLength={70} style={styles.InputControl}/>
          </View>
          )}

          {this.Visible('passwordOne') && (
          <View>
            <Text style={styles.PlaceholderControl}>Passwort*</Text>
            <Input onChangeText={passwordOne => this.setState({passwordOne})} value={passwordOne} password/>
          </View>
          )}

          {this.Visible('passwordTwo') && (
          <View>
            <Text style={styles.PlaceholderControl}>Passwort wiederholen*</Text>
            <Input onChangeText={passwordTwo => this.setState({passwordTwo})} value={passwordTwo} password/>
          </View>
          )}

          {this.Visible('address') && (
          <View>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Ihre Adresse</Text>

            <Text style={styles.PlaceholderControl}>Straße und Nr.*</Text>
            <Input onChangeText={street => this.setState({street})} value={street} maxLength={255} style={styles.InputControl}/>

            <Text style={styles.PlaceholderControl}>PLZ*</Text>
            <Input onChangeText={zipcode => this.setState({zipcode: zipcode.replace(/[^0-9]/gi,'')})} value={zipcode} maxLength={5} style={styles.InputControl}/>

            <Text style={styles.PlaceholderControl}>Ort*</Text>
            <Input onChangeText={city => this.setState({city})} value={city} maxLength={70} style={styles.InputControl}/>
          
            <Text style={styles.PlaceholderControl}>Land*</Text>
            <Picker onValueChange={country => this.setState({country})} values={countries.map(({name}) => name)} selected={country} style={styles.InputControl}/>
          </View>
          )}

          {this.Visible('isAgree') && (
          <View style={{marginVertical: 15}}>
            <Checkbox onPress={() => this.setState({isAgree: !isAgree})} checked={isAgree} text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.'/>
          </View>
          )}

          {this.Visible('subscribe') && (
          <View style={{marginBottom: 15}}>
            <Checkbox onPress={() => this.setState({subscribe: !subscribe})} checked={subscribe} text='Newsletter anmelden'/>
          </View>
          )}

        </ScrollView>
        <FooterButton onPress={() => this.Executing()} text={'Speichern'}/>
      </View>
    )
  }
}

const mapStateToProps = ({userInfo, userID}) => { return {userInfo: userInfo, userID: userID} }
export default connect(mapStateToProps, actions)(ChangeMainData);

const styles = {
  PlaceholderControl: { fontSize: 12, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  InputControl: { fontSize: 16, height: 40, marginTop: 0, marginBottom: -5 },

  dateStyle: {
    fontSize: 16,
    paddingLeft: 0,
    width: '90%',
    flex: 1,
    marginLeft: 0,
    color: '#a0a0a0'
  },

  dateBox: {
    height: 56,
    borderBottomWidth: 0.7,
    borderColor: '#949494',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  }
}
