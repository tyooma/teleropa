import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions/login-actions'
import { SafeAreaView } from 'react-navigation';
import NavigationService from '../../navigation-service';
import { sHeight } from '../../helpers/screenSize';

class SideMenuView extends PureComponent {
  render() {
    const isLoggedIn = this.props.userID !== 'notloggedin' && this.props.loaded
    const loginButtonText = isLoggedIn ? 'Ausloggen' : 'Anmelden'
    return (
      <SafeAreaView style={{ flex: 10, backgroundColor: '#d10019' }} forceInset={{ bottom: 'never' }}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end' }}>
          <View style={styles.topContainerStyle}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Image style={styles.logoStyle} source={require('../../assets/teleropa-logo.png')} key={'sideMenuTeleropaLogo'} />
            </View>
          </View>

          <View style={styles.ScrollMenuItems}>
            <ScrollView>
              <MenuButton text='Startseite' imgSrc={require('../../assets/icons/011-house.png')} route='Main' />
              <MenuButton text='Kategorien' imgSrc={require('../../assets/icons/012-menu-1.png')} route='CategoriesList' userType={this.props} />   
              {isLoggedIn ? <MenuButton text='Profil' imgSrc={require('../../assets/icons/013-user.png')} route={'Profile'} /> : null}
              {isLoggedIn ? <MenuButton text='Merkliste' imgSrc={require('../../assets/icons/004-heart.png')} route={'Favourite'} /> : null}
              <MenuButton text='Warenkorb' imgSrc={require('../../assets/icons/002-shopping-cart.png')} route='Cart' />
              <View style={styles.line} />
              <MenuButton text='Einstellungen' imgSrc={require('../../assets/icons/033-survey.png')} route='Settings' />
              <View style={styles.line} />
              <MenuButton text='Information' imgSrc={require('../../assets/icons/043-info.png')} route='Info' />
              <MenuButton text={loginButtonText} imgSrc={require('../../assets/icons-color/sign-in.png')} route='Login' />
            </ScrollView>
          </View>

          <View style={styles.WhatsAppContainer}>
              <TouchableOpacity style={styles.WhatsAppButton} onPress={() =>
                Linking.canOpenURL('whatsapp://send?phone=491707046434').then((supported) => {
                  if (!supported) {
                    return Linking.openURL("market://details?id=com.whatsapp");
                  } else {
                    return Linking.openURL('whatsapp://send?phone=491707046434');
                  }
                }).catch((err) => console.error('An error occurred', err))}
              >
                <Image source={require('../../assets/icons-color/044-whatsapp-white.png')} style={styles.WhatsAppImage} key={'WhatsAppImage'} />
                <Text style={styles.WhatsAppText}>Whatsapp Chat</Text>
              </TouchableOpacity>
            </View>
        </View>
      </SafeAreaView>
    )
  }

}

const MenuButton = ({ text, imgSrc, route, onPress, userType }) => {
  // text={loginButtonText} route='Login'
  //NavigationService.navigate('ProductSubscribe', { productID: this.props.id })
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.closeDrawer()
        NavigationService.navigate(route, { userInfoType: userType })
      }}
      style={styles.buttonContainerStyle}
    >
      <Image source={imgSrc} style={styles.buttonImageStyle} key={imgSrc} />
      <Text style={styles.buttonTextStyle}> {text} </Text>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => ({
  userID: state.userID,
  loaded: state.app.loaded,
  selectedUserType: state.userInfo.selectedUserType
});
export default connect(mapStateToProps, actions)(SideMenuView)

const styles = {
  WhatsAppContainer: { flex: 1, paddingBottom: 30, alignItems: 'center', justifyContent: 'flex-end' },
  WhatsAppButton: {
    flexDirection: 'row', height: 40, width: '70%', borderRadius: 5,
    backgroundColor: '#3F911B', alignItems: 'center', justifyContent: 'center',
  },
  WhatsAppImage: { width: 24, height: 24, resizeMode: 'contain' },
  WhatsAppText: { fontSize: 16, color: '#fff', marginLeft: 0 },

  ScrollMenuItems: {
    flex: 8, marginHorizontal: 18, marginVertical: 10,
    // height: sHeight - 175, // justifyContent: 'space-between'
  },

  line: { height: 0.5, backgroundColor: '#a0a0a0', marginVertical: 5 },
  buttonTextStyle: { marginLeft: 13, fontSize: 16, color: '#000' },
  buttonImageStyle: { height: 21, width: 25, resizeMode: 'contain' },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingVertical: 10,
  },
  topContainerStyle: { height: 65, marginBottom: 6, backgroundColor: '#D10019' },
  logoStyle: { marginLeft: 10, height: 40, width: 100, resizeMode: 'contain' },
  userTypeViewStyle: {
		flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
  },
  selectedUser: {
    marginBottom: 1,
    height: 44,
    borderBottomWidth: 1.7,
    borderColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  unselectedUser: {
    marginBottom: 1,
    height: 44,
    borderBottomWidth: 1.7,
    borderColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  selectedUserText: { fontSize: 16, color: '#FFFFFF' },
  unselectedUserText: { fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }
}
