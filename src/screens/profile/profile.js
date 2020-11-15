import React, { PureComponent } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ButtonItem from '../../common/button-item';
import FooterButton from '../../common/footer-button';

class Profile extends PureComponent {

  state = { routeName: 'Profile' }

  render() {
    // console.log('Profile => props:', this.props);
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        { this.props.email ? <Text style={styles.points}>Ihre Punkte: {this.props.points}</Text> : null }
        { this.props.email ? <ButtonItem text='Persönliche Angaben' onPress={() => this.props.navigation.navigate('PersonalData')}/> : null }
        <ButtonItem text='Bestellungen' onPress={() => this.props.navigation.navigate('Orders')} />
        <ButtonItem text='Widerrufsrecht' onPress={() => this.props.navigation.navigate('Orders', {selected: 'Retouren'})} />
        <ButtonItem text='Wunschzettel' onPress={() => {this.props.navigation.navigate('Favourite')}} />
        { !this.props.email ?
        <View style={{width: '100%', flexDirection: 'row', marginVertical: 20}}>
          <View style={{width: '50%', padding: 10}}>
            <FooterButton text={'Anmelden'} onPress={() => this.props.navigation.navigate('Login')}/>
          </View>
          <View style={{width: '50%', padding: 10}}>
            <FooterButton text={'Registrieren'} onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'RegistrationUser' })}/>
          </View>
        </View> : null }
        
        {/* <View style={{padding: 5}}>
          <FooterButton text={'Registration-User'} 
            onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'RegistrationUser' })}/>
        </View>

        <View style={{padding: 5}}>
          <FooterButton text={'Change-User-Info'} 
            onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserInfo' })}/>
        </View>

        <View style={{padding: 5}}>
          <FooterButton text={'Change-User-Billing-Address'} 
            onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserBillingAddress' })}/>
        </View>

        <View style={{padding: 5}}>
          <FooterButton text={'Change-User-Shipping-Address'} 
            onPress={() => this.props.navigation.navigate('ChangeMainData', { ScreenID: 'ChangeUserShippingAddress' })}/>
        </View> */}

        {/* <View style={{padding: 10}}>
          <FooterButton text={'TEST REGISTRATION'} onPress={() => this.props.navigation.navigate('TestRegister')}/>
        </View> */}

      </ScrollView>
    );
  }
}

const mapStateToProps = ({userInfo}) => (userInfo);
export default connect(mapStateToProps)(Profile)

const styles = {
  container: { marginHorizontal: 18 },
  points: { marginVertical: 16, color: '#d10019', fontSize: 16, fontWeight: 'bold' }
}
