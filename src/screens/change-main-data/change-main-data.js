import React, { Component, createRef } from 'react';
import { Alert, DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, ScrollView, View, KeyboardAvoidingView } from 'react-native';
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
      console.log("1111111111111 -- ChangeUserInfo", this.props.userInfo)
      const { name, surname, birthDate, gender } = this.props.userInfo;

      this.setState({
        screenID: screenID, loaded: true, userID: userID,
        salutation: gender, firstname: name, lastname: surname,
        birthDate: birthDate ? new Date(birthDate) : null,
      });
      console.log("12321321 -- ChangeUserInfo state", this.state.birthDate)
    } else if (screenID === 'ChangeUserBillingAddress') {
      getCountries().then(({ countries }) => {
        this.setState({ countries: countries });
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
      getCountries().then(({ countries }) => {
        this.setState({ countries: countries });
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
      getCountries().then(({ countries }) => this.setState({
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
        const countryID = countries.find(({ name }) => name === country).id;
        const userType = customerType === 'Firma' ? 'business' : 'private';
        // changePaymentAddress(userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
        ChangeUserAddress('ChangeUserBillingAddress', userID, userType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone);
      } else if (screenID === 'ChangeUserShippingAddress') {
        const countryID = countries.find(({ name }) => name === country).id;
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
          billingCountry: countries.find(({ name }) => name === country).id,
          newsletterSubscribe: subscribe ? 1 : 0
        }
        register(data);
      }
    }
  }

  getValidMsg(field) {
    switch (field) {
      case 'customerType': return 'Bitte wählen Sie den Kundentyp';
      case 'company_vatId': return 'Bitte geben Sie Information über Ihre Firma ein';

      case 'salutation': return 'Bitte wählen Sie Ihr Geschlecht aus';
      case 'firstname': return 'Bitte geben Sie Ihren Vornamen ein';
      case 'lastname': return 'Bitte geben Sie Ihren Nachnamen ein';

      case 'email': return 'Bitte geben Sie Ihre E-Mail ein';
      case 'emailChecker': return 'Die E-Mail-Adresse ist ungültig';
      //case 'password_length':   return 'Das Passwort ist zu kurz';
      case 'password_length': return 'Passwort stimmt nicht überein. Die Mindestzeichenlänge muss 8 Symbole sein.';
      case 'password_compares': return 'Das Passwort stimmt nicht überein';

      case 'street': return 'Bitte geben Sie Ihre Anschrift ein';
      case 'zipcode': return 'Bitte geben Sie die PLZ ein';
      case 'city': return 'Bitte geben Sie den Ort ein';
      case 'country': return 'Bitte wählen Sie Ihr Land aus';
      case 'isAgree': return 'Bitte akzeptieren Sie unsere AGB';
    }
  }

  Validation() {
    const {
      screenID, customerType, company, vatId, salutation, firstname, lastname,
      email, passwordOne, passwordTwo, street, zipcode, city, country, isAgree
    } = this.state;

    let alertMsg = '';
    let result = true;

    if (screenID === 'ChangeUserInfo') {
      if (!salutation) { alertMsg = this.getValidMsg('salutation'); result = false; }
      if (!firstname) { alertMsg = this.getValidMsg('firstname'); result = false; }
      if (!lastname) { alertMsg = this.getValidMsg('lastname'); result = false; }

    } else if (screenID === 'ChangeUserBillingAddress' || screenID === 'ChangeUserShippingAddress') {

      if (!customerType) { alertMsg = this.getValidMsg('customerType'); result = false; }
      if (customerType === 'Firma' && (!company || !vatId)) { alertMsg = this.getValidMsg('company_vatId'); result = false; }

      if (!salutation) { alertMsg = this.getValidMsg('salutation'); result = false; }
      if (!firstname) { alertMsg = this.getValidMsg('firstname'); result = false; }
      if (!lastname) { alertMsg = this.getValidMsg('lastname'); result = false; }

      if (!street) { alertMsg = this.getValidMsg('street'); result = false; }
      if (!zipcode) { alertMsg = this.getValidMsg('zipcode'); result = false; }
      if (!city) { alertMsg = this.getValidMsg('city'); result = false; }
      if (!country) { alertMsg = this.getValidMsg('country'); result = false; }

    } else {

      if (!customerType) { alertMsg = this.getValidMsg('customerType'); result = false; }
      if (customerType === 'Firma' && (!company || !vatId)) { alertMsg = this.getValidMsg('company_vatId'); result = false; }

      if (!salutation) { alertMsg = this.getValidMsg('salutation'); result = false; }
      if (!firstname) { alertMsg = this.getValidMsg('firstname'); result = false; }
      if (!lastname) { alertMsg = this.getValidMsg('lastname'); result = false; }

      if (!email) { alertMsg = this.getValidMsg('email'); result = false; }
      const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailChecker.test(email)) { alertMsg = this.getValidMsg('emailChecker'); result = false; }

      if (passwordOne.length < 8 || passwordTwo.length < 8) { alertMsg = this.getValidMsg('password_length'); result = false; }
      if (passwordOne !== passwordTwo) { alertMsg = this.getValidMsg('password_compares'); result = false; }

      if (!street) { alertMsg = this.getValidMsg('street'); result = false; }
      if (!zipcode) { alertMsg = this.getValidMsg('zipcode'); result = false; }
      if (!city) { alertMsg = this.getValidMsg('city'); result = false; }
      if (!country) { alertMsg = this.getValidMsg('country'); result = false; }
      if (!isAgree) { alertMsg = this.getValidMsg('isAgree'); result = false; }

    }

    if (!result) {
      Alert.alert(
        'Warnung', `${alertMsg}`,
        [{ text: 'Ja', onPress: () => null }], { cancelable: false },
      );
    }

    return result;
  }

  getBirthdayStr(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return date ? `${yyyy}-${mm}-${dd}` : '';

  }

  BirthdayRender() {
    const { dateVisible, birthDate } = this.state;
    // console.log("birthDate birthDate birthDate", birthDate)
    return Platform.OS === 'ios' ? (
      <>
        <TouchableOpacity onPress={() => this.setState({ dateVisible: !dateVisible })}>
          {birthDate ? (
            <View style={styles.dateBox}>
              <Text style={[styles.dateStyle, { color: '#050505' }]}>{this.getBirthdayStr(birthDate)}</Text>
            </View>
          ) : (
              <View style={styles.dateBox}><Text style={styles.dateStyle}>Geburtstag</Text></View>
            )}
        </TouchableOpacity>
        <ModalView
          visible={dateVisible}
          onSubmit={() => this.setState({ dateVisible: !dateVisible })}
          onRequestClose={() => this.setState({ dateVisible: !dateVisible })}
          buttonText='Speichern'
        >
          <DatePickerIOS
            date={birthDate ? birthDate : new Date()}
            maximumDate={new Date()}
            mode='date'
            onDateChange={value => this.setState({ birthDate: value })}
          />
        </ModalView>
      </>
    ) : (
        <>
          <TouchableOpacity onPress={async () => {
            try {
              const currentDate = birthDate ? new Date(`${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()} 12:00`) : new Date();
              const { action, year, month, day } = await DatePickerAndroid.open({
                date: currentDate, maxDate: new Date()
              });
              if (action !== DatePickerAndroid.dismissedAction) {
                const birthdayPicker = new Date(year, month, day);
                this.setState({ birthDate: birthdayPicker });
              }
            } catch ({ code, message }) { console.warn('Cannot open date picker', message) }
          }}>
            {birthDate ? (
              <View style={styles.dateBox}>
                <Text style={[styles.dateStyle, { color: '#050505' }]}>{this.getBirthdayStr(birthDate)}</Text>
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
        case 'salutation': return true;
        case 'firstname': return true;
        case 'lastname': return true;
        case 'birthDate': return true;
      }
    } else if (screenID === 'ChangeUserBillingAddress' || screenID === 'ChangeUserShippingAddress') {
      switch (field) {
        case 'customerType': return true;
        case 'salutation': return true;
        case 'firstname': return true;
        case 'lastname': return true;
        case 'phone': return true;
        case 'address': return true;
      }
    } else {
      switch (field) {
        case 'customerType': return true;
        case 'salutation': return true;
        case 'firstname': return true;
        case 'lastname': return true;
        case 'phone': return true;
        case 'birthDate': return true;
        case 'email': return true;
        case 'passwordOne': return true;
        case 'passwordTwo': return true;
        case 'address': return true;
        case 'subscribe': return true;
        case 'isAgree': return true;
      }
    }
  }

  vatId = createRef();
  firstname = createRef();
  lastname = createRef();
  phone = createRef();
  email = createRef();
  passwordOne = createRef();
  passwordTwo = createRef();
  street = createRef();
  zipcode = createRef();
  city = createRef();
  country = createRef();
  salutation = createRef();
  department = createRef();
  company = createRef();


  CustomerChange(value) {
    this.setState({ customerType: value });
    if (value === 'Privatkunde') {
      this.setState({ company: '', department: '', vatId: '', });
    }
  }



  render() {
    const {
      loaded, customerType, company, department, vatId,
      salutation, firstname, lastname, phone, email, passwordOne, passwordTwo,
      street, zipcode, city, country, countries, subscribe, isAgree,
    } = this.state;

    if (!loaded) return <Loading />;

    return (

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>

        <ScrollView style={{ marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>

          {this.Visible('customerType') && (
            <View>
              <Text style={styles.PlaceholderControl}>Ich bin Neukunde <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Picker onValueChange={(value) => this.CustomerChange(value)} values={['Privatkunde', 'Firma']} selected={customerType} />
            </View>
          )}

          {(customerType === 'Firma') && this.Visible('customerType') &&
            <View>
              <Text style={styles.PlaceholderControl}>Firmennamen <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 255 Zeichen.</Text>
              <Input
                onChangeText={company => this.setState({ company })}
                value={company} maxLength={255}
                ref={(input) => { this.company = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.department && this.department.tearger}
                blurOnSubmit={true} />
              <Text style={styles.PlaceholderControl}>Abteilung</Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 35 Zeichen.</Text>
              <Input
                onChangeText={department => this.setState({ department })}
                value={department} maxLength={35}
                ref={(input) => { this.department = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.vatId && this.vatId.tearger}
                blurOnSubmit={false} />

              <Text style={styles.PlaceholderControl}>Steuernummer <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 50 Zeichen.</Text>
              <Input
                onChangeText={vatId => this.setState({ vatId })}
                value={vatId}
                maxLength={50}
                ref={(input) => { this.vatId = input; }}
              />

            </View>
          }

          {this.Visible('salutation') && (
            <View>
              <Text style={styles.PlaceholderControl}>Geschlecht <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Picker
                onValueChange={salutation => this.setState({ salutation })}
                values={['Herr', 'Frau']}
                selected={salutation} />
            </View>
          )}

          {this.Visible('firstname') && (
            <View>
              <Text style={styles.PlaceholderControl}>Vorname <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 255 Zeichen.</Text>
              <Input
                onChangeText={firstname => this.setState({ firstname })}
                value={firstname}
                maxLength={255}
                ref={(input) => { this.firstname = input; }}
                autoFocus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.lastname.tearger}
                blurOnSubmit={false}
              />
            </View>
          )}

          {this.Visible('lastname') && (
            <View>
              <Text style={styles.PlaceholderControl}>Nachname <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 255 Zeichen.</Text>
              <Input
                onChangeText={lastname => this.setState({ lastname })}
                value={lastname}
                maxLength={255}
                ref={(input) => { this.lastname = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.phone.tearger}
                blurOnSubmit={false}
              />
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
              <Text style={styles.PlaceholderNotes}>Die maximal 40 Zeichen.</Text>
              <Input
                onChangeText={phone => this.setState({ phone: `${phone.replace(/[^0-9]/gi, '')}` })}
                value={phone} keyboardType='phone-pad'
                maxLength={40}
                ref={(input) => { this.phone = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.email.tearger}
                blurOnSubmit={false}
              />
            </View>
          )}

          {this.Visible('email') && (
            <View>
              <Text style={styles.PlaceholderControl}>Email <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 70 Zeichen.</Text>
              <Input
                onChangeText={email => this.setState({ email })}
                autoCapitalize='none'
                value={email}
                maxLength={70}
                ref={(input) => { this.email = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.passwordOne.tearger}
                blurOnSubmit={false}
              />
            </View>
          )}

          {this.Visible('passwordOne') && (
            <View>
              <Text style={styles.PlaceholderControl}>Passwort <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Ihr Passwort muss mindestens 8 Zeichen umfassen. Die maximal 16 Zeichen.</Text>
              <Input
                onChangeText={passwordOne => this.setState({ passwordOne })}
                value={passwordOne}
                maxLength={16}
                password
                ref={(input) => { this.passwordOne = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.passwordTwo.tearger}
                blurOnSubmit={false}
              />
            </View>
          )}




          {this.Visible('passwordTwo') && (
            <View>
              <Text style={styles.PlaceholderControl}>Passwort wiederholen <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Input
                onChangeText={passwordTwo => this.setState({ passwordTwo })}
                value={passwordTwo}
                maxLength={16}
                password
                ref={(input) => { this.passwordTwo = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.street.tearger}
                blurOnSubmit={false}
              />
            </View>
          )}

          {this.Visible('address') && (
            <View>
              <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Ihre Adresse</Text>

              <Text style={styles.PlaceholderControl}>Straße und Nr. <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 255 Zeichen.</Text>
              <Input
                onChangeText={street => this.setState({ street })}
                value={street}
                maxLength={255}
                ref={(input) => { this.street = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.zipcode.tearger}
                blurOnSubmit={false}
              />


              <Text style={styles.PlaceholderControl}>PLZ <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 5 Zeichen.</Text>
              <Input
                onChangeText={zipcode => this.setState({ zipcode: zipcode.replace(/[^0-9]/gi, '') })}
                value={zipcode}
                maxLength={5}
                ref={(input) => { this.zipcode = input; }}
                focus={true}
                returnKeyType={"next"}
                onSubmitEditing={this.city.tearger}
                blurOnSubmit={false}
              />



              <Text style={styles.PlaceholderControl}>Ort <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Text style={styles.PlaceholderNotes}>Die maximal 70 Zeichen.</Text>
              <Input
                onChangeText={city => this.setState({ city })}
                value={city}
                maxLength={70}
                ref={(input) => { this.city = input; }}
                focus={true}
              // returnKeyType={"next"}
              // onSubmitEditing={this.country.tearger}
              // blurOnSubmit={false}
              />

              <Text style={styles.PlaceholderControl}>Land <Text style={styles.PlaceholderRequiered}>*</Text></Text>
              <Picker onValueChange={country => this.setState({ country })} ref={(input) => { this.country = input; }} values={countries.map(({ name }) => name)} selected={country} />
            </View>
          )}

          {this.Visible('isAgree') && (
            <View style={{ marginVertical: 15 }}>
              <Checkbox onPress={() => this.setState({ isAgree: !isAgree })} checked={isAgree} text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' />
            </View>
          )}

          {this.Visible('subscribe') && (
            <View style={{ marginBottom: 15 }}>
              <Checkbox onPress={() => this.setState({ subscribe: !subscribe })} checked={subscribe} text='Newsletter anmelden' />
            </View>
          )}
        </ScrollView>
        <FooterButton onPress={() => this.Executing()} text={'Speichern'} />
      </KeyboardAvoidingView>

    )
  }
}

const mapStateToProps = ({ userInfo, userID }) => { return { userInfo: userInfo, userID: userID } }
export default connect(mapStateToProps, actions)(ChangeMainData);

const styles = {
  PlaceholderControl: { fontSize: 13, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  PlaceholderNotes: { fontSize: 12, color: '#A0A0A0', marginTop: 10, marginBottom: -5 },
  //InputControl: {fontSize: 16, height: 40, marginTop: 0, marginBottom: -5 },
  PlaceholderRequiered: { fontSize: 13, color: 'red' },

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
