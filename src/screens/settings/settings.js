import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions/login-actions'
import { MenuButton } from '../../common/header-buttons';
import UserButton from '../../common/start-buttons/user-button';
import CompanyButton from '../../common/start-buttons/company-button';
import DeviceInfo from 'react-native-device-info';
import FooterNavBar from '../../common/footer-navigation-bar/footer-navigation-bar';

class Settings extends PureComponent {
  static navigationOptions = { title: 'Einstellungen', headerLeft: <MenuButton/>, headerRight: <></> }

  state = {
    routeName: 'Settings',
    infoSystemName: '',       // getSystemName (Android) - String	✅	✅
    infoSystemVersion: '',    // getSystemVersion (9) - String	✅	✅
    infoManufacturer: '',     // getManufacturer (Xiaomi) - Promise<String>	✅	✅
    infoModel: '',            // getModel (Mi A1) - String	✅	✅
    infoReadableVersion: '',  // getReadableVersion (x.x.x) - String	✅	✅
  }

  componentDidMount() {
    this.setState({
      infoSystemName: DeviceInfo.getSystemName(),
      infoSystemVersion: DeviceInfo.getSystemVersion(),
      infoManufacturer: DeviceInfo.getManufacturer(),
      infoModel: DeviceInfo.getModel(),
      infoReadableVersion: DeviceInfo.getReadableVersion(),
    });
  }

  ChangeUserType(type) {
    this.props.setUserType(type);
  }

  render() {
    // console.log('Settings => props:', this.props);
    const userType = this.props.selectedUserType;
    const {
      infoSystemName, infoSystemVersion, infoManufacturer, infoModel, infoReadableVersion
    } = this.state;
    return (
      <>
        <View style={s.Container}>
          <View style={s.UserTypeContainer}>
            <View style={s.UserType}>
              <Text style={s.UserTypeCaption}>
                  Bitte wählen Sie, ob Sie im Shop als Unternehmen oder als Privatperson kaufen möchten.
              </Text>
            </View>
            <View style={{flex: 2, flexDirection:'row', justifyContent: 'space-around'}}>
              <UserButton selected={userType==='EK'} onPress={() => this.ChangeUserType('EK')}/>
              <CompanyButton selected={userType==='H'} onPress={() => this.ChangeUserType('H')}/>
            </View>
          </View>
          <View style={s.VersionsContainer}>
            <Text style={s.VersionsHeadCaption}>Über diese App</Text>
            <View style={s.VersionsRecord}>
              <Text style={s.VersionsTopic}>System-Typ:</Text>
              <Text style={s.VersionsValue}>{infoSystemName} {infoSystemVersion}</Text>
            </View>
            <View style={s.VersionsRecord}>
              <Text style={s.VersionsTopic}>App-Version:</Text>
              <Text style={s.VersionsValue}>{infoReadableVersion}</Text>
            </View>
            <View style={s.VersionsRecord}>
              <Text style={s.VersionsTopic}>Geräte-Typ:</Text>
              <Text style={s.VersionsValue}>{infoManufacturer} {infoModel}</Text>
            </View>
          </View>
        </View>
        <View style={s.NavigationFooter}>
          <FooterNavBar />
        </View>
      </>
    );
  }
}

const mapStateToProps = ({userInfo}) => (userInfo);
export default connect(mapStateToProps, actions)(Settings)

const s = StyleSheet.create({
  Container: { flex: 10, padding: 10, alignItems: 'center', justifyContent: 'space-between' },
  UserTypeContainer: { flex: 5 },
  UserType: { paddingBottom: 10 },
  UserTypeCaption: { fontSize: 20, textAlign: 'center', lineHeight: 30, color: '#000000' },
  VersionsContainer: { flex: 1, width: '95%', paddingBottom: 10, justifyContent: 'flex-end' },
  VersionsHeadCaption: { fontSize: 18, fontWeight: 'bold', lineHeight: 30, color: 'gray' },
  VersionsRecord: { flexDirection: 'row' },
  VersionsTopic: { fontSize: 16, lineHeight: 30, color: 'gray', paddingRight: 5, },
  VersionsValue: { flex: 1, fontSize: 16, fontWeight: 'bold', flexWrap: 'wrap', lineHeight: 30, color: 'gray' },
  NavigationFooter: { height: 49, width: '100%' },
});
